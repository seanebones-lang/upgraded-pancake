"use client"

import { useRepoTree } from '@/hooks/use-github'
import { File, Folder } from 'lucide-react'
import Link from 'next/link'

interface TreeNode {
  path: string
  type: 'tree' | 'blob'
  name: string
}

export function FileTree({ ownerRepo }: { ownerRepo: string }) {
  const [owner, repo] = ownerRepo.split('/')
  const { tree, loading } = useRepoTree(owner, repo)

  if (loading) return <div className="p-4 text-muted-foreground">Loading...</div>

  const renderTree = (nodes: TreeNode[], prefix = '') => (
    <div className="space-y-1">
      {nodes
        .filter(node => node.path.split('/').length === (prefix ? prefix.split('/').length + 1 : 1))
        .sort((a, b) => {
          if (a.type === 'tree' && b.type !== 'tree') return -1
          if (b.type === 'tree' && a.type !== 'tree') return 1
          return a.name.localeCompare(b.name)
        })
        .map(node => (
          <div key={node.path} className="ml-2">
            <div className={`flex items-center gap-2 p-1 rounded cursor-pointer hover:bg-accent text-sm ${
              node.type === 'blob' ? 'text-foreground' : 'text-muted-foreground'
            }`}>
              {node.type === 'tree' ? <Folder size={14} /> : <File size={14} />}
              <span>{node.name}</span>
            </div>
            {node.type === 'tree' && renderTree(tree as TreeNode[], `${prefix}/${node.name}`)}
          </div>
        ))}
    </div>
  )

  return (
    <div className="h-full overflow-auto p-2 flex flex-col">
      {renderTree(tree as TreeNode[])}
    </div>
  )
}