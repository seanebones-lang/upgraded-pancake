"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Button as GitButton } from '@/components/ui/button'
import { useState } from 'react'
import { useEditorStore } from '@/stores/editor'
import { useSession } from '@/auth'
import { getOctokit } from '@/lib/github'
import { toast } from '@/hooks/use-toast'

export function GitToolbar() {
  const [commitMsg, setCommitMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const currentRepo = useEditorStore(s => s.currentRepo)
  const currentFile = useEditorStore(s => s.currentFile)
  const fileContent = useEditorStore(s => s.fileContent)
  const session = useSession()

  const handleCommitPush = async () => {
    if (!currentRepo || !currentFile || !session?.accessToken || !commitMsg) return

    setLoading(true)
    const [owner, repo] = currentRepo.split('/')
    const kit = getOctokit(session.accessToken)

    try {
      // Commit file
      await kit.rest.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: currentFile,
        message: commitMsg,
        content: btoa(fileContent),
        branch: 'main',
      })

      // Push (if needed)
      await kit.rest.repos.mergeUpstreamBranch({
        owner,
        repo,
        branch: 'main',
      })

      toast({
        title: 'Committed & Pushed',
        description: `${currentFile} → main`,
      })
      setCommitMsg('')
    } catch (error) {
      toast({
        title: 'Commit failed',
        variant: 'destructive',
        description: (error as Error).message,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="border-b border-border/50 p-2 bg-muted/50 flex items-center gap-2">
      <Input
        value={commitMsg}
        onChange={(e) => setCommitMsg(e.target.value)}
        placeholder="Commit message"
        className="flex-1"
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleCommitPush()
        }}
      />
      <Button size="sm" onClick={handleCommitPush} disabled={loading || !commitMsg}>
        Commit & Push
      </Button>
    </div>
  )
}
