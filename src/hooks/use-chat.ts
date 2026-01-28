import { useState, useRef, useCallback } from 'react'

export function useChat() {
  const [messages, setMessages] = useState<Array<{id: string, role: 'user' | 'assistant', content: string}>>([])
  const [isLoading, setIsLoading] = useState(false)
  const [mode, setMode] = useState<'default' | 'refactor' | 'orchestrate' | 'debug' | 'review' | 'agent'>('default')

  const abortControllerRef = useRef<AbortController | null>(null)

  const sendMessage = useCallback(async (message: string) => {
    if (isLoading) return

    const userMessageId = `user-${Date.now()}`
    setMessages(prev => [...prev, { id: userMessageId, role: 'user' as const, content: message }])
    setIsLoading(true)

    abortControllerRef.current = new AbortController()

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message, 
          mode,
          history: messages.map(m => ({ role: m.role, content: m.content }))
        }),
        signal: abortControllerRef.current.signal,
      })

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      let assistantMessageId = `assistant-${Date.now()}`
      setMessages(prev => [...prev, { id: assistantMessageId, role: 'assistant' as const, content: '' }])

      while (true) {
        const { done, value } = await reader!.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') continue
            try {
              const parsed = JSON.parse(data)
              const content = parsed.content || ''
              setMessages(prev => 
                prev.map(msg => 
                  msg.id === assistantMessageId 
                    ? { ...msg, content: msg.content + content }
                    : msg
                )
              )
            } catch {}
          }
        }
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error(error)
      }
    } finally {
      setIsLoading(false)
      abortControllerRef.current = null
    }
  }, [messages, mode, isLoading])

  const stop = useCallback(() => {
    abortControllerRef.current?.abort()
  }, [])

  const clear = useCallback(() => {
    setMessages([])
  }, [])

  return {
    messages,
    mode,
    setMode,
    isLoading,
    sendMessage,
    stop,
    clear,
  }
}