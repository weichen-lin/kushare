import { create } from 'zustand'

interface ISelectState {
  folders: string[]
  setFolders: (folders: string[]) => void
  files: string[]
  setFiles: (files: string[]) => void
}

const selectState = create<ISelectState>(set => ({
  folders: [],
  setFolders: folders => set({ folders }),
  files: [],
  setFiles: files => set({ files }),
}))

const useSelect = () => {
  const { folders, setFolders, files, setFiles } = selectState()

  const clear = () => {
    setFolders([])
    setFiles([])
  }

  return { folders, setFolders, files, setFiles, clear }
}

export default useSelect
