export async function callMcpTool(server: string, toolName: string, args: any) {
  // Proxy to Cursor CallMcpTool
  const response = await fetch('/api/mcp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ server, toolName, arguments: args }),
  })
  return response.json()
}

// MCP Tools registry (from schemas)
export const MCP_REGISTRY = {
  'cursor-ide-browser': {
    browser_navigate: { description: 'Navigate to URL', params: { url: 'string' } },
    browser_snapshot: { description: 'Get page structure', params: {} },
    browser_click: { description: 'Click element', params: { selector: 'string' } },
    // ... more from schema
  },
  'user-enhanced-agent-mcp': {
    orchestrate_task: { description: 'Coordinate complex tasks', params: { task: 'string' } },
    invoke_specialized_agent: { description: 'Call specialist agent', params: { agent: 'string', task: 'string' } },
  },
  // Add others
} as Record<string, Record<string, any>>