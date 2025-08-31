'use client'

import { motion } from 'framer-motion'

export function GradientOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Quantum Energy Field */}
      <div className="absolute inset-0 bg-gradient-radial from-cyan-500/10 via-transparent to-transparent animate-energy" />
      <div className="absolute inset-0 bg-gradient-conic from-blue-500/5 via-purple-500/5 to-cyan-500/5 animate-portal" />
      
      {/* Floating Orbs - Optimized for 120Hz */}
      {Array.from({ length: 4 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-xl"
          style={{
            width: `${100 + i * 50}px`,
            height: `${100 + i * 50}px`,
            left: `${10 + i * 15}%`,
            top: `${20 + i * 10}%`,
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -25, 0],
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6 + i * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: `radial-gradient(circle, ${
                i % 3 === 0 ? 'rgba(34, 211, 238, 0.3)' :
                i % 3 === 1 ? 'rgba(59, 130, 246, 0.3)' :
                'rgba(147, 51, 234, 0.3)'
              } 0%, transparent 70%)`,
            }}
          />
        </motion.div>
      ))}
      
      {/* Particle Field - Optimized */}
      {Array.from({ length: 10 }, (_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            y: [0, -50],
            x: [0, Math.random() * 50 - 25],
          }}
          transition={{
            duration: 3 + Math.random() * 1,
            delay: Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Holographic Grid - Simplified */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent animate-shimmer" />
      </div>
      
      {/* Quantum Waves - Optimized */}
      {Array.from({ length: 2 }, (_, i) => (
        <motion.div
          key={`wave-${i}`}
          className="absolute inset-0 rounded-full border border-cyan-400/20"
          style={{
            left: `${20 + i * 20}%`,
            top: `${30 + i * 15}%`,
            width: `${200 + i * 100}px`,
            height: `${200 + i * 100}px`,
          }}
          animate={{
            scale: [0.8, 1.1, 0.8],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 4 + i * 1,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  )
}
