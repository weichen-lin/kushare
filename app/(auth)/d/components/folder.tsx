'use client'

import { Folder as FolderIcon, DotsThreeVertical } from '@phosphor-icons/react'
import { MoveIcon, TrashIcon, Pencil1Icon } from '@radix-ui/react-icons'

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
import { useState, useEffect } from 'react'
import { useFolder, useDoubleClick, useSelect } from '@/app/(auth)/d/hook'
import { useParams } from 'next/navigation'
import { IFolder } from '@/supabase/crud/folder'
import { useRouter } from 'next/navigation'

function Folder(props: IFolder) {
  const { id, name } = props
  const { folders, setFolders, clear } = useSelect()
  const router = useRouter()

  const onDoubleClick = () => {
    clear()
    router.push(`/d/${id}`)
  }

  const onClick = () => {
    if (folders.includes(id)) return
    setFolders([...folders, id])
  }

  const { handleClick } = useDoubleClick(onClick, onDoubleClick)

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={clsx(
        'w-[290px] p-3 border-[1px] rounded-sm',
        'hover:shadow-md flex gap-x-4 items-center justify-between cursor-pointer',
        folders.includes(id) ? 'bg-blue-100 border-none' : 'border-slate-300',
      )}
      onClick={handleClick}
    >
      <div className='flex gap-x-4 items-center'>
        <FolderIcon className='w-6 h-6 text-yellow-700' />
        <div className='text-slate-700 select-none'>{name}</div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <DotsThreeVertical className='w-6 h-6 text-slate-700' />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className='flex gap-x-2'>
            <Pencil1Icon />
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem className='flex gap-x-2'>
            <MoveIcon />
            Move
          </DropdownMenuItem>
          <DropdownMenuItem className='flex gap-x-2'>
            <TrashIcon />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  )
}

const FolderLoading = () => {
  return (
    <div
      className={clsx(
        'w-full flex justify-start items-start gap-4 flex-wrap',
        'lg:grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4',
      )}
    >
      <div className={clsx('w-[290px] p-3 rounded-sm bg-slate-200 animate-pulse')}>
        <div className='opacity-0'>Loading</div>
      </div>
      <div className={clsx('w-[290px] p-3 rounded-sm bg-slate-200 animate-pulse')}>
        <div className='opacity-0'>Loading</div>
      </div>
      <div className={clsx('w-[290px] p-3 rounded-sm bg-slate-200 animate-pulse')}>
        <div className='opacity-0'>Loading</div>
      </div>
      <div className={clsx('w-[290px] p-3 rounded-sm bg-slate-200 animate-pulse')}>
        <div className='opacity-0'>Loading</div>
      </div>
    </div>
  )
}

const FolderEmpty = () => {
  return <div className=''>There are no current folder now.</div>
}

export default function Folders() {
  const [isLoading, setIsLoading] = useState(true)
  const { folders, setFolders } = useFolder()
  const params = useParams()

  const folder_id = params.folder_id

  useEffect(() => {
    const fetchPath = async () => {
      setIsLoading(true)

      try {
        const res = await fetch(`/api/disk/folder${folder_id ? `?id=${folder_id}` : ''}`)
        const data = await res.json()
        setFolders(data.data)
      } catch (error) {
        setFolders([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchPath()
  }, [])

  return isLoading ? (
    <FolderLoading />
  ) : (
    <div
      className={clsx(
        'w-full flex justify-start items-start gap-4 flex-wrap',
        'lg:grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4',
      )}
    >
      {!isLoading && folders.length > 0 && folders.map(folder => <Folder key={folder.id} {...folder} />)}
      {!isLoading && folders.length === 0 && <FolderEmpty />}
    </div>
  )
}
