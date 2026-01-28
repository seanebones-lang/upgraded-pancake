import { NextRequest, NextResponse } from 'next/server'

// Full Cursor Shell tool proxy
export async function POST(req: NextRequest) {
  try {
    const { command, working_directory = '.', block_until_ms = 30000, description = 'Execute shell command' } = await req.json()

    // Use Cursor Shell tool parameters exactly
    const shellResult = await fetch('/_tools/shell', {  // Cursor endpoint simulation
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CURSOR_TOKEN || ''}` 
      },
      body: JSON.stringify({ 
        command, 
        working_directory, 
        block_until_ms, 
        description 
      }),
    })

    const data = await shellResult.json()
    
    return NextResponse.json({ 
      success: data.exit_code === 0,
      output: data.output,
      exitCode: data.exit_code,
      pid: data.pid,
      elapsed_ms: data.elapsed_ms
    })
  } catch (error) {
    return NextResponse.json({ 
      error: 'Shell execution failed',
      details: error.message 
    }, { status: 500 })
  }
}
