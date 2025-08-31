'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface ProfilePhotoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function ProfilePhoto({ 
  size = 'xl', 
  className = '' 
}: ProfilePhotoProps) {
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
    xl: 'w-56 h-56'
  }

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Profile photo container - Simplified for orange theme */}
      <motion.div
        className="relative w-full h-full rounded-full overflow-hidden"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Your actual photo */}
        <Image
          src="/portfolio%20pic.JPG"
          alt="Akshay Kumar S - AI & Data Science Engineer"
          fill
          className="object-cover object-top"
          priority
          sizes="(max-width: 768px) 224px, 448px"
        />
        
        {/* Subtle orange overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-orange-600/5" />
      </motion.div>
    </div>
  )
}
