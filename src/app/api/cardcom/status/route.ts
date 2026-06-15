import { NextRequest, NextResponse } from 'next/server'
import { getTransactionStatus } from '@/lib/utils/cardcom'

// GET /api/cardcom/status?code=XXXX
// Check if a Cardcom Low Profile transaction was paid.
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')

  if (!code) {
    return NextResponse.json({ error: 'Missing code param' }, { status: 400 })
  }

  const status = await getTransactionStatus(code)

  return NextResponse.json(status)
}
