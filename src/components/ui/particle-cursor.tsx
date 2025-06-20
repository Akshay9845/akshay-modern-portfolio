'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  opacity: number
}

export function ParticleCursor() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let particleId = 0
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      
      // Create new particle
      const newParticle: Particle = {
        id: particleId++,
        x: e.clientX,
        y: e.clientY,
        opacity: 1
      }
      
      setParticles(prev => [...prev, newParticle])
      
      // Remove particle after animation
      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== newParticle.id))
      }, 1000)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Main cursor */}
      <motion.div
        className="fixed w-6 h-6 border-2 border-cyan-400 rounded-full mix-blend-difference"
        style={{
          left: mousePos.x - 12,
          top: mousePos.y - 12,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut"
        }}
      />
      
      {/* Particle trail */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="fixed w-2 h-2 bg-cyan-400 rounded-full"
          initial={{
            x: particle.x - 4,
            y: particle.y - 4,
            opacity: 1,
            scale: 1,
          }}
          animate={{
            x: particle.x - 4 + (Math.random() - 0.5) * 20,
            y: particle.y - 4 + (Math.random() - 0.5) * 20,
            opacity: 0,
            scale: 0,
          }}
          transition={{
            duration: 1,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  )
}
