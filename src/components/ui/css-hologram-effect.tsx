'use client'

import { motion } from 'framer-motion'

export function CSSHologramEffect() {
  return (
    <div className="relative w-64 h-64 mx-auto">
      {/* Main hologram container */}
      <div className="relative w-full h-full overflow-hidden rounded-lg bg-gradient-to-b from-cyan-400/20 to-blue-600/20 backdrop-blur-sm border border-cyan-400/30">
        {/* Animated scan lines */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
              style={{ top: `${i * 5}%` }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scaleX: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            animate={{
              x: [0, Math.random() * 200 - 100, 0],
              y: [0, Math.random() * 200 - 100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
        
        {/* Central hologram content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-center text-cyan-400"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="text-4xl mb-2">👨‍💻</div>
            <div className="text-xs font-mono">INITIALIZING...</div>
            <div className="mt-2 w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto">
              <motion.div
                className="h-full bg-white"
                animate={{
                  width: ["0%", "100%", "0%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        </div>
        
        {/* Corner decorations */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400/60" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400/60" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-400/60" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400/60" />
        
        {/* Animated border */}
        <motion.div
          className="absolute inset-0 border-2 border-cyan-400/40 rounded-lg"
          animate={{
            borderColor: [
              "rgba(6, 182, 212, 0.4)",
              "rgba(59, 130, 246, 0.6)",
              "rgba(6, 182, 212, 0.4)"
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-cyan-400/10 to-blue-600/10 rounded-lg blur-xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  )
}
