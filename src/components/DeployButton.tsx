"use client"

import { Button } from '@/components/ui/button'
import { Play, RefreshCw } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useState } from 'react'

export function DeployButton({ projectId, gitRepo }: { projectId: string, gitRepo?: string }) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleDeploy = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, gitSource: gitRepo }),
      })
      const data = await res.json()
      
      if (data.success) {
        toast({
          title: 'Deployed!',
          description: `Live: ${data.url}`,
        })
      } else {
        toast({ title: 'Deploy failed', variant: 'destructive' })
      }
    } catch {
      toast({ title: 'Deploy error', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button onClick={handleDeploy} disabled={loading} size="sm">
      {loading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}
      Deploy
    </Button>
  )
}
