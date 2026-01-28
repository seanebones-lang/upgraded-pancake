"use client"

import Link from "next/link"
import { auth } from "@/auth"

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-background">
      {/* Left Panel - Chat */}
      <div className="w-[40%] min-w-[400px] max-w-[600px] border-r border-border flex flex-col resize-x overflow-hidden">
        <div className="p-4 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">NextEleven Code</h1>
            <Link href="/api/auth/signout" className="text-sm text-muted-foreground hover:text-foreground">
              Sign out
            </Link>
          </div>
        </div>
        <div className="flex-1 p-4 overflow-auto">
          Chat panel - use useChat hook here
        </div>
        <div className="p-4 border-t border-border flex-shrink-0">
          Message input
        </div>
      </div>

      {/* Right Panel - Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="h-12 border-b border-border p-3 flex items-center gap-2 bg-muted/50">
          Repo selector | File ops
        </div>
        <div className="flex flex-1 min-h-0">
          <div className="w-64 border-r border-border p-2 overflow-auto bg-muted/50 shrink-0">
            File tree
          </div>
          <div className="flex-1 min-h-0 grid grid-rows-[1fr_auto] bg-[#1e1e1e]">
            <div className="border-b border-border/50 p-2 text-sm text-muted-foreground">
              Current file path
            </div>
            Editor area
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}