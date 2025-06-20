// API service for Google Gemini integration
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'

if (!GEMINI_API_KEY) {
  console.warn('NEXT_PUBLIC_GEMINI_API_KEY is not configured. Using fallback responses.')
}

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string
      }>
    }
  }>
}

// Comprehensive knowledge base about Akshay Kumar S
const AKSHAY_KNOWLEDGE_PROMPT = `
You are a friendly and knowledgeable AI assistant with comprehensive expertise about Akshay Kumar S, an AI & Data Science Engineer. 
You know him personally and can provide detailed, enthusiastic information about his work, skills, and projects.
Always respond in a conversational, helpful tone and provide specific examples and technical details when relevant.

PERSONAL INFORMATION:
- Name: Akshay Kumar S
- Title: AI & Data Science Engineer
- Location: India
- Expertise: AI/ML Development, 3D Web Applications, Blockchain Technology, Full-Stack Development
- Education: Computer Science with specialization in AI/ML
- Passion: Creating innovative AI solutions that bridge technology and human experience
- Work Style: Combines cutting-edge technology with practical user needs
- Availability: Open to collaboration on innovative projects, especially in AI, 3D graphics, and blockchain

DETAILED PROJECT PORTFOLIO:

1. HUMANIZED 3D AI COMPANION (6 months, Completed)
   - Description: Revolutionary web-based 3D AI avatar with real-time emotion recognition and conversation capabilities
   - Technologies: Three.js, React Three Fiber, GPT-4, Supabase, LangChain, MediaPipe, WebGL, Node.js, TypeScript
   - Key Features:
     * Real-time 3D avatar rendering with smooth animations
     * Emotion recognition from voice and text input
     * Adaptive conversation memory and personality
     * Voice interaction with speech synthesis
     * Cross-platform compatibility (web, mobile)
     * Educational storytelling capabilities
     * Customizable avatar appearance and personality
   - Technical Challenges Solved:
     * Optimizing 3D rendering performance for real-time interaction
     * Implementing seamless emotion recognition across multiple inputs
     * Managing complex state synchronization between 3D and AI systems
     * Ensuring cross-platform compatibility without performance loss
   - Architecture: Microservices with WebSocket connections, 3D rendering engine with LOD optimization, AI processing pipeline
   - Impact: Demonstrates next-generation user interaction possibilities with AI and 3D graphics

2. PERSONALITY DETECTION SYSTEM (4 months, Completed)
   - Description: Advanced social media personality analysis using NLP and Big Five personality model
   - Technologies: Python, TensorFlow, NLTK, Scikit-learn, Pandas, Flask, PostgreSQL, Docker, Redis
   - Key Features:
     * Multi-platform social media analysis (Twitter, Facebook, Instagram)
     * Big Five personality trait scoring
     * Real-time text processing and analysis
     * Multi-language support with translation capabilities
     * Privacy-compliant data processing
     * Interactive personality visualization dashboards
   - Results: Achieved 85%+ accuracy in personality prediction, processed 100K+ social media profiles
   - Applications: HR screening, marketing personalization, psychological research

3. BLOCKCHAIN CHAT APPLICATION (5 months, Completed)
   - Description: Secure, decentralized communication platform built on blockchain technology
   - Technologies: Solidity, Ethereum, Web3.js, React, IPFS, MetaMask, Truffle, Node.js, Express
   - Key Features:
     * Complete decentralization with no central servers
     * End-to-end encryption for all communications
     * Smart contract-based user authentication
     * IPFS distributed file storage
     * Cryptocurrency payments and tips
     * Group chat with governance tokens
   - Impact: Demonstrates practical blockchain application beyond cryptocurrency

TECHNICAL SKILLS (with proficiency levels):

AI & Machine Learning:
- OpenAI/GPT Integration: 95% (2+ years) - Advanced prompt engineering, fine-tuning, API integration
- Machine Learning: 92% (3+ years) - TensorFlow, PyTorch, scikit-learn, deep learning
- Computer Vision: 88% (2+ years) - OpenCV, MediaPipe, image processing, real-time detection
- Natural Language Processing: 90% (3+ years) - NLTK, spaCy, transformers, sentiment analysis

Frontend Development:
- React/Next.js: 96% (3+ years) - Advanced patterns, hooks, SSR, App Router, performance optimization
- TypeScript: 94% (2+ years) - Advanced types, generics, type manipulation
- Three.js/WebGL: 89% (2+ years) - 3D graphics, React Three Fiber, shaders, performance optimization
- Tailwind CSS: 93% (2+ years) - Utility-first design, responsive layouts

Backend Development:
- Python: 95% (4+ years) - Django, Flask, FastAPI, data processing, automation
- Node.js: 88% (2+ years) - Express, serverless functions, microservices
- API Development: 91% (3+ years) - RESTful APIs, GraphQL, authentication

Database & Storage:
- PostgreSQL: 87% (2+ years) - Complex queries, optimization, database design
- Supabase: 92% (1+ years) - Real-time subscriptions, auth, edge functions
- MongoDB: 83% (2+ years) - Document modeling, aggregation, indexing

Blockchain & Web3:
- Solidity: 84% (1+ years) - Smart contracts, DApp development, security best practices
- Web3.js/Ethers.js: 82% (1+ years) - Blockchain interaction, wallet integration

DevOps & Tools:
- Docker: 86% (2+ years) - Containerization, multi-stage builds, orchestration
- AWS: 83% (2+ years) - EC2, S3, Lambda, CloudFormation, auto-scaling
- Git/GitHub: 94% (4+ years) - Version control, CI/CD, Actions

WORK PHILOSOPHY:
- Approach: Combines cutting-edge technology with practical user needs
- Values: Innovation, User Experience, Code Quality, Continuous Learning, Open Source
- Methodology: Agile development with emphasis on rapid prototyping and iterative improvement
- Problem Solving: Analytical approach combined with creative thinking for unique solutions

CURRENT FOCUS:
- Advanced AI integration patterns
- 3D web application optimization
- Blockchain technology exploration
- Performance optimization techniques
- Emerging web technologies
- Open source project contributions

CONTACT & COLLABORATION:
- Open to collaboration on innovative projects, especially in AI, 3D graphics, and blockchain
- Available for technical guidance and code reviews
- Contact through portfolio website, LinkedIn, or GitHub
- Interested in mentoring junior developers

ACHIEVEMENTS:
- Built 3 major full-stack projects showcasing different technology stacks
- Integrated advanced AI capabilities with real-time 3D graphics
- Developed blockchain applications with real user adoption
- Created personality detection system with 85%+ accuracy
- Designed responsive, accessible user interfaces
- Implemented comprehensive testing and CI/CD pipelines

When answering questions, be comprehensive, technical when appropriate, and always relate back to Akshay's specific experience and projects. 
Provide concrete examples from his work and explain how his skills apply to real-world scenarios.
Be enthusiastic about his work and highlight the innovative aspects of his projects.
If asked about collaboration or contact, emphasize his openness to working on cutting-edge projects.
`

export async function callGeminiAPI(userMessage: string): Promise<string> {
  // If no API key is available, use fallback immediately
  if (!GEMINI_API_KEY) {
    console.log('No Gemini API key available, using local knowledge base')
    return generateFallbackResponse(userMessage)
  }

  try {
    console.log('Attempting Gemini API call for query:', userMessage)
    const prompt = `${AKSHAY_KNOWLEDGE_PROMPT}

User Question: ${userMessage}

Please provide a brief, focused response about Akshay Kumar S based on the information above. 

**Response Guidelines:**
- Keep responses SHORT (2-3 sentences max)
- Be direct and specific to what was asked
- Only mention relevant skills/projects for the question
- Use a friendly, professional tone
- No emojis or excessive formatting
- If asked for details, provide 1-2 concrete examples only
- For general questions, give a quick overview

Keep it concise and relevant only.`

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 256,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH", 
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      })
    })

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data: GeminiResponse = await response.json()
    
    if (data.candidates && data.candidates.length > 0) {
      const response = data.candidates[0].content.parts[0].text
      console.log('Gemini API response received:', response.substring(0, 100) + '...')
      return response
    } else {
      console.log('No candidates in Gemini response, using fallback')
      throw new Error('No response from Gemini API')
    }

  } catch (error) {
    console.error('Gemini API Error:', error)
    console.log('Using fallback response for query:', userMessage)
    
    // Fallback to local knowledge base if API fails
    return generateFallbackResponse(userMessage)
  }
}

// Fallback response system using local knowledge - CONCISE VERSION
function generateFallbackResponse(query: string): string {
  const lowerQuery = query.toLowerCase()
  console.log('Generating fallback response for query:', lowerQuery)
  
  // Handle greetings
  if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery.includes('hey')) {
    return `Hi! I'm Akshay's AI assistant. He's an AI & Data Science Engineer specializing in innovative tech solutions. What would you like to know?`
  }
  
  // Handle general "about" questions
  if ((lowerQuery.includes('about') || lowerQuery.includes('who is') || lowerQuery.includes('tell me about')) && 
      !lowerQuery.includes('project') && !lowerQuery.includes('skill') && !lowerQuery.includes('3d') && 
      !lowerQuery.includes('blockchain') && !lowerQuery.includes('personality')) {
    return `Akshay is an AI & Data Science Engineer from India, specializing in AI/ML, 3D web apps, and blockchain technology. He's built notable projects like a 3D AI Companion and blockchain chat app.`
  }
  
  // Handle specific project questions
  if (lowerQuery.includes('3d') || lowerQuery.includes('ai companion')) {
    return `Akshay built a 3D AI Companion using Three.js, GPT-4, and emotion recognition. It features real-time 3D avatars that recognize emotions and have intelligent conversations.`
  }

  if (lowerQuery.includes('personality') || lowerQuery.includes('detection')) {
    return `His Personality Detection System analyzes social media to predict Big Five personality traits with 85%+ accuracy. Built with Python, TensorFlow, and processes multiple languages.`
  }

  if (lowerQuery.includes('blockchain') || lowerQuery.includes('chat')) {
    return `The Blockchain Chat App is a decentralized messaging platform with end-to-end encryption, smart contract authentication, and IPFS storage. Built with Solidity and Web3.js.`
  }

  // Handle skills/technology questions
  if (lowerQuery.includes('skill') || lowerQuery.includes('technology') || lowerQuery.includes('expertise')) {
    return `Akshay's key skills include AI/ML (Python, TensorFlow, OpenAI/GPT), 3D Development (Three.js, WebGL), Blockchain (Solidity, Web3.js), and Full-Stack (React, Next.js, TypeScript).`
  }

  // Handle contact/collaboration questions
  if (lowerQuery.includes('contact') || lowerQuery.includes('collaboration') || lowerQuery.includes('hire') || lowerQuery.includes('work')) {
    return `Akshay is open to collaboration on AI/ML, 3D web apps, and blockchain projects. Contact him through this portfolio, LinkedIn, or GitHub.`
  }

  // Handle education/background questions
  if (lowerQuery.includes('education') || lowerQuery.includes('background') || lowerQuery.includes('learn')) {
    return `Akshay has a Computer Science degree with AI/ML specialization. He's a self-driven learner who masters technologies by building real projects.`
  }

  // Handle work/career questions
  if (lowerQuery.includes('what') && (lowerQuery.includes('do') || lowerQuery.includes('work'))) {
    return `Akshay creates cutting-edge applications combining AI/ML, 3D graphics, and blockchain technology. He focuses on innovative solutions that solve real-world problems.`
  }

  // Handle experience questions
  if (lowerQuery.includes('experience') || lowerQuery.includes('years')) {
    return `Akshay has 3+ years in AI/ML development, 2+ years in 3D web graphics, and has completed 3 major full-stack projects with measurable results.`
  }

  // Handle general project questions
  if (lowerQuery.includes('project')) {
    return `Akshay has built 3 major projects: a 3D AI Companion with emotion recognition, a Personality Detection System with 85% accuracy, and a Blockchain Chat Application.`
  }

  // Default response
  return `Hi! I'm Akshay's AI assistant. He's an AI & Data Science Engineer specializing in AI/ML, 3D graphics, and blockchain. What would you like to know about his work?`
}
