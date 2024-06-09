import { NextRequest, NextResponse } from 'next/server'
import { getFolderFullPath } from '@/supabase/crud/folder'

export const GET = async (req: NextRequest, res: NextResponse) => {
  const d = req.nextUrl.searchParams.get('id')

  if (!d) {
    return NextResponse.json({ message: 'invalid query params data', full_path: [] }, { status: 400 })
  }

  const { error, data } = await getFolderFullPath(d)

  if (error) {
    return NextResponse.json({ message: error, full_path: [] }, { status: 400 })
  }

  return NextResponse.json({ full_path: data })
}
