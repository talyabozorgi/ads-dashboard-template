import { NextRequest, NextResponse } from 'next/server'
import { addSubscriberToList } from '@/lib/utils/ravmeser'

const BUYERS_LIST_ID = '49071'

export async function POST(request: NextRequest) {
  const { name, phone, email, utm_content, utm_campaign, utm_source } = await request.json()

  if (!email) {
    return NextResponse.json({ error: 'Missing email' }, { status: 400 })
  }

  if (!process.env.RAVMESER_C_KEY) {
    console.error('Missing RavMeser credentials')
    return NextResponse.json({ error: 'Not configured' }, { status: 500 })
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
      return NextResponse.json({ error: 'RavMeser failed', details: result.body, status: result.status }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('add-buyer error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
