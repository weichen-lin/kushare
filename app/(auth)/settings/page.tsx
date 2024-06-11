'use server'

import { Intergrations } from './components'

export default async function SettingsPage() {
  return (
    <div className='w-full h-full pt-24 px-[3%] overflow-y-scroll flex flex-col gap-y-4'>
      <h1 className='text-2xl font-bold'>Intergrations</h1>
      <Intergrations />
    </div>
  )
}
