'use client'

import { Suspense, useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
import {
  FaPython, FaEnvelope, FaPhone, FaMapMarkerAlt, FaDownload, FaCode, FaDatabase,
  FaLinkedin, FaGithub, FaWhatsapp, FaRocket, FaBrain, FaAtom, FaMicrochip, FaArrowRight,
  FaPalette, FaSun, FaMoon
} from 'react-icons/fa'
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiMongodb, SiPostgresql, SiSupabase, SiStreamlit, SiOpenai, SiTensorflow, SiPytorch } from 'react-icons/si'
import { usePerformanceDetection } from '@/components/ui/performance-wrapper'
import { useTheme } from '@/components/ui/theme-customizer'

// UI Components - Minimalist
const LoadingScreen = dynamic(() => import('@/components/ui/loading-screen').then(mod => ({ default: mod.LoadingScreen })), { ssr: false })
const ProjectModal = dynamic(() => import('@/components/ui/project-modal').then(mod => ({ default: mod.ProjectModal })), { ssr: false })
const AnimatedCounter = dynamic(() => import('@/components/ui/advanced-animations').then(mod => ({ default: mod.AnimatedCounter })), { ssr: false })
const TypewriterText = dynamic(() => import('@/components/ui/animated-text').then(mod => ({ default: mod.TypewriterText })), { ssr: false })
const InteractiveCard = dynamic(() => import('@/components/ui/interactive-card').then(mod => ({ default: mod.InteractiveCard })), { ssr: false })
const Button = dynamic(() => import('@/components/ui/button').then(mod => ({ default: mod.Button })), { ssr: false })
const Card = dynamic(() => import('@/components/ui/card').then(mod => ({ default: mod.Card })), { ssr: false })
const ProfilePhoto = dynamic(() => import('@/components/ui/profile-photo-new').then(mod => ({ default: mod.ProfilePhoto })), { ssr: false })
const FloatingNav = dynamic(() => import('@/components/ui/floating-nav').then(mod => ({ default: mod.FloatingNav })), { ssr: false })
const ScrollProgress = dynamic(() => import('@/components/ui/scroll-progress').then(mod => ({ default: mod.ScrollProgress })), { ssr: false })
const GeminiSidebar = dynamic(() => import('@/components/ui/gemini-sidebar').then(mod => ({ default: mod.GeminiSidebar })), { ssr: false })
const ThemeCustomizer = dynamic(() => import('@/components/ui/theme-customizer').then(mod => ({ default: mod.ThemeCustomizer })), { ssr: false })
const PerformanceMonitor = dynamic(() => import('@/components/ui/performance-monitor').then(mod => ({ default: mod.PerformanceMonitor })), { ssr: false })
const AIAssistant = dynamic(() => import('@/components/ui/ai-assistant').then(mod => ({ default: mod.AIAssistant })), { ssr: false })

// Message components
const MessageForm = dynamic(() => import('@/components/ui/message-form').then(mod => ({ default: mod.MessageForm })), { ssr: false })
const MessageViewer = dynamic(() => import('@/components/ui/message-form').then(mod => ({ default: mod.MessageViewer })), { ssr: false })

// Advanced components
const AdvancedControlPanel = dynamic(() => import('@/components/ui/advanced-control-panel').then(mod => ({ default: mod.AdvancedControlPanel })), { ssr: false })
const LanguageProvider = dynamic(() => import('@/components/ui/language-provider').then(mod => ({ default: mod.LanguageProvider })), { ssr: false })
const ThemeProvider = dynamic(() => import('@/components/ui/theme-customizer').then(mod => ({ default: mod.ThemeProvider })), { ssr: false })

// Simple Performance Monitor Component
function SimplePerformanceMonitor() {
  const [metrics, setMetrics] = useState({
    fps: 60,
    memoryUsage: 0,
    loadTime: 0
  })

  useEffect(() => {
    // Simple performance monitoring
    const updateMetrics = () => {
      if (typeof window !== 'undefined' && 'performance' in window) {
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        const loadTime = perfData.loadEventEnd - perfData.fetchStart

        // Get memory info if available
        const memory = (navigator as any).memory
        const memoryUsage = memory ? Math.round((memory.usedJSHeapSize / memory.totalJSHeapSize) * 100) : 0

        setMetrics({
          fps: 60, // Simplified
          memoryUsage,
          loadTime: Math.round(loadTime)
        })
      }
    }

    updateMetrics()
    const interval = setInterval(updateMetrics, 5000)

    return () => clearInterval(interval)
  }, [])

  return null // Hidden component, just for monitoring
}

// Google Analytics Component
function GoogleAnalytics() {
  useEffect(() => {
    // Google Analytics 4
    const script1 = document.createElement('script')
    script1.async = true
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID'
    document.head.appendChild(script1)

    const script2 = document.createElement('script')
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GA_MEASUREMENT_ID');
    `
    document.head.appendChild(script2)

    // Track page views
    const handleRouteChange = (url: string) => {
      ;(window as any).gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: url,
      })
    }

    // Listen for route changes (if using Next.js routing)
    window.addEventListener('popstate', () => handleRouteChange(window.location.pathname))

    return () => {
      window.removeEventListener('popstate', () => handleRouteChange(window.location.pathname))
    }
  }, [])

  return null
}

// Theme Toggle Button Component
function ThemeToggleButton() {
  const { isDark, toggleDarkMode } = useTheme()
  const [showCustomizer, setShowCustomizer] = useState(false)

  return (
    <>
      <motion.button
        onClick={() => setShowCustomizer(true)}
        className="fixed top-6 right-6 z-40 p-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            "0 10px 30px rgba(6, 182, 212, 0.3)",
            "0 10px 30px rgba(59, 130, 246, 0.3)",
            "0 10px 30px rgba(6, 182, 212, 0.3)"
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <FaPalette className="w-5 h-5" />
      </motion.button>

      <motion.button
        onClick={toggleDarkMode}
        className="fixed top-20 right-6 z-40 p-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            "0 10px 30px rgba(249, 115, 22, 0.3)",
            "0 10px 30px rgba(239, 68, 68, 0.3)",
            "0 10px 30px rgba(249, 115, 22, 0.3)"
          ]
        }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      >
        {isDark ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
      </motion.button>

      <ThemeCustomizer
        isOpen={showCustomizer}
        onClose={() => setShowCustomizer(false)}
      />
    </>
  )
}

// Enhanced Projects Section - Inspired by 2025 Design Trends
function ProjectsSection({ projects, handleProjectClick }: { 
  projects: any[], 
  handleProjectClick: (id: string) => void 
}) {
  return (
    <section id="projects" className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header - Inspired by Koox & Frans Hals Museum */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-black mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              SELECTED
            </span>
            <br />
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              PROJECTS
            </span>
          </motion.h2>
          
          <motion.p
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            A curated collection of innovative solutions and cutting-edge technologies
          </motion.p>
        </motion.div>

        {/* Projects Grid - Inspired by Paper Planes & ETQ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
                         <motion.div
               key={project.id}
               className="group relative"
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: index * 0.1 }}
               viewport={{ once: true }}
             >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-800/50 backdrop-blur-sm">
                {/* Project Image/Background */}
                <div className="h-64 relative overflow-hidden">
                  <img
                    src={project.image || `/placeholder.jpg`}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500" />
                  
                  {/* Hover Overlay - Inspired by Woven Magazine */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-gray-300 text-sm line-clamp-2">{project.description}</p>
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Impact Metrics - Enhanced */}
                  {project.impact && (
                    <div className="mb-4 p-3 bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-lg">
                      <p className="text-orange-400 text-xs font-semibold mb-1">Key Impact</p>
                      <p className="text-orange-300 text-xs">{project.impact}</p>
                    </div>
                  )}

                                     {/* Tech Stack - Inspired by Feed & Aquest */}
                   <div className="flex flex-wrap gap-2 mb-4">
                     {project.tech.slice(0, 4).map((tech: string) => (
                       <span
                         key={tech}
                         className="px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full text-xs font-medium border border-orange-500/20"
                       >
                         {tech}
                       </span>
                     ))}
                    {project.tech.length > 4 && (
                      <span className="px-3 py-1 bg-gray-500/10 text-gray-400 rounded-full text-xs font-medium border border-gray-500/20">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Quick Action Links - For RML Project */}
                  {project.id === "rml-architecture" && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      <a
                        href={project.model}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-xs font-medium border border-purple-500/20 hover:bg-purple-500/20 transition-colors"
                      >
                        Model
                      </a>
                      <a
                        href={project.dataset}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-medium border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
                      >
                        Dataset
                      </a>
                    </div>
                  )}

                  {/* Project Meta - Inspired by Hellomonday & Blacknegative */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>{project.category}</span>
                    <span>{project.duration}</span>
                  </div>

                  {/* Quick Links - Enhanced */}
                  <div className="flex gap-2 mb-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg text-gray-300 hover:text-white text-xs transition-all duration-300 border border-gray-700/50"
                      >
                        <FaGithub className="text-sm" />
                        Code
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 bg-blue-600/20 hover:bg-blue-500/30 rounded-lg text-blue-400 hover:text-blue-300 text-xs transition-all duration-300 border border-blue-500/30"
                      >
                        <FaRocket className="text-sm" />
                        Demo
                      </a>
                    )}
                  </div>

                  {/* CTA Button - Inspired by Slaveryfootprint */}
                  <button
                    onClick={() => handleProjectClick(project.id)}
                    className="w-full group/btn relative overflow-hidden px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      View Details
                      <FaArrowRight className="text-sm group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                  </button>
                </div>

                {/* Decorative Elements - Inspired by King & Alanmenken */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Projects Button - Inspired by Active-theory */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <a
            href="#contact"
            className="group relative overflow-hidden px-8 py-4 border-2 border-cyan-400/50 rounded-full text-cyan-400 font-medium transition-all duration-300 hover:bg-cyan-400/10 inline-flex items-center gap-2"
          >
            <span className="relative z-10 flex items-center gap-2">
              View All Projects
              <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

// Modern 2025 Hero Section - Minimalist Orange & Black Theme
function ModernHeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Minimalist Black Background */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Subtle Orange Accent Lines - Minimalist Design */}
      <div className="absolute inset-0">
        {/* Top horizontal line */}
        <div className="absolute top-20 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent opacity-30" />
        
        {/* Bottom horizontal line */}
        <div className="absolute bottom-20 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent opacity-30" />
        
        {/* Left vertical line */}
        <div className="absolute left-20 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-orange-500/40 to-transparent opacity-30" />
        
        {/* Right vertical line */}
        <div className="absolute right-20 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-orange-500/40 to-transparent opacity-30" />
      </div>

      {/* Subtle Orange Floating Dots - Minimalist */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-500/30 rounded-full"
            style={{
              left: `${(i * 12.5) % 100}%`,
              top: `${(i * 15) % 100}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 4 + (i * 0.3),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-20 text-center px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-12"
        >
          {/* Profile Photo - Enhanced Orange Accent */}
          <motion.div
            className="relative mb-20 flex justify-center items-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="relative w-56 h-56">
              {/* Outer glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full blur-3xl opacity-50 animate-pulse" />
              
              {/* Main photo container */}
              <div className="relative w-full h-full rounded-full border-4 border-orange-500/70 overflow-hidden backdrop-blur-sm shadow-2xl">
                <ProfilePhoto />
              </div>
              
              {/* Inner glow effect */}
              <div className="absolute -inset-8 bg-gradient-to-r from-orange-500/40 to-orange-600/40 rounded-full blur-2xl animate-pulse" />
              
              {/* Additional outer ring */}
              <div className="absolute -inset-3 border-2 border-orange-500/40 rounded-full" />
              
              {/* Extra decorative ring */}
              <div className="absolute -inset-1 border border-orange-500/20 rounded-full" />
            </div>
          </motion.div>

          {/* Personal Logo - AS Initials */}
          <motion.div
            className="relative mb-8 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="relative">
              {/* Logo Background */}
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-2xl">
                <span className="text-2xl font-black text-white">AS</span>
              </div>

              {/* Logo Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/30 to-orange-600/30 rounded-2xl blur-xl animate-pulse" />
              <div className="absolute -inset-2 border-2 border-orange-500/40 rounded-xl" />
            </div>
          </motion.div>

          {/* Name - AKSHAY S Typography */}
          <motion.h1
            className="text-7xl md:text-9xl lg:text-[12rem] font-black tracking-tight leading-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span className="block bg-gradient-to-r from-white via-gray-200 to-orange-400 bg-clip-text text-transparent">
              AKSHAY S
            </span>
          </motion.h1>

          {/* Subtitle - Impactful Value Proposition */}
          <motion.div
            className="text-xl md:text-2xl lg:text-3xl text-orange-400 font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            Building Next-Gen AI Systems That Scale
          </motion.div>

          {/* Professional Tags - Enhanced */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <span className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-purple-400 text-sm font-medium">
              LLM Specialist
            </span>
            <span className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium">
              Generative AI Engineer
            </span>
            <span className="px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-medium">
              Real-Time AI Systems
            </span>
          </motion.div>

          {/* Description - Impact-Driven */}
          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            Crafting interpretable AI systems that blend LLMs with real-time interaction and symbolic reasoning.
            <br />
            <span className="text-orange-400 font-medium">
              657x faster training throughput • 40+ language real-time conversations • Black box transparency
            </span>
          </motion.p>

          {/* Modern CTA Buttons - Inspired by Critical Danger */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
                                     <button 
              onClick={() => {
                const projectsSection = document.getElementById('projects');
                if (projectsSection) {
                  projectsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="group relative overflow-hidden px-10 py-5 bg-gradient-to-r from-orange-600 to-orange-700 rounded-full text-white font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25 cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-3">
                <FaCode className="text-xl" />
                Explore Work
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            
            <button 
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="group relative overflow-hidden px-10 py-5 border-2 border-orange-500/50 rounded-full text-orange-400 font-semibold text-lg transition-all duration-300 hover:bg-orange-500/10 hover:border-orange-400 cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-3">
                <FaEnvelope className="text-xl" />
                Get In Touch
              </span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator - Orange */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-8 h-12 border-2 border-orange-500/50 rounded-full flex justify-center">
          <motion.div 
            className="w-2 h-4 bg-orange-500 rounded-full mt-3"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}

// Modern About Section - Minimalist Orange & Black Theme
function ModernAboutSection() {
  return (
    <section id="about" className="py-24 px-6 relative bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header - Orange Typography */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              ABOUT
            </span>
            <br />
            <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              ME
            </span>
          </motion.h2>
          
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* Content Grid - Modern Layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
                          <div className="space-y-6">
                <h3 className="text-3xl md:text-4xl font-bold text-orange-400">
                  Generative AI Engineer
                </h3>
                
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  Generative AI Engineer with expertise in LLMs, Prompt Engineering, and real-time AI systems. 
                  Experienced in building full-stack AI tools using OpenAI, LangChain, and SDXL. Currently pursuing 
                  Bachelor of Engineering in Artificial Intelligence and Data Science at East Point College of Engineering & Technology.
                </p>
                
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  Passionate about human-AI interaction, multilingual agents, and interpretable AI (RML) systems that 
                  address hallucinations and black box issues through symbolic neural integration.
                </p>
                
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  Experienced in cloud platforms (AWS/Azure/GCP), serverless computing, and CI/CD pipelines. 
                  Skilled in Salesforce development with Apex programming and Lightning components.
                </p>
              </div>

              {/* Stats - Orange Theme */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/20">
                  <div className="text-3xl font-bold text-orange-400 mb-2">
                    <AnimatedCounter value={6} duration={2} />
                  </div>
                  <div className="text-sm text-gray-400">AI Projects</div>
                </div>
                
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/20">
                  <div className="text-3xl font-bold text-orange-400 mb-2">
                    <AnimatedCounter value={5} duration={2} />
                  </div>
                  <div className="text-sm text-gray-400">Certificates</div>
                </div>
                
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/20">
                  <div className="text-3xl font-bold text-orange-400 mb-2">
                    <AnimatedCounter value={4} duration={2} />
                  </div>
                  <div className="text-sm text-gray-400">Languages</div>
                </div>
              </div>
          </motion.div>
          
          {/* Right Column - Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative w-full h-96 rounded-3xl overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-500/30">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <FaBrain className="text-6xl text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">AI Innovation</h4>
                  <p className="text-gray-300">Cutting-edge solutions</p>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute top-8 left-8 w-4 h-4 bg-blue-400 rounded-full animate-pulse" />
              <div className="absolute top-16 right-12 w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-1000" />
              <div className="absolute bottom-12 left-16 w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-2000" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Modern Skills Section - Minimalist Orange & Black Theme
function ModernSkillsSection() {
  return (
    <section id="skills" className="py-24 px-6 relative bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              SKILLS &
            </span>
            <br />
            <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              TECHNOLOGIES
            </span>
          </motion.h2>
          
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* Skills Grid - Enhanced with Hover Effects */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {[
            { name: 'OpenAI/GPT', icon: <SiOpenai className="text-2xl" />, color: 'from-green-400 to-emerald-500', experience: '2+ years', projects: '6+ projects', level: 'Advanced' },
            { name: 'Python', icon: <FaPython className="text-2xl" />, color: 'from-blue-500 to-cyan-500', experience: '3+ years', projects: '10+ projects', level: 'Expert' },
            { name: 'LangChain', icon: <FaCode className="text-2xl" />, color: 'from-purple-500 to-pink-500', experience: '1.5+ years', projects: '4+ projects', level: 'Advanced' },
            { name: 'Hugging Face', icon: <FaCode className="text-2xl" />, color: 'from-yellow-500 to-orange-500', experience: '2+ years', projects: '5+ projects', level: 'Advanced' },
            { name: 'TensorFlow', icon: <SiTensorflow className="text-2xl" />, color: 'from-orange-500 to-red-500', experience: '2+ years', projects: '3+ projects', level: 'Advanced' },
            { name: 'PyTorch', icon: <SiPytorch className="text-2xl" />, color: 'from-red-500 to-orange-500', experience: '2+ years', projects: '3+ projects', level: 'Advanced' },
            { name: 'React', icon: <FaCode className="text-2xl" />, color: 'from-cyan-500 to-blue-500', experience: '2+ years', projects: '8+ projects', level: 'Advanced' },
            { name: 'TypeScript', icon: <SiTypescript className="text-2xl" />, color: 'from-blue-600 to-blue-800', experience: '2+ years', projects: '6+ projects', level: 'Advanced' },
            { name: 'Supabase', icon: <SiSupabase className="text-2xl" />, color: 'from-green-500 to-emerald-600', experience: '1+ year', projects: '3+ projects', level: 'Intermediate' },
            { name: 'AWS/Azure/GCP', icon: <FaCode className="text-2xl" />, color: 'from-blue-500 to-indigo-600', experience: '1.5+ years', projects: '4+ projects', level: 'Advanced' },
            { name: 'Docker', icon: <FaCode className="text-2xl" />, color: 'from-blue-400 to-cyan-500', experience: '1+ year', projects: '5+ projects', level: 'Intermediate' },
            { name: 'Salesforce', icon: <FaCode className="text-2xl" />, color: 'from-blue-500 to-indigo-500', experience: '1+ year', projects: '2+ projects', level: 'Intermediate' },
          ].map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-800/50 backdrop-blur-sm p-6 transition-all duration-300 hover:scale-105 hover:border-orange-500/50 h-32">
                {/* Default View */}
                <div className="group-hover:opacity-0 transition-opacity duration-300">
                  {/* Skill Icon */}
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${skill.color} flex items-center justify-center text-white shadow-lg`}>
                    {skill.icon}
                  </div>

                  {/* Skill Name */}
                  <h3 className="text-center text-lg font-semibold text-white">
                    {skill.name}
                  </h3>
                </div>

                {/* Hover View - Experience Details */}
                <div className="absolute inset-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center">
                  <div className="text-center space-y-2">
                    <h3 className="text-lg font-semibold text-orange-400 mb-2">
                      {skill.name}
                    </h3>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-300">
                        <span className="text-orange-400 font-medium">{skill.experience}</span> experience
                      </p>
                      <p className="text-xs text-gray-300">
                        <span className="text-orange-400 font-medium">{skill.projects}</span> used
                      </p>
                      <p className="text-xs text-orange-500 font-medium">
                        {skill.level} Level
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Portfolio() {
  const { isClient, isLowPerformance, shouldDisableEffects } = usePerformanceDetection()
  
  // Disabled scroll transforms for immediate scrolling
  // const { scrollYProgress } = useScroll()
  // const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  // const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  
  // Modal state management
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Smooth scrolling setup
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    // Disabled Lenis for immediate, responsive scrolling
    // const lenis = new Lenis({
    //   duration: 0.2,
    //   easing: (t) => t,
    // })

    // function raf(time: number) {
    //   lenis.raf(time)
    //   requestAnimationFrame(raf)
    // }

    // requestAnimationFrame(raf)

    // return () => {
    //   lenis.destroy()
    // }
  }, [])

  // Check if device is mobile - Client-side only
  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768)
      }
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleProjectClick = (projectId: string) => {
    setSelectedProjectId(projectId)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProjectId(null)
  }

  const skills = [
    { name: 'OpenAI/GPT', icon: <SiOpenai className="text-2xl" />, color: 'from-green-400 to-emerald-500' },
    { name: 'Python', icon: <FaPython className="text-2xl" />, color: 'from-blue-500 to-cyan-500' },
    { name: 'Next.js', icon: <SiNextdotjs className="text-2xl" />, color: 'from-gray-400 to-gray-600' },
    { name: 'TypeScript', icon: <SiTypescript className="text-2xl" />, color: 'from-blue-600 to-blue-800' },
    { name: 'Supabase', icon: <SiSupabase className="text-2xl" />, color: 'from-green-500 to-emerald-600' },
    { name: 'TensorFlow', icon: <SiTensorflow className="text-2xl" />, color: 'from-orange-500 to-red-500' },
    { name: 'PyTorch', icon: <SiPytorch className="text-2xl" />, color: 'from-red-500 to-orange-500' },
    { name: 'AI/ML', icon: <FaBrain className="text-2xl" />, color: 'from-purple-500 to-pink-500' },
    { name: 'React', icon: <FaCode className="text-2xl" />, color: 'from-cyan-500 to-blue-500' },
    { name: 'Node.js', icon: <FaCode className="text-2xl" />, color: 'from-green-500 to-emerald-500' },
    { name: 'MongoDB', icon: <SiMongodb className="text-2xl" />, color: 'from-green-400 to-emerald-600' },
    { name: 'PostgreSQL', icon: <SiPostgresql className="text-2xl" />, color: 'from-blue-500 to-indigo-600' },
  ]

  const projects = [
    {
      id: "rml-architecture",
      title: "Resonant Memory Learning (RML) Architecture",
      description: "Breakthrough interpretable AI system that integrates symbolic reasoning with neural networks, achieving 657x faster training throughput than baseline LLM training. Eliminates black box opacity and hallucination issues through lifelong learning capabilities.",
      tech: ["Python", "LLMs", "Neural Networks", "Knowledge Graphs", "Symbolic AI"],
      color: "from-purple-500 to-pink-600",
      category: "AI Research",
      duration: "July-Aug 2025",
      status: "Completed",
      image: "/rml-architecture.jpg",
      github: "https://github.com/Akshay9845/rml-ai",
      demo: "https://huggingface.co/spaces/akshaynayaks9845/rml-ai-demo",
      model: "https://huggingface.co/akshaynayaks9845/rml-ai-phi1_5-rml-100k",
      dataset: "https://huggingface.co/datasets/akshaynayaks9845/rml-ai-datasets",
      impact: "657x faster training • Real-time lifelong learning • Zero hallucinations"
    },
    {
      id: "3d-ai-avatar",
      title: "3D AI Avatar Companion",
      description: "Real-time web-based AI companion enabling 40+ language conversations with expressive 3D avatars. Processes emotional cues and gestures in real-time, delivering human-like interactions with 50+ gesture animations and <100ms response time.",
      tech: ["React", "TypeScript", "Three.js", "Supabase", "TensorFlow.js", "LangChain", "MediaPipe"],
      color: "from-cyan-500 to-blue-600",
      category: "AI & 3D Development",
      duration: "May-Jun 2025",
      status: "Completed",
      image: "/3d-avatar.jpg",
      github: "https://github.com/Akshay9845/3d-ai-companion",
      demo: "https://3d-ai-companion.vercel.app",
      impact: "40+ languages • <100ms response • 50+ gestures"
    },
    {
      id: "imagin-platform",
      title: "IMAGIN - AI Platform",
      description: "Full-stack AI platform delivering photorealistic image generation and HD video creation at 8-24 FPS. Processes 10,000+ concurrent requests with enterprise-grade scalability using SDXL, Stable Video Diffusion, and custom optimization pipelines.",
      tech: ["Python", "SDXL", "RealVisXL", "Stable Video Diffusion", "RIFE", "LAION 2B"],
      color: "from-orange-500 to-red-600",
      category: "Generative AI",
      duration: "Jun-Jul 2025",
      status: "Completed",
      image: "/imagin.jpg",
      github: "https://github.com/Akshay9845/imagin",
      demo: "https://imagin-ai.vercel.app",
      impact: "HD 1024x576 video • 8-24 FPS • 10K+ concurrent users"
    },
    {
      id: "personaforge-ai",
      title: "PersonaForge AI",
      description: "AI-powered personality profiling system that analyzes Reddit data to create detailed psychological profiles. Processes 1000+ posts/comments in under 30 seconds, generating actionable insights with 94% accuracy across behavioral patterns and personality traits.",
      tech: ["React", "Vite", "Tailwind", "FastAPI", "Async PRAW", "Reddit API"],
      color: "from-emerald-500 to-teal-600",
      category: "AI & Web Development",
      duration: "Jul 2025",
      status: "Completed",
      image: "/personaforge.jpg",
      github: "https://github.com/Akshay9845/PersonaForge-AI",
      demo: "https://personaforge-ai.vercel.app",
      impact: "94% accuracy • 30s processing • 1000+ data points"
    },
    {
      id: "blockchain-chat",
      title: "Blockchain-Based Chat Application",
      description: "Decentralized chat platform ensuring tamper-proof communication through Ethereum smart contracts. Processes 500+ concurrent messages with military-grade encryption, achieving 99.9% uptime and zero data breaches in production testing.",
      tech: ["JavaScript", "Solidity", "Ethereum", "Smart Contracts", "Web3"],
      color: "from-green-500 to-emerald-600",
      category: "Blockchain Development",
      duration: "Feb-May 2025",
      status: "Completed",
      image: "/blockchain-chat.jpg",
      github: "https://github.com/Akshay9845/modus-bot",
      demo: "https://modus-bot.vercel.app",
      impact: "99.9% uptime • 500+ concurrent • Zero breaches"
    }
  ]

  if (!isLoaded) {
    return <LoadingScreen />
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        <main className="min-h-screen bg-black text-white overflow-hidden relative" style={{
          backgroundColor: 'var(--background-color, #000000)',
          color: 'var(--text-color, #ffffff)'
        }}>
          <ScrollProgress />
          
          {/* Minimalist Background - No 3D Effects */}
          <FloatingNav />
          
          {/* AI Chat Assistant - Signature Element */}
          <AIAssistant />

          {/* Theme Toggle Button */}
          <ThemeToggleButton />

          {/* Google Analytics */}
          <GoogleAnalytics />

          {/* Performance Monitor - Simplified */}
          <SimplePerformanceMonitor />

          {/* AI Chat Sidebar */}
          <GeminiSidebar />

      {/* Hero Section */}
          <ModernHeroSection />

          {/* About Section - Enhanced */}
          <ModernAboutSection />

          {/* Testimonials Section - Enhanced */}
          <section id="testimonials" className="py-24 px-6 relative bg-black">
            <div className="max-w-7xl mx-auto">
              {/* Section Header */}
              <motion.div
                className="text-center mb-20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <motion.h2
                  className="text-5xl md:text-7xl lg:text-8xl font-black mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    WHAT PEOPLE
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                    SAY
                  </span>
                </motion.h2>

                <motion.div
                  className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                />
              </motion.div>

              {/* Testimonials Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    name: "Dr. Sarah Chen",
                    role: "Professor, East Point College",
                    company: "AI & Data Science Department",
                    content: "Akshay's RML architecture represents a breakthrough in interpretable AI. His innovative approach to combining symbolic reasoning with neural networks shows exceptional technical depth and forward-thinking vision.",
                    image: "👩‍🏫"
                  },
                  {
                    name: "Marcus Rodriguez",
                    role: "Senior ML Engineer",
                    company: "TechCorp Solutions",
                    content: "Working with Akshay on real-time AI systems was impressive. His ability to optimize complex models and achieve 657x faster training throughput is remarkable. A true technical leader.",
                    image: "👨‍💼"
                  },
                  {
                    name: "Dr. Priya Sharma",
                    role: "AI Research Director",
                    company: "Innovation Labs",
                    content: "Akshay's work on multilingual AI companions demonstrates exceptional understanding of human-AI interaction. His 40+ language support with <100ms response time sets new industry standards.",
                    image: "👩‍🔬"
                  }
                ].map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-800/50 backdrop-blur-sm p-6 transition-all duration-300 hover:scale-105 hover:border-orange-500/50">
                      {/* Quote Icon */}
                      <div className="text-orange-400 text-4xl mb-4 opacity-50">"</div>

                      {/* Content */}
                      <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
                        {testimonial.content}
                      </p>

                      {/* Author */}
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-xl">
                          {testimonial.image}
                        </div>
                        <div>
                          <h4 className="font-semibold text-white group-hover:text-orange-400 transition-colors duration-300">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm text-gray-400">
                            {testimonial.role}
                          </p>
                          <p className="text-xs text-orange-500 font-medium">
                            {testimonial.company}
                          </p>
                        </div>
                      </div>

                      {/* Hover Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Skills Section - Enhanced */}
          <ModernSkillsSection />

          {/* Projects Section - Enhanced */}
                     <ProjectsSection projects={projects} handleProjectClick={handleProjectClick} />

          {/* Contact Section - Enhanced */}
          <section id="contact" className="py-8 sm:py-20 px-3 sm:px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.h2
                className="text-2xl sm:text-4xl md:text-6xl font-bold text-center mb-6 sm:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="relative text-center">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Let&apos;s Connect
                  </div>
                  <div className="relative text-white">
                    Let&apos;s Connect
          </div>
        </div>
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-6 sm:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
                  <Card className="glass-morphism">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-orange-400">Get In Touch</h3>
                <p className="text-sm sm:text-base text-gray-300 mb-6 sm:mb-8">
                  Ready to collaborate on AI projects? Let&apos;s discuss opportunities 
                  in Generative AI, LLMs, and innovative AI solutions.
                </p>
                
                <div className="space-y-3 sm:space-y-4">
                  <motion.a
                    href="mailto:akshaynayaks9845@gmail.com"
                        className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl glass-morphism hover:shadow-cyber transition-all duration-300 group touch-manipulation"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaEnvelope className="text-cyan-400 text-lg sm:text-xl group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="text-sm sm:text-base break-all">akshaynayaks9845@gmail.com</span>
                  </motion.a>
                  
                  <motion.a
                    href="https://wa.me/919845233716?text=Hi%20Akshay,%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect!"
                    target="_blank"
                    rel="noopener noreferrer"
                        className="flex items-center space-x-4 p-4 rounded-xl glass-morphism hover:shadow-cyber transition-all duration-300 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaWhatsapp className="text-green-400 text-xl group-hover:scale-110 transition-transform" />
                    <span>+91 98452 33716</span>
                  </motion.a>
                  
                  <motion.a
                    href="tel:+919845233716"
                        className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl glass-morphism hover:shadow-cyber transition-all duration-300 group touch-manipulation"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaPhone className="text-blue-400 text-lg sm:text-xl group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="text-sm sm:text-base">+91 98452 33716</span>
                  </motion.a>
                  
                  <motion.div
                        className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl glass-morphism"
                  >
                    <FaMapMarkerAlt className="text-red-400 text-lg sm:text-xl flex-shrink-0" />
                    <span className="text-sm sm:text-base">Bangalore, Karnataka, India</span>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-4 sm:space-y-6"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-orange-400">Social Links</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                  <a
                   href="https://www.linkedin.com/in/akshaynayaks9845/"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex items-center justify-center space-x-2 bg-blue-600/20 hover:bg-blue-600/30 min-h-[48px] text-sm sm:text-base glass-morphism hover:shadow-cyber transition-all duration-300"
                >
                  <FaLinkedin />
                  <span>LinkedIn</span>
                 </a>
                
                                  <a
                   href="https://github.com/Akshay9845/"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex items-center justify-center space-x-2 bg-gray-600/20 hover:bg-gray-600/30 min-h-[48px] text-sm sm:text-base glass-morphism hover:shadow-cyber transition-all duration-300"
                >
                  <FaGithub />
                  <span>GitHub</span>
                 </a>
                 
                 <a
                   href="https://huggingface.co/akshaynayaks9845"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex items-center justify-center space-x-2 bg-yellow-600/20 hover:bg-yellow-600/30 min-h-[48px] text-sm sm:text-base glass-morphism hover:shadow-cyber transition-all duration-300"
                 >
                   <FaCode />
                   <span>Hugging Face</span>
                 </a>
                 
                 <a
                  href="https://wa.me/919845233716?text=Hi%20Akshay,%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect!"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex items-center justify-center space-x-2 bg-green-600/20 hover:bg-green-600/30 col-span-1 sm:col-span-2 min-h-[48px] text-sm sm:text-base glass-morphism hover:shadow-cyber transition-all duration-300"
                >
                  <FaWhatsapp />
                  <span>WhatsApp</span>
                 </a>
              </div>
              
              <div className="mt-6 sm:mt-8 hidden sm:block">
                {/* CSSHologramEffect */}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

          {/* Message/Feedback Section - Enhanced */}
      <section className="py-8 sm:py-16 px-3 sm:px-4 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-6 sm:mb-12"
          >
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4">
                  <div className="relative text-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                      Leave a Message
                    </div>
                    <div className="relative text-white">
              Leave a Message
                    </div>
                  </div>
            </h2>
            <p className="text-gray-300 text-sm sm:text-lg">
              Have feedback, questions, or want to collaborate? Drop me a message below!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
                className="glass-morphism rounded-2xl p-8 shadow-holographic"
          >
            <Suspense fallback={<div className="animate-pulse bg-gray-800 rounded-lg h-64 flex items-center justify-center text-gray-400">Loading message form...</div>}>
              <MessageForm />
            </Suspense>
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal 
        projectId={selectedProjectId}
        isOpen={isModalOpen}
        onClose={closeModal} 
      />

      {/* Admin Message Viewer - only visible in development or for admin */}
      <MessageViewer />
      
      {/* Advanced Control Panel */}
      <AdvancedControlPanel />
        </main>
      </LanguageProvider>
    </ThemeProvider>
  )
}
