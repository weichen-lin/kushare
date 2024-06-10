'use client'

import { useRouter, useParams } from 'next/navigation'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import storage from '@/firebase/init'
import { browserClient } from '@/supabase/client'

enum FileUploadStatus {
  Success,
  Failed,
}

export default function useFileUpload() {
  const router = useRouter()
  const params = useParams()

  const filehandle = async (handler: FileSystemFileHandle) => {
    return new Promise<number>(async (resolve, reject) => {
      const client = browserClient()
      const user = await client.auth.getUser()
      if (!user) {
        router.push('/sign-up')
        reject(FileUploadStatus.Failed)
      }

      const user_id = user?.data?.user?.id
      const currentLocateAt = params.folder_id ?? user?.data?.user?.id

      const file = await handler.getFile()

      const imgReader = new FileReader()

      imgReader.readAsDataURL(file)

      imgReader.onloadend = () => {
        const img = new Image()
        img.src = imgReader.result as string

        img.onload = async () => {
          const { data, error } = await client
            .from('file')
            .insert({
              user_id: user_id,
              locate_at: currentLocateAt,
              name: file.name,
              url: '',
            })
            .select('id')
            .single()

          if (error) {
            data &&
              (await client
                .from('file')
                .delete()
                // @ts-ignore
                .eq('id', data?.id))

            reject(FileUploadStatus.Failed)
          }

          const position = `/images/${user?.data?.user?.id}/${data?.id}/${file.name}`

          try {
            const storageRef = ref(storage, position)
            await uploadBytes(storageRef, file)
            const url = await getDownloadURL(storageRef)

            if (url) {
              const { error } = await client.from('file').update({ url }).eq('id', data?.id)
              if (error) {
                reject(FileUploadStatus.Failed)
              }
            }

            resolve(FileUploadStatus.Success)
          } catch (e) {
            reject(FileUploadStatus.Failed)
          }
        }

        img.onerror = () => {
          reject(FileUploadStatus.Failed)
        }
      }
    })
  }

  const handleFileUpload = async (multiple: boolean) => {
    try {
      const FileHandlers = await window?.showOpenFilePicker({
        multiple: multiple,
      })

      const results = await Promise.all(
        FileHandlers.map(e =>
          filehandle(e)
            .then(e => console.log(e))
            .catch(e => {
              console.log(e)
              return FileUploadStatus.Failed
            }),
        ),
      )
    } catch (e) {
      console.log({ e })
      console.log('Cancel select!')
    }
  }

  return { handleFileUpload }
}
