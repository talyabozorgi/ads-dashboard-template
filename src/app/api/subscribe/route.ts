import { createHash } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

function buildAuthHeader() {
  const nonce = createHash('md5')
    .update(Math.random().toString() + Date.now().toString())
    .digest('hex')
  const timestamp = Math.floor(Date.now() / 1000).toString()

  const cKey = process.env.RAVMESSER_C_KEY!
  const cSecret = process.env.RAVMESSER_C_SECRET!
  const uKey = process.env.RAVMESSER_U_KEY!
  const uSecret = process.env.RAVMESSER_U_SECRET!

  const cSecretHash = createHash('md5').update(cSecret + nonce).digest('hex')
  const uSecretHash = createHash('md5').update(uSecret + nonce).digest('hex')

  return `c_key=${cKey},c_secret=${cSecretHash},u_key=${uKey},u_secret=${uSecretHash},nonce=${nonce},timestamp=${timestamp}`
}

export async function POST(request: NextRequest) {
  try {
    const { name, phone, email } = await request.json()

    const listId = process.env.RAVMESSER_LIST_ID
    if (!listId) {
      return NextResponse.json({ error: 'Missing list ID' }, { status: 500 })
    }

    const subscriberData = [
      {
        NAME: name || '',
        EMAIL: email || '',
        PHONE: phone || '',
        NOTIFY: 0,
      },
    ]

    const body = new URLSearchParams()
    body.append('subscribers', JSON.stringify(subscriberData))

    const response = await fetch(
      `https://api.responder.co.il/main/lists/${listId}/subscribers`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: buildAuthHeader(),
        },
        body: body.toString(),
      }
    )

    const result = await response.json()

    if (!response.ok) {
      console.error('RavMeser error:', result)
      return NextResponse.json({ error: result }, { status: response.status })
    }

    return NextResponse.json({ success: true, data: result })
  } catch (err) {
    console.error('Subscribe error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
