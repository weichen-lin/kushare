'use client'

import LineLogin from './line'
import Intergration from './integration'
import clsx from 'clsx'
import { useState, useEffect } from 'react'
import { IOauthUser } from '@/supabase/crud/integration'

export default function Intergrations() {
  const [isLoding, setIsLoading] = useState(true)
  const [integrations, setIntegrations] = useState<IOauthUser[]>([])

  useEffect(() => {
    const fetchIntegrations = async () => {
      try {
        const res = await fetch('/api/integration')
        const data = await res.json()

        if (data.error) {
          throw new Error(data.error)
        }

        setIntegrations(data.data)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchIntegrations()
  }, [])

  return (
    <div
      className={clsx(
        'w-full flex flex-col gap-y-4 items-center justify-center border-[1px] border-slate-200 rounded-md py-4 mt-8',
        'md:border-none md:justify-start md:w-[400px] md:items-start md:mt-4',
      )}
    >
      {isLoding && <IntergrationLoading />}
      {!isLoding && integrations.length === 0 && <IntergrationEmpty />}
      {!isLoding && integrations.length > 0 && integrations.map(i => <Intergration key={i.oauth_id} {...i} />)}
    </div>
  )
}

const IntergrationLoading = () => {
  return <div className='w-[400px] h-12 bg-slate-100 animate-pulse'></div>
}

const IntergrationEmpty = () => {
  return (
    <>
      <div className='text-slate-500 text-xl md:text-slate-400'>No integrations yet</div>
      <div className='text-slate-300 text-md'>Install one of our recommended options below.</div>
      <LineLogin />
    </>
  )
}
