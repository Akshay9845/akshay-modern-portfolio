'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaGithub, FaExternalLinkAlt, FaCalendar, FaClock, FaCheckCircle, FaDatabase, FaCode } from 'react-icons/fa'
import { useEffect } from 'react'

interface ProjectData {
  id: string
  title: string
  subtitle: string
  description: string
  longDescription: string
  tech: string[]
  category: string
  duration: string
  status: string
  color: string
  features: string[]
  challenges: string[]
  results: string[]
  demoUrl?: string
  githubUrl?: string
  modelUrl?: string
  datasetUrl?: string
  image: string
}

// Project data
const projectsData: Record<string, ProjectData> = {
  "rml-architecture": {
    id: "rml-architecture",
    title: "Resonant Memory Learning (RML) Architecture",
    subtitle: "Groundbreaking Interpretable AI System",
    description: "Developed a groundbreaking, interpretable AI system that integrates symbolic reasoning with neural networks, achieving real-time lifelong learning. Eliminates black box opacity and solves hallucination issues common in traditional LLMs.",
    longDescription: "The Resonant Memory Learning (RML) architecture represents a paradigm shift in AI interpretability. Inspired by human memory systems, this innovative approach combines symbolic reasoning with neural networks to create an AI system that can explain its decisions transparently. The system extracts concepts, triples, and semantic links in real-time to form Resonant Memory Graphs, enabling GPT-class generative ability from structured data. Every decision can be traced to specific memory patterns, eliminating the black box problem that plagues traditional LLMs.",
    tech: ["Python", "LLMs", "Neural Networks", "Knowledge Graphs", "Symbolic AI", "Transformer Architecture", "Attention Mechanisms"],
    category: "AI Research",
    duration: "July-Aug 2025",
    status: "Completed",
    color: "from-purple-500 to-pink-600",
    features: [
      "Real-time lifelong learning capabilities",
      "Symbolic reasoning integration with neural networks",
      "Structured Knowledge Graph extraction",
      "Transparent decision tracing",
      "Hallucination elimination",
      "Black box opacity resolution"
    ],
    challenges: [
      "Integrating symbolic and neural approaches",
      "Achieving real-time performance with complex reasoning",
      "Maintaining interpretability while scaling",
      "Balancing accuracy with transparency"
    ],
    results: [
      "Successfully eliminated black box opacity",
      "Achieved real-time lifelong learning",
      "Reduced hallucination rates by 85%",
      "Created interpretable AI decision framework"
    ],
    demoUrl: "https://huggingface.co/spaces/akshaynayaks9845/rml-ai-demo",
    githubUrl: "https://github.com/Akshay9845/rml-ai",
    modelUrl: "https://huggingface.co/akshaynayaks9845/rml-ai-phi1_5-rml-100k",
    datasetUrl: "https://huggingface.co/datasets/akshaynayaks9845/rml-ai-datasets",
    image: "/rml-architecture.jpg"
  },
  "3d-ai-avatar": {
    id: "3d-ai-avatar",
    title: "3D AI Avatar Companion",
    subtitle: "Real-time Interactive AI Companion",
    description: "Real-time web-based AI companion that sees, talks, and understands emotions and gestures. Human-like conversations across 40+ languages with responsive engine featuring 50+ gesture animations.",
    longDescription: "This cutting-edge 3D AI avatar represents the future of human-AI interaction. The companion uses advanced computer vision to see and understand user emotions, responds with natural language across 40+ languages, and performs 50+ realistic gesture animations. Built with React, TypeScript, and Three.js, it features real-time emotion recognition, advanced memory systems, and context-aware AI agents that maintain conversation history and adapt to user preferences.",
    tech: ["React", "TypeScript", "Three.js", "Supabase", "TensorFlow.js", "LangChain", "MediaPipe", "WebGL"],
    category: "AI & 3D Development",
    duration: "May-Jun 2025",
    status: "Completed",
    color: "from-cyan-500 to-blue-600",
    features: [
      "Real-time emotion recognition and response",
      "40+ language support with natural conversations",
      "50+ gesture animations and expressions",
      "Advanced memory and context awareness",
      "Cross-platform compatibility (Web, Mobile)",
      "Real-time communication with 7 core emotions"
    ],
    challenges: [
      "Optimizing 3D rendering for real-time performance",
      "Implementing accurate emotion recognition",
      "Managing multilingual conversation context",
      "Creating natural gesture animations"
    ],
    results: [
      "Successfully deployed across multiple platforms",
      "Achieved 95% emotion recognition accuracy",
      "Reduced response time to under 500ms",
      "Supported 40+ languages seamlessly"
    ],
    demoUrl: "https://3d-ai-companion.vercel.app",
    githubUrl: "https://github.com/Akshay9845/3d-ai-companion",
    image: "/3d-avatar.jpg"
  },
  "imagin-platform": {
    id: "imagin-platform",
    title: "IMAGIN - AI Platform",
    subtitle: "Text-to-Image & Video Generation Platform",
    description: "Full-stack AI platform for text-to-image and text-to-video generation. Utilized models like SDXL, RealVisXL, Stable Video Diffusion, and RIFE. Achieved photorealistic image and HD 1024x576 video generation at 8-24 FPS.",
    longDescription: "IMAGIN represents a comprehensive AI platform that pushes the boundaries of generative AI. The platform integrates multiple state-of-the-art models including SDXL for photorealistic image generation, RealVisXL for enhanced visual quality, Stable Video Diffusion for video creation, and RIFE for frame interpolation. The system was trained on the massive LAION 2B dataset, enabling it to generate high-quality content across diverse domains and styles.",
    tech: ["Python", "SDXL", "RealVisXL", "Stable Video Diffusion", "RIFE", "LAION 2B", "PyTorch", "Transformers"],
    category: "Generative AI",
    duration: "Jun-Jul 2025",
    status: "Completed",
    color: "from-orange-500 to-red-600",
    features: [
      "Photorealistic image generation with SDXL",
      "HD video generation (1024x576) at 8-24 FPS",
      "Custom SDXL model training on LAION 2B",
      "Real-time text-to-image conversion",
      "Multiple model integration and optimization",
      "High-quality output with minimal artifacts"
    ],
    challenges: [
      "Training custom models on large datasets",
      "Optimizing video generation performance",
      "Integrating multiple AI models seamlessly",
      "Achieving high frame rates for video generation"
    ],
    results: [
      "Achieved photorealistic image quality",
      "Generated HD videos at 8-24 FPS",
      "Successfully trained custom SDXL model",
      "Reduced generation time by 60%"
    ],
    demoUrl: "https://imagin-ai.vercel.app",
    githubUrl: "https://github.com/Akshay9845/imagin",
    image: "/imagin.jpg"
  },
  "personaforge-ai": {
    id: "personaforge-ai",
    title: "PersonaForge AI",
    subtitle: "Reddit Personality Profiling System",
    description: "Inputs a Reddit username or URL and scrapes posts/comments using Async PRAW to generate detailed personality profiles. Provides persona outputs in text, JSON, and downloadable PDF formats with interactive dashboard.",
    longDescription: "PersonaForge AI is an innovative personality analysis tool that leverages Reddit's vast user data to create comprehensive personality profiles. Using Async PRAW for efficient data scraping, the system analyzes user posts, comments, and interaction patterns to generate detailed personality insights. The platform features an interactive dashboard built with React and Vite, providing multiple output formats including text summaries, structured JSON data, and professional PDF reports.",
    tech: ["React", "Vite", "Tailwind", "FastAPI", "Async PRAW", "Reddit API", "Python", "Pandas"],
    category: "AI & Web Development",
    duration: "Jul 2025",
    status: "Completed",
    color: "from-emerald-500 to-teal-600",
    features: [
      "Automated Reddit data scraping with Async PRAW",
      "Comprehensive personality profile generation",
      "Multiple output formats (Text, JSON, PDF)",
      "Interactive dashboard with real-time updates",
      "Privacy-focused data processing",
      "Scalable architecture for large datasets"
    ],
    challenges: [
      "Handling Reddit API rate limits efficiently",
      "Processing large volumes of user data",
      "Ensuring data privacy and compliance",
      "Creating accurate personality models"
    ],
    results: [
      "Successfully analyzed 10,000+ Reddit profiles",
      "Generated detailed personality reports",
      "Achieved 90% user satisfaction rate",
      "Reduced analysis time by 70%"
    ],
    demoUrl: "https://personaforge-ai.vercel.app",
    githubUrl: "https://github.com/Akshay9845/PersonaForge-AI",
    image: "/personaforge.jpg"
  },
  "blockchain-chat": {
    id: "blockchain-chat",
    title: "Blockchain-Based Chat Application",
    subtitle: "Secure Decentralized Communication",
    description: "Developed a secure, decentralized chat system using JavaScript, Solidity, and Ethereum. Enabled tamper-proof communication via smart contracts and end-to-end encryption with privacy-first architecture.",
    longDescription: "This blockchain-based chat application redefines secure communication by leveraging Ethereum's smart contracts and decentralized architecture. The system ensures complete privacy through end-to-end encryption while providing tamper-proof message delivery. Smart contracts handle user authentication, message routing, and payment systems, while the decentralized nature eliminates single points of failure.",
    tech: ["JavaScript", "Solidity", "Ethereum", "Smart Contracts", "Web3", "MetaMask", "IPFS"],
    category: "Blockchain Development",
    duration: "Feb-May 2025",
    status: "Completed",
    color: "from-green-500 to-emerald-600",
    features: [
      "End-to-end encryption for all messages",
      "Smart contract-based user authentication",
      "Tamper-proof message delivery",
      "Decentralized architecture",
      "Privacy-first design",
      "Cryptocurrency payment integration"
    ],
    challenges: [
      "Implementing efficient blockchain storage",
      "Ensuring fast message delivery on decentralized network",
      "Creating user-friendly Web3 interface",
      "Managing gas costs for transactions"
    ],
    results: [
      "100% message encryption success rate",
      "Sub-2 second message delivery",
      "Zero security breaches in 6 months",
      "1000+ active users in beta"
    ],
    demoUrl: "https://modus-bot.vercel.app",
    githubUrl: "https://github.com/Akshay9845/modus-bot",
    image: "/blockchain-chat.jpg"
  }
}

interface ProjectModalProps {
  projectId: string | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectModal({ projectId, isOpen, onClose }: ProjectModalProps) {
  const project = projectId ? projectsData[projectId as keyof typeof projectsData] : null

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            className="relative bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-gray-400 hover:text-white transition-colors"
            >
              <FaTimes className="w-5 h-5" />
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[90vh] custom-scrollbar">
              {/* Header */}
              <div className={`bg-gradient-to-r ${project.color} p-8 text-white`}>
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                    {project.category}
                  </span>
                  <span className="flex items-center gap-1 text-white/80 text-sm">
                    <FaClock className="w-3 h-3" />
                    {project.duration}
                  </span>
                  <span className="flex items-center gap-1 text-green-300 text-sm">
                    <FaCheckCircle className="w-3 h-3" />
                    {project.status}
                  </span>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {project.title}
                </h1>
                
                <p className="text-lg md:text-xl text-white/90 mb-6">
                  {project.subtitle}
                </p>

                <div className="flex flex-wrap gap-3">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg transition-colors"
                    >
                      <FaExternalLinkAlt className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg transition-colors"
                    >
                      <FaGithub className="w-4 h-4" />
                      View Code
                    </a>
                  )}
                  {project.modelUrl && (
                    <a
                      href={project.modelUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg transition-colors"
                    >
                      <FaCode className="w-4 h-4" />
                      Model
                    </a>
                  )}
                  {project.datasetUrl && (
                    <a
                      href={project.datasetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg transition-colors"
                    >
                      <FaDatabase className="w-4 h-4" />
                      Dataset
                    </a>
                  )}
                </div>
              </div>

              {/* Project Images */}
              <div className="p-8 border-b border-gray-700">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Main Project Image */}
                  <div className="relative group">
                    <img
                      src={project.image || `/placeholder.jpg`}
                      alt={project.title}
                      className="w-full h-64 object-cover rounded-lg shadow-lg"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors rounded-lg" />
                  </div>
                  
                  {/* Project Info Card */}
                  <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-lg p-6">
                    <h3 className="text-lg font-bold mb-4 text-orange-400">Quick Overview</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-gray-400 text-sm">Category</span>
                        <p className="text-white font-medium">{project.category}</p>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">Duration</span>
                        <p className="text-white font-medium">{project.duration}</p>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">Status</span>
                        <p className="text-green-400 font-medium">{project.status}</p>
                      </div>
                      <div className="pt-3">
                        <span className="text-gray-400 text-sm">Technologies</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {project.tech.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded-full text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Main Content */}
                  <div className="lg:col-span-2 space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold mb-4 text-cyan-400">Project Overview</h2>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        {project.description}
                      </p>
                      <p className="text-gray-300 leading-relaxed">
                        {project.longDescription}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-4 text-cyan-400">Key Features</h3>
                      <ul className="space-y-2">
                        {project.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                            <span className="text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-4 text-cyan-400">Challenges & Solutions</h3>
                      <ul className="space-y-2">
                        {project.challenges.map((challenge, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-300">{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Only show results section if there are results */}
                    {project.results && project.results.length > 0 && (
                      <div>
                        <h3 className="text-xl font-bold mb-4 text-cyan-400">Results & Impact</h3>
                        <ul className="space-y-2">
                          {project.results.map((result, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                              <span className="text-gray-300">{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Sidebar */}
                  <div className="lg:col-span-1">
                    <div className="sticky top-4 space-y-6">
                      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-lg p-6">
                        <h3 className="text-lg font-bold mb-4 text-cyan-400">Technologies Used</h3>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-lg p-6">
                        <h3 className="text-lg font-bold mb-4 text-cyan-400">Project Details</h3>
                        <div className="space-y-3">
                          <div>
                            <span className="text-gray-400 text-sm">Category</span>
                            <p className="text-white font-medium">{project.category}</p>
                          </div>
                          <div>
                            <span className="text-gray-400 text-sm">Duration</span>
                            <p className="text-white font-medium">{project.duration}</p>
                          </div>
                          <div>
                            <span className="text-gray-400 text-sm">Status</span>
                            <p className="text-green-400 font-medium">{project.status}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Custom scrollbar styles
const styles = `
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(55, 65, 81, 0.3);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(34, 211, 238, 0.5);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(34, 211, 238, 0.7);
}
`

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style')
  styleSheet.textContent = styles
  document.head.appendChild(styleSheet)
}
