'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ModeToggle } from '@/components/ui/toggle'
import { SignUp } from '@clerk/nextjs'

export default function Index() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='w-full max-w-[600px]'>
        <header className='w-full py-4 lg:py-6 xl:py-8 hidden md:block'>
          <div className='container flex items-center justify-around gap-x-6 px-4 md:px-6'>
            <div className='flex items-center gap-x-6'>
              <Link href='/'>
                <Image src='/icon.png' width={40} height={40} alt='' className='rounded-lg dark:bg-white'></Image>
              </Link>
              Kushare
            </div>
            <ModeToggle />
          </div>
        </header>
        <div className='flex w-full items-center justify-center gap-x-4'>
          <SignUp />
        </div>
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
