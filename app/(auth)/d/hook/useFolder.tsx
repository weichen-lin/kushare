'use client'

import { create } from 'zustand'
import { IFolder } from '@/supabase/crud/folder'

interface IFolderState {
  folders: IFolder[]
  setFolders: (folders: IFolder[]) => void
}

const useFolder = create<IFolderState>(set => ({
  folders: [] as IFolder[],
  setFolders: (folders: IFolder[]) => set({ folders }),
}))

export default useFolder
