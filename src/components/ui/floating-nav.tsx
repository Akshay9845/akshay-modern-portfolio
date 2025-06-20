'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const navItems = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

export function FloatingNav() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.substring(1))
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.nav
      className="fixed top-4 left-4 md:top-6 md:left-6 z-30 safe-area-top safe-area-left"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-black/30 backdrop-blur-md border border-white/20 rounded-full px-2 py-1 md:px-6 md:py-3 shadow-lg">
        <div className="flex space-x-1 md:space-x-6">
          {navItems.map((item) => (
            <motion.button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className={`relative px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm transition-colors duration-300 touch-manipulation ${
                activeSection === item.href.substring(1)
                  ? 'text-cyan-400'
                  : 'text-gray-300 hover:text-cyan-400'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                WebkitTapHighlightColor: 'transparent',
                touchAction: 'manipulation'
              }}
            >
              <span className="hidden sm:inline">{item.name}</span>
              <span className="sm:hidden">{item.name.charAt(0)}</span>
              {activeSection === item.href.substring(1) && (
                <motion.div
                  className="absolute inset-0 bg-cyan-400/20 rounded-full"
                  layoutId="activeSection"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.nav>
  )
}
