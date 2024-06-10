'use client'

import { create } from 'zustand'
import { IFile } from '@/supabase/crud/file'

interface IFileState {
  files: IFile[]
  setFiles: (folders: IFile[]) => void
}

const useFiles = create<IFileState>(set => ({
  files: [],
  setFiles: (files: IFile[]) => set({ files }),
}))

export default useFiles
