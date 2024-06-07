'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { FolderPlus, FileArrowUp } from '@phosphor-icons/react'
import { useState } from 'react'

export default function Actions() {
  const [open, setOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const createFolder = async () => {
    setIsLoaded(true)
    setError('')

    const response = await fetch('/api/disk/folder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        locate_at: null,
        name,
      }),
    })

    if (response.ok) {
      setOpen(false)
      setName('')
    } else {
      const json = await response.json()
      setError(json?.message ?? 'An error occurred')
    }

    setIsLoaded(false)
  }

  const toggle = () => {
    if (isLoaded) return
    setOpen(!open)
    setError('')
    setName('')
  }

  return (
    <div className='w-full flex gap-x-4 items-center'>
      <AddFolder />
      <Button variant='outline' className='flex gap-x-2'>
        <FileArrowUp className='w-5 h-5' />
        <div className='hidden md:block'>Upload</div>
      </Button>
    </div>
  )
}

const AddFolder = () => {
  const [open, setOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const createFolder = async () => {
    setIsLoaded(true)
    setError('')

    const response = await fetch('/api/disk/folder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        locate_at: null,
        name,
      }),
    })

    if (response.ok) {
      setOpen(false)
      setName('')
    } else {
      const json = await response.json()
      setError(json?.message ?? 'An error occurred')
    }

    setIsLoaded(false)
  }

  const toggle = () => {
    if (isLoaded) return
    setOpen(!open)
    setError('')
    setName('')
  }

  return (
    <Dialog
      open={open}
      onOpenChange={e => {
        if (isLoaded) return
        setOpen(e)
      }}
    >
      <DialogTrigger>
        <div className='flex gap-x-2 border-[1px] border-input px-4 py-[6px] rounded-md'>
          <FolderPlus className='w-5 h-5' />
          <div className='hidden md:block'>New Folder</div>
        </div>
      </DialogTrigger>
      {open && (
        <DialogContent className='w-[380px] flex flex-col gap-y-4'>
          <DialogHeader>
            <DialogTitle>Create Folder</DialogTitle>
          </DialogHeader>
          <Input placeholder='Folder Name' value={name} onChange={e => setName(e.target.value)} />
          {error && (
            <div className='my-1 px-2'>
              <div className='text-red-500'>{error}</div>
            </div>
          )}
          <DialogFooter className='gap-x-4'>
            <Button variant='outline' disabled={isLoaded} onClick={toggle}>
              Cancel
            </Button>
            <Button className='bg-slate-700' disabled={!name || isLoaded} onClick={createFolder} loading={isLoaded}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  )
}
