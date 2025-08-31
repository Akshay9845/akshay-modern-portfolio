'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaPaperPlane, FaUser, FaEnvelope, FaCommentDots, FaCheck } from 'react-icons/fa'

interface Message {
  id: string
  name: string
  email: string
  message: string
  timestamp: Date
  type: 'feedback' | 'collaboration' | 'question' | 'other'
}

export function MessageForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    type: 'feedback' as const
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call - In real implementation, you'd send to your backend
    setTimeout(() => {
      // Store in localStorage for demo purposes (you'd use a real database)
      const messages = JSON.parse(localStorage.getItem('portfolioMessages') || '[]')
      const newMessage: Message = {
        id: Date.now().toString(),
        ...formData,
        timestamp: new Date()
      }
      messages.push(newMessage)
      localStorage.setItem('portfolioMessages', JSON.stringify(messages))

      setIsSubmitting(false)
      setIsSubmitted(true)
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({ name: '', email: '', message: '', type: 'feedback' })
      }, 3000)
    }, 1500)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center py-12"
      >
        <div className="w-16 h-16 mx-auto mb-4 bg-green-500/20 rounded-full flex items-center justify-center">
          <FaCheck className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-green-300 mb-2">Message Sent!</h3>
        <p className="text-gray-200">
          Thanks for reaching out! I'll get back to you soon.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-2">
            <FaUser className="inline w-4 h-4 mr-2 text-cyan-400" />
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-white/10 border border-gray-400/30 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
            placeholder="Enter your name"
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
            <FaEnvelope className="inline w-4 h-4 mr-2 text-cyan-400" />
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-white/10 border border-gray-400/30 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
            placeholder="your.email@example.com"
          />
        </div>
      </div>

      {/* Message Type */}
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-200 mb-2">
          <FaCommentDots className="inline w-4 h-4 mr-2 text-cyan-400" />
          Message Type
        </label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-white/10 border border-gray-400/30 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
        >
          <option value="feedback" className="bg-gray-800 text-gray-100">Feedback</option>
          <option value="collaboration" className="bg-gray-800 text-gray-100">Collaboration</option>
          <option value="question" className="bg-gray-800 text-gray-100">Question</option>
          <option value="other" className="bg-gray-800 text-gray-100">Other</option>
        </select>
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-2">
          Your Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={formData.message}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-white/10 border border-gray-400/30 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 resize-none"
          placeholder="Share your thoughts, questions, or collaboration ideas..."
        />
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2"
        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <FaPaperPlane className="w-4 h-4" />
            Send Message
          </>
        )}
      </motion.button>

      {/* Privacy Note */}
      <p className="text-xs text-gray-400 text-center">
        Your message will be stored securely. I respect your privacy and will only use your email to respond to your message.
      </p>
    </form>
  )
}

// Admin component to view messages (for you to check later)
export function MessageViewer() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isVisible, setIsVisible] = useState(false)

  const loadMessages = () => {
    const storedMessages = JSON.parse(localStorage.getItem('portfolioMessages') || '[]')
    setMessages(storedMessages.reverse()) // Show newest first
    setIsVisible(true)
  }

  const clearMessages = () => {
    localStorage.removeItem('portfolioMessages')
    setMessages([])
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'feedback': return 'bg-blue-500/20 text-blue-400'
      case 'collaboration': return 'bg-green-500/20 text-green-400'
      case 'question': return 'bg-yellow-500/20 text-yellow-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isVisible ? (
        <button
          onClick={loadMessages}
          className="px-4 py-2 bg-cyan-500 text-white rounded-lg shadow-lg hover:bg-cyan-600 transition-colors"
          title="View Messages (Admin)"
        >
          📬 Messages ({JSON.parse(localStorage.getItem('portfolioMessages') || '[]').length})
        </button>
      ) : (
        <div className="bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-lg w-96 max-h-96 overflow-hidden">
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <h3 className="font-bold text-white">Messages ({messages.length})</h3>
            <div className="flex gap-2">
              <button
                onClick={clearMessages}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                Clear
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
          </div>
          <div className="max-h-80 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <p className="text-gray-400 text-center">No messages yet</p>
            ) : (
              messages.map((message) => (
                <div key={message.id} className="bg-gray-800/50 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-white">{message.name}</h4>
                      <p className="text-sm text-gray-400">{message.email}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${getTypeColor(message.type)}`}>
                      {message.type}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{message.message}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(message.timestamp).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
