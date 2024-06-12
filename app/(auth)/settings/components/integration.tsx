import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import clsx from 'clsx'
import { useState, useEffect } from 'react'
import { IOauthUser } from '@/supabase/crud/integration'
import Image from 'next/image'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import MultipleSelector, { Option } from '@/components/ui/multiple-select'
import { IFolder } from '@/supabase/crud/folder'

const platforms: { [key in IOauthUser['platform']]: JSX.Element } = {
  line: <Image src='/line.png' alt='line icon' width={36} height={36} />,
}

const Intergration = (props: IOauthUser) => {
  const { name, avatar_url, platform, store_at } = props
  const [isUpdate, setIsUpdate] = useState(false)
  const [open, setOpen] = useState(false)
  const Icon = platforms[platform]

  const close = () => {
    setOpen(false)
  }

  const toogleUpdate = () => {
    setIsUpdate(prev => !prev)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        if (isUpdate) return
        setOpen(!open)
      }}
    >
      <DialogTrigger>
        <div className='border-[1px] border-slate-100 flex gap-x-8 items-center p-4 hover:bg-slate-100 cursor-pointer'>
          {Icon}
          <div className='flex gap-x-2 items-center'>
            {avatar_url && <img src={avatar_url} alt={name} className='w-9 h-9 rounded-full' />}
            <span className='text-sm'>{name}</span>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className='w-[380px] flex flex-col gap-y-4'>
        <DialogHeader>
          <DialogTitle>Setting</DialogTitle>
        </DialogHeader>
        {open && <Content {...props} close={close} isUpdate={isUpdate} toogleUpdate={toogleUpdate} />}
      </DialogContent>
    </Dialog>
  )
}

const Content = (props: IOauthUser & { close: () => void; isUpdate: boolean; toogleUpdate: () => void }) => {
  const { oauth_id, store_at, close, isUpdate, toogleUpdate } = props
  const [isLoading, setIsLoading] = useState(true)
  const [options, setOptions] = useState<Option[]>([])

  useEffect(() => {
    const fetchFolderInfo = async () => {
      try {
        const res = await fetch(`/api/oauth/store?id=${oauth_id}`)
        const data = await res.json()

        if (data.error) {
          throw new Error(data.error)
        }

        setOptions([{ label: data.data.name, value: data.data.id }])
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFolderInfo()
  }, [])

  return (
    <>
      <div className='my-4 flex space-y-2 flex-col text-slate-500'>
        <div className=''>Photo store at</div>
        {isLoading ? (
          <div className='w-full h-10 bg-slate-100 animate-pulse rounded-md'></div>
        ) : (
          <MultipleSelector
            placeholder='choose a folder to store'
            onSearch={async value => {
              const res = await fetch(`/api/disk/folder/search?name=${value}`)
              const data = await res.json()

              if (data.error) {
                return []
              }

              const options = data.data.map((f: IFolder) => ({ label: f.name, value: f.id }))
              return options
            }}
            loadingIndicator={<p className='py-2 text-center leading-10 text-muted-foreground text-sm'>loading...</p>}
            maxSelected={1}
            defaultOptions={[]}
            value={options}
            onChange={v => {
              setOptions(v)
            }}
          />
        )}
      </div>
      <DialogFooter className='gap-x-4'>
        <Button
          className='bg-slate-700'
          disabled={!options.length}
          loading={isUpdate}
          onClick={async () => {
            if (!options.length) return
            toogleUpdate()
            const newLocateAt = options[0]?.value ?? store_at
            const res = await fetch(`/api/oauth/store`, {
              method: 'PATCH',
              body: JSON.stringify({ id: oauth_id, store_at: newLocateAt }),
            })

            const j = await res.json()
            close()
            toogleUpdate()
          }}
        >
          Save
        </Button>
      </DialogFooter>
    </>
  )
}

export default Intergration
