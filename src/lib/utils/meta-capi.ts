import crypto from 'crypto'

const PIXEL_ID = '1901161570375773'
const SITE_URL = 'https://talyaacademy.co.il'

function sha256(value: string): string {
  return crypto.createHash('sha256').update(value.trim().toLowerCase()).digest('hex')
}

function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, '').replace(/^0/, '972')
}

interface CAPIEventData {
  eventName: string
  email?: string
  phone?: string
  sourceUrl?: string
  value?: number
  currency?: string
  contentName?: string
  eventId?: string
}

export async function sendCapiEvent(data: CAPIEventData): Promise<void> {
  const token = process.env.META_PIXEL_ACCESS_TOKEN || process.env.META_ACCESS_TOKEN
  if (!token) return

  const userData: Record<string, string[]> = {}
  if (data.email) userData.em = [sha256(data.email)]
  if (data.phone) userData.ph = [sha256(normalizePhone(data.phone))]

  const payload: Record<string, unknown> = {
    event_name: data.eventName,
    event_time: Math.floor(Date.now() / 1000),
    action_source: 'website',
    event_source_url: data.sourceUrl || `${SITE_URL}/thank-you`,
    user_data: userData,
  }

  if (data.eventId) payload.event_id = data.eventId

  if (data.value !== undefined) {
    payload.custom_data = {
      currency: data.currency || 'ILS',
      value: data.value,
      ...(data.contentName ? { content_name: data.contentName } : {}),
    }
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${PIXEL_ID}/events?access_token=${token}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: [payload] }),
      }
    )
    if (!res.ok) {
      const body = await res.text()
      console.error('CAPI error:', res.status, body)
    }
  } catch (err) {
    console.error('CAPI fetch error:', err)
  }
}
