'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaCog, FaChartLine, FaTachometerAlt, FaPalette, FaGlobe, 
  FaRobot, FaTimes, FaExpand, FaCompress, FaMicrophone, 
  FaKeyboard, FaVolumeUp, FaMagic, FaCode, FaDownload
} from 'react-icons/fa'
import { Button } from './button'
import { LiveAnalyticsDashboard } from './live-analytics'
import { PerformanceMonitor } from './performance-monitor'
import { ThemeCustomizer } from './theme-customizer'
import { LanguageSwitcher } from './language-provider'

interface ControlPanelProps {
  className?: string
}

interface FeatureCard {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
  isActive: boolean
  isPremium?: boolean
  comingSoon?: boolean
}

export function AdvancedControlPanel({ className = '' }: ControlPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [keyboardShortcuts, setKeyboardShortcuts] = useState(true)
  const [audioFeedback, setAudioFeedback] = useState(false)

  const features: FeatureCard[] = [
    {
      id: 'analytics',
      title: 'Live Analytics',
      description: 'Real-time visitor and performance metrics',
      icon: <FaChartLine />,
      color: 'from-blue-500 to-cyan-500',
      isActive: true
    },
    {
      id: 'performance',
      title: 'Performance Monitor',
      description: 'System performance and optimization insights',
      icon: <FaTachometerAlt />,
      color: 'from-green-500 to-emerald-500',
      isActive: true
    },
    {
      id: 'themes',
      title: 'Theme Customizer',
      description: 'Personalize colors and visual appearance',
      icon: <FaPalette />,
      color: 'from-purple-500 to-pink-500',
      isActive: true
    },
    {
      id: 'ai-assistant',
      title: 'AI Assistant',
      description: 'Intelligent chatbot for portfolio guidance',
      icon: <FaRobot />,
      color: 'from-cyan-500 to-blue-500',
      isActive: true
    },
    {
      id: 'voice-control',
      title: 'Voice Commands',
      description: 'Navigate using voice commands',
      icon: <FaMicrophone />,
      color: 'from-orange-500 to-red-500',
      isActive: voiceEnabled
    },
    {
      id: 'keyboard-nav',
      title: 'Keyboard Navigation',
      description: 'Enhanced keyboard shortcuts',
      icon: <FaKeyboard />,
      color: 'from-indigo-500 to-purple-500',
      isActive: keyboardShortcuts
    },
    {
      id: 'audio-feedback',
      title: 'Audio Feedback',
      description: 'Sound effects and audio cues',
      icon: <FaVolumeUp />,
      color: 'from-yellow-500 to-orange-500',
      isActive: audioFeedback
    },
    {
      id: 'magic-mode',
      title: 'Magic Mode',
      description: 'Enhanced animations and effects',
      icon: <FaMagic />,
      color: 'from-pink-500 to-rose-500',
      isActive: false,
      isPremium: true
    },
    {
      id: 'code-viewer',
      title: 'Live Code Viewer',
      description: 'View portfolio source code in real-time',
      icon: <FaCode />,
      color: 'from-gray-500 to-slate-500',
      isActive: false,
      comingSoon: true
    }
  ]

  const handleFeatureToggle = (featureId: string) => {
    switch (featureId) {
      case 'analytics':
        setActiveModal('analytics')
        break
      case 'performance':
        setActiveModal('performance')
        break
      case 'themes':
        setActiveModal('themes')
        break
      case 'voice-control':
        setVoiceEnabled(!voiceEnabled)
        if (!voiceEnabled) {
          // Initialize voice commands
          initializeVoiceCommands()
        }
        break
      case 'keyboard-nav':
        setKeyboardShortcuts(!keyboardShortcuts)
        if (!keyboardShortcuts) {
          initializeKeyboardShortcuts()
        }
        break
      case 'audio-feedback':
        setAudioFeedback(!audioFeedback)
        if (!audioFeedback) {
          playNotificationSound()
        }
        break
      default:
        console.log(`Feature ${featureId} clicked`)
    }
  }

  const initializeVoiceCommands = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = false
      recognition.lang = 'en-US'

      recognition.onresult = (event: any) => {
        const command = event.results[event.results.length - 1][0].transcript.toLowerCase()
        handleVoiceCommand(command)
      }

      recognition.start()
    }
  }

  const handleVoiceCommand = (command: string) => {
    if (command.includes('scroll down')) {
      window.scrollBy(0, 500)
    } else if (command.includes('scroll up')) {
      window.scrollBy(0, -500)
    } else if (command.includes('go to top')) {
      window.scrollTo(0, 0)
    } else if (command.includes('open projects')) {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
    } else if (command.includes('contact')) {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const initializeKeyboardShortcuts = () => {
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'k':
            e.preventDefault()
            setIsOpen(true)
            break
          case '1':
            e.preventDefault()
            document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })
            break
          case '2':
            e.preventDefault()
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
            break
          case '3':
            e.preventDefault()
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            break
        }
      }
    })
  }

  const playNotificationSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = 800
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.3)
  }

  const exportSettings = () => {
    const settings = {
      voiceEnabled,
      keyboardShortcuts,
      audioFeedback,
      timestamp: new Date().toISOString()
    }
    
    const dataStr = JSON.stringify(settings, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'portfolio-settings.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <div className={`fixed bottom-6 left-6 z-40 ${className}`}>
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaCog className="text-white text-xl animate-spin-slow" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full animate-pulse"></div>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`bg-gray-900 border border-purple-500/30 rounded-xl ${
                isExpanded ? 'w-full max-w-7xl h-[90vh]' : 'max-w-4xl w-full max-h-[80vh]'
              } overflow-hidden`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-6 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FaCog className="text-purple-400 text-2xl" />
                    <div>
                      <h2 className="text-2xl font-bold text-white">Advanced Control Panel</h2>
                      <p className="text-gray-400">Customize your portfolio experience</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <LanguageSwitcher />
                    <button
                      onClick={exportSettings}
                      className="flex items-center gap-2 px-3 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors"
                    >
                      <FaDownload />
                      Export
                    </button>
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      {isExpanded ? <FaCompress /> : <FaExpand />}
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <FaTimes className="text-xl" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`p-6 ${isExpanded ? 'h-full overflow-y-auto' : 'max-h-[calc(80vh-120px)] overflow-y-auto'}`}>
                <div className={`grid ${isExpanded ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-6`}>
                  {features.map((feature) => (
                    <motion.div
                      key={feature.id}
                      className={`relative p-6 border rounded-xl cursor-pointer transition-all hover:scale-105 ${
                        feature.isActive
                          ? 'border-purple-500 bg-purple-500/10'
                          : 'border-gray-600 hover:border-gray-500'
                      } ${feature.comingSoon ? 'opacity-60' : ''}`}
                      onClick={() => !feature.comingSoon && handleFeatureToggle(feature.id)}
                      whileHover={{ y: -2 }}
                    >
                      {/* Status Indicator */}
                      <div className={`absolute top-3 right-3 w-3 h-3 rounded-full ${
                        feature.isActive ? 'bg-green-400 animate-pulse' : 'bg-gray-600'
                      }`} />

                      {/* Premium Badge */}
                      {feature.isPremium && (
                        <div className="absolute top-2 left-2 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold rounded">
                          PRO
                        </div>
                      )}

                      {/* Coming Soon Badge */}
                      {feature.comingSoon && (
                        <div className="absolute top-2 left-2 px-2 py-1 bg-gray-600 text-white text-xs font-bold rounded">
                          SOON
                        </div>
                      )}

                      {/* Icon */}
                      <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center text-white text-xl mb-4`}>
                        {feature.icon}
                      </div>

                      {/* Content */}
                      <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-400 text-sm mb-4">{feature.description}</p>

                      {/* Toggle */}
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${feature.isActive ? 'text-green-400' : 'text-gray-500'}`}>
                          {feature.isActive ? 'Active' : 'Inactive'}
                        </span>
                        {!feature.comingSoon && (
                          <div className={`w-12 h-6 rounded-full transition-colors ${
                            feature.isActive ? 'bg-green-500' : 'bg-gray-600'
                          } relative`}>
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                              feature.isActive ? 'translate-x-7' : 'translate-x-1'
                            }`} />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Keyboard Shortcuts Guide */}
                {keyboardShortcuts && (
                  <div className="mt-8 p-6 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-xl">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <FaKeyboard className="text-indigo-400" />
                      Keyboard Shortcuts
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Open Control Panel:</span>
                        <span className="text-white font-mono">Ctrl/Cmd + K</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Go to Home:</span>
                        <span className="text-white font-mono">Ctrl/Cmd + 1</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Go to Projects:</span>
                        <span className="text-white font-mono">Ctrl/Cmd + 2</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Go to Contact:</span>
                        <span className="text-white font-mono">Ctrl/Cmd + 3</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Scroll to Top:</span>
                        <span className="text-white font-mono">Home</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Scroll to Bottom:</span>
                        <span className="text-white font-mono">End</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Voice Commands Guide */}
                {voiceEnabled && (
                  <div className="mt-6 p-6 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <FaMicrophone className="text-orange-400" />
                      Voice Commands
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="text-gray-400">"Scroll down" - Scroll page down</div>
                      <div className="text-gray-400">"Scroll up" - Scroll page up</div>
                      <div className="text-gray-400">"Go to top" - Go to page top</div>
                      <div className="text-gray-400">"Open projects" - Navigate to projects</div>
                      <div className="text-gray-400">"Contact" - Navigate to contact</div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <LiveAnalyticsDashboard
        isOpen={activeModal === 'analytics'}
        onClose={() => setActiveModal(null)}
      />
      <PerformanceMonitor
        isOpen={activeModal === 'performance'}
        onClose={() => setActiveModal(null)}
      />
      <ThemeCustomizer
        isOpen={activeModal === 'themes'}
        onClose={() => setActiveModal(null)}
      />
    </>
  )
}
