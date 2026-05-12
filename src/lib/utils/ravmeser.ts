import crypto from 'crypto'

const API_BASE = 'https://api.responder.co.il/api/v1.0'

function buildAuthHeader(): string {
  const nonce = crypto.randomBytes(16).toString('hex')
  const timestamp = Math.floor(Date.now() / 1000).toString()
  const cKey = process.env.RAVMESER_C_KEY!
  const cSecretRaw = process.env.RAVMESER_C_SECRET!
  const uKey = process.env.RAVMESER_U_KEY!
  const uSecretRaw = process.env.RAVMESER_U_SECRET!
  const cSecret = crypto.createHash('md5').update(cSecretRaw + nonce).digest('hex')
  const uSecret = crypto.createHash('md5').update(uSecretRaw + nonce).digest('hex')
  return `c_key=${cKey},c_secret=${cSecret},u_key=${uKey},u_secret=${uSecret},nonce=${nonce},timestamp=${timestamp}`
}

export interface SubscriberData {
  email: string
  first_name?: string
  phone?: string
  custom_fields?: Record<string, string>
}

export async function addSubscriberToList(listId: string, data: SubscriberData): Promise<{ ok: boolean; status: number; body: string }> {
  const res = await fetch(`${API_BASE}/lists/${listId}/subscribers`, {
    method: 'POST',
    headers: {
      'Authorization': buildAuthHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: data.email,
      first_name: data.first_name,
      phone: data.phone,
      custom_fields: data.custom_fields,
    }),
  })
  const body = await res.text()
  return { ok: res.ok, status: res.status, body }
}
