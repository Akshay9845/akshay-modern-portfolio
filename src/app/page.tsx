'use client'

import { Suspense, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Stars, Float } from '@react-three/drei'
import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  FaPython, FaEnvelope, FaPhone, FaMapMarkerAlt, FaDownload, FaCode, FaDatabase,
  FaLinkedin, FaGithub, FaWhatsapp
} from 'react-icons/fa'
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiMongodb, SiPostgresql, SiSupabase, SiStreamlit, SiOpenai } from 'react-icons/si'

import { AnimatedSphere } from '@/components/3d/AnimatedSphere'
import { ParticleField } from '@/components/3d/ParticleField'
import { NeuralNetwork } from '@/components/3d/NeuralNetwork'
import { GalaxyBackground } from '@/components/3d/GalaxyBackground'
import { LiquidSphere } from '@/components/3d/LiquidSphere'
import { BackgroundEffects } from '@/components/ui/background-effects'
import { LoadingScreen } from '@/components/ui/loading-screen'
import { ProjectModal } from '@/components/ui/project-modal'
import { FloatingElements } from '@/components/ui/floating-elements'
import { GlowCard } from '@/components/ui/glow-card'
import { AnimatedCounter } from '@/components/ui/advanced-animations'
import { GradientOrbs } from '@/components/ui/gradient-orbs'
import { MorphingShape } from '@/components/ui/morphing-shape'
import { MagneticButton } from '@/components/ui/magnetic-button'
import { TypewriterText, GlitchText } from '@/components/ui/animated-text'
import { InteractiveCard, SkillCard } from '@/components/ui/interactive-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CustomCursor } from '@/components/ui/custom-cursor'
import { CSSHologramEffect } from '@/components/ui/css-hologram-effect'
import { ProfilePhoto } from '@/components/ui/profile-photo-new'
import { ParticleCursor } from '@/components/ui/particle-cursor'
import { FloatingNav } from '@/components/ui/floating-nav'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { GeminiSidebar } from '@/components/ui/gemini-sidebar'

// Dynamic imports for message components
const MessageForm = dynamic(() => import('@/components/ui/message-form').then(mod => ({ default: mod.MessageForm })), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-800 rounded-lg h-64"></div>
})

const MessageViewer = dynamic(() => import('@/components/ui/message-form').then(mod => ({ default: mod.MessageViewer })), {
  ssr: false
})

const AdvancedControlPanel = dynamic(() => import('@/components/ui/advanced-control-panel').then(mod => ({ default: mod.AdvancedControlPanel })), {
  ssr: false
})

const LanguageProvider = dynamic(() => import('@/components/ui/language-provider').then(mod => ({ default: mod.LanguageProvider })), {
  ssr: false
})

const ThemeProvider = dynamic(() => import('@/components/ui/theme-customizer').then(mod => ({ default: mod.ThemeProvider })), {
  ssr: false
})

function EnhancedScene3D() {
  return (
    <>
      <Environment preset="night" />
      <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade />
      
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.2} />
      <pointLight position={[-10, -10, -10]} color="#4f46e5" intensity={0.8} />
      <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={1} castShadow />
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5} position={[0, 0, 0]}>
        <LiquidSphere />
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3} position={[3, 0, -2]}>
        <AnimatedSphere />
      </Float>
      
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.4} position={[-3, 0, -2]}>
        <NeuralNetwork />
      </Float>
      
      <ParticleField />
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        enableDamping={true}
        dampingFactor={0.05}
      />
    </>
  )
}

// Mobile-optimized 3D scene with reduced complexity
function MobileScene3D() {
  return (
    <>
      <Environment preset="night" />
      <Stars radius={200} depth={30} count={5000} factor={4} saturation={0} fade />
      
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={0.8} />
      
      <Float speed={1} rotationIntensity={0.3} floatIntensity={0.3} position={[0, 0, 0]}>
        <LiquidSphere />
      </Float>
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        autoRotate
        autoRotateSpeed={0.3}
      />
    </>
  )
}

export default function Portfolio() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  
  // Modal state management
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
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
    { name: 'OpenAI/GPT', icon: <SiOpenai /> },
    { name: 'Python', icon: <FaPython /> },
    { name: 'Next.js', icon: <SiNextdotjs /> },
    { name: 'TypeScript', icon: <SiTypescript /> },
    { name: 'Supabase', icon: <SiSupabase /> },
    { name: 'Streamlit', icon: <SiStreamlit /> },
    { name: 'Three.js', icon: <FaCode /> },
    { name: 'AI/ML', icon: <FaDatabase /> },
  ]

  const projects = [
    {
      id: "3d-ai-companion",
      title: "Humanized 3D AI Companion",
      description: "Web-based 3D AI avatar using Three.js for real-time rendering and emotion-aware GPT agents. Integrated Supabase for adaptive memory and deployed across devices for education and storytelling.",
      tech: ["Three.js", "GPT", "Supabase", "LangChain", "MediaPipe"],
      color: "from-cyan-500 to-blue-600",
      category: "AI & 3D Development",
      duration: "6 months",
      status: "Completed"
    },
    {
      id: "personality-detection",
      title: "Personality Detection Using AI & ML",
      description: "Built a comprehensive social media-based personality predictor using advanced sentiment analysis and classification algorithms in Python with real-time data processing.",
      tech: ["Python", "NLP", "Machine Learning", "Sentiment Analysis"],
      color: "from-purple-500 to-pink-600",
      category: "Machine Learning",
      duration: "4 months",
      status: "Completed"
    },
    {
      id: "blockchain-chat",
      title: "Blockchain-Based Chat Application",
      description: "Created a decentralized chat platform using Solidity and JavaScript with smart contracts, end-to-end encryption, and distributed architecture for enhanced privacy.",
      tech: ["Solidity", "JavaScript", "Blockchain", "Smart Contracts"],
      color: "from-emerald-500 to-teal-600",
      category: "Blockchain Development",
      duration: "5 months",
      status: "Completed"
    }
  ]

  return (
    <ThemeProvider>
      <LanguageProvider>
        <main className="min-h-screen bg-black text-white overflow-hidden safe-area-left safe-area-right">
          <ScrollProgress />
          <div className="hidden md:block">
            <CustomCursor />
            <ParticleCursor />
          </div>
          <FloatingNav />
          <LoadingScreen />
          <GradientOrbs />
          <GalaxyBackground />
          <BackgroundEffects />
          <FloatingElements />
          
          {/* AI Assistant Sidebar */}
          <GeminiSidebar />

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-10">
          <div className="canvas-container">
            <Canvas 
              camera={{ position: [0, 0, 8], fov: 45 }}
              dpr={isMobile ? 1 : [1, 2]}
              performance={{ min: 0.5 }}
              gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }}
            >
              <Suspense fallback={null}>
                {isMobile ? <MobileScene3D /> : <EnhancedScene3D />}
              </Suspense>
            </Canvas>
          </div>
        </motion.div>

        <div className="relative z-20 text-center px-4 sm:px-6 max-w-6xl mx-auto safe-area-top safe-area-bottom pt-20 md:pt-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="pt-safe"
          >
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-10 sm:-translate-y-20">
              <MorphingShape className="w-20 h-20 sm:w-32 sm:h-32" />
            </div>
            
            {/* Profile Photo */}
            <motion.div
              className="mb-6 sm:mb-8 relative z-30"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <ProfilePhoto />
            </motion.div>
            
            {/* Add back the name with enhanced styling */}
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl mb-4 tracking-tight text-center px-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              style={{
                fontFamily: '"Orbitron", "Exo 2", "Space Grotesk", "Inter", sans-serif',
                fontWeight: 900,
                letterSpacing: '-0.05em',
                textTransform: 'uppercase',
              }}
            >
              <span 
                className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 bg-clip-text text-transparent"
                style={{
                  WebkitTextStroke: '2px rgba(255,255,255,0.08)',
                  textShadow: `
                    0 0 20px rgba(34,211,238,0.3),
                    0 0 40px rgba(59,130,246,0.2),
                    0 0 60px rgba(168,85,247,0.1)
                  `,
                  filter: 'drop-shadow(0 4px 20px rgba(34,211,238,0.25))',
                }}
              >
                Akshay Kumar S
              </span>
            </motion.h1>
            
            <div className="mb-6 sm:mb-8 px-2">
              <TypewriterText />
            </div>
            
            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              AI & Data Science Engineer specializing in GPT-driven product design and 
              real-time intelligent systems. Passionate about creating innovative solutions that matter.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <MagneticButton href="#projects" className="w-full sm:w-auto">
                <FaCode className="mr-2" />
                View Projects
              </MagneticButton>
              
              <MagneticButton href="#contact" className="w-full sm:w-auto">
                <FaEnvelope className="mr-2" />
                Get In Touch
              </MagneticButton>
              
              <MagneticButton href="/CV.pdf" download="Akshay_Kumar_S_CV.pdf" className="w-full sm:w-auto">
                <FaDownload className="mr-2" />
                Download CV
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-pulse" />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-6xl font-bold text-center mb-8 sm:mb-16 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            About Me
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <GlowCard>
                <h3 className="text-2xl font-bold mb-6 text-cyan-400">AI & Data Science Engineer</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  AI & Data Science Engineer with a unique focus on GPT-based workflows, AI-driven product design,
                  and real-time interaction systems. Experienced in building intelligent applications using OpenAI,
                  Hugging Face, Supabase, and MediaPipe.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Skilled in structured prompt engineering, educational AI use cases, and creating multilingual 
                  learning experiences that bridge technology and human interaction.
                </p>
              </GlowCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">AI Projects Completed</span>
                <AnimatedCounter value={15} duration={2} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">GPT Integrations</span>
                <AnimatedCounter value={8} duration={2} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Years in AI/ML</span>
                <AnimatedCounter value={3} duration={2} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Skills & Technologies
          </motion.h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {skills.map((skill) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <SkillCard 
                  skill={skill.name}
                  icon={skill.icon}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-12 sm:py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-6xl font-bold text-center mb-8 sm:mb-16 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Featured Projects
          </motion.h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <InteractiveCard>
                  <div className={`h-48 rounded-lg bg-gradient-to-br ${project.color} opacity-80 mb-6 flex items-center justify-center cursor-pointer group`}
                    onClick={() => handleProjectClick(project.id)}
                  >
                    <FaCode className="text-4xl text-white group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">{project.category}</span>
                    <button 
                      onClick={() => handleProjectClick(project.id)}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:scale-105 transition-transform duration-300 text-sm font-medium"
                    >
                      View Details →
                    </button>
                  </div>
                </InteractiveCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-6xl font-bold text-center mb-8 sm:mb-16 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Let&apos;s Connect
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <GlowCard>
                <h3 className="text-2xl font-bold mb-6 text-cyan-400">Get In Touch</h3>
                <p className="text-gray-300 mb-8">
                  Ready to bring your ideas to life? Let&apos;s discuss your next project 
                  and create something amazing together.
                </p>
                
                <div className="space-y-4">
                  <motion.a
                    href="mailto:akshaynayaks9845@gmail.com"
                    className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaEnvelope className="text-cyan-400 text-xl group-hover:scale-110 transition-transform" />
                    <span>akshaynayaks9845@gmail.com</span>
                  </motion.a>
                  
                  <motion.a
                    href="https://wa.me/919845233716?text=Hi%20Akshay,%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaWhatsapp className="text-green-400 text-xl group-hover:scale-110 transition-transform" />
                    <span>+91 98452 33716</span>
                  </motion.a>
                  
                  <motion.a
                    href="tel:+919845233716"
                    className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaPhone className="text-blue-400 text-xl group-hover:scale-110 transition-transform" />
                    <span>+91 98452 33716</span>
                  </motion.a>
                  
                  <motion.div
                    className="flex items-center space-x-4 p-4 rounded-xl bg-white/5"
                  >
                    <FaMapMarkerAlt className="text-red-400 text-xl" />
                    <span>Bangalore, India</span>
                  </motion.div>
                </div>
              </GlowCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-cyan-400">Social Links</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <MagneticButton
                  href="https://linkedin.com/in/akshaykumar-s-2700772a3"
                  className="flex items-center justify-center space-x-2 bg-blue-600/20 hover:bg-blue-600/30"
                >
                  <FaLinkedin />
                  <span>LinkedIn</span>
                </MagneticButton>
                
                <MagneticButton
                  href="https://github.com/akshaykumar"
                  className="flex items-center justify-center space-x-2 bg-gray-600/20 hover:bg-gray-600/30"
                >
                  <FaGithub />
                  <span>GitHub</span>
                </MagneticButton>
                
                <MagneticButton
                  href="https://wa.me/919845233716?text=Hi%20Akshay,%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect!"
                  className="flex items-center justify-center space-x-2 bg-green-600/20 hover:bg-green-600/30 col-span-2"
                >
                  <FaWhatsapp />
                  <span>WhatsApp</span>
                </MagneticButton>
              </div>
              
              <div className="mt-8">
                <CSSHologramEffect />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Message/Feedback Section */}
      <section className="py-16 px-4 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Leave a Message
            </h2>
            <p className="text-gray-300 text-lg">
              Have feedback, questions, or want to collaborate? Drop me a message below!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-900/50 backdrop-blur-md border border-gray-700 rounded-2xl p-8"
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
