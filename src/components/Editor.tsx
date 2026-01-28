"use client"

import Editor from '@monaco-editor/react'
import { useEditorStore } from '@/stores/editor'
import { useEffect } from 'react'
import { getFileContent, createOrUpdateFile } from '@/lib/github'
import { useSession } from '@/auth'

export default function MonacoEditor() {
  const { currentRepo, currentFile, fileContent, setFileContent } = useEditorStore()
  const session = useSession()

  useEffect(() => {
    if (currentRepo && currentFile && session) {
      const [owner, repo] = currentRepo.split('/')
      getFileContent(owner, repo, currentFile, 'main', session.accessToken as string)
        .then(async (data: any) => {
          const content = Buffer.from(data.content!, 'base64').toString()
          setFileContent(content)
        })
        .catch(console.error)
    }
  }, [currentRepo, currentFile, session, setFileContent])

  const handleEditorChange = (value?: string) => {
    if (value !== undefined) {
      setFileContent(value)
    }
  }

  const handleSave = async () => {
    if (currentRepo && currentFile && session && fileContent) {
      const [owner, repo] = currentRepo.split('/')
      try {
        await createOrUpdateFile(
          owner, 
          repo, 
          currentFile, 
          fileContent, 
          `Update ${currentFile}`,
          'main',
          undefined,
          session.accessToken as string
        )
        console.log('Saved!')
      } catch (error) {
        console.error('Save failed', error)
      }
    }
  }

  return (
    <div className="h-full w-full">
      <Editor
        height="100%"
        width="100%"
        language="typescript"
        value={fileContent}
        theme="vs-dark"
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: 'on',
        }}
        onMount={(editor, monaco) => {
          editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, handleSave)
        }}
      />
    </div>
  )
}