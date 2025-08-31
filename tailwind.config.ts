import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        // Custom gradient colors
        gradient: {
          primary: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          secondary: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
          tertiary: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
          quaternary: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
          quintenary: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
          cyber: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
          neon: "linear-gradient(135deg, #00d4ff 0%, #090979 50%, #ff00ff 100%)",
          holographic: "linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 25%, #45b7d1 50%, #96ceb4 75%, #ffeaa7 100%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out",
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-in-left": "slideInLeft 0.5s ease-out",
        "slide-in-right": "slideInRight 0.5s ease-out",
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 3s infinite",
        "spin-slow": "spin 8s linear infinite",
        "wiggle": "wiggle 1s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "shimmer": "shimmer 2.5s linear infinite",
        "gradient": "gradient 8s linear infinite",
        "morph": "morph 8s ease-in-out infinite",
        "wave": "wave 2s ease-in-out infinite",
        "ripple": "ripple 1s linear infinite",
        "orbit": "orbit 20s linear infinite",
        "nebula": "nebula 10s ease-in-out infinite",
        "quantum": "quantum 5s ease-in-out infinite",
        "hologram": "hologram 3s ease-in-out infinite",
        "neon-pulse": "neonPulse 1.5s ease-in-out infinite",
        "cyber-glitch": "cyberGlitch 0.3s ease-in-out infinite",
        "matrix": "matrix 20s linear infinite",
        "particle": "particle 4s ease-in-out infinite",
        "energy": "energy 2s ease-in-out infinite",
        "portal": "portal 6s ease-in-out infinite",
        "dimension": "dimension 12s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" },
          "100%": { boxShadow: "0 0 40px rgba(59, 130, 246, 0.8)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        gradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        morph: {
          "0%": { borderRadius: "60% 40% 30% 70%/60% 30% 70% 40%" },
          "50%": { borderRadius: "30% 60% 70% 40%/50% 60% 30% 60%" },
          "100%": { borderRadius: "60% 40% 30% 70%/60% 30% 70% 40%" },
        },
        wave: {
          "0%": { transform: "rotate(0deg)" },
          "10%": { transform: "rotate(14deg)" },
          "20%": { transform: "rotate(-8deg)" },
          "30%": { transform: "rotate(14deg)" },
          "40%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(10deg)" },
          "60%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: "1" },
          "100%": { transform: "scale(4)", opacity: "0" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(50px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(50px) rotate(-360deg)" },
        },
        nebula: {
          "0%, 100%": { filter: "hue-rotate(0deg)" },
          "50%": { filter: "hue-rotate(180deg)" },
        },
        quantum: {
          "0%": { transform: "scale(1) rotate(0deg)" },
          "25%": { transform: "scale(1.1) rotate(90deg)" },
          "50%": { transform: "scale(0.9) rotate(180deg)" },
          "75%": { transform: "scale(1.05) rotate(270deg)" },
          "100%": { transform: "scale(1) rotate(360deg)" },
        },
        hologram: {
          "0%": { opacity: "0.3", filter: "blur(1px)" },
          "50%": { opacity: "1", filter: "blur(0px)" },
          "100%": { opacity: "0.3", filter: "blur(1px)" },
        },
        neonPulse: {
          "0%, 100%": { textShadow: "0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor" },
          "50%": { textShadow: "0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor" },
        },
        cyberGlitch: {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
          "100%": { transform: "translate(0)" },
        },
        matrix: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        particle: {
          "0%": { transform: "translateY(0) scale(1)", opacity: "1" },
          "100%": { transform: "translateY(-100px) scale(0)", opacity: "0" },
        },
        energy: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        portal: {
          "0%": { transform: "rotate(0deg) scale(1)" },
          "50%": { transform: "rotate(180deg) scale(1.2)" },
          "100%": { transform: "rotate(360deg) scale(1)" },
        },
        dimension: {
          "0%": { transform: "perspective(1000px) rotateY(0deg)" },
          "25%": { transform: "perspective(1000px) rotateY(90deg)" },
          "50%": { transform: "perspective(1000px) rotateY(180deg)" },
          "75%": { transform: "perspective(1000px) rotateY(270deg)" },
          "100%": { transform: "perspective(1000px) rotateY(360deg)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-mesh": "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
        "gradient-cyber": "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
        "gradient-neon": "linear-gradient(135deg, #00d4ff 0%, #090979 50%, #ff00ff 100%)",
        "gradient-holographic": "linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 25%, #45b7d1 50%, #96ceb4 75%, #ffeaa7 100%)",
        "gradient-quantum": "linear-gradient(45deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)",
        "gradient-matrix": "linear-gradient(0deg, transparent 0%, #00ff00 50%, transparent 100%)",
        "gradient-portal": "radial-gradient(circle at center, #667eea 0%, #764ba2 50%, #000 100%)",
        "gradient-dimension": "conic-gradient(from 0deg at 50% 50%, #667eea 0deg, #764ba2 90deg, #f093fb 180deg, #f5576c 270deg, #667eea 360deg)",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "neon": "0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor",
        "cyber": "0 0 20px rgba(59, 130, 246, 0.5), inset 0 0 20px rgba(59, 130, 246, 0.1)",
        "holographic": "0 0 30px rgba(255, 107, 107, 0.3), 0 0 60px rgba(78, 205, 196, 0.2)",
        "quantum": "0 0 40px rgba(102, 126, 234, 0.4), 0 0 80px rgba(118, 75, 162, 0.2)",
        "portal": "0 0 50px rgba(102, 126, 234, 0.5), inset 0 0 50px rgba(102, 126, 234, 0.1)",
      },
      textShadow: {
        "neon": "0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor",
        "cyber": "0 0 10px rgba(59, 130, 246, 0.8), 0 0 20px rgba(59, 130, 246, 0.4)",
        "holographic": "0 0 15px rgba(255, 107, 107, 0.8), 0 0 30px rgba(78, 205, 196, 0.6)",
      },
    },
  },
  plugins: [
    function({ addUtilities }: any) {
      const newUtilities = {
        ".text-shadow": {
          "text-shadow": "0 2px 4px rgba(0,0,0,0.1)",
        },
        ".text-shadow-neon": {
          "text-shadow": "0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor",
        },
        ".text-shadow-cyber": {
          "text-shadow": "0 0 10px rgba(59, 130, 246, 0.8), 0 0 20px rgba(59, 130, 246, 0.4)",
        },
        ".text-shadow-holographic": {
          "text-shadow": "0 0 15px rgba(255, 107, 107, 0.8), 0 0 30px rgba(78, 205, 196, 0.6)",
        },
        ".backdrop-blur-glass": {
          "backdrop-filter": "blur(20px) saturate(180%)",
          "background": "rgba(255, 255, 255, 0.05)",
        },
        ".glass-morphism": {
          "background": "rgba(255, 255, 255, 0.1)",
          "backdrop-filter": "blur(10px)",
          "border": "1px solid rgba(255, 255, 255, 0.2)",
        },
        ".cyber-border": {
          "border": "2px solid transparent",
          "background": "linear-gradient(45deg, #667eea, #764ba2) border-box",
          "mask": "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
          "mask-composite": "exclude",
        },
        ".holographic-border": {
          "border": "2px solid transparent",
          "background": "linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7) border-box",
          "mask": "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
          "mask-composite": "exclude",
        },
      };
      addUtilities(newUtilities);
    },
  ],
} satisfies Config;
