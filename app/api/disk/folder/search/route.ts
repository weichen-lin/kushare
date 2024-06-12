import { NextRequest, NextResponse } from 'next/server'
import { getFoldersByName } from '@/supabase/crud/folder'

export const GET = async (req: NextRequest) => {
  const d = req.nextUrl.searchParams.get('name')

  const { error, data } = await getFoldersByName(d ?? '')

  if (error) {
    return NextResponse.json({ error: error, data: [] }, { status: 400 })
  }

  return NextResponse.json({ error: error, data: data })
}
