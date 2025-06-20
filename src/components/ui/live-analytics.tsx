'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChartLine, FaEye, FaUsers, FaClock, FaGlobe, FaTimes, FaDownload } from 'react-icons/fa'
import { Card, CardContent } from './card'

interface AnalyticsData {
  pageViews: number
  visitors: number
  avgSessionDuration: string
  topCountries: Array<{ country: string; visitors: number; flag: string }>
  projectInteractions: Array<{ project: string; views: number; engagement: number }>
  skills: Array<{ skill: string; interest: number; trend: 'up' | 'down' | 'stable' }>
  realTimeUsers: number
  bounceRate: number
  conversionRate: number
}

interface LiveAnalyticsDashboardProps {
  isOpen: boolean
  onClose: () => void
}

export function LiveAnalyticsDashboard({ isOpen, onClose }: LiveAnalyticsDashboardProps) {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Simulate real-time analytics data
  useEffect(() => {
    const generateMockData = (): AnalyticsData => {
      const baseViews = 1247
      const variation = Math.floor(Math.random() * 100) - 50
      
      return {
        pageViews: baseViews + variation,
        visitors: Math.floor((baseViews + variation) * 0.7),
        avgSessionDuration: `${Math.floor(Math.random() * 3) + 2}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
        topCountries: [
          { country: 'United States', visitors: 234, flag: '🇺🇸' },
          { country: 'United Kingdom', visitors: 156, flag: '🇬🇧' },
          { country: 'India', visitors: 143, flag: '🇮🇳' },
          { country: 'Germany', visitors: 98, flag: '🇩🇪' },
          { country: 'Canada', visitors: 87, flag: '🇨🇦' }
        ],
        projectInteractions: [
          { project: '3D AI Companion', views: 342, engagement: 78 },
          { project: 'Personality Detection', views: 287, engagement: 65 },
          { project: 'Blockchain Chat', views: 234, engagement: 71 }
        ],
        skills: [
          { skill: 'AI/ML', interest: 89, trend: 'up' },
          { skill: 'Three.js', interest: 76, trend: 'up' },
          { skill: 'React/Next.js', interest: 82, trend: 'stable' },
          { skill: 'Blockchain', interest: 67, trend: 'down' },
          { skill: 'Python', interest: 85, trend: 'up' }
        ],
        realTimeUsers: Math.floor(Math.random() * 15) + 5,
        bounceRate: 23.4 + (Math.random() * 10 - 5),
        conversionRate: 4.7 + (Math.random() * 2 - 1)
      }
    }

    if (isOpen) {
      setIsLoading(true)
      setTimeout(() => {
        setAnalyticsData(generateMockData())
        setIsLoading(false)
      }, 1000)

      // Update data every 10 seconds
      const interval = setInterval(() => {
        setAnalyticsData(generateMockData())
      }, 10000)

      return () => clearInterval(interval)
    }
  }, [isOpen])

  const exportData = () => {
    if (!analyticsData) return
    
    const dataStr = JSON.stringify(analyticsData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `portfolio-analytics-${new Date().toISOString().split('T')[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-900 border border-cyan-500/30 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FaChartLine className="text-cyan-400 text-2xl" />
                  <div>
                    <h2 className="text-2xl font-bold text-white">Live Analytics Dashboard</h2>
                    <p className="text-gray-400">Real-time portfolio performance metrics</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={exportData}
                    className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors"
                  >
                    <FaDownload />
                    Export
                  </button>
                  <button
                    onClick={onClose}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
                </div>
              ) : analyticsData ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Key Metrics */}
                  <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <FaEye className="text-blue-400 text-xl" />
                        <h3 className="text-white font-semibold">Page Views</h3>
                      </div>
                      <div className="text-3xl font-bold text-white mb-2">
                        {analyticsData.pageViews.toLocaleString()}
                      </div>
                      <div className="text-green-400 text-sm">↗ +12.3% from last week</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <FaUsers className="text-green-400 text-xl" />
                        <h3 className="text-white font-semibold">Unique Visitors</h3>
                      </div>
                      <div className="text-3xl font-bold text-white mb-2">
                        {analyticsData.visitors.toLocaleString()}
                      </div>
                      <div className="text-green-400 text-sm">↗ +8.7% from last week</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <FaClock className="text-purple-400 text-xl" />
                        <h3 className="text-white font-semibold">Avg. Session</h3>
                      </div>
                      <div className="text-3xl font-bold text-white mb-2">
                        {analyticsData.avgSessionDuration}
                      </div>
                      <div className="text-green-400 text-sm">↗ +15.2% from last week</div>
                    </CardContent>
                  </Card>

                  {/* Real-time Users */}
                  <Card className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/30">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <h3 className="text-white font-semibold">Live Users</h3>
                      </div>
                      <div className="text-3xl font-bold text-white mb-2">
                        {analyticsData.realTimeUsers}
                      </div>
                      <div className="text-gray-400 text-sm">Currently browsing</div>
                    </CardContent>
                  </Card>

                  {/* Conversion Metrics */}
                  <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/30">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-white font-semibold">Bounce Rate</h3>
                      </div>
                      <div className="text-2xl font-bold text-white mb-2">
                        {analyticsData.bounceRate.toFixed(1)}%
                      </div>
                      <div className="text-green-400 text-sm">↓ -3.1% improvement</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/30">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-white font-semibold">Contact Rate</h3>
                      </div>
                      <div className="text-2xl font-bold text-white mb-2">
                        {analyticsData.conversionRate.toFixed(1)}%
                      </div>
                      <div className="text-green-400 text-sm">↗ +0.8% increase</div>
                    </CardContent>
                  </Card>

                  {/* Top Countries */}
                  <Card className="md:col-span-2 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 border-cyan-500/20">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <FaGlobe className="text-cyan-400 text-xl" />
                        <h3 className="text-white font-semibold">Top Countries</h3>
                      </div>
                      <div className="space-y-3">
                        {analyticsData.topCountries.map((country, index) => (
                          <div key={country.country} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{country.flag}</span>
                              <span className="text-gray-300">{country.country}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-24 bg-gray-700 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full"
                                  style={{ width: `${(country.visitors / analyticsData.topCountries[0].visitors) * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-white font-semibold text-sm w-12 text-right">
                                {country.visitors}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Project Interactions */}
                  <Card className="md:col-span-1 bg-gradient-to-br from-emerald-500/5 to-green-500/5 border-emerald-500/20">
                    <CardContent className="p-6">
                      <h3 className="text-white font-semibold mb-4">Project Engagement</h3>
                      <div className="space-y-4">
                        {analyticsData.projectInteractions.map((project, index) => (
                          <div key={project.project}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-gray-300 text-sm">{project.project}</span>
                              <span className="text-white font-semibold">{project.views}</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full"
                                style={{ width: `${project.engagement}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Skills Interest */}
                  <Card className="lg:col-span-3 bg-gradient-to-br from-purple-500/5 to-pink-500/5 border-purple-500/20">
                    <CardContent className="p-6">
                      <h3 className="text-white font-semibold mb-4">Skills Interest Trends</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {analyticsData.skills.map((skill) => (
                          <div key={skill.skill} className="text-center">
                            <div className="text-gray-300 text-sm mb-2">{skill.skill}</div>
                            <div className="text-2xl font-bold text-white mb-1">{skill.interest}%</div>
                            <div className={`text-xs ${
                              skill.trend === 'up' ? 'text-green-400' : 
                              skill.trend === 'down' ? 'text-red-400' : 'text-gray-400'
                            }`}>
                              {skill.trend === 'up' ? '↗' : skill.trend === 'down' ? '↘' : '→'} 
                              {skill.trend.charAt(0).toUpperCase() + skill.trend.slice(1)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
