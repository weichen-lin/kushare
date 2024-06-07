import { createClient } from '@/supabase/sever'

interface Result<T> {
  data: T
  error: string | null
}

export const createFolder = async (user_id: string, locate_at: string, name: string): Promise<Result<boolean>> => {
  const client = createClient()

  let { data: d, error: e } = await client.rpc('set_folder_full_path', {
    folder_id: locate_at,
  })
  console.log({ d, e })
  console.log(JSON.parse(d))

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

  if (user_id === locate_at) {
    const { data: locater } = await client
      .from('folder')
      .select('user_id, name, locate_at, depth')
      .eq('user_id', user_id)
      .eq('locate_at', locate_at)
      .single()

    if (locater) {
      depth = locater.depth + 1
    }
  }

  const { error } = await client.from('folder').insert({
    user_id,
    locate_at,
    name,
    depth: depth,
  })

  if (error) {
    return {
      data: false,
      error: error.message,
    }
  }

  return { data: true, error: null }
}
