import { NextRequest, NextResponse } from 'next/server'
import { callGrok, type ChatMode } from '@/lib/grok'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { message, mode = 'default' as ChatMode, history = [], conversationId } = body

    const messages = [
      ...history,
      { role: 'user' as const, content: message }
    ]

    // Add system prompt based on mode
    const systemPrompts: Record<ChatMode, string> = {
      default: 'You are NextEleven Code, an AI coding assistant.',
      refactor: 'You are a code refactoring expert. Suggest improvements and provide refactored code.',
      orchestrate: 'You are the Orchestrator agent. Route tasks to specialist agents and coordinate swarms.',
      debug: 'You are a debugging expert. Analyze errors and suggest fixes.',
      review: 'You are a code reviewer. Provide constructive feedback and best practices.',
      agent: 'You are an autonomous agent. Use tools and MCP when needed.',
    }

    messages.unshift({ role: 'system' as const, content: systemPrompts[mode as ChatMode] })

    const stream = await callGrok(messages, mode as ChatMode)

    const streamResponse = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder()
        
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || ''
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`))
        }
        
        controller.enqueue(encoder.encode('data: [DONE]\\n\\n'))
        controller.close()
      },
    })

    return new NextResponse(streamResponse, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}