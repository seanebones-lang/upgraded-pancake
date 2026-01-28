import OpenAI from 'openai'
import { MCP_REGISTRY, callMcpTool } from './mcp'

const openai = new OpenAI({
  apiKey: process.env.GROK_API_KEY!,
  baseURL: 'https://api.x.ai/v1',
})

export type ChatMode = 'default' | 'refactor' | 'orchestrate' | 'debug' | 'review' | 'agent'

export async function callGrok(
  messages: Array<{role: 'user' | 'assistant' | 'system', content: string}>,
  mode?: ChatMode
) {
  const tools = mode === 'agent' ? getMcpTools() : undefined

  const response = await openai.chat.completions.create({
    model: 'grok-beta',
    messages,
    stream: true,
    temperature: 0.7,
    tools,
    tool_choice: tools ? 'auto' : undefined,
  })

  return response
}

function getMcpTools() {
  return Object.entries(MCP_REGISTRY).flatMap(([server, tools]) => 
    Object.entries(tools).map(([name, schema]) => ({
      type: 'function' as const,
      function: { 
        name: `${server}_${name}`, 
        description: schema.description, 
        parameters: schema.params 
      }
    }))
  )
}

export async function executeTool(tool_call: any) {
  const [server, toolName] = tool_call.function.name.split('_')
  const result = await callMcpTool(server, toolName, tool_call.function.arguments)
  return result
}
