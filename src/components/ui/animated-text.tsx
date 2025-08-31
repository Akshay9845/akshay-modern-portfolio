'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export function TypewriterText() {
  const [text, setText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  
  const words = [
    'Generative AI Engineer',
    'LLM Specialist',
    'Prompt Engineer',
    'AI Researcher',
    'Full Stack Developer'
  ]

  useEffect(() => {
    const currentWord = words[currentIndex]
    
    if (!isDeleting) {
      if (text.length < currentWord.length) {
        const timeout = setTimeout(() => {
          setText(currentWord.slice(0, text.length + 1))
        }, 100)
        return () => clearTimeout(timeout)
      } else {
        const timeout = setTimeout(() => {
          setIsDeleting(true)
        }, 2000)
        return () => clearTimeout(timeout)
      }
    } else {
      if (text.length > 0) {
        const timeout = setTimeout(() => {
          setText(text.slice(0, text.length - 1))
        }, 50)
        return () => clearTimeout(timeout)
      } else {
        setIsDeleting(false)
        setCurrentIndex((prev) => (prev + 1) % words.length)
      }
    }
  }, [text, currentIndex, isDeleting, words])

  return (
    <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-mono text-orange-400 mb-4 sm:mb-6">
      <span className="text-gray-300">I'm a </span>
      <span className="text-orange-400 font-bold">
        {text}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="ml-1"
        >
          |
        </motion.span>
      </span>
    </div>
  )
}

export function GlitchText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* Glitch layers */}
      <div className="absolute inset-0 text-red-400 animate-cyber-glitch opacity-0 group-hover:opacity-100">
        {children}
      </div>
      <div className="absolute inset-0 text-blue-400 animate-cyber-glitch opacity-0 group-hover:opacity-100" style={{ animationDelay: '0.1s' }}>
        {children}
      </div>
      <div className="relative text-white">
        {children}
      </div>
    </div>
  )
}

export function HolographicText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* Holographic layers */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
        {children}
      </div>
      <div className="relative text-white animate-hologram">
        {children}
      </div>
    </div>
  )
}

export function NeonText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 text-cyan-400 animate-neon-pulse blur-sm">
        {children}
      </div>
      <div className="relative text-white">
        {children}
      </div>
    </div>
  )
}

export function MatrixText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 text-green-400 animate-matrix opacity-50">
        {children}
      </div>
      <div className="relative text-white">
        {children}
      </div>
    </div>
  )
}
