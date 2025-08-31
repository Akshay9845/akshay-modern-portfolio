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
  FaPalette, FaGlobe, FaStar, FaComments, FaLightbulb, FaAward, FaGraduationCap
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

// Theme Toggle Button Component - Must be inside ThemeProvider
function ThemeToggleButton() {
  const { currentTheme } = useTheme()
  const [showCustomizer, setShowCustomizer] = useState(false)

  return (
    <>
      <motion.button
        onClick={() => {
          console.log('🎨 Opening theme customizer')
          setShowCustomizer(true)
        }}
        className="fixed top-6 right-6 z-40 p-3 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        style={{
          background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaPalette className="w-5 h-5" />
      </motion.button>

      <ThemeCustomizer
        isOpen={showCustomizer}
        onClose={() => setShowCustomizer(false)}
      />
    </>
  )
}

// Languages Section - Enhanced
function LanguagesSection() {
  const languages = [
    {
      name: "English",
      level: "Fluent",
      proficiency: 100,
      flag: "🇺🇸",
      description: "Professional communication, technical documentation, presentations"
    },
    {
      name: "Hindi",
      level: "Fluent",
      proficiency: 100,
      flag: "🇮🇳",
      description: "Native language, daily communication, cultural context"
    },
    {
      name: "Telugu",
      level: "Fluent",
      proficiency: 100,
      flag: "🇮🇳",
      description: "Mother tongue, regional communication, traditional literature"
    },
    {
      name: "Kannada",
      level: "Fluent",
      proficiency: 100,
      flag: "🇮🇳",
      description: "Regional language proficiency, Karnataka culture and traditions"
    },
    {
      name: "Tamil",
      level: "Speakable",
      proficiency: 70,
      flag: "🇮🇳",
      description: "Conversational proficiency, South Indian cultural understanding"
    }
  ]

  return (
    <section id="languages" className="py-12 px-6 relative bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
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
              LANGUAGE
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              PROFICIENCY
            </span>
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Multicultural communication skills essential for global AI development and international collaboration
          </motion.p>
        </motion.div>

        {/* Languages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {languages.map((language, index) => (
            <motion.div
              key={language.name}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div
                className="relative overflow-hidden rounded-2xl backdrop-blur-sm p-6 transition-all duration-500 hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, rgba(0,0,0,0.3), rgba(20,20,20,0.3))`,

                  boxShadow: `0 10px 30px rgba(0,0,0,0.3)`
                }}
              >
                {/* Content */}
                <div className="relative z-10">
                  {/* Flag and Language Name */}
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-3">{language.flag}</div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-green-300 transition-colors duration-300">
                        {language.name}
                      </h3>
                      <p className="text-sm text-gray-300">{language.level}</p>
                    </div>
                  </div>

                  {/* Proficiency Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center text-sm mb-2">
                      <span className="text-gray-300">Proficiency</span>
                      <span className="text-green-400 font-medium">{language.proficiency}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${language.proficiency}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {language.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Stats */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap justify-center gap-6 text-sm text-green-400">
            <span className="flex items-center">
              <FaGlobe className="mr-2" />
              5 Languages
            </span>
            <span className="flex items-center">
              <FaStar className="mr-2" />
              4 Fluent
            </span>
            <span className="flex items-center">
              <FaComments className="mr-2" />
              Multicultural Communication
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Certifications Section - Enhanced
function CertificationsSection() {
  const certifications = [
    {
      id: "gen-ai-google",
      title: "Gen AI: Beyond the Chatbot",
      issuer: "Google",
      date: "Aug 2025",
      credentialId: "GAI-GOOGLE-2025",
      description: "Advanced generative AI concepts and applications beyond basic chatbot implementations, covering advanced prompting, model fine-tuning, and enterprise AI solutions",
      skills: ["Generative AI", "Advanced Prompting", "Model Fine-tuning", "Enterprise AI"],
      color: "from-blue-500 to-cyan-600",
      logo: "🤖"
    },
    {
      id: "gen-ai-ibm",
      title: "Gen AI",
      issuer: "IBM",
      date: "Aug 2025",
      credentialId: "GAI-IBM-2025",
      description: "Comprehensive generative AI training covering IBM Watson, foundation models, and practical AI implementation strategies for business applications",
      skills: ["IBM Watson", "Foundation Models", "AI Implementation", "Business AI"],
      color: "from-blue-600 to-purple-600",
      logo: "⚡"
    },
    {
      id: "gen-ai-marketing-ibm",
      title: "Gen AI for Growth Marketing",
      issuer: "IBM",
      date: "2025",
      credentialId: "GAI-MKT-IBM-2025",
      description: "Specialized training in using generative AI for marketing applications, content creation, customer engagement, and growth strategies",
      skills: ["AI Marketing", "Content Generation", "Customer Engagement", "Growth Strategies"],
      color: "from-purple-500 to-pink-600",
      logo: "📈"
    },
    {
      id: "cloud-developer-nsdc",
      title: "Cloud Developer",
      issuer: "NSDC",
      date: "Feb 2025",
      credentialId: "CD-NSDC-2025",
      description: "National Skill Development Corporation certified cloud development training covering cloud architecture, deployment, and DevOps practices",
      skills: ["Cloud Architecture", "DevOps", "Cloud Deployment", "Infrastructure"],
      color: "from-green-500 to-emerald-600",
      logo: "☁️"
    },
    {
      id: "data-analytics-accenture",
      title: "Data Analytics",
      issuer: "Accenture",
      date: "Jul 2024",
      credentialId: "DA-ACC-2024",
      description: "Accenture-certified data analytics training covering data visualization, statistical analysis, business intelligence, and data-driven decision making",
      skills: ["Data Visualization", "Statistical Analysis", "Business Intelligence", "Data-Driven Decisions"],
      color: "from-orange-500 to-pink-600",
      logo: "📊"
    }
  ]

  return (
    <section id="certifications" className="py-12 px-6 relative bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
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
              PROFESSIONAL
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              CERTIFICATIONS
            </span>
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Industry-recognized credentials validating expertise in AI, machine learning, and cloud technologies
          </motion.p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div
                className="relative overflow-hidden rounded-2xl backdrop-blur-sm p-6 transition-all duration-500 hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, rgba(0,0,0,0.3), rgba(20,20,20,0.3))`,

                  boxShadow: `0 10px 30px rgba(0,0,0,0.3)`
                }}
              >
                {/* Gradient overlay on hover */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${cert.color}`}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Logo and Title */}
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-3">{cert.logo}</div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                        {cert.title}
                      </h3>
                      <p className="text-sm text-gray-300">{cert.issuer}</p>
                    </div>
                  </div>

                  {/* Date and Credential ID */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-cyan-400 font-medium">{cert.date}</span>
                      <span className="text-gray-500">ID: {cert.credentialId}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    {cert.description}
                  </p>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 text-xs rounded-full bg-white/10 text-cyan-300 border border-white/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Hover effect border */}
                  <div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(to right, ${cert.color.split(' ')[0].replace('from-', '')}, ${cert.color.split(' ')[1].replace('to-', '')})`
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-300 mb-6">
            Continuously expanding expertise through ongoing certification and professional development
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-cyan-400">
            <span className="flex items-center">
              <FaRocket className="mr-2" />
              5 Professional Certifications
            </span>
            <span className="flex items-center">
              <FaAtom className="mr-2" />
              Gen AI & Cloud Focus
            </span>
            <span className="flex items-center">
              <FaMicrochip className="mr-2" />
              Enterprise Training
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Enhanced Projects Section - Inspired by 2025 Design Trends
function ProjectsSection({ projects, handleProjectClick }: { 
  projects: any[], 
  handleProjectClick: (id: string) => void 
}) {
  return (
    <section id="projects" className="py-12 px-6 relative bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header - Inspired by Koox & Frans Hals Museum */}
        <motion.div
          className="text-center mb-12"
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
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
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
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm">
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
                      <p className="text-gray-200 text-sm line-clamp-2">{project.description}</p>
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
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
                      <span className="px-3 py-1 bg-gray-500/10 text-gray-300 rounded-full text-xs font-medium border border-gray-500/20">
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
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
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
                        className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg text-gray-200 hover:text-white text-xs transition-all duration-300 border border-gray-700/50"
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
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Elegant Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />

      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-3">
          <div className="h-full w-full"
               style={{
                 backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
                 backgroundSize: '60px 60px'
               }}
          />
        </div>

        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-32 right-20 w-20 h-20 border border-cyan-500/10 rounded-full"
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      </div>

      {/* Subtle Orange Accent Lines - Minimalist Design */}
      <div className="absolute inset-0 z-10">
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
          className="space-y-8"
        >
          {/* Profile Photo - Enhanced Orange Accent */}
          <motion.div
            className="relative mb-12 flex justify-center items-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="relative w-56 h-56">
              {/* Main photo container - Clean and simple */}
              <div className="relative w-full h-full rounded-full border-2 border-orange-500/30 overflow-hidden shadow-lg">
                <ProfilePhoto />
              </div>
            </div>
          </motion.div>

          {/* Name - AKSHAY S Typography */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] font-black tracking-tight leading-none"
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
            className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-orange-400 font-semibold text-center sm:text-left"
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
            <span className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full text-cyan-400 text-sm font-medium">
              Generative AI Engineer
            </span>
            <span className="px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-medium">
              Real-Time AI Systems
            </span>
          </motion.div>

          {/* Description - Impact-Driven */}
          <motion.p
            className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4 sm:px-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            Crafting interpretable AI systems that blend LLMs with real-time interaction and symbolic reasoning.
            <br className="hidden sm:block" />
            <span className="text-orange-400 font-medium block sm:inline mt-2 sm:mt-0">
              657x faster training throughput • 40+ language real-time conversations • Black box transparency
            </span>
          </motion.p>

          {/* Modern CTA Buttons - Inspired by Critical Danger */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pt-8 sm:pt-12 px-4 sm:px-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
                        <button
              onClick={() => {
                // Create a link to download the CV
                const link = document.createElement('a');
                link.href = '/resume/S.AKSHAY.pdf';
                link.download = 'Akshay_Kumar_S_CV.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="group relative overflow-hidden px-6 sm:px-8 md:px-10 py-4 sm:py-5 bg-gradient-to-r from-green-600 to-green-700 rounded-full text-white font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25 cursor-pointer touch-manipulation w-full sm:w-auto min-h-[48px]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                <FaDownload className="text-lg sm:text-xl" />
                <span className="whitespace-nowrap">Download CV</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

                                     <button 
              onClick={() => {
                const projectsSection = document.getElementById('projects');
                if (projectsSection) {
                  projectsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="group relative overflow-hidden px-6 sm:px-8 md:px-10 py-4 sm:py-5 bg-gradient-to-r from-orange-600 to-orange-700 rounded-full text-white font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25 cursor-pointer touch-manipulation w-full sm:w-auto min-h-[48px]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                <FaCode className="text-lg sm:text-xl" />
                <span className="whitespace-nowrap">Explore Work</span>
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
              className="group relative overflow-hidden px-6 sm:px-8 md:px-10 py-4 sm:py-5 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full text-white font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 cursor-pointer touch-manipulation w-full sm:w-auto min-h-[48px]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                <FaEnvelope className="text-lg sm:text-xl" />
                <span className="whitespace-nowrap">Get In Touch</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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

// Elegant About Section - Sophisticated Design
function ModernAboutSection() {
  return (
    <section id="about" className="py-12 px-6 relative bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full"
               style={{
                 backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                 backgroundSize: '50px 50px'
               }}
          />
        </div>

        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 rounded-full"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-24 h-24 border border-purple-500/20 rounded-lg rotate-45"
          animate={{
            rotate: [45, 135, 45],
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 15, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        <motion.div
          className="absolute bottom-32 left-1/4 w-16 h-16 bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-full blur-xl"
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Elegant Header */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 200 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm">
              <FaAtom className="text-cyan-400 text-xl" />
              <span className="text-cyan-300 font-medium">About Me</span>
            </div>
          </motion.div>

          <motion.h2
            className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-none"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
              Crafting
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Tomorrow's AI
            </span>
          </motion.h2>
          
          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mx-auto rounded-full mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            viewport={{ once: true }}
          />

          <motion.p
            className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            viewport={{ once: true }}
          >
            Where artificial intelligence meets human creativity, building the future of intelligent systems
          </motion.p>
        </motion.div>

        {/* Main Content - Three Column Layout */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Column 1 - Expertise */}
          <motion.div
            className="group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="h-full p-8 rounded-3xl bg-gradient-to-br from-cyan-500/5 to-purple-500/5 border border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10">
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <FaBrain className="text-3xl text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">
                  AI Expertise
                </h3>
              </div>

              <div className="space-y-4 text-gray-200">
                <p className="leading-relaxed">
                  Specialized in Generative AI, LLMs, and real-time AI systems. Expert in prompt engineering,
                  model fine-tuning, and building interpretable AI solutions.
                </p>
                <div className="flex flex-wrap gap-2 mt-6">
                  <span className="px-3 py-1 text-xs rounded-full bg-cyan-500/20 text-cyan-300">
                    Generative AI
                  </span>
                  <span className="px-3 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    LLMs
                  </span>
                  <span className="px-3 py-1 text-xs rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                    Prompt Engineering
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Column 2 - Journey */}
          <motion.div
            className="group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="h-full p-8 rounded-3xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/10 hover:border-purple-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10">
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <FaRocket className="text-3xl text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                  My Journey
                </h3>
              </div>

              <div className="space-y-4 text-gray-200">
                <p className="leading-relaxed">
                  Completed B.E. in AI & Data Science at East Point College. Passionate about
                  solving real-world problems through innovative AI solutions and human-AI interaction.
                </p>
                <div className="flex flex-wrap gap-2 mt-6">
                  <span className="px-3 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    AI Engineering
                  </span>
                  <span className="px-3 py-1 text-xs rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                    Research
                  </span>
                  <span className="px-3 py-1 text-xs rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Innovation
                  </span>
              </div>
                  </div>
                </div>
          </motion.div>

          {/* Column 3 - Vision */}
          <motion.div
            className="group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="h-full p-8 rounded-3xl bg-gradient-to-br from-pink-500/5 to-orange-500/5 border border-pink-500/10 hover:border-pink-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/10">
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <FaLightbulb className="text-3xl text-white" />
                  </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-pink-300 transition-colors duration-300">
                  Vision
                </h3>
                </div>
                
              <div className="space-y-4 text-gray-200">
                <p className="leading-relaxed">
                  Building AI systems that are transparent, ethical, and beneficial to humanity.
                  Focused on multilingual AI, interpretable models, and bridging the gap between AI and human understanding.
                </p>
                <div className="flex flex-wrap gap-2 mt-6">
                  <span className="px-3 py-1 text-xs rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                    Ethics
                  </span>
                  <span className="px-3 py-1 text-xs rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                    Transparency
                  </span>
                  <span className="px-3 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                    Innovation
                  </span>
                  </div>
                </div>
              </div>
          </motion.div>
        </div>
          
        {/* Stats Section - Elegant Design */}
          <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: 6, label: "AI Projects", icon: FaCode, color: "from-cyan-500 to-blue-500" },
              { number: 5, label: "Certifications", icon: FaAward, color: "from-purple-500 to-pink-500" },
              { number: 5, label: "Languages", icon: FaGlobe, color: "from-pink-500 to-orange-500" },
              { number: 4, label: "Years Learning", icon: FaGraduationCap, color: "from-orange-500 to-pink-500" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="group"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:scale-105">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="text-2xl text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">
                    <AnimatedCounter value={stat.number} duration={2} />
                </div>
                  <div className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                    {stat.label}
              </div>
            </div>
          </motion.div>
            ))}
        </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Ready to collaborate on the next groundbreaking AI project?
          </p>
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Build Something Amazing
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

// Modern Skills Section - Minimalist Orange & Black Theme
function ModernSkillsSection() {
  return (
    <section id="skills" className="py-12 px-6 relative bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-3">
          <div className="h-full w-full"
               style={{
                 backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)`,
                 backgroundSize: '70px 70px'
               }}
          />
        </div>

        {/* Floating elements */}
        <motion.div
          className="absolute bottom-32 left-20 w-16 h-16 bg-gradient-to-r from-orange-500/5 to-pink-500/5 rounded-full blur-sm"
          animate={{
            y: [0, -15, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
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
            { name: 'TensorFlow', icon: <SiTensorflow className="text-2xl" />, color: 'from-orange-500 to-pink-500', experience: '2+ years', projects: '3+ projects', level: 'Advanced' },
            { name: 'PyTorch', icon: <SiPytorch className="text-2xl" />, color: 'from-pink-500 to-orange-500', experience: '2+ years', projects: '3+ projects', level: 'Advanced' },
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
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm p-6 transition-all duration-300 hover:scale-105 h-32">
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
                      <p className="text-xs text-gray-200">
                        <span className="text-orange-400 font-medium">{skill.experience}</span> experience
                      </p>
                      <p className="text-xs text-gray-200">
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
    { name: 'TensorFlow', icon: <SiTensorflow className="text-2xl" />, color: 'from-orange-500 to-pink-500' },
    { name: 'PyTorch', icon: <SiPytorch className="text-2xl" />, color: 'from-pink-500 to-orange-500' },
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
      demo: "/demos/3d-avatar-demo.html",
      impact: "40+ languages • <100ms response • 50+ gestures"
    },
    {
      id: "imagin-platform",
      title: "IMAGIN - AI Platform",
      description: "Full-stack AI platform delivering photorealistic image generation and HD video creation at 8-24 FPS. Processes 10,000+ concurrent requests with enterprise-grade scalability using SDXL, Stable Video Diffusion, and custom optimization pipelines.",
      tech: ["Python", "SDXL", "RealVisXL", "Stable Video Diffusion", "RIFE", "LAION 2B"],
      color: "from-orange-500 to-pink-600",
      category: "Generative AI",
      duration: "Jun-Jul 2025",
      status: "Completed",
      image: "/imagin.jpg",
      github: "https://github.com/Akshay9845/imagin",
      demo: "/demos/imagin-demo.html",
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
      demo: "/demos/personaforge-demo.html",
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
      demo: "/demos/blockchain-chat-demo.html",
      impact: "99.9% uptime • 500+ concurrent • Zero breaches"
    }
  ]

  if (!isLoaded) {
    return <LoadingScreen />
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        <main className="min-h-screen overflow-hidden relative" style={{
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
          <section id="testimonials" className="py-12 px-6 relative bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
            <div className="max-w-7xl mx-auto">
              {/* Section Header */}
              <motion.div
                className="text-center mb-12"
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
                  <span className="bg-gradient-to-r from-white via-gray-300 to-orange-400 bg-clip-text text-transparent">
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
                    name: "Anil",
                    role: "Professor",
                    company: "East Point College of Engineering",
                    content: "Akshay has demonstrated exceptional talent in AI and machine learning. His innovative approach to interpretable AI systems and commitment to solving real-world problems is truly impressive. A standout student with great potential.",
                    image: "👨‍🏫"
                  },
                  {
                    name: "Bharath",
                    role: "Student",
                    company: "East Point College",
                    content: "Working with Akshay on AI projects has been amazing. His knowledge of machine learning and ability to explain complex concepts clearly is outstanding. He's definitely going to make a big impact in the AI field.",
                    image: "👨‍🎓"
                  },
                  {
                    name: "Sai Varnith",
                    role: "Student",
                    company: "East Point College",
                    content: "Akshay's dedication to AI research and development is inspiring. His work on 3D AI companions and real-time systems shows he's ahead of the curve. Great to have such a talented peer in our college.",
                    image: "👨‍💻"
                  },
                  {
                    name: "Vishal",
                    role: "Student",
                    company: "East Point College",
                    content: "Akshay consistently pushes the boundaries of what's possible with AI. His technical skills and innovative thinking make him one of the most capable students I've collaborated with on various projects.",
                    image: "👨‍🔬"
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
                    <div
                      className="relative overflow-hidden rounded-2xl backdrop-blur-sm p-6 transition-all duration-300 hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${index % 2 === 0 ? 'rgba(0,0,0,0.5)' : 'rgba(20,20,20,0.5)'}, rgba(0,0,0,0.3))`,
      
                      }}
                    >
                      {/* Quote Icon */}
                      <div className="text-orange-400 text-4xl mb-4 opacity-50">"</div>

                      {/* Content */}
                      <p className="text-gray-200 text-sm leading-relaxed mb-6 italic">
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
                          <p className="text-sm text-gray-300">
                            {testimonial.role}
                          </p>
                          <p className="text-xs text-orange-500 font-medium">
                            {testimonial.company}
                          </p>
                        </div>
                      </div>

                      {/* Hover Effect */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255,165,0,0.1), rgba(255,140,0,0.05))'
                        }}
                      />
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

          {/* Certifications Section - Enhanced */}
          <CertificationsSection />

          {/* Languages Section - Enhanced */}
          <LanguagesSection />

          {/* Contact Section - Enhanced */}
          <section id="contact" className="py-12 px-6 relative bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
              {/* Subtle grid pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="h-full w-full"
                     style={{
                       backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                       backgroundSize: '50px 50px'
                     }}
                />
              </div>

              {/* Floating geometric shapes */}
              <motion.div
                className="absolute top-20 left-10 w-32 h-32 rounded-full"
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
              />
              <motion.div
                className="absolute top-40 right-20 w-24 h-24 border border-purple-500/20 rounded-lg rotate-45"
                animate={{
                  rotate: [45, 135, 45],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  rotate: { duration: 15, repeat: Infinity, ease: "easeInOut" },
                  scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                }}
              />
              <motion.div
                className="absolute bottom-32 left-1/4 w-16 h-16 bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-full blur-xl"
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute top-60 left-1/3 w-8 h-8 border border-cyan-500/15 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              />
            </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
                className="text-2xl sm:text-4xl md:text-6xl font-bold text-center mb-6 sm:mb-12"
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
          
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
                  <div className="relative overflow-hidden rounded-2xl p-8 shadow-2xl border border-cyan-500/20"
                        style={{
                          background: `linear-gradient(135deg,
                            rgba(0,0,0,0.4) 0%,
                            rgba(20,20,20,0.6) 50%,
                            rgba(0,0,0,0.4) 100%
                          )`,
                          backdropFilter: 'blur(20px)',
                          boxShadow: `
                            0 25px 50px -12px rgba(0, 0, 0, 0.5),
                            0 0 0 1px rgba(6, 182, 212, 0.1),
                            inset 0 1px 0 rgba(255, 255, 255, 0.1)
                          `
                        }}>
                    {/* Animated background elements */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                      <div className="absolute bottom-0 right-0 w-24 h-24 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
                    </div>

                    {/* Header with gradient accent */}
                    <div className="relative z-10 mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-purple-400 rounded-full"></div>
                        <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                          Get In Touch
                        </h3>
                      </div>
                      <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"></div>
                    </div>

                    {/* Description with enhanced typography */}
                    <p className="relative z-10 text-base sm:text-lg text-gray-200 leading-relaxed mb-8 font-light">
                      <span className="text-cyan-300 font-medium">Ready to collaborate</span> on AI projects?
                      Let&apos;s discuss opportunities in{' '}
                      <span className="text-purple-300 font-medium">Generative AI</span>,{' '}
                      <span className="text-cyan-300 font-medium">LLMs</span>, and{' '}
                      <span className="text-purple-300 font-medium">innovative AI solutions</span>.
                </p>
                
                <div className="space-y-3 sm:space-y-4">
                  <motion.a
                    href="mailto:akshaynayaks9845@gmail.com"
                        className="relative overflow-hidden flex items-center space-x-4 p-5 rounded-xl backdrop-blur-md transition-all duration-500 group touch-manipulation"
                        style={{
                          background: `linear-gradient(135deg,
                            rgba(255,255,255,0.05) 0%,
                            rgba(255,255,255,0.02) 100%
                          )`,
                          border: '1px solid rgba(6, 182, 212, 0.2)',
                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                        }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: '0 20px 40px rgba(6, 182, 212, 0.15)'
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <FaEnvelope className="relative z-10 text-cyan-400 text-xl group-hover:scale-110 group-hover:text-cyan-300 transition-all duration-300 flex-shrink-0" />
                    <span className="relative z-10 text-base text-gray-200 font-medium group-hover:text-white transition-colors duration-300">akshaynayaks9845@gmail.com</span>
                  </motion.a>
                  
                  <motion.a
                    href="https://wa.me/919845233716?text=Hi%20Akshay,%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect!"
                    target="_blank"
                    rel="noopener noreferrer"
                        className="relative overflow-hidden flex items-center space-x-4 p-5 rounded-xl backdrop-blur-md transition-all duration-500 group touch-manipulation"
                        style={{
                          background: `linear-gradient(135deg,
                            rgba(255,255,255,0.05) 0%,
                            rgba(255,255,255,0.02) 100%
                          )`,
                          border: '1px solid rgba(6, 182, 212, 0.2)',
                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                        }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: '0 20px 40px rgba(34, 197, 94, 0.15)'
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-green-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <FaWhatsapp className="relative z-10 text-green-400 text-xl group-hover:scale-110 group-hover:text-green-300 transition-all duration-300 flex-shrink-0" />
                    <span className="relative z-10 text-base text-gray-200 font-medium group-hover:text-white transition-colors duration-300">+91 98452 33716</span>
                  </motion.a>
                  
                  <motion.a
                    href="tel:+919845233716"
                        className="relative overflow-hidden flex items-center space-x-4 p-5 rounded-xl backdrop-blur-md transition-all duration-500 group touch-manipulation"
                        style={{
                          background: `linear-gradient(135deg,
                            rgba(255,255,255,0.05) 0%,
                            rgba(255,255,255,0.02) 100%
                          )`,
                          border: '1px solid rgba(6, 182, 212, 0.2)',
                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                        }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: '0 20px 40px rgba(59, 130, 246, 0.15)'
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <FaPhone className="relative z-10 text-blue-400 text-xl group-hover:scale-110 group-hover:text-blue-300 transition-all duration-300 flex-shrink-0" />
                    <span className="relative z-10 text-base text-gray-200 font-medium group-hover:text-white transition-colors duration-300">+91 98452 33716</span>
                  </motion.a>
                  
                  <motion.div
                        className="relative overflow-hidden flex items-center space-x-4 p-5 rounded-xl backdrop-blur-md transition-all duration-500 group"
                        style={{
                          background: `linear-gradient(135deg,
                            rgba(255,255,255,0.05) 0%,
                            rgba(255,255,255,0.02) 100%
                          )`,
                          border: '1px solid rgba(6, 182, 212, 0.2)',
                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                        }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <FaMapMarkerAlt className="relative z-10 text-cyan-400 text-xl group-hover:scale-110 group-hover:text-cyan-300 transition-all duration-300 flex-shrink-0" />
                    <span className="relative z-10 text-base text-gray-200 font-medium group-hover:text-white transition-colors duration-300">Bangalore, Karnataka, India</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-4 sm:space-y-6"
            >
              <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">Social Links</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                  <motion.a
                   href="https://www.linkedin.com/in/akshaynayaks9845/"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="relative overflow-hidden flex items-center justify-center space-x-3 p-5 rounded-xl backdrop-blur-md transition-all duration-500 group"
                   style={{
                     background: `linear-gradient(135deg,
                       rgba(255,255,255,0.05) 0%,
                       rgba(255,255,255,0.02) 100%
                     )`,
                     border: '1px solid rgba(6, 182, 212, 0.2)',
                     boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                   }}
                   whileHover={{
                     scale: 1.02,
                     boxShadow: '0 20px 40px rgba(59, 130, 246, 0.15)'
                   }}
                   whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <FaLinkedin className="relative z-10 text-blue-400 text-xl group-hover:scale-110 group-hover:text-blue-300 transition-all duration-300 flex-shrink-0" />
                  <span className="relative z-10 text-base text-gray-200 font-medium group-hover:text-white transition-colors duration-300">LinkedIn</span>
                 </motion.a>
                
                                  <motion.a
                   href="https://github.com/Akshay9845/"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="relative overflow-hidden flex items-center justify-center space-x-3 p-5 rounded-xl backdrop-blur-md transition-all duration-500 group"
                   style={{
                     background: `linear-gradient(135deg,
                       rgba(255,255,255,0.05) 0%,
                       rgba(255,255,255,0.02) 100%
                     )`,
                     border: '1px solid rgba(6, 182, 212, 0.2)',
                     boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                   }}
                   whileHover={{
                     scale: 1.02,
                     boxShadow: '0 20px 40px rgba(6, 182, 212, 0.15)'
                   }}
                   whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <FaGithub className="relative z-10 text-gray-300 text-xl group-hover:scale-110 group-hover:text-gray-200 transition-all duration-300 flex-shrink-0" />
                  <span className="relative z-10 text-base text-gray-200 font-medium group-hover:text-white transition-colors duration-300">GitHub</span>
                 </motion.a>
                 
                 <motion.a
                   href="https://huggingface.co/akshaynayaks9845"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="relative overflow-hidden flex items-center justify-center space-x-3 p-5 rounded-xl backdrop-blur-md transition-all duration-500 group"
                   style={{
                     background: `linear-gradient(135deg,
                       rgba(255,255,255,0.05) 0%,
                       rgba(255,255,255,0.02) 100%
                     )`,
                     border: '1px solid rgba(6, 182, 212, 0.2)',
                     boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                   }}
                   whileHover={{
                     scale: 1.02,
                     boxShadow: '0 20px 40px rgba(245, 158, 11, 0.15)'
                   }}
                   whileTap={{ scale: 0.98 }}
                 >
                   <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                   <FaCode className="relative z-10 text-yellow-400 text-xl group-hover:scale-110 group-hover:text-yellow-300 transition-all duration-300 flex-shrink-0" />
                   <span className="relative z-10 text-base text-gray-200 font-medium group-hover:text-white transition-colors duration-300">Hugging Face</span>
                 </motion.a>
                 
                 <motion.a
                  href="https://wa.me/919845233716?text=Hi%20Akshay,%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect!"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="relative overflow-hidden flex items-center justify-center space-x-3 p-5 rounded-xl backdrop-blur-md transition-all duration-500 group col-span-1 sm:col-span-2"
                   style={{
                     background: `linear-gradient(135deg,
                       rgba(255,255,255,0.05) 0%,
                       rgba(255,255,255,0.02) 100%
                     )`,
                     border: '1px solid rgba(6, 182, 212, 0.2)',
                     boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                   }}
                   whileHover={{
                     scale: 1.02,
                     boxShadow: '0 20px 40px rgba(34, 197, 94, 0.15)'
                   }}
                   whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-green-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <FaWhatsapp className="relative z-10 text-green-400 text-xl group-hover:scale-110 group-hover:text-green-300 transition-all duration-300 flex-shrink-0" />
                  <span className="relative z-10 text-base text-gray-200 font-medium group-hover:text-white transition-colors duration-300">WhatsApp</span>
                 </motion.a>
              </div>
              
              <div className="mt-6 sm:mt-8 hidden sm:block">
                {/* CSSHologramEffect */}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

          {/* Message/Feedback Section - Enhanced */}
      <section className="py-12 px-6 relative bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full"
                 style={{
                   backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.25) 1px, transparent 0)`,
                   backgroundSize: '50px 50px'
                 }}
            />
          </div>

          {/* Floating geometric shape */}
          <motion.div
            className="absolute top-32 right-20 w-24 h-24 border-2 border-orange-500/40 rounded-full"
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              rotate: { duration: 18, repeat: Infinity, ease: "linear" },
              scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/40 to-cyan-600/40 border border-purple-500/50 rounded-full px-6 py-2 mb-6"
            >
              <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-300">Get In Touch</span>
            </motion.div>

            {/* Title */}
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Let's Connect
                    </div>
                    <div className="relative text-white">
                  Let's Connect
                    </div>
                  </div>
            </h2>

            {/* Description */}
            <p className="text-gray-200 text-lg max-w-2xl mx-auto leading-relaxed">
              Ready to discuss your next AI project? Have innovative ideas or collaboration opportunities?
              Let's build something extraordinary together.
            </p>
          </motion.div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Info Cards */}
          <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Quick Contact Cards */}
              <div className="space-y-4">
                {/* Response Time */}
                <motion.div
                  className="relative overflow-hidden rounded-xl p-6 backdrop-blur-md transition-all duration-500 group cursor-pointer"
                  style={{
                    background: `linear-gradient(135deg,
                      rgba(255,255,255,0.05) 0%,
                      rgba(255,255,255,0.02) 100%
                    )`,
                    border: '1px solid rgba(6, 182, 212, 0.2)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                  }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: '0 20px 40px rgba(6, 182, 212, 0.15)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10 flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-xl">⚡</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg group-hover:text-cyan-300 transition-colors duration-300">Quick Response</h3>
                      <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">I typically respond within 24 hours</p>
                    </div>
                  </div>
                </motion.div>

                {/* Collaboration */}
                <motion.div
                  className="relative overflow-hidden rounded-xl p-6 backdrop-blur-md transition-all duration-500 group cursor-pointer"
                  style={{
                    background: `linear-gradient(135deg,
                      rgba(255,255,255,0.05) 0%,
                      rgba(255,255,255,0.02) 100%
                    )`,
                    border: '1px solid rgba(6, 182, 212, 0.2)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                  }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: '0 20px 40px rgba(59, 130, 246, 0.15)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10 flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-xl">🤝</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg group-hover:text-blue-300 transition-colors duration-300">Open to Collaborate</h3>
                      <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">Always excited about innovative AI projects</p>
                    </div>
                  </div>
                </motion.div>

                {/* Timezone */}
                <motion.div
                  className="relative overflow-hidden rounded-xl p-6 backdrop-blur-md transition-all duration-500 group cursor-pointer"
                  style={{
                    background: `linear-gradient(135deg,
                      rgba(255,255,255,0.05) 0%,
                      rgba(255,255,255,0.02) 100%
                    )`,
                    border: '1px solid rgba(6, 182, 212, 0.2)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                  }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: '0 20px 40px rgba(6, 182, 212, 0.15)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10 flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-xl">🌍</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg group-hover:text-cyan-300 transition-colors duration-300">Global Collaboration</h3>
                      <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">Available for remote work worldwide</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Message Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl p-8 backdrop-blur-md shadow-2xl"
              style={{
                background: `linear-gradient(135deg,
                  rgba(0,0,0,0.4) 0%,
                  rgba(20,20,20,0.6) 50%,
                  rgba(0,0,0,0.4) 100%
                )`,
                backdropFilter: 'blur(20px)',
                boxShadow: `
                  0 25px 50px -12px rgba(0, 0, 0, 0.5),
                  0 0 0 1px rgba(6, 182, 212, 0.1),
                  inset 0 1px 0 rgba(255, 255, 255, 0.1)
                `
              }}
            >
              {/* Animated background elements */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
              </div>

              {/* Header with gradient accent */}
              <div className="relative z-10 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-purple-400 rounded-full"></div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                    Send a Message
                  </h3>
                </div>
                <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"></div>
              </div>

              <div className="relative z-10">
                <p className="text-base text-gray-200 leading-relaxed mb-6 font-light">
                  <span className="text-cyan-300 font-medium">Share your thoughts</span>, ideas, or{' '}
                  <span className="text-purple-300 font-medium">project proposals</span>.
                </p>

                <Suspense fallback={
                  <div className="animate-pulse bg-gradient-to-br from-gray-200/30 to-gray-300/30 rounded-lg h-64 flex items-center justify-center text-gray-600">
                    Loading message form...
                  </div>
                }>
              <MessageForm />
            </Suspense>
              </div>
          </motion.div>
          </div>
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
