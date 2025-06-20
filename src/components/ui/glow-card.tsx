'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface GlowCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
}

export function GlowCard({ children, className = '', glowColor = 'cyan' }: GlowCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const glowColorMap = {
    cyan: 'rgba(34, 211, 238, 0.2)',
    blue: 'rgba(59, 130, 246, 0.2)',
    purple: 'rgba(147, 51, 234, 0.2)',
    green: 'rgba(34, 197, 94, 0.2)',
    pink: 'rgba(236, 72, 153, 0.2)',
  }

  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl border border-gray-700/50 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glow effect */}
      {isHovered && (
        <motion.div
          className="absolute pointer-events-none rounded-full opacity-70 blur-xl"
          style={{
            left: mousePosition.x - 100,
            top: mousePosition.y - 100,
            width: 200,
            height: 200,
            background: `radial-gradient(circle, ${glowColorMap[glowColor as keyof typeof glowColorMap]} 0%, transparent 70%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      {/* Border glow */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
