import { createClient } from '@/supabase/sever'
import { z } from 'zod'
import { UUIDParser } from './utils'

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

const folderSchema = z.object({
  id: z.string(),
  locate_at: z.string(),
  name: z.string(),
  depth: z.number(),
  full_path: fullPathSchema.nullable(),
  last_modified_at: z.string(),
})

export type IFullPath = z.infer<typeof fullPathSchema>
export type IFolder = z.infer<typeof folderSchema>

function fixAndParseJSONString(ori: string | null): IFullPath {
  if (!ori) {
    return []
  }

  const correctedString = ori.slice(1, -1).replace(/"\{([^}]+)\}"/g, '{$1}')
  const removeStr = correctedString.replaceAll('\\', '')

  try {
    return JSON.parse(`[${removeStr}]`)
  } catch (e) {
    return []
  }
}

export const createFolder = async (locate_at: string | null, name: string): Promise<Result<IFolder | null>> => {
  const client = createClient()
  const user = await client.auth.getUser()

  if (!user) {
    return {
      data: null,
      error: 'Unauthorized',
    }
  }

  const idChecker = UUIDParser(locate_at)
  const furtherLocate = idChecker ? locate_at : user?.data?.user?.id

  let { data: d } = await client.rpc('set_folder_full_path', {
    folder_id: furtherLocate,
  })

  const fullPath = fixAndParseJSONString(d)

  fullPath.unshift({
    id: user?.data?.user?.id as string,
    name: 'Root directory',
    depth: 0,
  })

  const { data: checker } = await client
    .from('folder')
    .select('id, user_id, name, locate_at')
    .eq('user_id', user?.data?.user?.id)
    .eq('name', name)
    .eq('locate_at', furtherLocate)
    .select('name')

  if (Array.isArray(checker) && checker.length > 0) {
    return {
      data: null,
      error: 'Folder already exists',
    }
  }

  let depth: number = 1

  const { data: locater } = await client.from('folder').select('id, depth').eq('id', locate_at).single()

  if (locater) {
    depth = locater.depth + 1
  }

  const { data, error } = await client
    .from('folder')
    .insert({
      user_id: user?.data?.user?.id,
      locate_at: locate_at ?? user?.data?.user?.id,
      name,
      depth: depth,
      full_path: fullPath,
    })
    .select('id, locate_at, name, depth, full_path, last_modified_at')
    .single()

  if (error) {
    return {
      data: null,
      error: error.message,
    }
  }

  try {
    return {
      data: folderSchema.parse(data),
      error: null,
    }
  } catch (e) {
    return {
      data: null,
      error: 'Invalid data',
    }
  }
}

export const getFolderFullPath = async (folder_id: string): Promise<Result<IFullPath>> => {
  const client = createClient()
  const user = await client.auth.getUser()

  if (!user) {
    return {
      data: [],
      error: 'Unauthorized',
    }
  }

  const { data, error } = await client
    .from('folder')
    .select('id, user_id, name, depth, full_path')
    .eq('id', folder_id)
    .eq('user_id', user?.data?.user?.id)
    .single()

  if (error) {
    return {
      data: [],
      error: error.message,
    }
  }

  try {
    data.full_path.push({
      id: user?.data?.user?.id as string,
      name: data.name,
      depth: data.depth,
    })

    const fullPath = fullPathSchema.parse(data.full_path)
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

export const getFolders = async (locate_at: string | null): Promise<Result<IFolder[]>> => {
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
    .from('folder')
    .select('id, locate_at, name, depth, full_path, last_modified_at')
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
      return folderSchema.parse(f)
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
