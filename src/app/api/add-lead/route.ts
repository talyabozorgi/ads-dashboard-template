import { NextRequest, NextResponse } from 'next/server'
import { addSubscriberToList } from '@/lib/utils/ravmeser'
import { sendCapiEvent } from '@/lib/utils/meta-capi'

const LEADS_LIST_ID = process.env.RAVMESER_LEADS_LIST_ID || ''

export async function POST(request: NextRequest) {
  const { name, phone, email, listId, utm_content, utm_campaign, utm_source } = await request.json()
  const targetListId = listId || LEADS_LIST_ID

  if (!email) {
    return NextResponse.json({ error: 'Missing email' }, { status: 400 })
  }

  // Send Lead event via Conversions API
  await sendCapiEvent({
    eventName: 'Lead',
    email,
    phone,
    sourceUrl: 'https://my-ads-dashboard-eight.vercel.app/eyebrow-course',
    eventId: `lead_${Date.now()}`,
  })

  if (!process.env.RAVMESER_CLIENT_ID || !targetListId) {
    console.error('Missing RavMeser credentials or leads list ID')
    return NextResponse.json({ success: true })
  }

  try {
    const result = await addSubscriberToList(targetListId, {
      email,
      first_name: name,
      phone,
      custom_fields: {
        source: utm_content || utm_campaign || utm_source || 'פרסום ממומן',
      },
    })

    if (!result.ok) {
      console.error('RavMeser add-lead error:', result.status, result.body)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('add-lead error:', err)
    return NextResponse.json({ success: true })
  }
}
