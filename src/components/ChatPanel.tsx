"use client"

import { useChat } from '@/hooks/use-chat'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Send, StopCircle, Trash2 } from 'lucide-react'

export function ChatPanel() {
  const {
    messages,
    mode,
    setMode,
    isLoading,
    sendMessage,
    stop,
    clear,
  } = useChat()

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b border-border flex items-center gap-2">
        <Select value={mode} onValueChange={(v: string) => setMode(v as any)}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="refactor">Refactor</SelectItem>
            <SelectItem value="orchestrate">Orchestrate</SelectItem>
            <SelectItem value="debug">Debug</SelectItem>
            <SelectItem value="review">Review</SelectItem>
            <SelectItem value="agent">Agent</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="ghost" size="sm" onClick={clear} className="h-8 w-8 p-0">
          <Trash2 size={16} />
        </Button>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                <pre className="whitespace-pre-wrap text-sm">{msg.content}</pre>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted p-3 rounded-2xl animate-pulse">Thinking...</div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="p-3 border-t border-border flex gap-2">
        <Input
          placeholder="Ask agent to code, refactor, debug..."
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
              e.preventDefault()
              const msg = e.currentTarget.value.trim()
              if (msg) {
                sendMessage(msg)
                e.currentTarget.value = ''
              }
            }
          }}
          className="flex-1"
        />
        <Button size="sm" onClick={stop} disabled={!isLoading} variant="destructive" className="h-10 w-10 p-0">
          <StopCircle size={16} />
        </Button>
      </div>
    </div>
  )
}