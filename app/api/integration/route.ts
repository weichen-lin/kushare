import { NextRequest, NextResponse } from 'next/server'
import { getIntegrations } from '@/supabase/crud/integration'

export const GET = async (req: NextRequest, res: NextResponse) => {
  const { error, data } = await getIntegrations()

  if (error) {
    return NextResponse.json({ error: error, data: data }, { status: 400 })
  }

  return NextResponse.json({ data: data, error: null })
}
