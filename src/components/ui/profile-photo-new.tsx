'use client'

import { motion } from "framer-motion";

// Static component with no animations or dynamic styles to avoid hydration errors
export function ProfilePhoto() {
  // Profile picture component optimized for mobile
  return (
    <div className="flex justify-center mb-4 sm:mb-8 relative z-50">
      <div className="relative">
        <motion.div
          className="w-24 h-24 sm:w-40 sm:h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 relative rounded-full overflow-hidden border-3 sm:border-4 border-cyan-400/30 bg-black/20 backdrop-blur-sm shadow-2xl shadow-cyan-400/25"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <img
            src="/portfolio%20pic.JPG"
            alt="Akshay Kumar S - AI & Data Science Engineer"
            className="w-full h-full object-cover object-center"
            loading="eager"
            decoding="async"
          />
          
          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-cyan-400/20 via-transparent to-transparent"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
        
        {/* Animated glow effect - simplified for mobile */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 sm:from-cyan-400/30 sm:via-blue-500/30 sm:to-purple-600/30 rounded-full blur-lg sm:blur-xl -z-10"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  )
}
