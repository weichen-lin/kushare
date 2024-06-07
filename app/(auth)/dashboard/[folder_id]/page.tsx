'use server'

import { Path, Disk, Actions } from '@/app/(auth)/dashboard/components'

export default async function Dashboard() {
  return (
    <div className='w-full h-full pt-24 px-[3%] overflow-y-scroll flex flex-col gap-y-4'>
      <Actions />
      <Path />
      <Disk />
    </div>
  )
}
