'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from '@/components/ui/breadcrumb'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import type { IFullPath } from '@/supabase/crud/folder'
import { useSelect } from '@/app/(auth)/d/hook'
import { motion } from 'framer-motion'
import { Cross1Icon } from '@radix-ui/react-icons'

export default function Path() {
  const params = useParams()
  const [isLoaded, setIsLoaded] = useState(true)
  const [path, setPath] = useState<IFullPath>([])
  const folder_id = params.folder_id

  useEffect(() => {
    const fetchPath = async () => {
      const res = await fetch(`/api/disk?id=${params.folder_id}`)
      const data = await res.json()
      setPath(data.full_path)
    }

    if (folder_id) fetchPath()
    setIsLoaded(false)
  }, [])

  return isLoaded ? <BreadcrumbLoading /> : <BreadCrumbs path={path} />
}

const BreadcrumbLoading = () => <div className='w-[360px] p-3 rounded-sm bg-slate-200 animate-pulse'></div>

const BreadCrumbs = ({ path }: { path: IFullPath }) => {
  const { folders, files } = useSelect()
  const params = useParams()

  const folder_id = params.folder_id

  return folders.length + files.length > 0 ? (
    <Manipulator />
  ) : (
    <Breadcrumb className='mt-4'>
      <BreadcrumbList>
        {path.length > 3 ? (
          <>
            {path.slice(0, 1).map((p, i) => (
              <span key={`bread-${p.depth}-${p.id}`}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href='/d'>{p.name}</BreadcrumbLink>
                </BreadcrumbItem>
              </span>
            ))}
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            {path.slice(-2).map((p, i) => (
              <span key={`bread-${p.id}`}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/d/${p.id}`}>{p.name}</BreadcrumbLink>
                </BreadcrumbItem>
              </span>
            ))}
          </>
        ) : (
          <>
            {path.map((p, i) => (
              <BreadcrumbItem key={`bread-${p.depth}-${p.id}`}>
                {p.depth !== 0 && <BreadcrumbSeparator />}
                {p.depth === 0 ? (
                  <BreadcrumbLink href='/d'>{p.name}</BreadcrumbLink>
                ) : (
                  <BreadcrumbLink href={`/d/${p.id}`}>{p.name}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            ))}
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

const Manipulator = () => {
  const { folders, files, clear } = useSelect()
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className='flex gap-x-1 w-[400px] items-center justify-start bg-slate-100 px-3 rounded-md'
    >
      <Cross1Icon
        className='w-5 h-5 text-slate-700 cursor-pointer hover:bg-slate-300 p-1 rounded-full'
        onClick={clear}
      />
      <div className='px-3 py-2 text-sm'>
        <span className='pr-2'>{folders.length + files.length}</span> Selected
      </div>
    </motion.div>
  )
}
