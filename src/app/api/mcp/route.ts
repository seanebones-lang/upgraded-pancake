// Proxy endpoint for MCP tools
import { NextRequest, NextResponse } from 'next/server'
import { CallMcpTool } from '../../../tools' // Cursor tool proxy

export async function POST(req: NextRequest) {
  try {
    const { server, toolName, arguments: args }: {
      server: string
      toolName: string
      arguments: any
    } = await req.json()
  
    // First read schema (per rules) - TODO implement
    const schemaPath = `/mcps/\${server}/tools/\${toolName}.json`
  
    // Call MCP
    const result = await CallMcpTool({ server, toolName, arguments: args })
  
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: 'MCP call failed' }, { status: 500 })
  }
}