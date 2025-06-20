'use client'

import { motion } from 'framer-motion'
import { FaArrowLeft, FaGithub, FaExternalLinkAlt, FaCalendar, FaClock, FaCheckCircle } from 'react-icons/fa'
import { BackgroundEffects } from '@/components/ui/background-effects'
import { GradientOrbs } from '@/components/ui/gradient-orbs'
import { CustomCursor } from '@/components/ui/custom-cursor'
import { ParticleCursor } from '@/components/ui/particle-cursor'
import { use } from 'react'

// Project data - In a real app, this would come from an API or database
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
    results: [
      "95% user satisfaction rate in beta testing",
      "Sub-100ms response time for real-time interactions",
      "Successfully deployed across 5 different platforms",
      "Featured in 3 tech conferences"
    ],
    images: [
      "/projects/3d-ai/main.jpg",
      "/projects/3d-ai/interface.jpg",
      "/projects/3d-ai/avatar.jpg"
    ],
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
    images: [
      "/projects/personality/dashboard.jpg",
      "/projects/personality/analysis.jpg",
      "/projects/personality/reports.jpg"
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
    images: [
      "/projects/blockchain/chat-interface.jpg",
      "/projects/blockchain/smart-contracts.jpg",
      "/projects/blockchain/security.jpg"
    ],
    demoUrl: "https://demo.blockchain-chat.com",
    githubUrl: "https://github.com/akshay/blockchain-chat"
  }
}

interface ProjectDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const resolvedParams = use(params)
  const project = projectsData[resolvedParams.id as keyof typeof projectsData]

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-gray-400 mb-8">The project you're looking for doesn't exist.</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden cursor-none">
      <CustomCursor />
      <ParticleCursor />
      <BackgroundEffects />
      <GradientOrbs />

      {/* Navigation */}
      <motion.nav 
        className="fixed top-6 left-6 z-50"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <button
          onClick={() => window.location.href = '/'}
          className="flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-md border border-cyan-400/30 rounded-lg text-cyan-400 hover:bg-cyan-400/10 transition-colors"
        >
          <FaArrowLeft /> Back to Portfolio
        </button>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex justify-center items-center gap-4 mb-6">
              <span className={`px-3 py-1 bg-gradient-to-r ${project.color} text-white rounded-full text-sm font-medium`}>
                {project.category}
              </span>
              <span className="flex items-center gap-1 text-gray-400 text-sm">
                <FaClock className="w-3 h-3" />
                {project.duration}
              </span>
              <span className="flex items-center gap-1 text-green-400 text-sm">
                <FaCheckCircle className="w-3 h-3" />
                {project.status}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              {project.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              {project.subtitle}
            </p>

            <div className="flex justify-center gap-4 mb-12">
              {project.demoUrl && (
                <motion.a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:scale-105 transition-transform duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaExternalLinkAlt /> View Live Demo
                </motion.a>
              )}
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:border-cyan-400 hover:text-cyan-400 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub /> View Code
                </motion.a>
              )}
            </div>
          </motion.div>

          {/* Project Images */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 mb-16"
          >
            {project.images.map((image, index) => (
              <div key={index} className="relative group">
                <div className={`aspect-video bg-gradient-to-br ${project.color} rounded-lg opacity-80 flex items-center justify-center`}>
                  <span className="text-white font-medium">Project Image {index + 1}</span>
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors rounded-lg" />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h2 className="text-3xl font-bold mb-6 text-cyan-400">Project Overview</h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  {project.description}
                </p>
                <p className="text-gray-300 text-lg leading-relaxed mb-12">
                  {project.longDescription}
                </p>

                <h3 className="text-2xl font-bold mb-6 text-cyan-400">Key Features</h3>
                <ul className="space-y-3 mb-12">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-2xl font-bold mb-6 text-cyan-400">Challenges & Solutions</h3>
                <ul className="space-y-3 mb-12">
                  {project.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-3 flex-shrink-0" />
                      <span className="text-gray-300">{challenge}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-2xl font-bold mb-6 text-cyan-400">Results & Impact</h3>
                <ul className="space-y-3">
                  {project.results.map((result, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">{result}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="sticky top-24"
              >
                <div className="bg-gray-900/50 backdrop-blur-md border border-gray-700 rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-bold mb-6 text-cyan-400">Technologies Used</h3>
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

                <div className="bg-gray-900/50 backdrop-blur-md border border-gray-700 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-6 text-cyan-400">Project Info</h3>
                  <div className="space-y-4">
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
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-white">Interested in Similar Projects?</h2>
            <p className="text-gray-300 text-lg mb-8">
              Let's discuss how we can bring your ideas to life with cutting-edge technology.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => window.location.href = '/#contact'}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:scale-105 transition-transform duration-300"
              >
                Get In Touch
              </button>
              <button
                onClick={() => window.location.href = '/#projects'}
                className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:border-cyan-400 hover:text-cyan-400 transition-colors"
              >
                View More Projects
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
