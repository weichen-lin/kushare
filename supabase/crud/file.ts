import { createClient } from '@/supabase/sever'
import { z } from 'zod'
import { UUIDParser, Result } from './utils'

const fileSchema = z.object({
  id: z.string(),
  locate_at: z.string(),
  name: z.string(),
  url: z.string().url(),
  last_modified_at: z.string(),
})

export type IFile = z.infer<typeof fileSchema>

export const getFiles = async (locate_at: string | null): Promise<Result<IFile[]>> => {
  const client = createClient()
  const user = await client.auth.getUser()

  if (!user) {
    return {
      data: [],
      error: 'Unauthorized',
    }
  }

  const checker = UUIDParser(locate_at)
  const furtherLocate = checker ? locate_at : user?.data?.user?.id

  const { data, error } = await client
    .from('file')
    .select('id, locate_at, name, url, last_modified_at')
    .eq('user_id', user?.data?.user?.id)
    .eq('locate_at', furtherLocate)
    .order('last_modified_at', { ascending: false })

  if (error) {
    return {
      data: [],
      error: error.message,
    }
  }

  try {
    const folders = data.map(f => {
      return fileSchema.parse(f)
    })

    return {
      data: folders,
      error: null,
    }
  } catch (e) {
    return {
      data: [],
      error: 'Invalid data',
    }
  }
}
