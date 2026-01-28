export type AgentType = 
  | 'orchestrator' 
  | 'security' 
  | 'performance' 
  | 'refactor' 
  | 'debug' 
  | 'review'
  | 'bug-hunter'
  | 'docs'
  | 'test'
  | 'deploy'

export interface Agent {
  name: string
  type: AgentType
  description: string
  systemPrompt: string
  tools?: string[]
}

export const AGENTS: Agent[] = [
  {
    name: 'Orchestrator',
    type: 'orchestrator',
    description: 'Routes tasks to specialist agents and coordinates swarms',
    systemPrompt: 'You are the Orchestrator. Analyze the task and delegate to the best specialist agents. Coordinate parallel execution when needed. Return structured plans.',
  },
  {
    name: 'Security Agent',
    type: 'security',
    description: 'Vulnerability scanning and security best practices',
    systemPrompt: 'You are a security expert. Scan code for OWASP Top 10, secrets, injection risks. Suggest fixes.',
  },
  {
    name: 'Performance Agent',
    type: 'performance',
    description: 'Performance optimization and profiling',
    systemPrompt: 'You are a performance expert. Identify bottlenecks, suggest optimizations, memoization, lazy loading.',
  },
  {
    name: 'Refactor Agent',
    type: 'refactor',
    description: 'Code refactoring and cleanup',
    systemPrompt: 'You are a refactoring expert. Improve code structure, readability, performance without changing behavior.',
  },
  // Add more agents...
]