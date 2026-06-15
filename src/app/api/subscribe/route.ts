import { NextRequest, NextResponse } from 'next/server'
import { addSubscriberToList } from '@/lib/utils/ravmeser'

const LEADS_LIST_ID = process.env.RAVMESER_LEADS_LIST_ID || ''

export async function POST(request: NextRequest) {
  try {
    const { name, phone, email, utm_source, utm_medium, utm_campaign, utm_content } = await request.json()

    const source = utm_content || utm_campaign || utm_source || 'ישיר'

    // Add to RavMeser leads list directly
    if (process.env.RAVMESER_CLIENT_ID && LEADS_LIST_ID) {
      try {
        const result = await addSubscriberToList(LEADS_LIST_ID, {
          email,
          first_name: name,
          phone,
          custom_fields: { source },
        })
        if (!result.ok) {
          console.error('RavMeser subscribe error:', result.status, result.body)
        }
      } catch (err) {
        console.error('RavMeser subscribe failed:', err)
      }
    }

    // Also send to Make.com if configured (fallback / additional automation)
    const webhookUrl = process.env.MAKE_WEBHOOK_URL
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, source, utm_source, utm_medium, utm_campaign, utm_content }),
      }).catch(err => console.error('Make.com webhook error:', err))
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Subscribe error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
