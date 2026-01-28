import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { command, working_directory = '.', block_until_ms = 30000, description } = await req.json()

    // Proxy to Cursor Shell tool (simulate for now)
    const response = await fetch('http://localhost:3000/shell-proxy', {  // Internal proxy
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ command, working_directory, block_until_ms, description }),
    })

    const data = await response.json()
    
    return NextResponse.json({ 
      success: true, 
      output: data.output || 'Command completed',
      exitCode: data.exit_code || 0 
    })
  } catch (error) {
    return NextResponse.json({ error: 'Shell error', details: error }, { status: 500 })
  }
}

// WebSocket endpoint for streaming
export async function GET(req: NextRequest) {
  // WS upgrade for live terminal
  // For now, return empty
  return new NextResponse(null, { status: 200 })
}
