'use server'

import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full h-screen overflow-y-auto flex overflow-x-hidden'>
      <div className='flex w-full'>
        <Sidebar />
        <div className='w-full md:flex-1 relative'>
          <Navbar />
          {children}
        </div>
      </div>
    </div>
  )
}
