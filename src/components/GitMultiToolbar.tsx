"use client"

import { Button } from '@/components/ui/button'
import { Diff, Plus, Upload } from 'lucide-react'
import { useState } from 'react'
import { toast } from '@/hooks/use-toast'
import { Octokit } from '@octokit/rest'
import { useSession } from '@/auth'

export function GitMultiToolbar({ repo }: { repo: string }) {
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const session = useSession()

  const getStatus = async () => {
    const kit = new Octokit({ auth: session?.accessToken })
    const { data } = await kit.rest.repos.getContent({
      owner: repo.split('/')[0],
      repo: repo.split('/')[1],
      path: '.',
    })
    setStatus(JSON.stringify(data, null, 2))
  }

  const stageCommitPush = async () => {
    // Multi-file logic via GitHub API
    setLoading(true)
    toast({ title: 'Multi commit WIP' })
    setLoading(false)
  }

  return (
    <div className="p-2 border-b bg-muted/50 flex gap-2">
      <Button variant="ghost" onClick={getStatus} size="sm">
        <Diff className="h-4 w-4 mr-1" />
        Status
      </Button>
      <Button onClick={stageCommitPush} disabled={loading} size="sm">
        <Plus className="h-4 w-4 mr-1" />
        Stage All
      </Button>
      <Button size="sm">
        <Upload className="h-4 w-4 mr-1" />
        Push
      </Button>
      <pre className="text-xs bg-background p-2 rounded flex-1 max-h-20 overflow-auto">{status}</pre>
    </div>
  )
}
