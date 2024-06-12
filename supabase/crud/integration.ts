import { createClient } from '@/supabase/sever'
import { z } from 'zod'
import { UUIDParser, Result } from './utils'

const platformSchema = z.enum(['line'])

const OauthUserSchema = z.object({
  oauth_id: z.string(),
  platform: platformSchema,
  name: z.string(),
  avatar_url: z.string().nullable(),
  store_at: z.string().uuid(),
})

export type IOauthUser = z.infer<typeof OauthUserSchema>

const createLineOauthUser = async (u: IOauthUser): Promise<boolean> => {
  const oAuthUser = OauthUserSchema.parse(u)

  const client = createClient()
  const user = await client.auth.getUser()

  if (!user) {
    return false
  }

  const user_id = user?.data?.user?.id ?? null
  const checker = UUIDParser(user_id)

  if (!checker) {
    return false
  }

  const { data: isExist } = await client
    .from('integration')
    .select('id, user_id, platform')
    .eq('user_id', user_id)
    .eq('platform', 'line')

  if (Array.isArray(isExist) && isExist.length > 0) {
    return false
  }

  const { error } = await client.from('integration').insert([
    {
      user_id,
      oauth_id: oAuthUser.oauth_id,
      platform: oAuthUser.platform,
      name: oAuthUser.name,
      avatar_url: oAuthUser.avatar_url,
      store_at: oAuthUser.store_at ?? user_id,
    },
  ])

  if (error) {
    return false
  }

  return true
}

const getIntegrations = async (): Promise<Result<IOauthUser[]>> => {
  const client = createClient()
  const user = await client.auth.getUser()

  if (!user) {
    return {
      data: [],
      error: 'Unauthorized',
    }
  }

  const { data, error } = await client
    .from('integration')
    .select('id, user_id, oauth_id, platform, name, avatar_url, store_at')
    .eq('user_id', user?.data?.user?.id)
    .order('created_at', { ascending: true })

  if (error) {
    return {
      data: [],
      error: error.message,
    }
  }

  try {
    const platforms = data.map(f => {
      return OauthUserSchema.parse(f)
    })

    return {
      data: platforms ?? [],
      error: null,
    }
  } catch (e) {
    return {
      data: [],
      error: 'Invalid data',
    }
  }
}

const updateStoreAt = async (id: string, store_at: string): Promise<Result<boolean>> => {
  const client = createClient()
  const user = await client.auth.getUser()

  if (!user) {
    return {
      data: false,
      error: 'Unauthorized',
    }
  }

  const checker = UUIDParser(store_at)

  if (!checker) {
    return {
      data: false,
      error: 'Invalid data',
    }
  }
  console.log({ store_at, id })

  const { error } = await client.from('integration').update({ store_at }).match({ oauth_id: id })
  console.log({ error })

  if (error) {
    return {
      data: false,
      error: error.message,
    }
  }

  return {
    data: true,
    error: null,
  }
}

export { createLineOauthUser, getIntegrations, updateStoreAt }
