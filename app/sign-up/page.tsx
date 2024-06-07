'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ModeToggle } from '@/components/ui/toggle'
import { GithubLogo, FacebookLogo, GoogleLogo } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

type Providers = 'google' | 'github' | 'facebook'

export default function Index() {
  const supabase = createClientComponentClient()

  const getURL = () => {
    let url =
      process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
      process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
      'http://localhost:3000/'
    // Make sure to include `https://` when not localhost.
    url = url.includes('http') ? url : `https://${url}`
    // Make sure to include a trailing `/`.
    url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
    return url
  }

  const handleSignUp = async (provider: Providers) => {
    const url = getURL()

    await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${url}/api/auth/callback`,
      },
    })
  }

  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='w-full max-w-[600px]'>
        <header className='w-full py-4 lg:py-6 xl:py-8 hidden md:block'>
          <div className='container flex items-center justify-around gap-x-6 px-4 md:px-6'>
            <motion.div whileTap={{ scale: 0.9 }}>
              <Link href='/' className='flex gap-x-6 items-center'>
                <Image src='/icon.png' width={40} height={40} alt='' className='rounded-lg dark:bg-white'></Image>
                Kushare
              </Link>
            </motion.div>
            <ModeToggle />
          </div>
        </header>
        <section className='w-full py-4'>
          <div className='container flex items-center justify-center gap-4 px-4 md:px-6'>
            <Image src='/auth.png' alt='home page' width={350} height={350}></Image>
          </div>
        </section>
        <div className='flex w-full items-center justify-center gap-x-4'>
          <Button
            variant='outline'
            className='border-slate-500'
            onClick={() => {
              handleSignUp('github')
            }}
          >
            <GithubLogo className='h-6 w-6'></GithubLogo>
          </Button>
          <Button variant='outline' className='border-slate-500'>
            <FacebookLogo className='h-6 w-6'></FacebookLogo>
          </Button>
          <Button variant='outline' className='border-slate-500'>
            <GoogleLogo className='h-6 w-6' />
          </Button>
        </div>
        <div className='flex w-full items-center justify-center gap-x-4'></div>
        <footer className='w-full hidden md:block'>
          <div className='container flex flex-col items-center justify-center py-8 text-center md:flex-row md:space-x-2 md:space-y-0 md:py-12 lg:py-16 xl:py-24'>
            <p className='text-sm text-gray-500 dark:text-gray-400'>© 2024 WeiChen Lin. All rights reserved.</p>
          </div>
        </footer>
      </div>
      <div className='hidden h-full flex-1 items-center justify-center bg-gradient-to-br from-slate-100/30 to-slate-500/60 lg:flex'>
        <Image alt='login' src='/login.jpg' width={400} height={400}></Image>
      </div>
    </div>
  )
}
