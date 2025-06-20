'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const texts = [
  "AI & Data Science Engineer",
  "GPT Workflow Designer", 
  "ML Solutions Architect",
  "Intelligent Systems Developer",
  "AI Product Designer"
]

export function TypewriterText() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [charIndex, setCharIndex] = useState(0)
  
  useEffect(() => {
    const targetText = texts[currentTextIndex]
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < targetText.length) {
          setCurrentText(targetText.slice(0, charIndex + 1))
          setCharIndex(charIndex + 1)
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (charIndex > 0) {
          setCurrentText(targetText.slice(0, charIndex - 1))
          setCharIndex(charIndex - 1)
        } else {
          setIsDeleting(false)
          setCurrentTextIndex((currentTextIndex + 1) % texts.length)
        }
      }
    }, isDeleting ? 50 : 100)
    
    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, currentTextIndex])
  
  return (
    <div className="relative h-12 sm:h-16 flex items-center justify-center">
      <motion.span 
        className="text-lg sm:text-2xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent text-center"
        key={currentText}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1 }}
        style={{
          minHeight: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {currentText}
        <motion.span
          className="inline-block w-0.5 sm:w-1 h-6 sm:h-8 md:h-10 bg-cyan-400 ml-1"
          animate={{ opacity: [1, 0] }}
          transition={{ 
            duration: 0.8, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
        />
      </motion.span>
    </div>
  )
}

export function GlitchText({ children, className = '' }: { children: string, className?: string }) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 200)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`relative ${className}`}>
      {/* Main name, always visible, no blink */}
      <span
        className="block relative z-10 font-extrabold text-6xl md:text-8xl tracking-tight"
        style={{
          fontFamily: 'Montserrat, Inter, Arial, sans-serif',
          letterSpacing: '-0.04em',
          color: 'rgba(255,255,255,0.85)',
          background: 'linear-gradient(120deg, rgba(255,255,255,0.7) 0%, rgba(34,211,238,0.5) 30%, rgba(59,130,246,0.5) 60%, rgba(168,85,247,0.5) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 4px 32px rgba(0,255,255,0.18)) drop-shadow(0 1px 8px rgba(80,0,255,0.10))',
          WebkitTextStroke: '2px rgba(255,255,255,0.25)',
          textShadow: '0 2px 8px rgba(255,255,255,0.25), 0 8px 32px rgba(31,38,135,0.25)',
          backdropFilter: 'blur(2px)',
          borderRadius: '16px',
          padding: '0.25em 0.75em',
          // Removed border and boxShadow for clean glass text only
          // boxShadow: '0 8px 32px 0 rgba(31,38,135,0.25)',
          // border: '2px solid rgba(255,255,255,0.10)',
          textRendering: 'geometricPrecision',
        }}
      >
        {children}
      </span>
      {/* Shadow glitch effect only */}
      {isGlitching && (
        <>
          <span 
            className="absolute top-0 left-0 text-cyan-400/40 blur-sm z-0 select-none pointer-events-none"
            style={{ transform: 'translate(-3px, 2px)' }}
          >
            {children}
          </span>
          <span 
            className="absolute top-0 left-0 text-purple-500/40 blur-sm z-0 select-none pointer-events-none"
            style={{ transform: 'translate(3px, -2px)' }}
          >
            {children}
          </span>
        </>
      )}
    </div>
  )
}
