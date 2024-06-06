'use server'

import { Path, Folder } from './components'

export default async function Dashboard() {
  return (
    <div className='w-full pt-24 px-[3%]'>
      <Path />
      <Folder />
    </div>
  )
}
