'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

interface AnimatedCounterProps {
  value: number
  duration?: number
  className?: string
}

export function AnimatedCounter({ value, duration = 2, className = "" }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const startValue = displayValue
    const endValue = value
    const startTime = Date.now()

    const animate = () => {
      const currentTime = Date.now()
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)
      
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentValue = startValue + (endValue - startValue) * easeOut
      
      setDisplayValue(Math.round(currentValue))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    animate()
  }, [value, duration])

  return (
    <motion.span
      className={`text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent ${className}`}
      style={{ display: "inline-block" }}
    >
      {displayValue}
    </motion.span>
  )
}

export function QuantumParticle({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
      animate={{
        scale: [0, 1, 0],
        opacity: [0, 1, 0],
        y: [0, -50, 0],
        x: [0, Math.random() * 100 - 50, 0],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  )
}

export function EnergyWave({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="absolute inset-0 rounded-full border border-cyan-400/30"
      animate={{
        scale: [0.8, 1.5, 0.8],
        opacity: [0.3, 0.1, 0.3],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  )
}

export function HolographicRing({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="absolute inset-0 rounded-full border-2 border-cyan-400/50"
      animate={{
        rotate: [0, 360],
        scale: [1, 1.2, 1],
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  )
}

export function QuantumField({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {/* Quantum Energy Field */}
      <div className="absolute inset-0 bg-gradient-radial from-cyan-500/10 via-transparent to-transparent animate-energy" />
      
      {/* Particle Effects */}
      {Array.from({ length: 5 }, (_, i) => (
        <QuantumParticle key={i} delay={i * 0.5} />
      ))}
      
      {/* Energy Waves */}
      {Array.from({ length: 3 }, (_, i) => (
        <EnergyWave key={i} delay={i * 1} />
      ))}
      
      {/* Holographic Rings */}
      {Array.from({ length: 2 }, (_, i) => (
        <HolographicRing key={i} delay={i * 2} />
      ))}
      
      {/* Main Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export function FloatingElement({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      className="relative"
      animate={{
        y: [0, -10, 0],
        rotate: [0, 5, 0],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}

export function PulseGlow({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      className="relative"
      animate={{
        scale: [1, 1.05, 1],
        boxShadow: [
          "0 0 20px rgba(34, 211, 238, 0.3)",
          "0 0 40px rgba(34, 211, 238, 0.6)",
          "0 0 20px rgba(34, 211, 238, 0.3)",
        ],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}
