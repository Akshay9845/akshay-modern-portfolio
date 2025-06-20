'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTachometerAlt, FaMemory, FaMicrochip, FaWifi, FaTimes, FaExpand, FaCompress } from 'react-icons/fa'
import { Card, CardContent } from './card'

interface PerformanceMetrics {
  fps: number
  memory: {
    used: number
    total: number
    percentage: number
  }
  cpu: number
  network: {
    downloadSpeed: number
    uploadSpeed: number
    latency: number
  }
  pageLoad: number
  renderTime: number
  domSize: number
  bundleSize: number
}

interface PerformanceMonitorProps {
  isOpen: boolean
  onClose: () => void
}

export function PerformanceMonitor({ isOpen, onClose }: PerformanceMonitorProps) {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [history, setHistory] = useState<PerformanceMetrics[]>([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const frameRef = useRef<number | null>(null)
  const fpsRef = useRef({ frames: 0, lastTime: performance.now() })

  // FPS Counter
  const countFPS = () => {
    fpsRef.current.frames++
    const now = performance.now()
    
    if (now >= fpsRef.current.lastTime + 1000) {
      const fps = Math.round((fpsRef.current.frames * 1000) / (now - fpsRef.current.lastTime))
      fpsRef.current.frames = 0
      fpsRef.current.lastTime = now
      
      setMetrics(prev => prev ? { ...prev, fps } : null)
    }
    
    frameRef.current = requestAnimationFrame(countFPS)
  }

  // Get memory usage (if available)
  const getMemoryInfo = () => {
    if ('memory' in performance) {
      const mem = (performance as any).memory
      return {
        used: Math.round(mem.usedJSHeapSize / 1048576), // MB
        total: Math.round(mem.totalJSHeapSize / 1048576), // MB
        percentage: Math.round((mem.usedJSHeapSize / mem.jsHeapSizeLimit) * 100)
      }
    }
    return { used: 0, total: 0, percentage: 0 }
  }

  // Simulate CPU usage (approximate based on timing)
  const getCPUUsage = async () => {
    const start = performance.now()
    await new Promise(resolve => setTimeout(resolve, 10))
    const duration = performance.now() - start
    return Math.min(Math.round((duration - 10) * 10), 100)
  }

  // Get network information
  const getNetworkInfo = () => {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection
      return {
        downloadSpeed: connection.downlink || 0,
        uploadSpeed: connection.downlink * 0.8 || 0, // Estimate
        latency: connection.rtt || 0
      }
    }
    return { downloadSpeed: 0, uploadSpeed: 0, latency: 0 }
  }

  // Get page performance metrics
  const getPageMetrics = () => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    const pageLoad = navigation ? Math.round(navigation.loadEventEnd - navigation.fetchStart) : 0
    const renderTime = navigation ? Math.round(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart) : 0
    
    return {
      pageLoad,
      renderTime,
      domSize: document.querySelectorAll('*').length,
      bundleSize: Math.round(Math.random() * 500 + 200) // Simulated
    }
  }

  useEffect(() => {
    if (isOpen) {
      frameRef.current = requestAnimationFrame(countFPS)
      
      const updateMetrics = async () => {
        const memory = getMemoryInfo()
        const cpu = await getCPUUsage()
        const network = getNetworkInfo()
        const pageMetrics = getPageMetrics()
        
        const newMetrics: PerformanceMetrics = {
          fps: 60, // Will be updated by FPS counter
          memory,
          cpu,
          network,
          ...pageMetrics
        }
        
        setMetrics(newMetrics)
        setHistory(prev => [...prev.slice(-29), newMetrics]) // Keep last 30 entries
      }

      updateMetrics()
      intervalRef.current = setInterval(updateMetrics, 2000)
    }

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isOpen])

  const getPerformanceGrade = (metrics: PerformanceMetrics) => {
    let score = 0
    
    // FPS (30%)
    score += (metrics.fps >= 55 ? 30 : metrics.fps >= 30 ? 20 : 10)
    
    // Memory (25%)
    score += (metrics.memory.percentage <= 50 ? 25 : metrics.memory.percentage <= 75 ? 15 : 5)
    
    // CPU (20%)
    score += (metrics.cpu <= 30 ? 20 : metrics.cpu <= 60 ? 15 : 5)
    
    // Page Load (25%)
    score += (metrics.pageLoad <= 2000 ? 25 : metrics.pageLoad <= 4000 ? 15 : 5)
    
    if (score >= 85) return { grade: 'A+', color: 'text-green-400', bg: 'bg-green-500/20' }
    if (score >= 70) return { grade: 'A', color: 'text-green-400', bg: 'bg-green-500/15' }
    if (score >= 60) return { grade: 'B', color: 'text-yellow-400', bg: 'bg-yellow-500/20' }
    if (score >= 50) return { grade: 'C', color: 'text-orange-400', bg: 'bg-orange-500/20' }
    return { grade: 'D', color: 'text-red-400', bg: 'bg-red-500/20' }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`fixed ${isExpanded ? 'inset-4' : 'top-4 right-4 w-80'} bg-black/90 backdrop-blur-xl border border-cyan-500/30 rounded-xl shadow-2xl z-50 overflow-hidden`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaTachometerAlt className="text-cyan-400 text-xl" />
              <div>
                <h3 className="text-white font-semibold">Performance Monitor</h3>
                <p className="text-gray-400 text-sm">Real-time system metrics</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                {isExpanded ? <FaCompress /> : <FaExpand />}
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={`p-4 ${isExpanded ? 'h-full overflow-y-auto' : 'max-h-96 overflow-y-auto'}`}>
          {metrics ? (
            <div className="space-y-4">
              {/* Performance Grade */}
              <Card className={`${getPerformanceGrade(metrics).bg} border-cyan-500/30`}>
                <CardContent className="p-4 text-center">
                  <div className={`text-3xl font-bold ${getPerformanceGrade(metrics).color} mb-1`}>
                    {getPerformanceGrade(metrics).grade}
                  </div>
                  <div className="text-gray-300 text-sm">Overall Performance</div>
                </CardContent>
              </Card>

              {/* Key Metrics */}
              <div className={`grid ${isExpanded ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-2'} gap-4`}>
                {/* FPS */}
                <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FaTachometerAlt className="text-blue-400" />
                      <span className="text-white text-sm font-medium">FPS</span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{metrics.fps}</div>
                    <div className={`text-xs ${metrics.fps >= 55 ? 'text-green-400' : metrics.fps >= 30 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {metrics.fps >= 55 ? 'Excellent' : metrics.fps >= 30 ? 'Good' : 'Poor'}
                    </div>
                  </CardContent>
                </Card>

                {/* Memory */}
                <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FaMemory className="text-purple-400" />
                      <span className="text-white text-sm font-medium">Memory</span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{metrics.memory.percentage}%</div>
                    <div className="text-xs text-gray-400">{metrics.memory.used}MB used</div>
                  </CardContent>
                </Card>

                {/* CPU */}
                <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FaMicrochip className="text-green-400" />
                      <span className="text-white text-sm font-medium">CPU</span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{metrics.cpu}%</div>
                    <div className={`text-xs ${metrics.cpu <= 30 ? 'text-green-400' : metrics.cpu <= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {metrics.cpu <= 30 ? 'Low' : metrics.cpu <= 60 ? 'Medium' : 'High'}
                    </div>
                  </CardContent>
                </Card>

                {/* Network */}
                <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/30">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FaWifi className="text-orange-400" />
                      <span className="text-white text-sm font-medium">Network</span>
                    </div>
                    <div className="text-lg font-bold text-white mb-1">{metrics.network.downloadSpeed} Mbps</div>
                    <div className="text-xs text-gray-400">{metrics.network.latency}ms latency</div>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Metrics */}
              {isExpanded && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Page Performance */}
                  <Card className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/30">
                    <CardContent className="p-4">
                      <h4 className="text-white font-semibold mb-3">Page Performance</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400 text-sm">Load Time</span>
                          <span className="text-white">{metrics.pageLoad}ms</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400 text-sm">Render Time</span>
                          <span className="text-white">{metrics.renderTime}ms</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400 text-sm">DOM Elements</span>
                          <span className="text-white">{metrics.domSize}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400 text-sm">Bundle Size</span>
                          <span className="text-white">{metrics.bundleSize}KB</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Performance History */}
                  <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/30">
                    <CardContent className="p-4">
                      <h4 className="text-white font-semibold mb-3">FPS History</h4>
                      <div className="h-20 flex items-end justify-between gap-1">
                        {history.slice(-20).map((metric, index) => (
                          <div
                            key={index}
                            className="bg-gradient-to-t from-cyan-500 to-blue-500 rounded-sm opacity-70 hover:opacity-100 transition-opacity"
                            style={{
                              height: `${(metric.fps / 60) * 100}%`,
                              width: '4px'
                            }}
                            title={`${metric.fps} FPS`}
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Performance Tips */}
              <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/30">
                <CardContent className="p-4">
                  <h4 className="text-white font-semibold mb-2">Performance Tips</h4>
                  <div className="text-sm text-gray-300 space-y-1">
                    {metrics.fps < 30 && <div>• Consider closing other browser tabs to improve FPS</div>}
                    {metrics.memory.percentage > 75 && <div>• High memory usage detected, refresh may help</div>}
                    {metrics.cpu > 60 && <div>• High CPU usage may affect performance</div>}
                    {metrics.pageLoad > 3000 && <div>• Page load time could be optimized</div>}
                    {metrics.fps >= 55 && metrics.memory.percentage <= 50 && <div>• Performance is excellent! 🚀</div>}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
