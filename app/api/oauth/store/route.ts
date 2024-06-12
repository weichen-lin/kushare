import { NextRequest, NextResponse } from 'next/server'
import { getFolderInfo } from '@/supabase/crud/folder'
import { updateStoreAt } from '@/supabase/crud/integration'
import { z } from 'zod'
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

const updateLocateAtSchema = z.object({
  id: z.string(),
  store_at: z.string().uuid(),
})

export const PATCH = async (req: NextRequest, res: NextResponse) => {
  try {
    const d = await req.json()

    const { id, store_at } = updateLocateAtSchema.parse(d)

    const { error, data } = await updateStoreAt(id, store_at)

    if (error) {
      return NextResponse.json({ error: error, data: null }, { status: 400 })
    }

    return NextResponse.json({ data: data, error: null })
  } catch (e) {
    return NextResponse.json({ error: 'invalid query params data', data: null }, { status: 400 })
  }
}
