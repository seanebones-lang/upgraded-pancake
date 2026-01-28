import { useState, useEffect } from 'react'
import { getUserRepos, getRepoTree } from '@/lib/github'
import { useSession } from 'next-auth/react'

export function useRepos() {
  const [repos, setRepos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const session = useSession()

  useEffect(() => {
    if (session) {
      getUserRepos((session as any).accessToken)
        .then(setRepos)
        .finally(() => setLoading(false))
    }
  }, [session])

  return { repos, loading }
}

export function useRepoTree(owner: string, repo: string, branch = 'main') {
  const [tree, setTree] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const session = useSession()

  useEffect(() => {
    getRepoTree(owner, repo, branch, (session as any)?.accessToken)
      .then(t => setTree(t))
      .finally(() => setLoading(false))
  }, [owner, repo, branch, session])

  return { tree, loading }
}