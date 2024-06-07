'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from '@/components/ui/breadcrumb'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import type { IFullPath } from '@/supabase/crud/folder'

export default function Path() {
  const params = useParams()
  const [isLoaded, setIsLoaded] = useState(true)
  const [path, setPath] = useState<IFullPath>([])

  const folder_id = params.folder_id

  useEffect(() => {
    const fetchPath = async () => {
      const res = await fetch(`/api/disk/folder?folder_id=${params.folder_id}`)
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
  return (
    <Breadcrumb className='mt-4'>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href='/dashboard'>Root directory</BreadcrumbLink>
        </BreadcrumbItem>
        {path.length > 2 ? (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            {path.slice(-2).map((p, i) => (
              <span key={`bread-${p.id}`}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/dashboard/${p.id}`}>{p.name}</BreadcrumbLink>
                </BreadcrumbItem>
              </span>
            ))}
          </>
        ) : (
          <>
            {path.map((p, i) => (
              <span key={`bread-${p.id}`}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/dashboard/${p.id}`}>{p.name}</BreadcrumbLink>
                </BreadcrumbItem>
              </span>
            ))}
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
