'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCode, FaBrain, FaServer, FaDatabase, FaTools, FaChartBar, FaExpand, FaTimes } from 'react-icons/fa'

interface Skill {
  name: string
  level: number
  category: string
  color: string
  experience: string
  projects: number
  trend: 'up' | 'down' | 'stable'
  description: string
}

interface InteractiveDataVisualizationsProps {
  className?: string
}

export function InteractiveDataVisualizations({ className = '' }: InteractiveDataVisualizationsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null)
  const [viewMode, setViewMode] = useState<'radar' | 'bar' | 'bubble'>('radar')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  const skills: Skill[] = [
    {
      name: 'React/Next.js',
      level: 95,
      category: 'Frontend',
      color: '#61dafb',
      experience: '3+ years',
      projects: 12,
      trend: 'up',
      description: 'Advanced React patterns, hooks, Next.js 13+ with App Router'
    },
    {
      name: 'TypeScript',
      level: 92,
      category: 'Frontend',
      color: '#3178c6',
      experience: '2+ years',
      projects: 10,
      trend: 'up',
      description: 'Strong typing, generics, advanced type manipulation'
    },
    {
      name: 'Three.js',
      level: 88,
      category: 'Frontend',
      color: '#049ef4',
      experience: '2 years',
      projects: 5,
      trend: 'up',
      description: '3D graphics, WebGL, React Three Fiber ecosystem'
    },
    {
      name: 'Python',
      level: 94,
      category: 'Backend',
      color: '#3776ab',
      experience: '4+ years',
      projects: 15,
      trend: 'stable',
      description: 'Data science, web development, automation scripts'
    },
    {
      name: 'Node.js',
      level: 87,
      category: 'Backend',
      color: '#339933',
      experience: '2+ years',
      projects: 8,
      trend: 'up',
      description: 'Express, Fastify, serverless functions, microservices'
    },
    {
      name: 'Machine Learning',
      level: 91,
      category: 'AI/ML',
      color: '#ff6b6b',
      experience: '3+ years',
      projects: 7,
      trend: 'up',
      description: 'TensorFlow, scikit-learn, deep learning, NLP'
    },
    {
      name: 'OpenAI/GPT',
      level: 89,
      category: 'AI/ML',
      color: '#10a37f',
      experience: '2 years',
      projects: 6,
      trend: 'up',
      description: 'GPT integration, fine-tuning, prompt engineering'
    },
    {
      name: 'Computer Vision',
      level: 85,
      category: 'AI/ML',
      color: '#ff8c42',
      experience: '2 years',
      projects: 4,
      trend: 'up',
      description: 'OpenCV, MediaPipe, image processing, real-time detection'
    },
    {
      name: 'PostgreSQL',
      level: 86,
      category: 'Database',
      color: '#336791',
      experience: '2+ years',
      projects: 9,
      trend: 'stable',
      description: 'Complex queries, optimization, database design'
    },
    {
      name: 'Supabase',
      level: 90,
      category: 'Database',
      color: '#3ecf8e',
      experience: '1+ years',
      projects: 6,
      trend: 'up',
      description: 'Real-time subscriptions, auth, edge functions'
    },
    {
      name: 'Blockchain/Solidity',
      level: 82,
      category: 'Blockchain',
      color: '#627eea',
      experience: '1+ years',
      projects: 3,
      trend: 'stable',
      description: 'Smart contracts, DApps, Web3 integration'
    },
    {
      name: 'Docker',
      level: 84,
      category: 'DevOps',
      color: '#2496ed',
      experience: '2 years',
      projects: 8,
      trend: 'up',
      description: 'Containerization, multi-stage builds, orchestration'
    }
  ]

  const categories = [
    { id: 'all', name: 'All Skills', icon: <FaChartBar />, color: 'from-purple-500 to-pink-500' },
    { id: 'Frontend', name: 'Frontend', icon: <FaCode />, color: 'from-blue-500 to-cyan-500' },
    { id: 'Backend', name: 'Backend', icon: <FaServer />, color: 'from-green-500 to-emerald-500' },
    { id: 'AI/ML', name: 'AI/ML', icon: <FaBrain />, color: 'from-red-500 to-orange-500' },
    { id: 'Database', name: 'Database', icon: <FaDatabase />, color: 'from-indigo-500 to-purple-500' },
    { id: 'DevOps', name: 'DevOps', icon: <FaTools />, color: 'from-yellow-500 to-orange-500' },
    { id: 'Blockchain', name: 'Blockchain', icon: <FaCode />, color: 'from-purple-600 to-blue-600' }
  ]

  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory)

  // Radar Chart Drawing
  const drawRadarChart = (canvas: HTMLCanvasElement, skillsData: Skill[]) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { width, height } = canvas
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) / 2 - 40

    ctx.clearRect(0, 0, width, height)

    // Draw grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
    ctx.lineWidth = 1
    
    // Circular grid
    for (let i = 1; i <= 5; i++) {
      ctx.beginPath()
      ctx.arc(centerX, centerY, (radius * i) / 5, 0, 2 * Math.PI)
      ctx.stroke()
    }

    // Radial lines
    const angleStep = (2 * Math.PI) / skillsData.length
    skillsData.forEach((_, index) => {
      const angle = index * angleStep - Math.PI / 2
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(
        centerX + Math.cos(angle) * radius,
        centerY + Math.sin(angle) * radius
      )
      ctx.stroke()
    })

    // Draw skill areas
    ctx.fillStyle = 'rgba(99, 218, 251, 0.2)'
    ctx.strokeStyle = 'rgba(99, 218, 251, 0.8)'
    ctx.lineWidth = 2
    ctx.beginPath()

    skillsData.forEach((skill, index) => {
      const angle = index * angleStep - Math.PI / 2
      const skillRadius = (radius * skill.level) / 100
      const x = centerX + Math.cos(angle) * skillRadius
      const y = centerY + Math.sin(angle) * skillRadius

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // Draw skill points and labels
    skillsData.forEach((skill, index) => {
      const angle = index * angleStep - Math.PI / 2
      const skillRadius = (radius * skill.level) / 100
      const x = centerX + Math.cos(angle) * skillRadius
      const y = centerY + Math.sin(angle) * skillRadius

      // Point
      ctx.fillStyle = skill.color
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, 2 * Math.PI)
      ctx.fill()

      // Label
      const labelRadius = radius + 20
      const labelX = centerX + Math.cos(angle) * labelRadius
      const labelY = centerY + Math.sin(angle) * labelRadius

      ctx.fillStyle = 'white'
      ctx.font = '12px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(skill.name, labelX, labelY)
    })
  }

  // Animation loop
  useEffect(() => {
    if (viewMode === 'radar' && canvasRef.current) {
      const canvas = canvasRef.current
      const animate = () => {
        drawRadarChart(canvas, filteredSkills)
        animationRef.current = requestAnimationFrame(animate)
      }
      animate()
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [viewMode, filteredSkills])

  const SkillCard = ({ skill }: { skill: Skill }) => (
    <motion.div
      className="bg-gray-800 border border-gray-600 rounded-lg p-4 hover:border-cyan-500 transition-colors cursor-pointer"
      whileHover={{ scale: 1.02, y: -2 }}
      onHoverStart={() => setHoveredSkill(skill)}
      onHoverEnd={() => setHoveredSkill(null)}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-white font-semibold">{skill.name}</h3>
        <div className={`flex items-center gap-1 text-xs ${
          skill.trend === 'up' ? 'text-green-400' : 
          skill.trend === 'down' ? 'text-red-400' : 'text-gray-400'
        }`}>
          {skill.trend === 'up' ? '↗' : skill.trend === 'down' ? '↘' : '→'}
          {skill.trend}
        </div>
      </div>
      
      <div className="mb-2">
        <div className="flex justify-between text-sm text-gray-400 mb-1">
          <span>Proficiency</span>
          <span>{skill.level}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <motion.div
            className="h-2 rounded-full"
            style={{ backgroundColor: skill.color }}
            initial={{ width: 0 }}
            animate={{ width: `${skill.level}%` }}
            transition={{ duration: 1, delay: Math.random() * 0.5 }}
          />
        </div>
      </div>

      <div className="flex justify-between text-xs text-gray-400">
        <span>{skill.experience}</span>
        <span>{skill.projects} projects</span>
      </div>
    </motion.div>
  )

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Interactive Skills Dashboard</h2>
          <p className="text-gray-400">Explore technical expertise through data visualization</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="p-2 text-gray-400 hover:text-white transition-colors"
        >
          <FaExpand className="text-xl" />
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === category.id
                ? `bg-gradient-to-r ${category.color} text-white`
                : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            {category.icon}
            {category.name}
          </button>
        ))}
      </div>

      {/* View Mode Toggle */}
      <div className="flex gap-2">
        {['radar', 'bar', 'bubble'].map((mode) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode as any)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
              viewMode === mode
                ? 'bg-cyan-500/30 text-cyan-400'
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            {mode} Chart
          </button>
        ))}
      </div>

      {/* Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
            {viewMode === 'radar' ? (
              <canvas
                ref={canvasRef}
                width={600}
                height={400}
                className="w-full h-auto"
              />
            ) : viewMode === 'bar' ? (
              <div className="space-y-4">
                {filteredSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="w-24 text-white text-sm font-medium">
                      {skill.name}
                    </div>
                    <div className="flex-1 bg-gray-700 rounded-full h-4 relative">
                      <motion.div
                        className="h-4 rounded-full"
                        style={{ backgroundColor: skill.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                        {skill.level}%
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="relative h-96 overflow-hidden">
                <svg viewBox="0 0 600 400" className="w-full h-full">
                  {filteredSkills.map((skill, index) => (
                    <motion.circle
                      key={skill.name}
                      cx={100 + (index % 5) * 100}
                      cy={100 + Math.floor(index / 5) * 100}
                      r={skill.level / 2}
                      fill={skill.color}
                      opacity={0.7}
                      initial={{ r: 0 }}
                      animate={{ r: skill.level / 2 }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className="cursor-pointer"
                    />
                  ))}
                </svg>
                {hoveredSkill && (
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm p-3 rounded-lg">
                    <div className="text-white font-semibold">{hoveredSkill.name}</div>
                    <div className="text-gray-400 text-sm">{hoveredSkill.level}% proficiency</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Skill Details */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Skill Details</h3>
          <div className="max-h-96 overflow-y-auto space-y-3">
            {filteredSkills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
        </div>
      </div>

      {/* Skill Hover Details */}
      <AnimatePresence>
        {hoveredSkill && viewMode !== 'bubble' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-6"
          >
            <div className="flex items-center gap-4">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: hoveredSkill.color }}
              />
              <div>
                <h4 className="text-white font-semibold text-lg">{hoveredSkill.name}</h4>
                <p className="text-gray-400">{hoveredSkill.description}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Screen Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 border border-cyan-500/30 rounded-xl w-full h-full max-w-7xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-4 border-b border-gray-700 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Skills Visualization - Full Screen</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>
              <div className="p-6 h-full overflow-y-auto">
                <InteractiveDataVisualizations />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
