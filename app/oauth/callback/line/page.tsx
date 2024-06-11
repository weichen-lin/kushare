'use server'

import { redirect } from 'next/navigation'
import { createLineOauthUser } from '@/supabase/crud/integration'

export default async function Page({ searchParams }: { searchParams: { code: string } }) {
  const code = searchParams?.code

  if (!code) {
    redirect('/settings')
  }

  const data = await getAccessToken(code)
  const profile = await getUserProfile(data.access_token)

  await createLineOauthUser({
    oauth_id: profile.userId,
    platform: 'line',
    name: profile.displayName,
    avatar_url: profile.pictureUrl,
    store_at: null,
  })

  redirect('/settings')
}

const getAccessToken = async (code: string) => {
  const redirect_uri = process.env.NEXT_PUBLIC_LINE_REDIRECT_URI
  const client_id = process.env.NEXT_PUBLIC_LINE_CLIENT_ID
  const client_secret = process.env.LINE_CLIENT_SECRET

  if (!redirect_uri || !client_id || !client_secret) {
    throw new Error('Missing environment variables')
  }

  const res = await fetch('https://api.line.me/oauth2/v2.1/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri,
      client_id,
      client_secret,
    }),
  })

  return res.json()
}

const getUserProfile = async (access_token: string) => {
  const res = await fetch('https://api.line.me/v2/profile', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })

  return res.json()
}
