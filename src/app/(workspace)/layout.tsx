"use client"

import { ChatPanel } from '@/components/ChatPanel'
import { WorkspaceHeader } from '@/components/WorkspaceHeader'
import { useState } from 'react'

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [showTerminal, setShowTerminal] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      {/* Left Panel - Chat */}
      <div className="w-[40%] min-w-[400px] max-w-[600px] border-r border-border flex flex-col resize-x overflow-hidden">
        <ChatPanel />
      </div>

      {/* Right Panel - Workspace */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        <WorkspaceHeader onToggleTerminal={() => setShowTerminal(!showTerminal)} />
        <div className="flex flex-1 min-h-0">
          <div className="w-64 border-r border-border p-2 overflow-auto bg-muted/50 shrink-0">
            File tree
          </div>
          <div className={`flex-1 min-h-0 transition-all duration-200 ${showTerminal ? 'grid grid-rows-[1fr_1fr]' : 'grid grid-rows-1'}`}>
            {children}
            {showTerminal && (
              <div className="border-t border-border relative">
                <div className="src/components/Terminal" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
