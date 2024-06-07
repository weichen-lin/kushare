import { NextRequest, NextResponse } from 'next/server'
import useServerUser from '@/supabase/sever'
import { z } from 'zod'
import { createFolder } from '@/supabase/crud/folder'

const createFolderSchema = z.object({
  locate_at: z.string().nullable(),
  name: z.string(),
})

export const POST = async (req: NextRequest, res: NextResponse) => {
  const user = await useServerUser()

  if (!user) {
    return NextResponse.json({ message: 'unauthorized' }, { status: 401 })
  }

  try {
    const data = await req.json()
    const { locate_at, name } = createFolderSchema.parse(data)

    const { error } = await createFolder(user.id, locate_at || user.id, name)

    if (error) {
      return NextResponse.json({ message: error }, { status: 400 })
    }

    if (!data) {
      return NextResponse.json({ message: 'Folder already exists' }, { status: 400 })
    }

    return NextResponse.json({ message: 'Folder created' })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'invalid data' }, { status: 400 })
  }
}
