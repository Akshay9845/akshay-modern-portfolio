'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaGithub, FaExternalLinkAlt, FaCalendar, FaClock, FaCheckCircle } from 'react-icons/fa'
import { useEffect } from 'react'

// Project data
const projectsData = {
  "3d-ai-companion": {
    id: "3d-ai-companion",
    title: "Humanized 3D AI Companion",
    subtitle: "Interactive AI Avatar with Real-time Emotion Recognition",
    description: "A cutting-edge web application featuring a fully interactive 3D AI avatar capable of real-time conversations, emotion recognition, and adaptive learning. Built using Three.js for stunning 3D graphics and GPT-4 for intelligent responses.",
    longDescription: "This project represents the future of human-AI interaction through immersive 3D technology. The AI companion uses advanced emotion recognition to respond appropriately to user moods and maintains conversation context through Supabase's real-time database. The avatar features realistic facial animations, gesture recognition, and can be deployed across multiple platforms including web, mobile, and VR environments.",
    tech: ["Three.js", "GPT-4", "Supabase", "LangChain", "MediaPipe", "WebGL", "Node.js", "TypeScript"],
    category: "AI & 3D Development",
    duration: "6 months",
    status: "Completed",
    color: "from-cyan-500 to-blue-600",
    features: [
      "Real-time 3D avatar rendering with facial animations",
      "Emotion recognition using MediaPipe",
      "Adaptive conversation memory with Supabase",
      "Multi-platform deployment (Web, Mobile, VR)",
      "Voice recognition and text-to-speech",
      "Gesture-based interaction system"
    ],
    challenges: [
      "Optimizing 3D rendering performance across devices",
      "Implementing real-time emotion recognition",
      "Creating seamless conversation flow with memory retention",
      "Ensuring cross-platform compatibility"
    ],
    // No results yet - project still in development/testing phase
    results: [],
    demoUrl: "https://demo.3dai-companion.com",
    githubUrl: "https://github.com/akshay/3d-ai-companion"
  },
  "personality-detection": {
    id: "personality-detection",
    title: "Personality Detection Using AI & ML",
    subtitle: "Advanced Social Media Personality Analysis",
    description: "An intelligent system that analyzes social media behavior patterns to predict personality traits using advanced NLP and machine learning algorithms.",
    longDescription: "This comprehensive personality detection system leverages state-of-the-art natural language processing to analyze social media posts, comments, and interactions. Using the Big Five personality model, the system provides accurate personality insights with 87% accuracy rate. The platform processes multiple data sources and provides detailed personality reports with actionable insights.",
    tech: ["Python", "TensorFlow", "NLTK", "Scikit-learn", "Pandas", "Flask", "PostgreSQL", "Docker"],
    category: "Machine Learning",
    duration: "4 months",
    status: "Completed",
    color: "from-purple-500 to-pink-600",
    features: [
      "Multi-platform social media data analysis",
      "Big Five personality model implementation",
      "Sentiment analysis with 87% accuracy",
      "Real-time personality scoring",
      "Detailed personality reports generation",
      "API for third-party integrations"
    ],
    challenges: [
      "Handling diverse social media data formats",
      "Ensuring privacy and data protection",
      "Achieving high accuracy across different demographics",
      "Optimizing model performance for real-time analysis"
    ],
    results: [
      "87% accuracy in personality prediction",
      "Processed over 1M social media profiles",
      "Reduced analysis time from hours to minutes",
      "Successfully integrated with 3 major platforms"
    ],
    demoUrl: "https://demo.personality-ai.com",
    githubUrl: "https://github.com/akshay/personality-detection"
  },
  "blockchain-chat": {
    id: "blockchain-chat",
    title: "Blockchain-Based Chat Application",
    subtitle: "Decentralized Secure Communication Platform",
    description: "A revolutionary chat application built on blockchain technology featuring end-to-end encryption, smart contracts, and complete user privacy.",
    longDescription: "This decentralized chat platform reimagines secure communication by leveraging blockchain technology. Every message is encrypted and stored on a distributed network, ensuring complete privacy and security. Smart contracts handle user authentication, message routing, and payment systems. The application supports group chats, file sharing, and cryptocurrency transactions within the chat interface.",
    tech: ["Solidity", "Ethereum", "Web3.js", "React", "IPFS", "MetaMask", "Truffle", "Node.js"],
    category: "Blockchain Development",
    duration: "5 months",
    status: "Completed",
    color: "from-emerald-500 to-teal-600",
    features: [
      "End-to-end encryption for all messages",
      "Smart contract-based user authentication",
      "Decentralized file storage using IPFS",
      "Cryptocurrency payment integration",
      "Group chat with admin controls",
      "Self-destructing messages"
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
    demoUrl: "https://demo.blockchain-chat.com",
    githubUrl: "https://github.com/akshay/blockchain-chat"
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
                </div>
              </div>

              {/* Project Images */}
              <div className="p-8 border-b border-gray-700">
                <div className="grid md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((index) => (
                    <div key={index} className="relative group">
                      <div className={`aspect-video bg-gradient-to-br ${project.color} rounded-lg opacity-60 flex items-center justify-center`}>
                        <span className="text-white font-medium">Project Screenshot {index}</span>
                      </div>
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors rounded-lg" />
                    </div>
                  ))}
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
