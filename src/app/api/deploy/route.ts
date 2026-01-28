import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { projectId, gitSource } = await req.json()

    const response = await fetch('https://api.vercel.com/v13/deployments', {
      method: 'POST',
      headers: {
        Authorization: `Bearer \${process.env.VERCEL_TOKEN!}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: `nexteleven-\${Date.now()}`,
        projectId,
        target: 'production',
        ...(gitSource && { gitSource }),
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      throw new Error(`Vercel API error: \${response.status} \${err}`)
    }

    const deployment = await response.json()

    // Poll for completion
    let status = deployment.deploymentState || 'QUEUED'
    while (status !== 'READY' && status !== 'ERROR') {
      await new Promise(r => setTimeout(r, 2000))
      const updateRes = await fetch(`https://api.vercel.com/v13/deployments/\${deployment.uid}`, {
        headers: {
          Authorization: `Bearer \${process.env.VERCEL_TOKEN!}`,
        },
      })
      const update = await updateRes.json()
      status = update.deploymentState
    }

    return NextResponse.json({ 
      success: status === 'READY',
      url: deployment.inspectorUrl || deployment.url,
      deployment 
    })
  } catch (error: any) {
    console.error('Deploy error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}