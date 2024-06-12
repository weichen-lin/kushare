import { NextRequest, NextResponse } from 'next/server'
import { getFolderInfo } from '@/supabase/crud/folder'

export const GET = async (req: NextRequest, res: NextResponse) => {
  const d = req.nextUrl.searchParams.get('id')

  if (!d) {
    return NextResponse.json({ message: 'invalid query params data', data: null }, { status: 400 })
  }

  const { error, data } = await getFolderInfo(d)

  if (error) {
    return NextResponse.json({ message: error, data: data }, { status: 400 })
  }

  return NextResponse.json({ data: data })
}
