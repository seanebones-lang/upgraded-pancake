import { NextRequest, NextResponse } from 'next/server'
import { callGrok, type ChatMode, executeTool } from '@/lib/grok'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { message, mode = 'default' as ChatMode, history = [], conversationId } = body

    const messages = [
      ...history,
      { role: 'user' as const, content: message }
    ]

    const systemPrompts: Record<ChatMode, string> = {
      default: 'You are NextEleven Code, an AI coding assistant.',
      refactor: 'You are a code refactoring expert.',
      orchestrate: 'You are the Orchestrator. Use MCP tools for complex tasks.',
      debug: 'Debugging expert.',
      review: 'Code reviewer.',
      agent: 'Autonomous agent. Use MCP tools (CallMcpTool) for all operations.',
    }

    messages.unshift({ role: 'system' as const, content: systemPrompts[mode as keyof typeof systemPrompts] })

    const stream = await callGrok(messages, mode)

    const streamResponse = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder()
        
        for await (const chunk of stream) {
          // Handle tool_calls
          const toolCall = chunk.choices[0]?.delta?.tool_calls?.[0]
          if (toolCall) {
            const result = await executeTool(toolCall)
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: `Tool result: ${JSON.stringify(result)}` })}\n\n`))
            continue
          }

          const content = chunk.choices[0]?.delta?.content || ''
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`))
        }
        
        controller.enqueue(encoder.encode('data: [DONE]\n\n'))
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
    return NextResponse.json({ error: 'Chat error' }, { status: 500 })
  }
}
