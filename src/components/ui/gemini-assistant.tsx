'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaRobot, FaMicrophone, FaPaperPlane, FaTimes, FaVolumeUp, FaLightbulb } from 'react-icons/fa'
import { Button } from './button'
import { callGeminiAPI } from '@/lib/gemini-api'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
  isLoading?: boolean
}

interface GeminiAssistantProps {
  className?: string
}

// Comprehensive knowledge base about Akshay Kumar S
const akshayKnowledgeBase = {
  personal: {
    name: "Akshay Kumar S",
    title: "AI & Data Science Engineer", 
    location: "India",
    email: "contact available through portfolio",
    expertise: ["AI/ML Development", "3D Web Applications", "Blockchain Technology", "Full-Stack Development"],
    passion: "Creating innovative AI solutions that bridge technology and human experience",
    workStyle: "Focuses on cutting-edge technology, user experience, and scalable architectures",
    availability: "Open to collaboration on innovative projects",
    languages: ["English", "Hindi", "Regional Indian languages"],
    education: "Computer Science with specialization in AI/ML",
    interests: ["Artificial Intelligence", "3D Graphics", "Blockchain", "Open Source", "Technology Innovation"]
  },
  
  projects: {
    "3d-ai-companion": {
      title: "Humanized 3D AI Companion",
      description: "Revolutionary web-based 3D AI avatar with real-time emotion recognition and conversation capabilities",
      longDescription: "A comprehensive 3D AI companion system that combines Three.js for stunning 3D rendering with GPT-4 for intelligent conversations. Features real-time emotion recognition using MediaPipe, adaptive memory through Supabase, and cross-platform deployment for education and storytelling applications.",
      technologies: ["Three.js", "React Three Fiber", "GPT-4", "Supabase", "LangChain", "MediaPipe", "WebGL", "Node.js", "TypeScript"],
      keyFeatures: [
        "Real-time 3D avatar rendering with smooth animations",
        "Emotion recognition from voice and text input",
        "Adaptive conversation memory and personality",
        "Voice interaction with speech synthesis",
        "Cross-platform compatibility (web, mobile)",
        "Educational storytelling capabilities",
        "Customizable avatar appearance and personality",
        "Real-time performance optimization"
      ],
      technicalChallenges: [
        "Optimizing 3D rendering performance for real-time interaction",
        "Implementing seamless emotion recognition across multiple inputs",
        "Managing complex state synchronization between 3D and AI systems",
        "Ensuring cross-platform compatibility without performance loss",
        "Creating natural conversation flows with contextual memory"
      ],
      architecture: "Microservices-based architecture with WebSocket connections for real-time communication, 3D rendering engine with LOD optimization, AI processing pipeline with emotion analysis, and cloud-based memory storage",
      deployment: "Docker containerization with Kubernetes orchestration, CI/CD through GitHub Actions",
      duration: "6 months of intensive development",
      status: "Completed and deployed",
      impact: "Demonstrates advanced integration of 3D graphics with AI, showcasing next-generation user interaction possibilities"
    },
    
    "personality-detection": {
      title: "AI-Powered Personality Detection System",
      description: "Advanced social media personality analysis using NLP and Big Five personality model",
      longDescription: "A sophisticated machine learning system that analyzes social media content to predict personality traits using the Big Five model. Processes multiple data sources with advanced NLP techniques and provides real-time personality insights with high accuracy.",
      technologies: ["Python", "TensorFlow", "NLTK", "Scikit-learn", "Pandas", "Flask", "PostgreSQL", "Docker", "Redis"],
      keyFeatures: [
        "Multi-platform social media analysis (Twitter, Facebook, Instagram)",
        "Big Five personality trait scoring (Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism)",
        "Real-time text processing and analysis",
        "Multi-language support with translation capabilities",
        "Privacy-compliant data processing",
        "Interactive personality visualization dashboards",
        "API integration for third-party applications",
        "Batch processing for large-scale analysis"
      ],
      technicalChallenges: [
        "Ensuring data privacy and GDPR compliance across multiple platforms",
        "Handling multi-language text analysis with cultural context",
        "Optimizing ML model accuracy across diverse personality expressions",
        "Scaling processing for real-time analysis of large datasets",
        "Managing complex feature engineering for personality prediction"
      ],
      architecture: "Event-driven microservices with ML pipeline, data ingestion layer, real-time processing queue, and RESTful API gateway",
      deployment: "AWS ECS with auto-scaling, CloudFormation infrastructure as code",
      duration: "4 months of development and testing",
      status: "Completed with ongoing accuracy improvements",
      results: "Achieved 85%+ accuracy in personality prediction, processed 100K+ social media profiles",
      impact: "Useful for HR screening, marketing personalization, and psychological research applications"
    },
    
    "blockchain-chat": {
      title: "Decentralized Blockchain Chat Application",
      description: "Secure, decentralized communication platform built on blockchain technology",
      longDescription: "A revolutionary chat application leveraging blockchain for ultimate security and decentralization. Features end-to-end encryption, smart contract authentication, decentralized storage, and cryptocurrency integration for a completely trustless communication experience.",
      technologies: ["Solidity", "Ethereum", "Web3.js", "React", "IPFS", "MetaMask", "Truffle", "Node.js", "Express"],
      keyFeatures: [
        "Complete decentralization with no central servers",
        "End-to-end encryption for all communications",
        "Smart contract-based user authentication",
        "IPFS distributed file storage",
        "Cryptocurrency payments and tips",
        "Group chat with governance tokens",
        "Message history stored on blockchain",
        "Cross-chain compatibility planning"
      ],
      technicalChallenges: [
        "Implementing efficient blockchain transaction management",
        "Balancing decentralization with user experience",
        "Managing gas fees for scalable messaging",
        "Creating intuitive Web3 onboarding for non-crypto users",
        "Ensuring message privacy while maintaining blockchain transparency"
      ],
      architecture: "Decentralized architecture with smart contracts, IPFS nodes, Web3 frontend, and distributed consensus mechanisms",
      deployment: "Deployed on Ethereum mainnet and testnets, IPFS distributed hosting",
      duration: "5 months of blockchain development",
      status: "Completed with active user base",
      impact: "Demonstrates practical blockchain application beyond cryptocurrency, pioneering secure decentralized communication"
    }
  },
  
  skills: {
    ai_ml: {
      category: "AI & Machine Learning",
      skills: [
        { name: "OpenAI/GPT Integration", level: 95, experience: "2+ years", description: "Advanced prompt engineering, fine-tuning, API integration, embeddings" },
        { name: "Machine Learning", level: 92, experience: "3+ years", description: "TensorFlow, PyTorch, scikit-learn, deep learning, neural networks" },
        { name: "Computer Vision", level: 88, experience: "2+ years", description: "OpenCV, MediaPipe, image processing, real-time detection" },
        { name: "Natural Language Processing", level: 90, experience: "3+ years", description: "NLTK, spaCy, transformers, sentiment analysis, text classification" },
        { name: "Data Science", level: 91, experience: "3+ years", description: "Pandas, NumPy, data visualization, statistical analysis" }
      ]
    },
    frontend: {
      category: "Frontend Development", 
      skills: [
        { name: "React/Next.js", level: 96, experience: "3+ years", description: "Advanced patterns, hooks, SSR, App Router, performance optimization" },
        { name: "TypeScript", level: 94, experience: "2+ years", description: "Advanced types, generics, type manipulation, strict typing" },
        { name: "Three.js/WebGL", level: 89, experience: "2+ years", description: "3D graphics, React Three Fiber, shaders, performance optimization" },
        { name: "Tailwind CSS", level: 93, experience: "2+ years", description: "Utility-first design, responsive layouts, custom components" },
        { name: "Framer Motion", level: 87, experience: "1+ years", description: "Complex animations, gesture handling, layout animations" }
      ]
    },
    backend: {
      category: "Backend Development",
      skills: [
        { name: "Python", level: 95, experience: "4+ years", description: "Django, Flask, FastAPI, data processing, automation" },
        { name: "Node.js", level: 88, experience: "2+ years", description: "Express, serverless functions, microservices, real-time apps" },
        { name: "API Development", level: 91, experience: "3+ years", description: "RESTful APIs, GraphQL, authentication, rate limiting" },
        { name: "Microservices", level: 85, experience: "2+ years", description: "Service architecture, container orchestration, event-driven design" }
      ]
    },
    database: {
      category: "Database & Storage",
      skills: [
        { name: "PostgreSQL", level: 87, experience: "2+ years", description: "Complex queries, optimization, database design, performance tuning" },
        { name: "Supabase", level: 92, experience: "1+ years", description: "Real-time subscriptions, auth, edge functions, database management" },
        { name: "MongoDB", level: 83, experience: "2+ years", description: "Document modeling, aggregation, indexing, replication" },
        { name: "Redis", level: 81, experience: "1+ years", description: "Caching, session management, pub/sub, data structures" }
      ]
    },
    blockchain: {
      category: "Blockchain & Web3",
      skills: [
        { name: "Solidity", level: 84, experience: "1+ years", description: "Smart contracts, DApp development, security best practices" },
        { name: "Web3.js/Ethers.js", level: 82, experience: "1+ years", description: "Blockchain interaction, wallet integration, transaction management" },
        { name: "IPFS", level: 79, experience: "1+ years", description: "Distributed storage, content addressing, decentralized hosting" }
      ]
    },
    devops: {
      category: "DevOps & Tools",
      skills: [
        { name: "Docker", level: 86, experience: "2+ years", description: "Containerization, multi-stage builds, orchestration" },
        { name: "AWS", level: 83, experience: "2+ years", description: "EC2, S3, Lambda, CloudFormation, auto-scaling" },
        { name: "Git/GitHub", level: 94, experience: "4+ years", description: "Version control, CI/CD, Actions, collaboration workflows" },
        { name: "Linux", level: 88, experience: "3+ years", description: "Server administration, shell scripting, system optimization" }
      ]
    }
  },
  
  achievements: [
    "Built 3 major full-stack projects showcasing different technology stacks",
    "Integrated advanced AI capabilities with real-time 3D graphics",
    "Developed blockchain applications with real user adoption",
    "Created personality detection system with 85%+ accuracy",
    "Designed responsive, accessible user interfaces",
    "Implemented comprehensive testing and CI/CD pipelines",
    "Open source contributions to developer community",
    "Self-taught advanced technologies through hands-on projects"
  ],
  
  workPhilosophy: {
    approach: "Combines cutting-edge technology with practical user needs",
    values: ["Innovation", "User Experience", "Code Quality", "Continuous Learning", "Open Source"],
    methodology: "Agile development with emphasis on rapid prototyping and iterative improvement",
    collaboration: "Enjoys working in diverse teams and mentoring junior developers",
    problemSolving: "Analytical approach combined with creative thinking for unique solutions"
  },
  
  currentFocus: [
    "Advanced AI integration patterns",
    "3D web application optimization", 
    "Blockchain technology exploration",
    "Performance optimization techniques",
    "Emerging web technologies",
    "Open source project contributions"
  ],
  
  contact: {
    portfolio: "Available through this portfolio website",
    github: "Active open source contributor",
    linkedin: "Professional networking and updates",
    email: "Available through contact form",
    collaboration: "Open to innovative projects, especially in AI, 3D graphics, and blockchain",
    mentoring: "Available for technical guidance and code reviews"
  }
}

export function GeminiAssistant({ className = '' }: GeminiAssistantProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I can help answer questions about Akshay's projects, technical expertise, experience, and collaboration opportunities. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognition = useRef<any>(null)

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      recognition.current = new (window as any).webkitSpeechRecognition()
      recognition.current.continuous = false
      recognition.current.interimResults = false
      recognition.current.lang = 'en-US'

      recognition.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInputText(transcript)
        setIsListening(false)
      }

      recognition.current.onerror = () => {
        setIsListening(false)
      }

      recognition.current.onend = () => {
        setIsListening(false)
      }
    }
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Generate AI response using Gemini API
  const generateGeminiResponse = async (userMessage: string): Promise<string> => {
    try {
      const response = await callGeminiAPI(userMessage)
      return response
    } catch (error) {
      console.error('Gemini API error:', error)
      return "I apologize, but I'm having trouble accessing my knowledge base right now. Please try again in a moment, or feel free to contact Akshay directly through the portfolio contact form."
    }
  }

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsLoading(true)

    // Add loading message
    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: '',
      isUser: false,
      timestamp: new Date(),
      isLoading: true
    }
    setMessages(prev => [...prev, loadingMessage])

    try {
      const aiResponse = await generateGeminiResponse(userMessage.text)
      
      // Remove loading message and add actual response
      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.isLoading)
        return [...filtered, {
          id: (Date.now() + 2).toString(),
          text: aiResponse,
          isUser: false,
          timestamp: new Date()
        }]
      })
    } catch (error) {
      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.isLoading)
        return [...filtered, {
          id: (Date.now() + 2).toString(),
          text: "I apologize, but I'm experiencing technical difficulties. Please try again in a moment.",
          isUser: false,
          timestamp: new Date()
        }]
      })
    }

    setIsLoading(false)
  }

  const handleVoiceInput = () => {
    if (!recognition.current) {
      alert('Speech recognition is not supported in this browser.')
      return
    }

    if (isListening) {
      recognition.current.stop()
      setIsListening(false)
    } else {
      setIsListening(true)
      recognition.current.start()
    }
  }

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.voice = speechSynthesis.getVoices().find(voice => voice.name.includes('Google')) || null
      speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center"
          >
            <motion.button
              onClick={() => setIsOpen(true)}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-xl hover:border-cyan-400/50 transition-all duration-300 backdrop-blur-sm group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-center space-x-3">
                <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
                <span className="text-white font-medium">Ask me anything about Akshay's work</span>
                <FaLightbulb className="text-yellow-400 group-hover:scale-110 transition-transform" />
              </div>
            </motion.button>
          </motion.div>
        )}

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-black/40 backdrop-blur-xl border border-cyan-400/30 rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-6 border-b border-cyan-400/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                    <FaLightbulb className="text-white text-sm" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">
                      Information Assistant
                    </h3>
                    <p className="text-cyan-300 text-sm">Get answers about projects, skills & experience</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/10"
                >
                  <FaTimes />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-xl text-sm ${
                      message.isUser
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                        : 'bg-gray-800/50 text-gray-200 border border-gray-600/50'
                    }`}
                  >
                    {message.isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-200"></div>
                        </div>
                        <span className="text-cyan-300">Thinking...</span>
                      </div>
                    ) : (
                      <>
                        <div className="whitespace-pre-wrap">{message.text}</div>
                        {!message.isUser && (
                          <button
                            onClick={() => speakText(message.text)}
                            className="mt-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                          >
                            <FaVolumeUp className="text-xs" />
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-6 border-t border-gray-700/50">
              <div className="flex gap-3">
                <button
                  onClick={handleVoiceInput}
                  disabled={isLoading}
                  className={`p-3 rounded-lg transition-colors ${
                    isListening
                      ? 'bg-red-500 text-white animate-pulse'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                  }`}
                >
                  <FaMicrophone className="text-sm" />
                </button>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                  placeholder="Ask about projects, skills, experience..."
                  disabled={isLoading}
                  className="flex-1 bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500 disabled:opacity-50"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputText.trim()}
                  size="sm"
                  className="px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50"
                >
                  <FaPaperPlane className="text-sm" />
                </Button>
              </div>
              <div className="mt-3 text-xs text-gray-400 text-center">
                Try: "Tell me about the 3D AI project" or "What are his technical skills?"
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
