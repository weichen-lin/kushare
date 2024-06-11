import { createClient } from '@/supabase/sever'
import { z } from 'zod'
import { UUIDParser } from './utils'

const platformSchema = z.enum(['line', 'discord', 'google', 'github', 'facebook', 'twitter'])

const OauthUserSchema = z.object({
  oauth_id: z.string(),
  platform: platformSchema,
  name: z.string(),
  avatar_url: z.string().nullable(),
  store_at: z.string().uuid().nullable(),
})

type IOauthUser = z.infer<typeof OauthUserSchema>

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

  console.log({ error })

  if (error) {
    return false
  }

  return true
}

export { createLineOauthUser }
