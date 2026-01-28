"use client"

import MonacoEditor from '@/components/Editor'
import { FileTree } from '@/components/FileTree'
import { useEditorStore } from '@/stores/editor'
import { GitToolbar } from '@/components/GitToolbar'
import Terminal from '@/components/Terminal'
import { useState } from 'react'
import { WorkspaceHeader } from '@/components/WorkspaceHeader'

export default function WorkspacePage() {
  const currentRepo = useEditorStore(s => s.currentRepo)
  const [showTerminal, setShowTerminal] = useState(false)

  return (
    <>
      <WorkspaceHeader onToggleTerminal={() => setShowTerminal(!showTerminal)} />
      <div className="flex flex-1 min-h-0">
        <div className="w-64 border-r border-border p-2 overflow-auto bg-muted/50 shrink-0">
          {currentRepo ? (
            <FileTree ownerRepo={currentRepo} />
          ) : (
            <div className="p-4 text-muted-foreground">Select a repository</div>
          )}
        </div>
        <div className="flex-1 flex flex-col min-h-0">
          <GitToolbar />
          <div className={`flex-1 relative transition-all ${showTerminal ? 'grid grid-rows-[1fr_1fr]' : ''}`}>
            <MonacoEditor />
            {showTerminal && (
              <div className="border-t border-border row-span-1">
                <Terminal />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
