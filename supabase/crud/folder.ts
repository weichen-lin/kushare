import { createClient } from '@/supabase/sever'
import { z } from 'zod'

interface Result<T> {
  data: T
  error: string | null
}

const fullPathSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    depth: z.number(),
  }),
)

export type IFullPath = z.infer<typeof fullPathSchema>

function fixAndParseJSONString(ori: string | null): IFullPath | null {
  if (!ori) {
    return null
  }

  const correctedString = ori.slice(1, -1).replace(/"\{([^}]+)\}"/g, '{$1}')
  const removeStr = correctedString.replaceAll('\\', '')

  try {
    return JSON.parse(`[${removeStr}]`)
  } catch (e) {
    return null
  }
}

export const createFolder = async (user_id: string, locate_at: string, name: string): Promise<Result<boolean>> => {
  const client = createClient()

  let { data: d, error: e } = await client.rpc('set_folder_full_path', {
    folder_id: locate_at,
  })

  const fullPath = fixAndParseJSONString(d)

  const { data: checker } = await client
    .from('folder')
    .select('user_id, name, locate_at')
    .eq('user_id', user_id)
    .eq('name', name)
    .eq('locate_at', locate_at)
    .single()

  if (checker) {
    return {
      data: false,
      error: 'Folder already exists',
    }
  }

  let depth: number = 1

  const { data: locater } = await client.from('folder').select('id, depth').eq('id', locate_at).single()

  if (locater) {
    depth = locater.depth + 1
  }

  const { error } = await client.from('folder').insert({
    user_id,
    locate_at,
    name,
    depth: depth,
    full_path: fullPath,
  })

  if (error) {
    return {
      data: false,
      error: error.message,
    }
  }

  return { data: true, error: null }
}

export const getFolderFullPath = async (user_id: string, folder_id: string): Promise<Result<IFullPath>> => {
  const client = createClient()
  console.log({ folder_id })

  const { data, error } = await client
    .from('folder')
    .select('id, user_id, full_path')
    .eq('id', folder_id)
    .eq('user_id', user_id)
    .single()

  if (error) {
    return {
      data: [],
      error: error.message,
    }
  }

  try {
    const fullPath = fixAndParseJSONString(data.full_path)
    return {
      data: fullPath ?? [],
      error: null,
    }
  } catch (e) {
    return {
      data: [],
      error: 'Invalid data',
    }
  }
}
