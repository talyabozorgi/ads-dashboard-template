const BASE_URL = 'https://secure.cardcom.solutions/Interface'

const TERMINAL = process.env.CARDCOM_TERMINAL!
const API_NAME = process.env.CARDCOM_API_NAME!
const API_PASSWORD = process.env.CARDCOM_API_PASSWORD!

export interface CreatePaymentPageParams {
  amount: number
  productName: string
  successUrl: string
  failedUrl?: string
  webhookUrl?: string
  returnValue?: string
  // Customer pre-fill (optional)
  fullName?: string
  email?: string
  phone?: string
  // Installments
  maxPayments?: number
  minPayments?: number
}

export interface PaymentPageResult {
  ok: boolean
  lowProfileCode?: string
  url?: string
  error?: string
  rawResponse?: string
}

export interface TransactionStatus {
  ok: boolean
  paid: boolean
  approvalNumber?: string
  internalDealNumber?: string
  cardOwnerName?: string
  last4Digits?: string
  amount?: string
  error?: string
  rawResponse?: string
}

function parseCardcomResponse(text: string): Record<string, string> {
  const result: Record<string, string> = {}
  for (const pair of text.split('&')) {
    const [key, ...rest] = pair.split('=')
    if (key) result[decodeURIComponent(key)] = decodeURIComponent(rest.join('='))
  }
  return result
}

// Create a hosted payment page. Returns a URL to redirect the customer to.
export async function createPaymentPage(params: CreatePaymentPageParams): Promise<PaymentPageResult> {
  const body = new URLSearchParams({
    TerminalNumber: TERMINAL,
    UserName: API_NAME,
    APILevel: '10',
    codepage: '65001',
    Operation: '1',
    Amount: params.amount.toFixed(2),
    ProductName: params.productName,
    successUrl: params.successUrl,
    FailedUrl: params.failedUrl || params.successUrl,
    Language: 'he',
    MaxPayments: String(params.maxPayments ?? 1),
    MinPayments: String(params.minPayments ?? 1),
  })

  if (params.webhookUrl) body.set('WebHookUrl', params.webhookUrl)
  if (params.returnValue) body.set('ReturnValue', params.returnValue)
  if (params.fullName) body.set('FullName', params.fullName)
  if (params.email) body.set('Email', params.email)
  if (params.phone) body.set('Phone', params.phone)

  try {
    const res = await fetch(`${BASE_URL}/LowProfile.aspx`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    })

    const text = await res.text()
    const parsed = parseCardcomResponse(text)

    if (parsed.ResponseCode !== '0') {
      return { ok: false, error: `Cardcom error ${parsed.ResponseCode}: ${parsed.Description || text}`, rawResponse: text }
    }

    return {
      ok: true,
      lowProfileCode: parsed.LowProfileCode,
      url: parsed.url || parsed.Url,
      rawResponse: text,
    }
  } catch (err) {
    return { ok: false, error: String(err) }
  }
}

// Check if a payment was completed for a given lowProfileCode.
export async function getTransactionStatus(lowProfileCode: string): Promise<TransactionStatus> {
  const params = new URLSearchParams({
    TerminalNumber: TERMINAL,
    UserName: API_NAME,
    lowprofilecode: lowProfileCode,
  })

  try {
    const res = await fetch(`${BASE_URL}/BillGoldGetLowProfileIndicator.aspx?${params}`)
    const text = await res.text()
    const parsed = parseCardcomResponse(text)

    const paid = parsed.OperationResponse === '0' && parsed.ResponseCode === '0'

    return {
      ok: parsed.ResponseCode === '0',
      paid,
      approvalNumber: parsed.ApprovalNumber,
      internalDealNumber: parsed.InternalDealNumber,
      cardOwnerName: parsed.CardOwnerName,
      last4Digits: parsed.Last4Digits,
      amount: parsed.Amount,
      rawResponse: text,
    }
  } catch (err) {
    return { ok: false, paid: false, error: String(err) }
  }
}

// Validate that an incoming webhook request is from Cardcom.
// Cardcom sends TerminalNumber in the payload — verify it matches ours.
export function validateWebhook(payload: Record<string, string>): boolean {
  return payload.TerminalNumber === TERMINAL
}
