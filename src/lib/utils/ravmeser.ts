const API_BASE = 'https://graph.responder.live/v2'

let cachedToken: string | null = null
let tokenExpiry = 0

async function getToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiry) return cachedToken

  const res = await fetch(`${API_BASE}/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      scope: '*',
      client_id: Number(process.env.RAVMESER_CLIENT_ID),
      client_secret: process.env.RAVMESER_CLIENT_SECRET,
      user_token: process.env.RAVMESER_USER_TOKEN,
    }),
  })

  const data = await res.json()
  if (!data.token) throw new Error('RavMeser auth failed: ' + JSON.stringify(data))

  cachedToken = data.token
  tokenExpiry = Date.now() + 13 * 24 * 60 * 60 * 1000 // 13 days (expires in 14)
  return cachedToken!
}

export interface SubscriberData {
  email: string
  first_name?: string
  phone?: string
  custom_fields?: Record<string, string>
}

export async function addSubscriberToList(
  listId: string,
  data: SubscriberData
): Promise<{ ok: boolean; status: number; body: string }> {
  const token = await getToken()

  const res = await fetch(`${API_BASE}/subscribers`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      list_id: Number(listId),
      email: data.email,
      phone: data.phone,
      first: data.first_name,
    }),
  })

  const body = await res.text()
  return { ok: res.ok, status: res.status, body }
}
