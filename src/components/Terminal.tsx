"use client"

import { useEffect, useRef } from 'react'
import { Terminal as XTerm } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { SearchAddon } from '@xterm/addon-search'
import 'xterm/css/xterm.css'

export default function Terminal() {
  const terminalRef = useRef<HTMLDivElement>(null)
  const termRef = useRef<XTerm | null>(null)

  useEffect(() => {
    if (!terminalRef.current) return

    const term = new XTerm({
      cursorBlink: true,
      fontSize: 14,
      theme: { background: '#0d1117' },
    })

    const fitAddon = new FitAddon()
    const searchAddon = new SearchAddon()
    term.loadAddon(fitAddon)
    term.loadAddon(searchAddon)

    term.open(terminalRef.current)
    fitAddon.fit()

    termRef.current = term

    // Terminal input -> API
    term.onData(async (data) => {
      if (data === '\r') {
        term.write('\r\n')
const commandLine = term.buffer.active.getLine(term.buffer.active.cursorY)
const command = commandLine?.translateToString(true)?.trim()
        
        if (command) {
          try {
            const res = await fetch('/api/shell', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ command }),
            })
            const data = await res.json()
            term.write(`\r\n${data.output || 'Executed'}\r\n$ `)
          } catch {
            term.write('\r\nError executing command\r\n$ ')
          }
        } else {
          term.write('\r\n$ ')
        }
      } else {
        term.write(data)
      }
    })

    term.write('NextEleven Terminal v1.0\r\n$ ')

    const resize = () => fitAddon.fit()
    window.addEventListener('resize', resize)

    return () => {
      term.dispose()
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <div ref={terminalRef} className="h-full w-full font-mono" />
}