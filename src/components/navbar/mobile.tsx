'use client'

import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ModeToggle } from '@/components/ui/toggle'
import useNavbar from './bars'
import { ExitIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { useAuth, useUser, SignOutButton } from '@clerk/nextjs'

export default function MobileNavbar() {
  const { current } = useNavbar()

  const auth = useAuth()
  const user = useUser()

  return (
    <div className='absolute top-0 left-0 w-full bg-white p-3 flex items-center justify-between dark:bg-slate-500 md:hidden'>
      <div className='flex gap-x-6'>
        <Sheet>
          <SheetTrigger asChild>
            <HamburgerMenuIcon className='w-6 h-6 dark:text-white' />
          </SheetTrigger>
          <SheetContent side='left' className='dark:bg-slate-500'>
            <SignOutButton>
              <Button
                variant='secondary'
                className='flex border-[1px] border-slate-300 gap-x-2 max-w-[150px] mx-auto dark:border-slate-500'
              >
                <ExitIcon className='rotate-180' />
                Log Out
              </Button>
            </SignOutButton>
          </SheetContent>
        </Sheet>
        <p className=''>{current.name}</p>
      </div>
      <ModeToggle />
    </div>
  )
}
