'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  href?: string
  onClick?: () => void
  intensity?: number
  download?: string
}

export function MagneticButton({ 
  children, 
  className = '', 
  href, 
  onClick, 
  intensity = 30,
  download
}: MagneticButtonProps) {
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    
    button.style.transform = `translate(${x / intensity}px, ${y / intensity}px)`
  }
  
  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = 'translate(0px, 0px)'
  }
  
  const Component = href ? 'a' : 'button'
  
  return (
    <motion.div
      className="relative inline-block"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Component
        href={href}
        onClick={onClick}
        download={download}
        className={`
          relative overflow-hidden group cursor-pointer
          px-8 py-4 rounded-xl
          bg-gradient-to-r from-cyan-500/20 to-blue-600/20
          border border-cyan-500/30
          backdrop-blur-sm
          transition-all duration-300 ease-out
          hover:border-cyan-400/50
          hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]
          active:scale-95
          ${className}
        `}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transition: 'transform 0.1s ease-out, box-shadow 0.3s ease-out, border-color 0.3s ease-out'
        }}
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/0 to-blue-600/0 group-hover:from-cyan-600/10 group-hover:to-blue-600/10 transition-all duration-300" />
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-shimmer" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex items-center justify-center space-x-2 text-white font-medium">
          {children}
        </div>
        
        {/* Corner highlights */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400/0 group-hover:border-cyan-400/60 transition-all duration-300" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400/0 group-hover:border-cyan-400/60 transition-all duration-300" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400/0 group-hover:border-cyan-400/60 transition-all duration-300" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400/0 group-hover:border-cyan-400/60 transition-all duration-300" />
      </Component>
    </motion.div>
  )
}
