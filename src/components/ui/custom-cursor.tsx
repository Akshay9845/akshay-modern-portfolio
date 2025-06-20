'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const trail = trailRef.current

    if (!cursor || !trail) return

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px'
      cursor.style.top = e.clientY + 'px'
      
      setTimeout(() => {
        trail.style.left = e.clientX + 'px'
        trail.style.top = e.clientY + 'px'
      }, 100)
    }

    const handleMouseDown = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(0.8)'
      trail.style.transform = 'translate(-50%, -50%) scale(1.2)'
    }

    const handleMouseUp = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)'
      trail.style.transform = 'translate(-50%, -50%) scale(1)'
    }

    document.addEventListener('mousemove', moveCursor)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <>
      {/* Trail */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 w-8 h-8 bg-cyan-400/20 rounded-full pointer-events-none z-[9999] transition-all duration-300 ease-out mix-blend-difference"
        style={{
          transform: 'translate(-50%, -50%)',
          filter: 'blur(2px)',
        }}
      />
      
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 bg-cyan-400 rounded-full pointer-events-none z-[9999] transition-transform duration-150 ease-out mix-blend-difference"
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  )
}
