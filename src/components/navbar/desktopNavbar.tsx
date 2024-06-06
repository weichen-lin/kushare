'use client'

import clsx from 'clsx'
import useNavbar from './bars'
import { ModeToggle } from '@/components/ui/toggle'

export default function DesktopNavbar() {
  const { current } = useNavbar()

  return (
    <div
      className={clsx(
        'absolute top-0 left-0 w-full hidden md:flex',
        'bg-white p-3 px-[3%] flex items-center justify-between dark:bg-slate-500',
        'border-b-[1px] border-slate-300',
      )}
    >
      <div className='flex gap-x-6'>
        <p className='text-xl'>{current.name}</p>
      </div>
      <ModeToggle />
    </div>
  )
}
