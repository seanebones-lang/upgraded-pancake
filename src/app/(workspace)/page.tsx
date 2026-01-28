"use client"

import dynamic from 'next/dynamic'
import { RepoSelector } from '@/components/RepoSelector'
import { FileTree } from '@/components/FileTree'
import { useEditorStore } from '@/stores/editor'

const Editor = dynamic(() => import('@/components/Editor'), { ssr: false })

export default function WorkspacePage() {
  const currentRepo = useEditorStore(s => s.currentRepo)

  return (
    <div className="flex flex-col h-full">
      <div className="h-12 border-b border-border p-3 flex items-center gap-4 bg-background">
        <RepoSelector 
          value={currentRepo} 
          onChange={(repo) => useEditorStore.setState({ currentRepo: repo })}
          className="w-80"
        />
        <div className="text-sm text-muted-foreground">Workspace</div>
      </div>
      
      <div className="flex h-[calc(100%-3rem)]">
        <div className="w-64 border-r border-border shrink-0">
          {currentRepo ? (
            <FileTree ownerRepo={currentRepo} />
          ) : (
            <div className="p-4 text-muted-foreground">Select a repository</div>
          )}
        </div>
        <div className="flex-1 grid grid-rows-[1fr_auto] bg-editor">
          <div className="border-b border-border">
            Current file path
          </div>
          <Editor />
        </div>
      </div>
    </div>
  )
}