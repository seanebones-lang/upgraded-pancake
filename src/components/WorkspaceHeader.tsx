"use client"

import { RepoSelector } from '@/components/RepoSelector'
import { useEditorStore } from '@/stores/editor'
import { Button } from '@/components/ui/button'
import { Play, GitCommit, Upload, Terminal as TerminalIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

export function WorkspaceHeader({ onToggleTerminal }: { onToggleTerminal: () => void }) {
  const setCurrentRepo = useEditorStore(s => s.setCurrentRepo)
  const session = useSession()
  const [showTerminal, setShowTerminal] = useState(false)

  const handleDeploy = () => {
    // Vercel deploy logic
    console.log('Deploy!')
  }

  const handleCommitPush = async () => {
    // Full commit + push
    console.log('Commit & push!')
  }

  const toggleTerminal = () => {
    setShowTerminal(!showTerminal)
    onToggleTerminal()
  }

  return (
    <div className="h-12 border-b border-border p-3 flex items-center gap-2 bg-muted/50">
      <RepoSelector 
        value={useEditorStore.getState().currentRepo} 
        onChange={setCurrentRepo}
        className="w-80"
      />
      <div className="flex items-center gap-1 ml-auto">
        <Button variant="ghost" size="sm" onClick={handleCommitPush} title="Commit & Push">
          <GitCommit size={16} />
        </Button>
        <Button variant="ghost" size="sm" onClick={handleDeploy} title="Deploy">
          <Play size={16} />
        </Button>
        <Button variant="ghost" size="sm" onClick={toggleTerminal} title="Terminal">
          <TerminalIcon size={16} />
        </Button>
      </div>
    </div>
  )
}
