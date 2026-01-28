import { NextRequest, NextResponse } from 'next/server'
import { Vercel } from '@vercel/client' // npm i @vercel/client

const vercel = new Vercel({ 
  bearerToken: process.env.VERCEL_TOKEN!,
  teamId: process.env.VERCEL_TEAM_ID 
})

export async function POST(req: NextRequest) {
  try {
    const { projectId, gitSource } = await req.json()

    const deployment = await vercel.deployments.create({
      name: `nexteleven-${Date.now()}`,
      projectId,
      target: 'production',
      ...(gitSource && { gitSource }),
    })

    // Poll for completion
    let status = deployment.state
    while (status !== 'READY' && status !== 'ERROR') {
      await new Promise(r => setTimeout(r, 2000))
      const update = await vercel.deployments.get(deployment.uid)
      status = update.state
    }

    return NextResponse.json({ 
      success: status === 'READY',
      url: deployment.url,
      deployment 
    })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
