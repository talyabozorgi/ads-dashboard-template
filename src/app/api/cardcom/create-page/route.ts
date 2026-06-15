import { NextRequest, NextResponse } from 'next/server'
import { createPaymentPage } from '@/lib/utils/cardcom'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://talyaacademy.co.il'

const PRODUCTS: Record<string, { amount: number; name: string; successUrl: string }> = {
  eyebrow_course: {
    amount: 197,
    name: 'קורס עיצוב גבות דיגיטלי',
    successUrl: `${BASE_URL}/thank-you`,
  },
  ombre_upsell: {
    amount: 97,
    name: 'קורס מאסטרית באומברה',
    successUrl: `${BASE_URL}/thank-you`,
  },
  ombre_course: {
    amount: 197,
    name: 'קורס מאסטרית באומברה',
    successUrl: `${BASE_URL}/thank-you`,
  },
}

// POST /api/cardcom/create-page
// Body: { product, name?, email?, phone?, utmParams?, maxPayments? }
// Returns: { url } — redirect the customer to this URL
export async function POST(request: NextRequest) {
  const body = await request.json()
  const { product, name, email, phone, utmParams, maxPayments } = body

  const productConfig = PRODUCTS[product]
  if (!productConfig) {
    return NextResponse.json({ error: `Unknown product: ${product}` }, { status: 400 })
  }

  // Build success URL with UTM params so thank-you page can track attribution
  let successUrl = productConfig.successUrl
  if (utmParams) {
    successUrl += (successUrl.includes('?') ? '&' : '?') + new URLSearchParams(utmParams).toString()
  }

  // Webhook fires server-side when payment completes (more reliable than localStorage)
  const webhookUrl = `${BASE_URL}/api/cardcom/webhook`

  // returnValue carries product + customer data through Cardcom → back to our webhook
  const returnValue = JSON.stringify({ product, email, phone, name, ...(utmParams || {}) })

  const result = await createPaymentPage({
    amount: productConfig.amount,
    productName: productConfig.name,
    successUrl,
    failedUrl: successUrl.replace('/thank-you', '/eyebrow-course'),
    webhookUrl,
    returnValue,
    fullName: name,
    email,
    phone,
    maxPayments: maxPayments ?? 1,
  })

  if (!result.ok) {
    console.error('Cardcom create-page error:', result.error)
    return NextResponse.json({ error: result.error }, { status: 500 })
  }

  return NextResponse.json({ url: result.url, lowProfileCode: result.lowProfileCode })
}
