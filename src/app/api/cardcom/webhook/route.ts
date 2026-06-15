import { NextRequest, NextResponse } from 'next/server'
import { validateWebhook } from '@/lib/utils/cardcom'
import { sendCapiEvent } from '@/lib/utils/meta-capi'
import { addSubscriberToList } from '@/lib/utils/ravmeser'

const BUYERS_LIST_ID = process.env.RAVMESER_BUYERS_LIST_ID || '49071'

const PRODUCT_PRICES: Record<string, number> = {
  eyebrow_course: 197,
  ombre_upsell: 97,
  ombre_course: 197,
}

// POST /api/cardcom/webhook
// Called by Cardcom server-to-server after a successful payment.
// This is the reliable path — fires even if the customer closes the browser.
export async function POST(request: NextRequest) {
  let payload: Record<string, string> = {}

  const contentType = request.headers.get('content-type') || ''

  if (contentType.includes('application/x-www-form-urlencoded')) {
    const text = await request.text()
    for (const pair of text.split('&')) {
      const [k, ...v] = pair.split('=')
      if (k) payload[decodeURIComponent(k)] = decodeURIComponent(v.join('='))
    }
  } else {
    payload = await request.json().catch(() => ({}))
  }

  if (!validateWebhook(payload)) {
    console.error('Cardcom webhook: invalid terminal', payload.TerminalNumber)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Cardcom sends DealResponse=0 for success
  const success = payload.DealResponse === '0' || payload.OperationResponse === '0'
  if (!success) {
    console.log('Cardcom webhook: payment not successful', payload)
    return NextResponse.json({ ok: true })
  }

  // ReturnValue is the JSON we passed when creating the page
  let meta: Record<string, string> = {}
  try {
    meta = JSON.parse(payload.ReturnValue || '{}')
  } catch {
    console.warn('Cardcom webhook: could not parse ReturnValue', payload.ReturnValue)
  }

  const { product, email, phone, name, utm_source, utm_campaign, utm_content } = meta
  const value = PRODUCT_PRICES[product] ?? 0

  console.log(`Cardcom webhook: payment OK — product=${product} email=${email} deal=${payload.InternalDealNumber}`)

  // Fire Meta Conversions API (server-side, no ad blockers)
  if (email || phone) {
    await sendCapiEvent({
      eventName: 'Purchase',
      email,
      phone,
      value,
      currency: 'ILS',
      contentName: product,
      eventId: `cardcom_${payload.InternalDealNumber || Date.now()}`,
    }).catch(err => console.error('CAPI error:', err))
  }

  // Add to RavMeser buyers list
  if (email || phone) {
    await addSubscriberToList(BUYERS_LIST_ID, {
      email,
      first_name: name,
      phone,
      custom_fields: {
        product,
        deal_number: payload.InternalDealNumber,
        source: utm_content || utm_campaign || utm_source || 'ישיר',
      },
    }).catch(err => console.error('RavMeser error:', err))
  }

  return NextResponse.json({ ok: true })
}
