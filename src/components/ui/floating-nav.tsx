'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FaHome, FaUser, FaCode, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa'

export function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()
  
  const opacity = useTransform(scrollY, [0, 100], [0, 1])
  const scale = useTransform(scrollY, [0, 100], [0.8, 1])
  const progressWidth = useTransform(scrollY, [0, 1000], ['0%', '100%'])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '#hero', label: 'Home', icon: <FaHome /> },
    { href: '#about', label: 'About', icon: <FaUser /> },
    { href: '#skills', label: 'Skills', icon: <FaCode /> },
    { href: '#projects', label: 'Projects', icon: <FaCode /> },
    { href: '#contact', label: 'Contact', icon: <FaEnvelope /> },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className="fixed top-8 left-1/2 transform -translate-x-1/2 z-40 hidden md:block"
        style={{ opacity, scale }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="glass-morphism rounded-full px-6 py-3 shadow-cyber">
          <ul className="flex space-x-8">
            {navItems.map((item, index) => (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={() => scrollToSection(item.href)}
                  className="flex items-center space-x-2 text-gray-300 hover:text-orange-400 transition-colors duration-300 group"
                >
                  <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </span>
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <motion.nav
        className="fixed top-4 right-4 z-40 md:hidden"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 glass-morphism rounded-full flex items-center justify-center shadow-cyber"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? <FaTimes className="text-orange-400" /> : <FaBars className="text-orange-400" />}
          </motion.div>
        </motion.button>

        {/* Mobile Menu */}
        <motion.div
          className="absolute top-16 right-0"
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{
            opacity: isOpen ? 1 : 0,
            scale: isOpen ? 1 : 0.8,
            y: isOpen ? 0 : -20,
          }}
          transition={{ duration: 0.3 }}
          style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
        >
          <div className="glass-morphism rounded-2xl p-4 shadow-holographic min-w-[200px]">
            <ul className="space-y-3">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="flex items-center space-x-3 w-full p-3 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                  >
                    <span className="text-lg text-orange-400 group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </span>
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                      {item.label}
                    </span>
                  </button>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.nav>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50"
        style={{ opacity }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-orange-500 to-orange-600"
          style={{ width: progressWidth }}
        />
      </motion.div>

      {/* Quantum Particles around nav */}
      {isScrolled && (
        <div className="fixed inset-0 pointer-events-none z-30">
          {Array.from({ length: 5 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full"
              style={{
                left: `${50 + (i - 2) * 10}%`,
                top: '2rem',
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}
    </>
  )
}
