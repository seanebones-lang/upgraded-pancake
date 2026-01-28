"use client"

import { useCallback, useEffect, useRef, useState } from 'react'
import { Command } from 'cmdk'
import { Button } from '@/components/ui/button'
import { useEditorStore } from '@/stores/editor'
import { signOut } from '@/auth'
import { useChat } from '@/hooks/use-chat'

const commands = [
  { id: 'chat-refactor', label: 'Switch to Refactor mode', action: () => {} },
  { id: 'chat-debug', label: 'Switch to Debug mode', action: () => {} },
  { id: 'commit', label: 'Git: Commit changes', action: () => {} },
  { id: 'push', label: 'Git: Push to main', action: () => {} },
  { id: 'deploy', label: 'Deploy to Vercel', action: () => {} },
  { id: 'terminal', label: 'Toggle Terminal', action: () => {} },
  { id: 'signout', label: 'Sign out', action: () => signOut() },
]

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const editorStore = useEditorStore()
  const { setMode } = useChat()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const selectItem = useCallback((id: string) => {
    const cmd = commands.find(c => c.id === id)
    cmd?.action()
    setOpen(false)
  }, [])

  return (
    <Command.Dialog open={open} onOpenChange={setOpen} label="Global Command Menu">
      <Command.Input ref={inputRef} placeholder="Search commands..." />
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>
        <Command.Group heading="Agents">
          <Command.Item onSelect={() => setMode('refactor')}>Refactor Agent</Command.Item>
          <Command.Item onSelect={() => setMode('debug')}>Debug Agent</Command.Item>
          <Command.Item onSelect={() => setMode('orchestrate')}>Orchestrator</Command.Item>
        </Command.Group>
        <Command.Group heading="Git">
          <Command.Item onSelect={() => selectItem('commit')}>Commit</Command.Item>
          <Command.Item onSelect={() => selectItem('push')}>Push</Command.Item>
        </Command.Group>
        <Command.Group heading="Deploy">
          <Command.Item onSelect={() => selectItem('deploy')}>Vercel Deploy</Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  )
}
