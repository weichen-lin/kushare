'use client'

import Image from 'next/image'
import { Folders, HandGrabbing, ShareFat } from '@phosphor-icons/react'
import Link from 'next/link'
import { Lamp } from '@/components/ui/lamp'
import { ModeToggle } from '@/components/ui/toggle'
import { UserButton, useUser, SignedIn, SignedOut } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

export default function Index() {
  return (
    <div className='flex min-h-screen flex-col'>
      <header className='w-full py-4 drop-shadow-sm backdrop-blur-md dark:bg-white lg:py-6 xl:py-8'>
        <div className='container flex items-center justify-between gap-x-6 px-4 md:px-6'>
          <div className='flex items-center gap-x-6 dark:text-slate-900'>
            <Image src='/icon.png' width={40} height={40} alt=''></Image>
            Kushare
          </div>
          <div className='flex gap-x-8'>
            <SignedIn>
              <Button>
                <Link href='/dashboard'>Dashboard</Link>
              </Button>
            </SignedIn>
            <SignedOut>
              <Button>
                <Link href='/sign-up'>Get Started</Link>
              </Button>
            </SignedOut>
            <ModeToggle />
          </div>
        </div>
      </header>
      <Lamp />
      <section className='mt-12 w-full py-12 lg:py-24 xl:py-32'>
        <div className='container flex flex-col items-center justify-center gap-4 px-4 text-center md:px-6'>
          <div className='space-y-8'>
            <h1 className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none'>
              Organize your memories with ease
            </h1>
            <p className='text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
              Effortlessly group your photos into folders. Say goodbye to cluttered galleries.
            </p>
          </div>
          <div className='space-y-4'>
            <Link
              className='mt-8 inline-flex h-10 items-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300'
              href='/sign-up'
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      <section className='w-full py-4'>
        <div className='container flex flex-col items-center justify-center gap-4 px-4 text-center md:px-6'>
          <Image src='/album.png' alt='home page' width={350} height={350}></Image>
        </div>
      </section>
      <section className='w-full py-2 lg:py-24'>
        <div className='container flex flex-col items-center justify-center gap-4 px-4 text-center md:px-6'>
          <div className='space-y-8'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>Key Features</h2>
            <p className='max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed xl:text-xl/relaxed'>
              Organize your photos with powerful tools designed for simplicity.
            </p>
          </div>
          <div className='grid max-w-sm gap-4 md:grid-cols-2 lg:max-w-none lg:grid-cols-3'>
            <div className='flex flex-col items-center space-y-1'>
              <Folders size={48} />
              <h3 className='text-lg font-medium'>Smart Folders</h3>
              <p className='text-sm text-gray-500 dark:text-gray-400'>Automatically organize your photos.</p>
            </div>
            <div className='flex flex-col items-center space-y-1'>
              <HandGrabbing size={48} />
              <h3 className='text-lg font-medium'>Drag & Drop</h3>
              <p className='text-sm text-gray-500 dark:text-gray-400'>Intuitively move photos between folders.</p>
            </div>
            <div className='flex flex-col items-center space-y-1'>
              <ShareFat size={48} />
              <h3 className='text-lg font-medium'>Shareable Albums</h3>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                Easily create collections to share with friends.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className='w-full py-12 lg:py-24'>
        <div className='container flex flex-col items-center justify-center gap-4 px-4 text-center md:px-6'>
          <div className='max-w-[700px] space-y-2'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>Effortless Organization</h2>
            <p className='text-gray-500 dark:text-gray-400 md:text-xl/relaxed xl:text-2xl/relaxed'>
              With our app, you can spend less time organizing and more time enjoying your photos.
            </p>
          </div>
        </div>
      </section>
      <footer className='w-full'>
        <div className='container flex flex-col items-center justify-center py-8 text-center md:flex-row md:space-x-2 md:space-y-0 md:py-12 lg:py-16 xl:py-24'>
          <p className='text-sm text-gray-500 dark:text-gray-400'>© 2024 WeiChen Lin. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
