'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPalette, FaCheck, FaSun, FaMoon, FaAdjust, FaTimes, FaDownload, FaUpload } from 'react-icons/fa'

interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  background: string
  surface: string
  text: string
  muted: string
}

interface Theme {
  id: string
  name: string
  colors: ThemeColors
  isDark: boolean
  gradient?: string
}

interface ThemeContextType {
  currentTheme: Theme
  setTheme: (theme: Theme) => void
  customizeTheme: (colors: Partial<ThemeColors>) => void
  themes: Theme[]
  isDark: boolean
  toggleDarkMode: () => void
}

const defaultThemes: Theme[] = [
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    isDark: true,
    colors: {
      primary: '#00ffff',
      secondary: '#ff00ff',
      accent: '#ffff00',
      background: '#000000',
      surface: '#1a1a1a',
      text: '#ffffff',
      muted: '#888888'
    },
    gradient: 'from-cyan-500 via-purple-500 to-pink-500'
  },
  {
    id: 'ocean',
    name: 'Ocean Depths',
    isDark: true,
    colors: {
      primary: '#0ea5e9',
      secondary: '#06b6d4',
      accent: '#14b8a6',
      background: '#0c1226',
      surface: '#1e293b',
      text: '#f1f5f9',
      muted: '#64748b'
    },
    gradient: 'from-blue-600 via-blue-500 to-cyan-500'
  },
  {
    id: 'sunset',
    name: 'Sunset Vibes',
    isDark: true,
    colors: {
      primary: '#f97316',
      secondary: '#ef4444',
      accent: '#eab308',
      background: '#1c1917',
      surface: '#292524',
      text: '#fafaf9',
      muted: '#78716c'
    },
    gradient: 'from-orange-500 via-red-500 to-yellow-500'
  },
  {
    id: 'forest',
    name: 'Forest Night',
    isDark: true,
    colors: {
      primary: '#22c55e',
      secondary: '#16a34a',
      accent: '#84cc16',
      background: '#0c1512',
      surface: '#1a2e23',
      text: '#f0fdf4',
      muted: '#6b7280'
    },
    gradient: 'from-green-600 via-emerald-500 to-lime-500'
  },
  {
    id: 'galaxy',
    name: 'Galaxy',
    isDark: true,
    colors: {
      primary: '#8b5cf6',
      secondary: '#a855f7',
      accent: '#d946ef',
      background: '#0f0a1a',
      surface: '#1e1b2e',
      text: '#f8fafc',
      muted: '#6b7280'
    },
    gradient: 'from-purple-600 via-violet-500 to-fuchsia-500'
  },
  {
    id: 'arctic',
    name: 'Arctic Aurora',
    isDark: true,
    colors: {
      primary: '#60a5fa',
      secondary: '#3b82f6',
      accent: '#06b6d4',
      background: '#0a0e1a',
      surface: '#1e2a3a',
      text: '#f0f9ff',
      muted: '#64748b'
    },
    gradient: 'from-blue-400 via-cyan-400 to-teal-400'
  }
]

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(defaultThemes[0])
  const [customThemes, setCustomThemes] = useState<Theme[]>([])
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const savedTheme = localStorage.getItem('selected-theme')
    const savedCustomThemes = localStorage.getItem('custom-themes')
    
    if (savedCustomThemes) {
      const parsed = JSON.parse(savedCustomThemes)
      setCustomThemes(parsed)
    }
    
    if (savedTheme) {
      const theme = [...defaultThemes, ...customThemes].find(t => t.id === savedTheme)
      if (theme) {
        setCurrentTheme(theme)
        setIsDark(theme.isDark)
      }
    }

    // Apply theme to CSS variables
    applyThemeToCSS(currentTheme)
  }, [])

  const applyThemeToCSS = (theme: Theme) => {
    const root = document.documentElement
    root.style.setProperty('--primary-color', theme.colors.primary)
    root.style.setProperty('--secondary-color', theme.colors.secondary)
    root.style.setProperty('--accent-color', theme.colors.accent)
    root.style.setProperty('--background-color', theme.colors.background)
    root.style.setProperty('--surface-color', theme.colors.surface)
    root.style.setProperty('--text-color', theme.colors.text)
    root.style.setProperty('--muted-color', theme.colors.muted)
  }

  const setTheme = (theme: Theme) => {
    setCurrentTheme(theme)
    setIsDark(theme.isDark)
    localStorage.setItem('selected-theme', theme.id)
    applyThemeToCSS(theme)
  }

  const customizeTheme = (colors: Partial<ThemeColors>) => {
    const newTheme: Theme = {
      ...currentTheme,
      id: `custom-${Date.now()}`,
      name: `Custom ${customThemes.length + 1}`,
      colors: { ...currentTheme.colors, ...colors }
    }
    
    const updatedCustomThemes = [...customThemes, newTheme]
    setCustomThemes(updatedCustomThemes)
    localStorage.setItem('custom-themes', JSON.stringify(updatedCustomThemes))
    setTheme(newTheme)
  }

  const toggleDarkMode = () => {
    const newTheme = { ...currentTheme, isDark: !isDark }
    setTheme(newTheme)
  }

  const allThemes = [...defaultThemes, ...customThemes]

  return (
    <ThemeContext.Provider value={{ 
      currentTheme, 
      setTheme, 
      customizeTheme, 
      themes: allThemes, 
      isDark, 
      toggleDarkMode 
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeCustomizerProps {
  isOpen: boolean
  onClose: () => void
}

export function ThemeCustomizer({ isOpen, onClose }: ThemeCustomizerProps) {
  const { currentTheme, setTheme, customizeTheme, themes } = useTheme()
  const [activeTab, setActiveTab] = useState<'presets' | 'custom'>('presets')
  const [customColors, setCustomColors] = useState<ThemeColors>(currentTheme.colors)

  const exportTheme = () => {
    const themeData = {
      theme: currentTheme,
      timestamp: new Date().toISOString()
    }
    
    const dataStr = JSON.stringify(themeData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `theme-${currentTheme.name.toLowerCase().replace(/\s+/g, '-')}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const importTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const themeData = JSON.parse(e.target?.result as string)
        if (themeData.theme) {
          const importedTheme = { ...themeData.theme, id: `imported-${Date.now()}` }
          setTheme(importedTheme)
        }
      } catch (error) {
        alert('Invalid theme file')
      }
    }
    reader.readAsText(file)
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
            className="bg-gray-900 border border-cyan-500/30 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FaPalette className="text-cyan-400 text-2xl" />
                  <div>
                    <h2 className="text-2xl font-bold text-white">Theme Customizer</h2>
                    <p className="text-gray-400">Personalize your portfolio experience</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={exportTheme}
                    className="flex items-center gap-2 px-3 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors"
                  >
                    <FaDownload />
                    Export
                  </button>
                  <label className="flex items-center gap-2 px-3 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors cursor-pointer">
                    <FaUpload />
                    Import
                    <input
                      type="file"
                      accept=".json"
                      onChange={importTheme}
                      className="hidden"
                    />
                  </label>
                  <button
                    onClick={onClose}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setActiveTab('presets')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'presets'
                      ? 'bg-cyan-500/30 text-cyan-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Theme Presets
                </button>
                <button
                  onClick={() => setActiveTab('custom')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'custom'
                      ? 'bg-cyan-500/30 text-cyan-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Custom Colors
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[calc(90vh-200px)] overflow-y-auto">
              {activeTab === 'presets' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {themes.map((theme) => (
                    <div
                      key={theme.id}
                      className={`relative p-4 border rounded-xl cursor-pointer transition-all hover:scale-105 ${
                        currentTheme.id === theme.id
                          ? 'border-cyan-500 bg-cyan-500/10'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                      onClick={() => setTheme(theme)}
                    >
                      {/* Theme Preview */}
                      <div className="h-20 rounded-lg mb-3 relative overflow-hidden">
                        <div
                          className="absolute inset-0 opacity-30"
                          style={{ backgroundColor: theme.colors.background }}
                        />
                        <div
                          className="absolute inset-0 bg-gradient-to-r opacity-70"
                          style={{
                            backgroundImage: `linear-gradient(45deg, ${theme.colors.primary}40, ${theme.colors.secondary}40, ${theme.colors.accent}40)`
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex gap-1">
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: theme.colors.primary }}
                            />
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: theme.colors.secondary }}
                            />
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: theme.colors.accent }}
                            />
                          </div>
                        </div>
                      </div>

                      <h3 className="text-white font-semibold mb-1">{theme.name}</h3>
                      <p className="text-gray-400 text-sm mb-3">
                        {theme.isDark ? 'Dark Theme' : 'Light Theme'}
                      </p>

                      {/* Color Palette */}
                      <div className="flex gap-2">
                        <div
                          className="w-6 h-6 rounded border border-gray-600"
                          style={{ backgroundColor: theme.colors.primary }}
                          title="Primary"
                        />
                        <div
                          className="w-6 h-6 rounded border border-gray-600"
                          style={{ backgroundColor: theme.colors.secondary }}
                          title="Secondary"
                        />
                        <div
                          className="w-6 h-6 rounded border border-gray-600"
                          style={{ backgroundColor: theme.colors.accent }}
                          title="Accent"
                        />
                      </div>

                      {/* Selected Indicator */}
                      {currentTheme.id === theme.id && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
                          <FaCheck className="text-white text-xs" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Color Customization */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(customColors).map(([key, value]) => (
                      <div key={key} className="space-y-2">
                        <label className="text-white font-medium capitalize">
                          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={value}
                            onChange={(e) => setCustomColors(prev => ({
                              ...prev,
                              [key]: e.target.value
                            }))}
                            className="w-12 h-10 rounded border border-gray-600 bg-transparent cursor-pointer"
                          />
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => setCustomColors(prev => ({
                              ...prev,
                              [key]: e.target.value
                            }))}
                            className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Preview */}
                  <div className="border border-gray-600 rounded-xl p-6">
                    <h3 className="text-white font-semibold mb-4">Preview</h3>
                    <div
                      className="h-32 rounded-lg relative overflow-hidden"
                      style={{ backgroundColor: customColors.background }}
                    >
                      <div
                        className="absolute inset-0 bg-gradient-to-r opacity-20"
                        style={{
                          backgroundImage: `linear-gradient(45deg, ${customColors.primary}, ${customColors.secondary}, ${customColors.accent})`
                        }}
                      />
                      <div className="absolute inset-0 p-4 flex flex-col justify-between">
                        <div>
                          <h4 style={{ color: customColors.text }} className="font-bold text-lg">
                            Portfolio Title
                          </h4>
                          <p style={{ color: customColors.muted }} className="text-sm">
                            Sample description text
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            className="px-4 py-2 rounded font-medium"
                            style={{
                              backgroundColor: customColors.primary,
                              color: customColors.background
                            }}
                          >
                            Primary
                          </button>
                          <button
                            className="px-4 py-2 rounded font-medium"
                            style={{
                              backgroundColor: customColors.secondary,
                              color: customColors.background
                            }}
                          >
                            Secondary
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Apply Button */}
                  <button
                    onClick={() => customizeTheme(customColors)}
                    className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-colors"
                  >
                    Apply Custom Theme
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
