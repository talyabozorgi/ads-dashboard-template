import { NextRequest, NextResponse } from 'next/server'
import { addSubscriberToList } from '@/lib/utils/ravmeser'
import { sendCapiEvent } from '@/lib/utils/meta-capi'

const BUYERS_LIST_ID = '49071'

export async function POST(request: NextRequest) {
  const { name, phone, email, utm_content, utm_campaign, utm_source } = await request.json()

  if (!email) {
    return NextResponse.json({ error: 'Missing email' }, { status: 400 })
  }

  // Send Purchase event via Conversions API (server-side, always fires regardless of ad blockers)
  await sendCapiEvent({
    eventName: 'Purchase',
    email,
    phone,
    value: 197,
    currency: 'ILS',
    contentName: 'eyebrow_course',
    eventId: `purchase_${Date.now()}`,
  })

  if (!process.env.RAVMESER_CLIENT_ID) {
    console.error('Missing RavMeser credentials')
    return NextResponse.json({ success: true })
  }

  try {
    const result = await addSubscriberToList(BUYERS_LIST_ID, {
      email,
      first_name: name,
      phone,
      custom_fields: {
        source: utm_content || utm_campaign || utm_source || 'פרסום ממומן',
      },
    })

    if (!result.ok) {
      console.error('RavMeser add-buyer error:', result.status, result.body)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('add-buyer error:', err)
    return NextResponse.json({ success: true })
  }
}
