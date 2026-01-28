import { useEffect } from 'react'
import { useEditorStore } from '@/stores/editor'
import { getOctokit } from '@/lib/github'
import { useSession } from 'next-auth/react'

export function useGlobalKeyboard() {
  const setFileContent = useEditorStore(s => s.setFileContent)
  const currentFile = useEditorStore(s => s.currentFile)
  const currentRepo = useEditorStore(s => s.currentRepo)
  const session = useSession()

  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      // Ctrl+S - Save file
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        if (currentRepo && currentFile && (session as any)?.accessToken) {
          const [owner, repo] = currentRepo.split('/')
          const content = useEditorStore.getState().fileContent
          try {
            await getOctokit((session as any).accessToken).rest.repos.createOrUpdateFileContents({
              owner, repo, path: currentFile, message: `Save ${currentFile}`,
              content: btoa(content), branch: 'main'
            })
            console.log('Saved!')
          } catch (err) {
            console.error('Save failed', err)
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentRepo, currentFile, session])
}
