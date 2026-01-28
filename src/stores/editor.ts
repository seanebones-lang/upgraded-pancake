import { create } from 'zustand'

interface EditorState {
  currentRepo: string
  currentFile: string | null
  fileContent: string
  setCurrentRepo: (repo: string) => void
  setCurrentFile: (file: string) => void
  setFileContent: (content: string) => void
}

export const useEditorStore = create<EditorState>((set) => ({
  currentRepo: '',
  currentFile: null,
  fileContent: '',
  setCurrentRepo: (repo) => set({ currentRepo: repo }),
  setCurrentFile: (file) => set({ currentFile: file }),
  setFileContent: (content) => set({ fileContent: content }),
}))