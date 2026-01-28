import { AGENTS, type AgentType, type Agent } from './types'

export function analyzeTask(message: string): { primaryAgent: AgentType, swarmAgents: AgentType[] } {
  const lower = message.toLowerCase()

  if (lower.includes('security') || lower.includes('vulnerab') || lower.includes('owasp')) {
    return { primaryAgent: 'security', swarmAgents: ['orchestrator'] }
  }
  if (lower.includes('perf') || lower.includes('performance') || lower.includes('slow')) {
    return { primaryAgent: 'performance', swarmAgents: ['orchestrator'] }
  }
  if (lower.includes('refactor') || lower.includes('cleanup') || lower.includes('improve')) {
    return { primaryAgent: 'refactor', swarmAgents: ['orchestrator'] }
  }
  if (lower.includes('debug') || lower.includes('error') || lower.includes('bug')) {
    return { primaryAgent: 'debug', swarmAgents: ['orchestrator'] }
  }

  // Default swarm for complex tasks
  return { primaryAgent: 'orchestrator', swarmAgents: ['security', 'performance'] }
}

export function routeToAgents(task: string): Agent[] {
  const { primaryAgent, swarmAgents } = analyzeTask(task)
  return swarmAgents.map(type => AGENTS.find(a => a.type === type)!).filter(Boolean) as Agent[]
}