"use client"

import { signIn, signOut } from '@/auth'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

export default function LoginPage() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div className="flex min-h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>
  }

  if (session) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">NextEleven Code</h1>
          <p className="text-muted-foreground">Logged in as {session.user?.name}</p>
          <Button onClick={() => signOut()}>Sign Out</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="bg-card p-8 rounded-2xl border shadow-xl max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            NextEleven Code
          </h1>
          <p className="text-muted-foreground">AI Agentic Coding Workspace</p>
        </div>
        <Button onClick={() => signIn('github')} className="w-full h-12 text-lg">
          Sign in with GitHub
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          Powered by Grok + MCP Swarms
        </p>
      </div>
    </div>
  )
}