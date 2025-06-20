'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaRobot, FaTimes, FaPaperPlane, FaUser, FaCode, FaBrain, FaLightbulb } from 'react-icons/fa'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface AkshayKnowledgeBase {
  personal: {
    name: string
    title: string
    location: string
    expertise: string[]
    experience: string
    education: string
    interests: string[]
  }
  projects: {
    [key: string]: {
      title: string
      description: string
      technologies: string[]
      features: string[]
      challenges: string[]
      architecture: string
      designPatterns: string[]
      authentication: string
      dataVisualization: string[]
      performance: string[]
      deployment: string
      realTimeFeatures: string[]
    }
  }
  skills: {
    technical: string[]
    ai: string[]
    frontend: string[]
    backend: string[]
    databases: string[]
    cloud: string[]
    tools: string[]
  }
  designPrinciples: {
    uiux: string[]
    responsive: string[]
    accessibility: string[]
    performance: string[]
  }
}

const akshayKB: AkshayKnowledgeBase = {
  personal: {
    name: "Akshay Kumar S",
    title: "AI & Data Science Engineer",
    location: "India",
    expertise: ["GPT-driven product design", "Real-time intelligent systems", "3D web applications", "Machine Learning"],
    experience: "Specializing in creating innovative AI solutions with focus on user experience and cutting-edge technology",
    education: "Computer Science with specialization in AI/ML",
    interests: ["Artificial Intelligence", "3D Graphics", "Blockchain Technology", "Open Source Development"]
  },
  projects: {
    "3d-ai-companion": {
      title: "Humanized 3D AI Companion",
      description: "Interactive 3D AI avatar with real-time emotion recognition and conversation capabilities",
      technologies: ["Three.js", "GPT-4", "Supabase", "LangChain", "MediaPipe", "WebGL", "Node.js", "TypeScript"],
      features: ["Real-time 3D rendering", "Emotion recognition", "Voice interaction", "Adaptive memory", "Multi-platform support"],
      challenges: ["3D performance optimization", "Real-time emotion processing", "Cross-platform compatibility", "Memory management"],
      architecture: "Microservices architecture with real-time WebSocket connections, 3D rendering engine, and AI processing pipeline",
      designPatterns: ["Observer pattern for state management", "Factory pattern for 3D object creation", "Singleton for WebGL context"],
      authentication: "JWT-based authentication with OAuth2 integration for social logins",
      dataVisualization: ["Real-time emotion tracking charts", "3D performance metrics", "User interaction heatmaps"],
      performance: ["WebGL optimization", "Asset streaming", "Memory pooling", "LOD (Level of Detail) rendering"],
      deployment: "Docker containerization with Kubernetes orchestration, CI/CD with GitHub Actions",
      realTimeFeatures: ["Live conversation sync", "Emotion state broadcasting", "Multi-user avatar interactions"]
    },
    "personality-detection": {
      title: "Personality Detection Using AI & ML",
      description: "Social media personality analysis using advanced NLP and Big Five model",
      technologies: ["Python", "TensorFlow", "NLTK", "Scikit-learn", "Pandas", "Flask", "PostgreSQL", "Docker"],
      features: ["Multi-platform analysis", "Big Five personality scoring", "Real-time processing", "API integration"],
      challenges: ["Data privacy compliance", "Multi-language support", "Accuracy optimization", "Scalable processing"],
      architecture: "Event-driven microservices with ML pipeline, data ingestion layer, and RESTful API gateway",
      designPatterns: ["Pipeline pattern for ML processing", "Strategy pattern for different social platforms", "Observer for real-time updates"],
      authentication: "OAuth 2.0 with PKCE for social media platform integration, role-based access control",
      dataVisualization: ["Personality radar charts", "Sentiment analysis graphs", "Accuracy metrics dashboards", "User behavior analytics"],
      performance: ["Batch processing optimization", "Caching with Redis", "Database indexing", "Asynchronous processing"],
      deployment: "AWS ECS with auto-scaling, CloudFormation for infrastructure as code",
      realTimeFeatures: ["Live personality scoring", "Real-time sentiment tracking", "Progressive analysis updates"]
    },
    "blockchain-chat": {
      title: "Blockchain-Based Chat Application",
      description: "Decentralized secure communication platform with smart contracts",
      technologies: ["Solidity", "Ethereum", "Web3.js", "React", "IPFS", "MetaMask", "Truffle", "Node.js"],
      features: ["End-to-end encryption", "Smart contract authentication", "Decentralized storage", "Cryptocurrency payments"],
      challenges: ["Gas optimization", "User experience design", "Network scalability", "Security auditing"],
      architecture: "Decentralized architecture with smart contracts, IPFS storage, and Web3 frontend integration",
      designPatterns: ["Factory pattern for contract deployment", "Proxy pattern for upgradeable contracts", "Event sourcing for message history"],
      authentication: "Web3 wallet-based authentication with MetaMask integration and signature verification",
      dataVisualization: ["Network activity graphs", "Gas usage analytics", "Transaction volume charts", "User engagement metrics"],
      performance: ["Smart contract optimization", "IPFS caching", "State channel implementation", "Batch transaction processing"],
      deployment: "Testnet deployment with Hardhat, mainnet deployment pipeline with security audits",
      realTimeFeatures: ["Instant message delivery", "Real-time transaction status", "Live network monitoring"]
    }
  },
  skills: {
    technical: ["JavaScript/TypeScript", "Python", "Solidity", "React", "Next.js", "Node.js", "Three.js"],
    ai: ["OpenAI GPT", "LangChain", "TensorFlow", "PyTorch", "Computer Vision", "NLP", "Machine Learning"],
    frontend: ["React", "Next.js", "Three.js", "Tailwind CSS", "Framer Motion", "WebGL", "Progressive Web Apps"],
    backend: ["Node.js", "Python Flask", "Express.js", "GraphQL", "RESTful APIs", "Microservices"],
    databases: ["PostgreSQL", "MongoDB", "Supabase", "Redis", "Firebase", "IPFS"],
    cloud: ["AWS", "Docker", "Kubernetes", "Vercel", "Cloudflare", "GitHub Actions"],
    tools: ["Git", "VS Code", "Figma", "Postman", "Jest", "Cypress", "Webpack"]
  },
  designPrinciples: {
    uiux: ["Mobile-first design", "Component-based architecture", "Design systems", "User-centered design", "Accessibility-first"],
    responsive: ["Fluid grids", "Flexible images", "CSS Grid", "Flexbox", "Container queries", "Progressive enhancement"],
    accessibility: ["WCAG 2.1 compliance", "Screen reader support", "Keyboard navigation", "Color contrast", "Focus management"],
    performance: ["Code splitting", "Lazy loading", "Image optimization", "Caching strategies", "Bundle optimization"]
  }
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hi! I'm your AI assistant with comprehensive knowledge about Akshay Kumar S and his projects. I can help you learn about his technical expertise, project architectures, design patterns, and much more. What would you like to know?",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()
    
    // Personal information queries
    if (message.includes('who') || message.includes('about akshay') || message.includes('introduce')) {
      return `${akshayKB.personal.name} is a ${akshayKB.personal.title} based in ${akshayKB.personal.location}. He specializes in ${akshayKB.personal.expertise.join(', ')}. His experience includes ${akshayKB.personal.experience}. He's passionate about ${akshayKB.personal.interests.join(', ')}.`
    }

    // Project-specific queries
    if (message.includes('3d') || message.includes('ai companion')) {
      const project = akshayKB.projects['3d-ai-companion']
      return `The ${project.title} is ${project.description}. It uses technologies like ${project.technologies.slice(0, 5).join(', ')}. Key features include ${project.features.join(', ')}. The architecture follows ${project.architecture}.`
    }

    if (message.includes('personality') || message.includes('detection')) {
      const project = akshayKB.projects['personality-detection']
      return `The ${project.title} project ${project.description}. It achieved 87% accuracy using ${project.technologies.slice(0, 4).join(', ')}. The system processes ${project.features.join(', ')} with ${project.architecture}.`
    }

    if (message.includes('blockchain') || message.includes('chat')) {
      const project = akshayKB.projects['blockchain-chat']
      return `The ${project.title} is ${project.description}. Built with ${project.technologies.slice(0, 5).join(', ')}, it features ${project.features.join(', ')}. The decentralized architecture ensures complete privacy and security.`
    }

    // Technical architecture queries
    if (message.includes('architecture') || message.includes('design pattern')) {
      return `Akshay uses various architectural patterns including microservices, event-driven architecture, and decentralized systems. Common design patterns in his projects include Factory, Observer, Strategy, and Proxy patterns. He focuses on scalable, maintainable, and performant solutions.`
    }

    // UI/UX and design queries
    if (message.includes('ui') || message.includes('ux') || message.includes('design')) {
      return `Akshay follows ${akshayKB.designPrinciples.uiux.join(', ')} principles. His designs are responsive using ${akshayKB.designPrinciples.responsive.join(', ')}. He ensures accessibility through ${akshayKB.designPrinciples.accessibility.join(', ')}.`
    }

    // AI integration queries
    if (message.includes('ai integration') || message.includes('gpt') || message.includes('langchain')) {
      return `Akshay specializes in AI integration using ${akshayKB.skills.ai.join(', ')}. His projects demonstrate advanced AI patterns like conversational AI, emotion recognition, personality analysis, and real-time intelligent systems. He uses LangChain for complex AI workflows and GPT for natural language processing.`
    }

    // Data visualization queries
    if (message.includes('visualization') || message.includes('charts') || message.includes('analytics')) {
      return `Akshay implements advanced data visualization using Plotly, D3.js, and custom WebGL solutions. His projects feature real-time emotion tracking charts, personality radar charts, network activity graphs, and performance metrics dashboards with interactive user experiences.`
    }

    // Authentication queries
    if (message.includes('auth') || message.includes('security') || message.includes('oauth')) {
      return `Akshay implements robust authentication systems including OAuth 2.0 with PKCE, JWT-based authentication, Web3 wallet integration, and role-based access control. Security is paramount in all his projects with end-to-end encryption and privacy-first design.`
    }

    // Performance optimization queries
    if (message.includes('performance') || message.includes('optimization') || message.includes('speed')) {
      return `Akshay focuses on performance optimization through ${akshayKB.designPrinciples.performance.join(', ')}, WebGL optimization, memory pooling, asset streaming, caching strategies, and async processing. His 3D applications maintain 60fps even on mobile devices.`
    }

    // Deployment and DevOps queries
    if (message.includes('deployment') || message.includes('devops') || message.includes('cicd')) {
      return `Akshay uses modern deployment strategies including Docker containerization, Kubernetes orchestration, CI/CD with GitHub Actions, AWS ECS with auto-scaling, and infrastructure as code with CloudFormation. His deployment pipelines ensure reliable, scalable applications.`
    }

    // Real-time features queries
    if (message.includes('real-time') || message.includes('websocket') || message.includes('live')) {
      return `Akshay specializes in real-time features including WebSocket connections, live conversation sync, real-time emotion tracking, instant message delivery, progressive data updates, and multi-user synchronization. His systems handle thousands of concurrent real-time connections.`
    }

    // Skills queries
    if (message.includes('skills') || message.includes('technologies') || message.includes('stack')) {
      return `Akshay's technical stack includes Frontend: ${akshayKB.skills.frontend.slice(0, 4).join(', ')}, Backend: ${akshayKB.skills.backend.slice(0, 4).join(', ')}, AI: ${akshayKB.skills.ai.slice(0, 4).join(', ')}, and Cloud: ${akshayKB.skills.cloud.slice(0, 4).join(', ')}.`
    }

    // Multilingual support queries
    if (message.includes('multilingual') || message.includes('i18n') || message.includes('internationalization')) {
      return `Akshay designs multilingual architectures using React i18next, dynamic locale loading, RTL support, cultural adaptation, and server-side translation APIs. His systems support 15+ languages with automatic language detection.`
    }

    // Project challenges queries
    if (message.includes('challenges') || message.includes('problems') || message.includes('difficulties')) {
      return `Akshay has overcome significant challenges including 3D performance optimization across devices, real-time emotion recognition accuracy, blockchain gas optimization, cross-platform compatibility, data privacy compliance, and scaling AI systems to handle millions of users.`
    }

    // Default response
    return `I can help you learn about Akshay's projects, technical expertise, AI integrations, design patterns, performance optimizations, and much more. Try asking about specific topics like "Tell me about the 3D AI companion", "What authentication methods does he use?", or "How does he handle real-time features?"`
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const response = generateResponse(inputValue)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const quickQuestions = [
    "Tell me about Akshay's projects",
    "What AI technologies does he use?",
    "How does he handle authentication?",
    "What are his design principles?",
    "Explain the 3D AI companion architecture"
  ]

  return (
    <>
      {/* AI Assistant Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 p-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            "0 10px 30px rgba(147, 51, 234, 0.3)",
            "0 10px 30px rgba(59, 130, 246, 0.3)",
            "0 10px 30px rgba(147, 51, 234, 0.3)"
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <FaRobot className="w-6 h-6" />
      </motion.button>

      {/* AI Assistant Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Chat Interface */}
            <motion.div
              className="relative bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-2xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-6 text-white">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <FaBrain className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">AI Assistant</h3>
                      <p className="text-white/80 text-sm">Ask me anything about Akshay's work & expertise</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <FaTimes className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Quick Questions */}
              <div className="p-4 border-b border-gray-700">
                <p className="text-gray-400 text-sm mb-3">Quick questions to get started:</p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setInputValue(question)}
                      className="px-3 py-1 text-xs bg-purple-500/20 text-purple-400 rounded-full hover:bg-purple-500/30 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] p-4 rounded-2xl ${
                      message.type === 'user' 
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' 
                        : 'bg-gray-800 text-gray-100'
                    }`}>
                      <div className="flex items-start gap-3">
                        {message.type === 'assistant' && (
                          <FaRobot className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                        )}
                        {message.type === 'user' && (
                          <FaUser className="w-5 h-5 text-white/80 mt-1 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="leading-relaxed">{message.content}</p>
                          <p className={`text-xs mt-2 ${
                            message.type === 'user' ? 'text-white/60' : 'text-gray-400'
                          }`}>
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-gray-800 p-4 rounded-2xl">
                      <div className="flex items-center gap-3">
                        <FaRobot className="w-5 h-5 text-purple-400" />
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-6 border-t border-gray-700">
                <div className="flex gap-3">
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about projects, technologies, architecture, AI integration..."
                    className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none"
                    rows={2}
                  />
                  <motion.button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    whileHover={{ scale: inputValue.trim() && !isTyping ? 1.02 : 1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaPaperPlane className="w-4 h-4" />
                    Send
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
