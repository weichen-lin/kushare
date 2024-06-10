'use client'

import { Folder as FolderIcon, DotsThreeVertical } from '@phosphor-icons/react'
import { MoveIcon, TrashIcon, Pencil1Icon } from '@radix-ui/react-icons'

import { motion } from 'framer-motion'
import clsx from 'clsx'
import { useState, useEffect } from 'react'
import { useFiles, useDoubleClick, useSelect } from '@/app/(auth)/d/hook'
import { useParams } from 'next/navigation'
import { IFolder } from '@/supabase/crud/folder'
import { useRouter } from 'next/navigation'
import { IFile } from '@/supabase/crud/file'

function File(props: IFile) {
  const { id, name, url } = props
  const { files, setFiles, clear } = useSelect()
  const router = useRouter()

  const onDoubleClick = () => {
    clear()
    router.push(`/d/${id}`)
  }

  const onClick = () => {
    if (files.includes(id)) return
    setFiles([...files, id])
  }

  const { handleClick } = useDoubleClick(onClick, onDoubleClick)

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={clsx(
        'w-[257px] border-[1px] rounded-sm flex flex-col',
        'hover:shadow-md flex gap-x-4 items-center justify-between cursor-pointer',
        files.includes(id) ? 'bg-blue-100 border-none' : 'border-slate-300',
      )}
      onClick={handleClick}
    >
      <div className='w-full flex items-center justify-center px-2 bg-gray-100'>
        <img className='max-h-[100px]' src={url} />
      </div>
      <div className='w-full text-slate-700 select-none border-t-[1px] border-slate-300 py-1 text-center max-w-[200px] truncate'>
        {name}
      </div>
    </motion.div>
  )
}

const FileLoading = () => {
  return (
    <div
      className={clsx(
        'w-full flex justify-start items-start gap-4 flex-wrap',
        'lg:grid lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5',
      )}
    >
      <div className={clsx('w-[257px] p-3 rounded-sm bg-slate-200 animate-pulse')}>
        <div className='opacity-0'>Loading</div>
      </div>
      <div className={clsx('w-[257px] p-3 rounded-sm bg-slate-200 animate-pulse')}>
        <div className='opacity-0'>Loading</div>
      </div>
      <div className={clsx('w-[257px] p-3 rounded-sm bg-slate-200 animate-pulse')}>
        <div className='opacity-0'>Loading</div>
      </div>
      <div className={clsx('w-[257px] p-3 rounded-sm bg-slate-200 animate-pulse')}>
        <div className='opacity-0'>Loading</div>
      </div>
      <div className={clsx('w-[257px] p-3 rounded-sm bg-slate-200 animate-pulse')}>
        <div className='opacity-0'>Loading</div>
      </div>
    </div>
  )
}

const FileEmpty = () => {
  return <div className=''>There are no current file now.</div>
}

export default function Files() {
  const [isLoading, setIsLoading] = useState(true)
  const { files, setFiles } = useFiles()
  const params = useParams()

  const folder_id = params.folder_id

  useEffect(() => {
    const fetchPath = async () => {
      setIsLoading(true)

      try {
        const res = await fetch(`/api/disk/file${folder_id ? `?id=${folder_id}` : ''}`)
        const data = await res.json()
        setFiles(data.data)
      } catch (error) {
        setFiles([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchPath()
  }, [])

  return isLoading ? (
    <FileLoading />
  ) : (
    <div
      className={clsx(
        'w-full flex justify-start items-start gap-4 flex-wrap',
        'lg:grid lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5',
      )}
    >
      {!isLoading && files.length > 0 && files.map(file => <File key={file.id} {...file} />)}
      {!isLoading && files.length === 0 && <FileEmpty />}
    </div>
  )
}
