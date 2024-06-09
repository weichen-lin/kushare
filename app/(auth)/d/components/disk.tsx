'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Folders from './folder'
import { useState } from 'react'
import { Folder as FolderIcon, FileImage } from '@phosphor-icons/react'

type Tabs = 'folder' | 'file'

export default function Disk() {
  const [activeTab, setActiveTab] = useState<Tabs>('folder')

  return (
    <Tabs
      defaultValue='folder'
      className='w-full mt-4'
      onValueChange={e => {
        setActiveTab(e as Tabs)
      }}
    >
      <TabsList>
        <TabsTrigger value='folder' className='px-10 flex gap-x-2 items-center'>
          {activeTab === 'folder' ? (
            <img src='/double-check.gif' className='w-6 h-6' />
          ) : (
            <FolderIcon className='w-6 h-6 text-slate-700' />
          )}
          Folder
        </TabsTrigger>
        <TabsTrigger value='file' className='px-10 flex gap-x-2 items-center'>
          {activeTab === 'file' ? (
            <img src='/double-check.gif' className='w-6 h-6' />
          ) : (
            <FileImage className='w-6 h-6 text-slate-700' />
          )}
          File
        </TabsTrigger>
      </TabsList>
      <TabsContent value='folder' className='mt-6'>
        <Folders />
      </TabsContent>
      <TabsContent value='file' className='mt-6'>
        Change your password here.
      </TabsContent>
    </Tabs>
  )
}
