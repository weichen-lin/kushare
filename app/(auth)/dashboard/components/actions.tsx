'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { FolderPlus, FileArrowUp } from '@phosphor-icons/react'

export default function Actions() {
  return (
    <div className='w-full flex gap-x-4 items-center'>
      <Dialog>
        <DialogTrigger>
          <div className='flex gap-x-2 border-[1px] border-input px-4 py-[6px] rounded-md'>
            <FolderPlus className='w-5 h-5' />
            <div className='hidden md:block'>New Folder</div>
          </div>
        </DialogTrigger>
        <DialogContent className='w-[380px] flex flex-col gap-y-4'>
          <DialogHeader>
            <DialogTitle>Create Folder</DialogTitle>
          </DialogHeader>
          <Input placeholder='Folder Name' />
          <DialogFooter className='gap-x-4'>
            <Button variant='outline'>Cancel</Button>
            <Button
              className='bg-slate-700'
              onClick={() => {
                fetch('/api/disk/folder', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    locate_at: '869a34ca-26da-4b78-8ac6-2c51e831ab3f',
                    name: 'new folderssadasdsassssss',
                  }),
                })
              }}
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Button variant='outline' className='flex gap-x-2'>
        <FileArrowUp className='w-5 h-5' />
        <div className='hidden md:block'>Upload</div>
      </Button>
    </div>
  )
}
