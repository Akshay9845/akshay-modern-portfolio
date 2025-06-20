'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface InteractiveCardProps {
  children: ReactNode
  className?: string
  glowColor?: string
}

export function InteractiveCard({ 
  children, 
  className = '',
  glowColor = 'cyan'
}: InteractiveCardProps) {
  return (
    <motion.div
      className={`
        relative group cursor-pointer
        ${className}
      `}
      initial={{ scale: 1 }}
      whileHover={{ 
        scale: 1.02,
        rotateX: 5,
        rotateY: 5,
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
      style={{ perspective: '1000px' }}
    >
      {/* Main card content */}
      <div className="
        relative z-10
        bg-black/20 backdrop-blur-md
        border border-white/10
        rounded-2xl p-6
        overflow-hidden
        transition-all duration-300
        group-hover:border-white/20
        group-hover:bg-black/30
      ">
        {/* Animated background gradient */}
        <div className={`
          absolute inset-0 opacity-0 group-hover:opacity-100
          bg-gradient-to-br from-${glowColor}-500/10 to-purple-500/10
          transition-opacity duration-300
        `} />
        
        {/* Content */}
        <div className="relative z-20">
          {children}
        </div>
        
        {/* Animated border */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className={`
            absolute inset-0 rounded-2xl
            bg-gradient-to-r from-${glowColor}-500/20 to-purple-500/20
            animate-pulse
          `} style={{ padding: '1px' }}>
            <div className="w-full h-full rounded-2xl bg-black/20 backdrop-blur-md" />
          </div>
        </div>
      </div>
      
      {/* Glow effect */}
      <div className={`
        absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
        bg-gradient-to-r from-${glowColor}-500/20 to-purple-500/20
        blur-xl scale-105
        transition-opacity duration-300
        -z-10
      `} />
      
      {/* Sparkle effects */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1 h-1 bg-${glowColor}-400 rounded-full opacity-0 group-hover:opacity-100`}
          animate={{
            scale: [0, 1, 0],
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeOut"
          }}
          style={{
            top: '50%',
            left: '50%',
          }}
        />
      ))}
    </motion.div>
  )
}

export function SkillCard({ skill, level, icon }: { 
  skill: string
  level?: number
  icon: ReactNode 
}) {
  return (
    <InteractiveCard className="h-full">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="text-4xl text-cyan-400">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-white">{skill}</h3>
        
        {level && (
          <>
            {/* Animated progress bar */}
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-600"
                initial={{ width: 0 }}
                whileInView={{ width: `${level}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                viewport={{ once: true }}
              />
            </div>
            <span className="text-sm text-gray-300">{level}%</span>
          </>
        )}
      </div>
    </InteractiveCard>
  )
}
