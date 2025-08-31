'use client'

import { motion } from 'framer-motion'

interface MorphingShapeProps {
  className?: string
}

export function MorphingShape({ className = "" }: MorphingShapeProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        borderRadius: [
          "60% 40% 30% 70%/60% 30% 70% 40%",
          "30% 60% 70% 40%/50% 60% 30% 60%",
          "60% 40% 30% 70%/60% 30% 70% 40%"
        ],
        rotate: [0, 180, 360],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Quantum Energy Field */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 via-blue-600/30 to-purple-600/30 rounded-full animate-energy" />
      
      {/* Holographic Border */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/50 via-blue-500/50 to-purple-600/50 animate-gradient blur-sm" />
      
      {/* Particle Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
            style={{
              left: `${20 + (i * 10) % 60}%`,
              top: `${30 + (i * 15) % 40}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 3,
              delay: i * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 animate-portal blur-xl" />
      
      {/* Main Shape */}
      <div className="relative w-full h-full bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-purple-600/20 rounded-full border border-cyan-400/30" />
    </motion.div>
  )
}
