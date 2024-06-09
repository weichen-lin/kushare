'use client'

import { createBrowserClient } from '@supabase/ssr'
import { create } from 'zustand'
import { useState, useEffect } from 'react'
import { User, userSchema } from '@/supabase/schema'

interface IUserStore {
  user: User | null
  setUser: (user: User) => void
}

const useStore = create<IUserStore>(set => ({
  user: null as User | null,
  setUser: (user: User) => set({ user }),
}))

export const browserClient = () =>
  createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

const useClientUser = () => {
  const client = browserClient()
  const { user, setUser } = useStore()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const getUser = async () => {
      setLoading(true)
      const user = await client.auth.getUser()

      const info = {
        id: user?.data?.user?.id,
        email: user?.data?.user?.email,
        name: user?.data?.user?.user_metadata?.user_name,
        avatar_url: user?.data?.user?.user_metadata?.avatar_url,
      }

      try {
        const user_parsed = userSchema.parse(info)
        setUser(user_parsed)
        setIsAuthenticated(true)
      } catch (error) {
        console.error('User not found')
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    getUser()
  }, [])

  return {
    isAuthenticated,
    user,
    loading,
  }
}

export default useClientUser
