'use client'

import { motion } from 'framer-motion'

export function GradientOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Large primary orb */}
      <motion.div
        className="absolute w-96 h-96 bg-gradient-to-r from-cyan-400/30 to-blue-600/30 rounded-full blur-3xl"
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -100, 50, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          top: '10%',
          left: '10%',
        }}
      />
      
      {/* Secondary orb */}
      <motion.div
        className="absolute w-64 h-64 bg-gradient-to-r from-purple-500/25 to-pink-500/25 rounded-full blur-2xl"
        animate={{
          x: [0, -80, 120, 0],
          y: [0, 80, -60, 0],
          scale: [0.8, 1.1, 0.9, 0.8],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        style={{
          top: '60%',
          right: '15%',
        }}
      />
      
      {/* Tertiary orb */}
      <motion.div
        className="absolute w-80 h-80 bg-gradient-to-r from-emerald-400/20 to-teal-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, 60, -80, 0],
          y: [0, -60, 40, 0],
          scale: [1.1, 0.9, 1.3, 1.1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }}
        style={{
          bottom: '20%',
          left: '50%',
        }}
      />
      
      {/* Small accent orbs */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-32 h-32 bg-gradient-to-r from-orange-400/15 to-red-500/15 rounded-full blur-xl"
          animate={{
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
            scale: [0.5, 1, 0.7, 0.5],
            opacity: [0.3, 0.6, 0.2, 0.3],
          }}
          transition={{
            duration: 12 + Math.random() * 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5
          }}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  )
}
