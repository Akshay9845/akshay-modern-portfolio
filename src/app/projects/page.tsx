'use client'

import { motion } from 'framer-motion'
import { FaArrowLeft, FaCode, FaExternalLinkAlt } from 'react-icons/fa'
import { BackgroundEffects } from '@/components/ui/background-effects'
import { GradientOrbs } from '@/components/ui/gradient-orbs'
import { CustomCursor } from '@/components/ui/custom-cursor'
import { ParticleCursor } from '@/components/ui/particle-cursor'
import { InteractiveCard } from '@/components/ui/interactive-card'

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

export default function ProjectsPage() {
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
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              My Projects
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto">
              Explore my portfolio of innovative projects spanning AI, blockchain, and web development
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <InteractiveCard>
                  <div 
                    className={`h-48 rounded-lg bg-gradient-to-br ${project.color} opacity-80 mb-6 flex items-center justify-center cursor-pointer group`}
                    onClick={() => window.location.href = `/projects/${project.id}`}
                  >
                    <FaCode className="text-4xl text-white group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  
                  <div className="flex justify-between items-start mb-3">
                    <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs">
                      {project.category}
                    </span>
                    <span className="text-xs text-gray-400">{project.duration}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-white">{project.title}</h3>
                  <p className="text-gray-300 mb-4 line-clamp-3">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                        +{project.tech.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-green-400 font-medium">{project.status}</span>
                    <button 
                      onClick={() => window.location.href = `/projects/${project.id}`}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:scale-105 transition-transform duration-300 text-sm font-medium"
                    >
                      View Details <FaExternalLinkAlt className="w-3 h-3" />
                    </button>
                  </div>
                </InteractiveCard>
              </motion.div>
            ))}
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
            <h2 className="text-3xl font-bold mb-6 text-white">Ready to Start Your Project?</h2>
            <p className="text-gray-300 text-lg mb-8">
              Let's collaborate and bring your innovative ideas to life with cutting-edge technology.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => window.location.href = '/#contact'}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:scale-105 transition-transform duration-300"
              >
                Get In Touch
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:border-cyan-400 hover:text-cyan-400 transition-colors"
              >
                Back to Portfolio
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
