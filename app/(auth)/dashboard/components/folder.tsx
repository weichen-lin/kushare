'use client'

import { Folder as FolderIcon, DotsThreeVertical } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

function Folder() {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={clsx(
        'w-[360px] p-3 border-[1px] border-slate-300 rounded-sm',
        'hover:shadow-md flex gap-x-4 items-center justify-between',
      )}
    >
      <div className='flex gap-x-4 items-center'>
        <FolderIcon className='w-6 h-6 text-yellow-700' />
        <div className='text-slate-700'>我是資料夾</div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <DotsThreeVertical className='w-6 h-6 text-slate-700' />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  )
}

const FolderLoading = () => {
  return (
    <div className={clsx('w-[360px] p-3 rounded-sm bg-slate-200 animate-pulse')}>
      <div className='opacity-0'>Loading</div>
    </div>
  )
}

export default function Folders() {
  return (
    <div className='w-full flex flex-col md:flex-row justify-start md:flex-wrap items-start lg:grid lg:grid-cols-2 gap-y-4'>
      <Folder />
      <Folder />
      <Folder />
      <Folder />
      <Folder />
      <Folder />
      <FolderLoading />
    </div>
  )
}
