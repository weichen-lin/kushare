'use client'

import { motion } from 'framer-motion'
import clsx from 'clsx'
import Link from 'next/link'
import { StarIcon, ChatBubbleIcon, ExitIcon, DashboardIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

const Bars = [
  { name: 'Dashboard', icon: <DashboardIcon />, path: 'dashboard' },
  { name: 'My Stars', icon: <StarIcon />, path: 'stars' },
  { name: 'Start Chat', icon: <ChatBubbleIcon />, path: 'chats' },
]

export default function DesktopNavbar() {
  const pathname = usePathname()

  return (
    <div className='hidden md:flex flex-col h-full justify-between w-[220px] bg-slate-100'>
      <div className='flex flex-col gap-y-4 justify-start h-full pb-6'>
        <div className='flex flex-col items-center border-b-[1px] border-slate-300 py-8'>
          <motion.div whileTap={{ scale: 0.9 }}>
            <Link href='/'>
              <Image src='/icon.png' width={65} height={65} alt='logo' />
            </Link>
          </motion.div>
        </div>
        <div className='flex flex-col gap-y-2'>
          {Bars.map((e, i) => {
            const isCurrent = pathname.includes(e.path)
            return (
              <motion.div whileTap={{ scale: 0.9 }} key={i}>
                <Link
                  href={`/${e.path}`}
                  className={clsx(
                    'py-2 w-full cursor-pointer flex items-center justify-between px-4',
                    `${isCurrent ? 'bg-white drop-shadow-lg' : 'hover:opacity-80'}`,
                  )}
                >
                  <div className='flex items-center justify-between gap-x-4'>
                    <div>{e.icon}</div>
                    <div>{e.name}</div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
        <Button variant='secondary' className='flex border-[1px] border-slate-300 gap-x-2 max-w-[150px] mx-auto'>
          <ExitIcon className='rotate-180' />
          Log Out
        </Button>
      </div>
      <div className='flex flex-col py-2 border-t-[1px] border-slate-500/10'>
        <div
          className={clsx('py-2 w-[240px] cursor-pointer flex items-center justify-between px-4 hover:bg-slate-300/40')}
        ></div>
        <p className='text-slate-500 text-sm text-center pt-4 border-t-[1px] border-slate-500/10'>
          WeiChen Lin © 2024
        </p>
      </div>
    </div>
  )
}
