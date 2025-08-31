'use client'

import { motion } from "framer-motion";

// Static component with no animations or dynamic styles to avoid hydration errors
export function ProfilePhoto() {
  // Profile picture component optimized for mobile
  return (
    <div className="flex justify-center mb-2 sm:mb-4 md:mb-6 relative z-50">
      <div className="relative">
        <motion.div
          className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 xl:w-48 xl:h-48 relative rounded-full overflow-hidden border-2 sm:border-3 border-cyan-400/30 bg-black/20 backdrop-blur-sm shadow-xl shadow-cyan-400/20"
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
        
        {/* Animated glow effect - optimized for mobile */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-400/15 via-blue-500/15 to-purple-600/15 sm:from-cyan-400/20 sm:via-blue-500/20 sm:to-purple-600/20 rounded-full blur-md sm:blur-lg -z-10"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.2, 0.4, 0.2],
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
