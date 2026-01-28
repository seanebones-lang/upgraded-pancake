import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="text-center max-w-2xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-2xl">
            NextEleven Code
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
            AI Agentic Coding Workspace - MXD Edition
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link 
            href="/login"
            className="px-12 py-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 transform"
          >
            🚀 Launch Workspace
          </Link>
          <Link 
            href="https://github.com/seanebones-lang/upgraded-pancake"
            className="px-8 py-6 border-2 border-slate-700 hover:border-slate-500 text-slate-300 font-semibold rounded-xl hover:text-white transition-all duration-300 hover:bg-slate-800"
          >
            💾 GitHub
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-400 max-w-4xl mx-auto">
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-purple-400 mb-1">🤖</div>
            <div>Grok MCP Swarms</div>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-pink-400 mb-1">⚡</div>
            <div>Terminal + Deploy</div>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-blue-400 mb-1">⌨️</div>
            <div>CmdK + Hotkeys</div>
          </div>
        </div>
      </div>
    </div>
  )
}
