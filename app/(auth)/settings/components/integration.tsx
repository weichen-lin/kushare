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
  const { oauth_id, name, avatar_url, platform, store_at } = props
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdate, setIsUpdate] = useState(false)
  const [options, setOptions] = useState<Option[]>([])
  const Icon = platforms[platform]

  useEffect(() => {
    const fetchFolderInfo = async () => {
      try {
        const res = await fetch(`/api/oauth/store?id=${store_at}`)
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
    <Dialog>
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
        <div className='my-4 flex space-y-2 flex-col text-slate-500'>
          <div className=''>Photo store at</div>
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
        </div>
        <DialogFooter className='gap-x-4'>
          <Button
            className='bg-slate-700'
            disabled={!options.length}
            loading={isUpdate}
            onClick={async () => {
              if (!options.length) return
              setIsUpdate(true)
              const newLocateAt = options[0]?.value ?? store_at
              const res = await fetch(`/api/oauth/store?id=${store_at}`, {
                method: 'PATCH',
                body: JSON.stringify({ id: oauth_id, store_at: newLocateAt }),
              })

              const j = await res.json()
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Intergration
