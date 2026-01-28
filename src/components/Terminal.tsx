"use client"

import { useEffect, useRef } from 'react'
import { Terminal as XTerm } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import 'xterm/css/xterm.css'

export default function Terminal() {
  const terminalRef = useRef<HTMLDivElement>(null)
  const termRef = useRef<XTerm | null>(null)
  const fitAddonRef = useRef<FitAddon | null>(null)

  useEffect(() => {
    if (!terminalRef.current) return

    const term = new XTerm({
      cursorBlink: true,
      theme: {
        background: '#1e1e1e',
        foreground: '#d4d4d4',
      },
    })

    const fitAddon = new FitAddon()
    term.loadAddon(fitAddon)

    term.open(terminalRef.current)
    fitAddon.fit()

    termRef.current = term
    fitAddonRef.current = fitAddon

    // Mock shell
    term.write('NextEleven Code Terminal$ \r\n')
    term.onData(data => {
      term.write(data)
      // Here integrate with Shell tool via API
      if (data === '\r') {
        term.write('\r\nCommand executed\r\nNextEleven Code Terminal$ ')
      }
    })

    return () => {
      term.dispose()
    }
  }, [])

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      fitAddonRef.current?.fit()
    })
    const currentRef = terminalRef.current
    if (currentRef) {
      resizeObserver.observe(currentRef)
    }
    return () => resizeObserver.disconnect()
  }, [])

  return <div ref={terminalRef} className="h-full w-full" />
}