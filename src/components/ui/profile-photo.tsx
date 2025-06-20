'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface ProfilePhotoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function ProfilePhoto({ 
  size = 'lg', 
  className = '' 
}: ProfilePhotoProps) {
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
    xl: 'w-64 h-64'
  }

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Outer glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 via-blue-500/30 to-purple-600/30 rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Rotating ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-cyan-400/50"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Profile photo container */}
      <motion.div
        className="relative w-full h-full rounded-full overflow-hidden border-4 border-cyan-400/30 bg-slate-800"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        {/* Your actual photo */}
        <Image
          src="/portfolio%20pic.JPG" // Updated to new profile picture
          alt="Akshay Kumar S - AI & Data Science Engineer"
          fill
          className="object-cover object-center"
          priority
          sizes="(max-width: 768px) 200px, 300px"
        />
        
        {/* Tech overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-blue-600/10" />
        
        {/* Scan line effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent h-2"
          animate={{
            y: [0, 200, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-cyan-400/20 via-transparent to-transparent"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
      
      {/* Corner decorations */}
      <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400/60" />
      <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400/60" />
      <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-400/60" />
      <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400/60" />
      
      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          animate={{
            x: [
              Math.cos((i * 60 * Math.PI) / 180) * 100,
              Math.cos((i * 60 * Math.PI) / 180) * 120,
              Math.cos((i * 60 * Math.PI) / 180) * 100,
            ],
            y: [
              Math.sin((i * 60 * Math.PI) / 180) * 100,
              Math.sin((i * 60 * Math.PI) / 180) * 120,
              Math.sin((i * 60 * Math.PI) / 180) * 100,
            ],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  )
}
