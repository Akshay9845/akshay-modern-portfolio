'use client'

import { motion } from "framer-motion";

// Static component with no animations or dynamic styles to avoid hydration errors
export function ProfilePhoto() {
  // Profile picture component moved to middle
  return (
    <div className="flex justify-center mb-8">
      <div className="relative">
        <motion.div
          className="w-48 h-48 md:w-64 md:h-64 relative rounded-full overflow-hidden border-4 border-cyan-400/30 bg-black/20 backdrop-blur-sm shadow-2xl shadow-cyan-400/25"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <img
            src="/portfolio%20pic.JPG"
            alt="Akshay Kumar S - AI & Data Science Engineer"
            className="w-full h-full object-cover object-center"
          />
          
          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-cyan-400/20 via-transparent to-transparent"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
        
        {/* Animated glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 via-blue-500/30 to-purple-600/30 rounded-full blur-xl -z-10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  )
}
