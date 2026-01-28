"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useChat } from '@/hooks/use-chat'
import { CommandPalette } from '@/components/CommandPalette'

export default function SwarmPage() {
  const [task, setTask] = useState('')
  const { messages, sendMessage, mode, setMode } = useChat()

  const launchSwarm = () => {
    sendMessage(`orchestrate_task: ${task}`)
    setMode('agent')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted to-background p-8">
      <CommandPalette />
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-black bg-gradient-to-r from-primary via-purple to-destructive bg-clip-text text-transparent mb-4">
            Agent Swarm Control
          </h1>
          <p className="text-xl text-muted-foreground">Launch autonomous agent swarms</p>
        </div>
        
        <div className="bg-background/80 backdrop-blur-xl rounded-3xl p-8 border shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Input 
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="e.g. refactor UI + deploy + test"
              className="text-xl py-6"
            />
            <div className="flex gap-2">
              <Select value={mode} onValueChange={setMode as any}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="orchestrate">Orchestrator</SelectItem>
                  <SelectItem value="agent">Full Swarm</SelectItem>
                  <SelectItem value="security">Security Scan</SelectItem>
                  <SelectItem value="performance">Perf Optimize</SelectItem>
                </SelectContent>
              </Select>
              <Button size="lg" onClick={launchSwarm} className="flex-1">
                🚀 Launch Swarm
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            {messages.map(msg => (
              <div key={msg.id} className={`p-4 rounded-2xl ${msg.role === 'user' ? 'bg-primary text-primary-foreground ml-auto max-w-lg' : 'bg-muted'}`}>
                {msg.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
