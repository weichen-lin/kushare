import { NextRequest, NextResponse } from 'next/server'
import { getFiles } from '@/supabase/crud/file'

export const GET = async (req: NextRequest) => {
  const d = req.nextUrl.searchParams.get('id')

  const { error, data } = await getFiles(d)

  if (error) {
    return NextResponse.json({ error: error, data: [] }, { status: 400 })
  }

  return NextResponse.json({ error: null, data: data })
}
