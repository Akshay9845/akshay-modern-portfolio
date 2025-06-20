'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGlobe, FaCheck } from 'react-icons/fa'

interface Language {
  code: string
  name: string
  flag: string
  nativeName: string
}

interface Translation {
  [key: string]: string | Translation
}

interface Translations {
  [languageCode: string]: Translation
}

interface LanguageContextType {
  currentLanguage: string
  setLanguage: (code: string) => void
  t: (key: string) => string
  languages: Language[]
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
  { code: 'fr', name: 'French', flag: '🇫🇷', nativeName: 'Français' },
  { code: 'de', name: 'German', flag: '🇩🇪', nativeName: 'Deutsch' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳', nativeName: '中文' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷', nativeName: '한국어' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳', nativeName: 'हिन्दी' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦', nativeName: 'العربية' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹', nativeName: 'Português' },
]

const translations: Translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      skills: 'Skills',
      contact: 'Contact'
    },
    hero: {
      greeting: 'Hello, I am',
      name: 'Akshay Kumar S',
      title: 'AI & Data Science Engineer',
      subtitle: 'Specializing in cutting-edge AI solutions, 3D web applications, and intelligent systems that push the boundaries of technology.',
      cta: 'Explore My Work',
      downloadCV: 'Download CV'
    },
    about: {
      title: 'About Me',
      description: 'Passionate AI engineer with expertise in creating innovative solutions that bridge the gap between artificial intelligence and user experience.',
      experience: 'Years Experience',
      projects: 'Projects Completed',
      technologies: 'Technologies Mastered'
    },
    projects: {
      title: 'Featured Projects',
      viewDetails: 'View Details',
      liveDemo: 'Live Demo',
      sourceCode: 'Source Code',
      technologies: 'Technologies Used',
      challenges: 'Key Challenges',
      features: 'Key Features',
      results: 'Results & Impact'
    },
    skills: {
      title: 'Technical Skills',
      frontend: 'Frontend Development',
      backend: 'Backend Development',
      ai: 'AI & Machine Learning',
      tools: 'Tools & Platforms'
    },
    contact: {
      title: 'Get In Touch',
      subtitle: 'Have a project in mind? Let\'s discuss how we can bring your ideas to life.',
      form: {
        name: 'Your Name',
        email: 'Your Email',
        subject: 'Subject',
        message: 'Your Message',
        send: 'Send Message',
        sending: 'Sending...',
        success: 'Message sent successfully!',
        error: 'Failed to send message. Please try again.'
      }
    },
    footer: {
      rights: 'All rights reserved.',
      social: 'Follow me on social media'
    }
  },
  es: {
    nav: {
      home: 'Inicio',
      about: 'Acerca',
      projects: 'Proyectos',
      skills: 'Habilidades',
      contact: 'Contacto'
    },
    hero: {
      greeting: 'Hola, soy',
      name: 'Akshay Kumar S',
      title: 'Ingeniero de IA y Ciencia de Datos',
      subtitle: 'Especializado en soluciones de IA de vanguardia, aplicaciones web 3D y sistemas inteligentes que empujan los límites de la tecnología.',
      cta: 'Explorar Mi Trabajo',
      downloadCV: 'Descargar CV'
    },
    about: {
      title: 'Acerca de Mí',
      description: 'Ingeniero de IA apasionado con experiencia en crear soluciones innovadoras que conectan la inteligencia artificial con la experiencia del usuario.',
      experience: 'Años de Experiencia',
      projects: 'Proyectos Completados',
      technologies: 'Tecnologías Dominadas'
    },
    projects: {
      title: 'Proyectos Destacados',
      viewDetails: 'Ver Detalles',
      liveDemo: 'Demo en Vivo',
      sourceCode: 'Código Fuente',
      technologies: 'Tecnologías Utilizadas',
      challenges: 'Desafíos Clave',
      features: 'Características Clave',
      results: 'Resultados e Impacto'
    },
    skills: {
      title: 'Habilidades Técnicas',
      frontend: 'Desarrollo Frontend',
      backend: 'Desarrollo Backend',
      ai: 'IA y Aprendizaje Automático',
      tools: 'Herramientas y Plataformas'
    },
    contact: {
      title: 'Ponte en Contacto',
      subtitle: '¿Tienes un proyecto en mente? Hablemos de cómo podemos dar vida a tus ideas.',
      form: {
        name: 'Tu Nombre',
        email: 'Tu Email',
        subject: 'Asunto',
        message: 'Tu Mensaje',
        send: 'Enviar Mensaje',
        sending: 'Enviando...',
        success: '¡Mensaje enviado exitosamente!',
        error: 'Error al enviar mensaje. Inténtalo de nuevo.'
      }
    },
    footer: {
      rights: 'Todos los derechos reservados.',
      social: 'Sígueme en redes sociales'
    }
  },
  fr: {
    nav: {
      home: 'Accueil',
      about: 'À Propos',
      projects: 'Projets',
      skills: 'Compétences',
      contact: 'Contact'
    },
    hero: {
      greeting: 'Bonjour, je suis',
      name: 'Akshay Kumar S',
      title: 'Ingénieur IA et Science des Données',
      subtitle: 'Spécialisé dans les solutions IA de pointe, les applications web 3D et les systèmes intelligents qui repoussent les limites de la technologie.',
      cta: 'Explorer Mon Travail',
      downloadCV: 'Télécharger CV'
    },
    about: {
      title: 'À Propos de Moi',
      description: 'Ingénieur IA passionné avec une expertise dans la création de solutions innovantes qui comblent le fossé entre l\'intelligence artificielle et l\'expérience utilisateur.',
      experience: 'Années d\'Expérience',
      projects: 'Projets Terminés',
      technologies: 'Technologies Maîtrisées'
    },
    projects: {
      title: 'Projets Vedettes',
      viewDetails: 'Voir Détails',
      liveDemo: 'Démo Live',
      sourceCode: 'Code Source',
      technologies: 'Technologies Utilisées',
      challenges: 'Défis Clés',
      features: 'Fonctionnalités Clés',
      results: 'Résultats et Impact'
    },
    skills: {
      title: 'Compétences Techniques',
      frontend: 'Développement Frontend',
      backend: 'Développement Backend',
      ai: 'IA et Apprentissage Automatique',
      tools: 'Outils et Plateformes'
    },
    contact: {
      title: 'Prenez Contact',
      subtitle: 'Vous avez un projet en tête ? Discutons de la façon dont nous pouvons donner vie à vos idées.',
      form: {
        name: 'Votre Nom',
        email: 'Votre Email',
        subject: 'Sujet',
        message: 'Votre Message',
        send: 'Envoyer Message',
        sending: 'Envoi...',
        success: 'Message envoyé avec succès !',
        error: 'Échec de l\'envoi du message. Veuillez réessayer.'
      }
    },
    footer: {
      rights: 'Tous droits réservés.',
      social: 'Suivez-moi sur les réseaux sociaux'
    }
  },
  de: {
    nav: {
      home: 'Startseite',
      about: 'Über Mich',
      projects: 'Projekte',
      skills: 'Fähigkeiten',
      contact: 'Kontakt'
    },
    hero: {
      greeting: 'Hallo, ich bin',
      name: 'Akshay Kumar S',
      title: 'KI & Data Science Ingenieur',
      subtitle: 'Spezialisiert auf modernste KI-Lösungen, 3D-Webanwendungen und intelligente Systeme, die die Grenzen der Technologie erweitern.',
      cta: 'Meine Arbeit Erkunden',
      downloadCV: 'Lebenslauf Herunterladen'
    },
    about: {
      title: 'Über Mich',
      description: 'Leidenschaftlicher KI-Ingenieur mit Expertise in der Entwicklung innovativer Lösungen, die die Kluft zwischen künstlicher Intelligenz und Benutzererfahrung überbrücken.',
      experience: 'Jahre Erfahrung',
      projects: 'Abgeschlossene Projekte',
      technologies: 'Beherrschte Technologien'
    },
    projects: {
      title: 'Ausgewählte Projekte',
      viewDetails: 'Details Anzeigen',
      liveDemo: 'Live Demo',
      sourceCode: 'Quellcode',
      technologies: 'Verwendete Technologien',
      challenges: 'Hauptherausforderungen',
      features: 'Hauptmerkmale',
      results: 'Ergebnisse & Auswirkungen'
    },
    skills: {
      title: 'Technische Fähigkeiten',
      frontend: 'Frontend-Entwicklung',
      backend: 'Backend-Entwicklung',
      ai: 'KI & Maschinelles Lernen',
      tools: 'Tools & Plattformen'
    },
    contact: {
      title: 'Kontakt Aufnehmen',
      subtitle: 'Haben Sie ein Projekt im Kopf? Lassen Sie uns besprechen, wie wir Ihre Ideen zum Leben erwecken können.',
      form: {
        name: 'Ihr Name',
        email: 'Ihre E-Mail',
        subject: 'Betreff',
        message: 'Ihre Nachricht',
        send: 'Nachricht Senden',
        sending: 'Senden...',
        success: 'Nachricht erfolgreich gesendet!',
        error: 'Fehler beim Senden der Nachricht. Bitte versuchen Sie es erneut.'
      }
    },
    footer: {
      rights: 'Alle Rechte vorbehalten.',
      social: 'Folgen Sie mir in den sozialen Medien'
    }
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState('en')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language')
    if (savedLanguage && translations[savedLanguage]) {
      setCurrentLanguage(savedLanguage)
    } else {
      // Auto-detect browser language
      const browserLang = navigator.language.split('-')[0]
      if (translations[browserLang]) {
        setCurrentLanguage(browserLang)
      }
    }
  }, [])

  const setLanguage = (code: string) => {
    setCurrentLanguage(code)
    localStorage.setItem('preferred-language', code)
  }

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[currentLanguage]
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        // Fallback to English
        value = translations.en
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey]
          } else {
            return key // Return key if translation not found
          }
        }
        break
      }
    }
    
    return typeof value === 'string' ? value : key
  }

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t, languages }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

interface LanguageSwitcherProps {
  className?: string
}

export function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const { currentLanguage, setLanguage, languages } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0]

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-lg hover:bg-gray-700/50 transition-colors"
      >
        <span className="text-lg">{currentLang.flag}</span>
        <span className="text-white text-sm font-medium">{currentLang.code.toUpperCase()}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FaGlobe className="text-gray-400 text-sm" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full mt-2 right-0 w-64 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto"
          >
            <div className="p-2">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => {
                    setLanguage(language.code)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    currentLanguage === language.code
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <span className="text-xl">{language.flag}</span>
                  <div className="flex-1 text-left">
                    <div className="font-medium">{language.name}</div>
                    <div className="text-sm opacity-70">{language.nativeName}</div>
                  </div>
                  {currentLanguage === language.code && (
                    <FaCheck className="text-cyan-400" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
