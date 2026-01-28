import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.GROK_API_KEY!,
  baseURL: 'https://api.x.ai/v1',
})

export async function callGrok(
  messages: Array<{role: 'user' | 'assistant' | 'system', content: string}>,
  mode?: string,
  tools?: any[]
) {
  const response = await openai.chat.completions.create({
    model: 'grok-beta',
    messages,
    stream: true,
    temperature: 0.7,
    tools,
  })

  return response
}

export type ChatMode = 'default' | 'refactor' | 'orchestrate' | 'debug' | 'review' | 'agent'