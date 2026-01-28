"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useRepos } from '@/hooks/use-github'

interface Repo {
  id: number
  name: string
  full_name: string
}

export function RepoSelector({ 
  value, 
  onChange, 
  className 
}: { 
  value: string 
  onChange: (value: string) => void 
  className?: string 
}) {
  const { repos, loading } = useRepos()

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Select repository" />
      </SelectTrigger>
      <SelectContent>
        {loading ? (
          <SelectItem value="">Loading...</SelectItem>
        ) : (
          repos.slice(0, 20).map((repo: Repo) => (
            <SelectItem key={repo.id} value={repo.full_name}>
              {repo.name}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  )
}