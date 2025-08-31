'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface MagneticButtonProps {
  children: ReactNode
  href?: string
  download?: string
  className?: string
  onClick?: () => void
}

export function MagneticButton({ 
  children, 
  href, 
  download, 
  className,
  onClick 
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 150 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const rotateX = useTransform(springY, [-0.5, 0.5], ["15deg", "-15deg"])
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-15deg", "15deg"])

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    x.set(mouseX / 10)
    y.set(mouseY / 10)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const baseClasses = cn(
    "relative inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium transition-all duration-300",
    "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500",
    "text-white shadow-lg hover:shadow-xl transform hover:scale-105",
    "border border-transparent hover:border-cyan-300/50",
    "overflow-hidden group",
    className
  )

  const ButtonContent = (
    <>
      {/* Quantum Energy Field */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Holographic Border */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
      
      {/* Main Content */}
      <div className="relative z-10 flex items-center">
        {children}
      </div>
      
      {/* Particle Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 3 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-300 rounded-full"
            style={{
              left: `${20 + i * 30}%`,
              top: '50%',
            }}
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 1,
              delay: i * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
    </>
  )

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        download={download}
        className={baseClasses}
        style={{
          transformStyle: "preserve-3d",
          rotateX,
          rotateY,
        }}
        onMouseMove={handleMouse}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {ButtonContent}
      </motion.a>
    )
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      className={baseClasses}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {ButtonContent}
    </motion.button>
  )
}
