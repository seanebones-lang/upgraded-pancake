# NextEleven Code

AI-powered agentic coding workspace. 18hr/day pro edition.

## Features
- **Two-panel**: Chat agents (L) | Monaco/editor/tree/terminal (R)
- **GitHub Native**: OAuth, repo browser, file edit/commit/push (Ctrl+S)
- **Grok Swarms**: Modes (refactor/orchestrate), MCP tools (browser/shell/agents)
- **Terminal**: Live Shell proxy (npm/docker/git)
- **Deploy**: Vercel one-click
- **Hotkeys**: Cmd+K palette, Ctrl+S save, Ctrl+` terminal

## Setup
```bash
cp .env.local.example .env.local
# Add GROK_API_KEY, GITHUB_ID/SECRET, NEXTAUTH_SECRET, VERCEL_TOKEN
npm i
npm run dev
```

## Usage
1. Login GitHub
2. Select repo → edit/commit (GitToolbar)
3. Chat: \"orchestrate npm test\" → agents + terminal
4. Deploy → Vercel live

## MCP Agents
- cursor-ide-browser: UI testing (navigate/click/snapshot)
- user-enhanced: orchestrate_task, invoke_specialized_agent (security/perf)

## Hotkeys
- Cmd+K: Command palette
- Ctrl+S: Save file
- Ctrl+`: Toggle terminal
- Enter: Send chat

Built with Next.js, shadcn, Monaco, xterm, Grok API.

MXD 2026