import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createFolder, getFolders } from '@/supabase/crud/folder'

const createFolderSchema = z.object({
  locate_at: z.string().nullable(),
  name: z.string(),
})

export const GET = async (req: NextRequest) => {
  const d = req.nextUrl.searchParams.get('id')

  const { error, data } = await getFolders(d)

  if (error) {
    return NextResponse.json({ error: error, data: [] }, { status: 400 })
  }

  return NextResponse.json({ error: error, data: data })
}

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json()
    const { locate_at, name } = createFolderSchema.parse(data)

    const { data: folder, error } = await createFolder(locate_at, name)

    if (error) {
      return NextResponse.json({ error: error, data: null }, { status: 400 })
    }

    if (!folder) {
      return NextResponse.json({ error: 'Folder already exists', data: null }, { status: 400 })
    }

    return NextResponse.json({ error: 'Folder created', data: folder })
  } catch (error) {
    return NextResponse.json({ error: 'invalid data', data: null }, { status: 400 })
  }
}
