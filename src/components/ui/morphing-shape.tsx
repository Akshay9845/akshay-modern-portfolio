'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface MorphingShapeProps {
  className?: string
}

export function MorphingShape({ className = '' }: MorphingShapeProps) {
  const [currentShape, setCurrentShape] = useState(0)
  
  const shapes = [
    // Circle
    'M 50 10 A 40 40 0 1 1 49.99 10 Z',
    // Square to rounded square
    'M 20 20 L 80 20 Q 85 20 85 25 L 85 75 Q 85 80 80 80 L 20 80 Q 15 80 15 75 L 15 25 Q 15 20 20 20 Z',
    // Triangle
    'M 50 15 L 80 75 L 20 75 Z',
    // Star
    'M 50 10 L 55 35 L 80 35 L 60 55 L 70 80 L 50 65 L 30 80 L 40 55 L 20 35 L 45 35 Z',
    // Hexagon
    'M 50 10 L 75 30 L 75 70 L 50 90 L 25 70 L 25 30 Z',
    // Diamond
    'M 50 15 L 75 50 L 50 85 L 25 50 Z'
  ]
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentShape(prev => (prev + 1) % shapes.length)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [shapes.length])
  
  return (
    <div className={`relative ${className}`}>
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="morphGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <motion.path
          d={shapes[currentShape]}
          fill="url(#morphGradient)"
          stroke="url(#morphGradient)"
          strokeWidth="2"
          filter="url(#glow)"
          animate={{
            d: shapes[currentShape],
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            d: {
              duration: 1.5,
              ease: "easeInOut"
            },
            scale: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            },
            rotate: {
              duration: 12,
              repeat: Infinity,
              ease: "linear"
            }
          }}
          style={{ originX: '50%', originY: '50%' }}
        />
      </svg>
      
      {/* Floating particles around the shape */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          animate={{
            x: [0, Math.cos(i * Math.PI / 4) * 60, 0],
            y: [0, Math.sin(i * Math.PI / 4) * 60, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
          style={{
            left: '50%',
            top: '50%',
          }}
        />
      ))}
    </div>
  )
}
