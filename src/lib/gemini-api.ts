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

Please provide a comprehensive, enthusiastic, and helpful response about Akshay Kumar S based on the information above. 

**Response Guidelines:**
- Be conversational and friendly, as if you're excited to share information about Akshay
- Provide specific technical details and examples from his actual projects
- Use emojis and formatting to make responses engaging and easy to read
- Include concrete numbers and results when available (like 85%+ accuracy, 6 months development time, etc.)
- Highlight what makes his work innovative and unique
- If asked about collaboration, emphasize his openness and enthusiasm for cutting-edge projects
- Always offer to provide more specific information or answer follow-up questions
- Structure longer responses with clear sections and bullet points for readability

Format your response with markdown formatting for better presentation.`

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
          maxOutputTokens: 1024,
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

// Fallback response system using local knowledge
function generateFallbackResponse(query: string): string {
  const lowerQuery = query.toLowerCase()
  console.log('Generating fallback response for query:', lowerQuery)
  
  // Handle greetings and general "about" questions
  if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery.includes('hey')) {
    return `👋 **Hello! Great to meet you!**

I'm Akshay's AI assistant, and I'm here to help you learn about his work and expertise!

**Quick highlights:**
• **AI & Data Science Engineer** specializing in innovative tech solutions
• **3 major projects** combining AI, 3D graphics, and blockchain
• **Open for collaboration** on cutting-edge projects

**What would you like to know?**
• Ask about specific projects like "Tell me about the 3D AI companion"
• Inquire about skills: "What are his AI/ML capabilities?"
• Learn about collaboration: "How can I work with Akshay?"

What interests you most? 🚀`
  }
  
  // Handle very general "about" questions - make this more specific
  if ((lowerQuery.includes('about') || lowerQuery.includes('who is') || lowerQuery.includes('tell me about') || lowerQuery === 'about' || lowerQuery === 'about akshay') && 
      !lowerQuery.includes('project') && !lowerQuery.includes('skill') && !lowerQuery.includes('3d') && 
      !lowerQuery.includes('blockchain') && !lowerQuery.includes('personality')) {
    return `🎯 **About Akshay Kumar S:**

**AI & Data Science Engineer** from India, specializing in:
• **AI/ML Development** with real-world applications
• **3D Web Applications** using Three.js and WebGL
• **Blockchain Technology** for decentralized solutions
• **Full-Stack Development** across modern tech stacks

**Notable achievements:**
🏆 Built 3 major innovative projects (3D AI Companion, Personality Detection, Blockchain Chat)
🎯 Combines cutting-edge technology with practical user needs
🚀 Open to collaboration on AI, 3D graphics, and blockchain projects

**Want specifics?** Ask me about:
• His projects and technical implementations
• Specific skills and expertise levels
• How to collaborate or get in touch

What would you like to explore? 🤔`
  }
  
  if (lowerQuery.includes('3d') || lowerQuery.includes('ai companion')) {
    return `🚀 **Akshay's 3D AI Companion Project - His Most Innovative Work!**

This is absolutely fascinating! Akshay spent 6 months building a revolutionary web-based 3D AI avatar that can recognize emotions and have real conversations. 

**What makes this special:**
• **Real-time 3D rendering** with Three.js and React Three Fiber
• **Emotion recognition** using MediaPipe - it can actually understand how you're feeling!
• **GPT-4 integration** for intelligent, contextual conversations
• **Adaptive memory** through Supabase - the avatar remembers your conversations
• **Voice interactions** with speech synthesis for natural communication

**Technical challenges he solved:**
🔧 Optimizing 3D rendering for smooth real-time performance
🧠 Seamlessly integrating emotion AI with conversation systems
⚡ Managing complex state synchronization between 3D and AI components
📱 Ensuring cross-platform compatibility without performance loss

The architecture uses microservices with WebSocket connections, and he implemented LOD optimization for the 3D engine. This project really showcases how Akshay combines cutting-edge graphics with AI technology!

Would you like to know more about the technical implementation or his other projects?`
  }

  if (lowerQuery.includes('personality') || lowerQuery.includes('detection')) {
    return `🧠 **Personality Detection System - AI Psychology in Action!**

Akshay built an incredibly sophisticated system that analyzes social media content to predict personality traits using the Big Five psychological model!

**How it works:**
📊 **Multi-platform analysis** - Processes Twitter, Facebook, Instagram content
🎯 **Big Five scoring** - Measures Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism
🌍 **Multi-language support** with cultural context understanding
🔒 **Privacy-compliant processing** following GDPR standards
⚡ **Real-time analysis** with batch processing capabilities

**Impressive tech stack:**
• **Python & TensorFlow** for the ML models
• **NLTK & Scikit-learn** for advanced NLP processing
• **PostgreSQL & Redis** for data management and caching
• **Flask API** for integration with other systems

**Results that matter:**
✅ **85%+ accuracy** in personality prediction
📈 **100K+ profiles** successfully analyzed
💼 **Real applications** in HR screening, marketing personalization, and psychological research

This 4-month project demonstrates Akshay's expertise in AI/ML and his ability to solve complex human behavior analysis problems!

Curious about the technical details or want to know about his other work?`
  }

  if (lowerQuery.includes('blockchain') || lowerQuery.includes('chat')) {
    return `⛓️ **Blockchain Chat Application - The Future of Secure Communication!**

Akshay built something revolutionary - a completely decentralized chat platform that doesn't rely on any central servers!

**What makes this groundbreaking:**
🔐 **Complete decentralization** - No central servers, truly peer-to-peer
🛡️ **End-to-end encryption** for all communications
🎭 **Smart contract authentication** using Ethereum blockchain
📁 **IPFS distributed storage** for files and message history
💰 **Cryptocurrency integration** for payments and tips between users
🏛️ **Governance tokens** for community-managed group chats

**Technology behind the magic:**
• **Solidity** for smart contract development
• **Ethereum blockchain** for transaction management
• **Web3.js** for seamless blockchain interaction
• **IPFS** for decentralized file storage
• **React frontend** with MetaMask integration

**Impact and vision:**
This 5-month project shows Akshay's forward-thinking approach to Web3 technology. He's not just following trends - he's creating practical solutions that demonstrate how blockchain can improve real-world communication beyond just cryptocurrency!

The app has an active user base and proves that decentralized applications can be both secure and user-friendly.

Want to learn more about his Web3 expertise or other innovative projects?`
  }

  if (lowerQuery.includes('skill') || lowerQuery.includes('technology') || lowerQuery.includes('expertise')) {
    return `🎯 **Akshay's Technical Expertise - A Well-Rounded Tech Professional!**

Akshay has built an impressive skill set across multiple cutting-edge technology domains:

**🤖 AI & Machine Learning Excellence:**
• **OpenAI/GPT Integration (95%)** - Advanced prompt engineering, fine-tuning, embeddings
• **Machine Learning (92%)** - TensorFlow, PyTorch, scikit-learn, deep learning architectures  
• **Computer Vision (88%)** - OpenCV, MediaPipe, real-time detection and processing
• **NLP (90%)** - NLTK, spaCy, transformers, sentiment analysis, text classification

**⚛️ Frontend Development Mastery:**
• **React/Next.js (96%)** - Advanced patterns, hooks, SSR, App Router optimization
• **TypeScript (94%)** - Advanced types, generics, strict typing methodologies
• **Three.js/WebGL (89%)** - 3D graphics, React Three Fiber, shader programming
• **Tailwind CSS (93%)** - Responsive design, component architectures

**🔧 Backend Development:**
• **Python (95%)** - Django, Flask, FastAPI, data processing automation
• **Node.js (88%)** - Express, serverless functions, microservices architecture
• **API Development (91%)** - RESTful APIs, GraphQL, authentication systems

**🗄️ Database & Storage:**
• **PostgreSQL (87%)** - Complex queries, performance optimization
• **Supabase (92%)** - Real-time subscriptions, edge functions
• **MongoDB (83%)** - Document modeling, aggregation pipelines

**⛓️ Blockchain & Web3:**
• **Solidity (84%)** - Smart contracts, DApp development, security practices
• **Web3.js (82%)** - Blockchain interaction, wallet integration

**What sets Akshay apart:**
✨ He doesn't just know these technologies - he combines them innovatively
🚀 Real-world project experience with measurable results
🎯 Focus on performance optimization and user experience
📚 Continuous learning and adaptation to emerging technologies

Need details about any specific technology or want to know how he applies these skills in practice?`
  }

  if (lowerQuery.includes('contact') || lowerQuery.includes('collaboration') || lowerQuery.includes('hire') || lowerQuery.includes('work')) {
    return `🤝 **Ready to Collaborate with Akshay? Here's How!**

Akshay is actively seeking exciting opportunities and collaborations, especially in cutting-edge technology areas!

**🎯 What excites him most:**
• **AI/ML projects** with real-world impact
• **3D web applications** pushing the boundaries of user experience  
• **Blockchain solutions** beyond just cryptocurrency
• **Full-stack applications** with innovative features
• **Open source contributions** that benefit the developer community

**💼 Collaboration styles:**
• **Full-time opportunities** in forward-thinking companies
• **Project-based consulting** for specific technical challenges
• **Technical mentoring** for development teams
• **Code reviews** and architecture guidance
• **Speaking engagements** about AI, 3D web tech, or blockchain

**📞 How to reach him:**
✉️ **Contact form** - Available right here on his portfolio website
💼 **LinkedIn** - Professional networking and project updates
🐙 **GitHub** - Check out his code and open source contributions
📧 **Email** - Direct communication for serious opportunities

**🌟 What to include when reaching out:**
• Description of your project or opportunity
• Technology stack involved
• Timeline and scope
• How his specific skills align with your needs
• Any interesting technical challenges involved

**⚡ Response time:**
Akshay typically responds within 24-48 hours for professional inquiries. He's genuinely interested in innovative projects and loves discussing technical challenges!

Ready to start a conversation about your next big project?`
  }

  if (lowerQuery.includes('education') || lowerQuery.includes('background') || lowerQuery.includes('learn')) {
    return `🎓 **Akshay's Learning Journey - Self-Driven Excellence!**

Akshay's educational background reflects his passion for technology and continuous learning:

**🏫 Formal Education:**
• **Computer Science degree** with specialization in AI/ML
• Strong foundation in algorithms, data structures, and software engineering
• Focus on machine learning theory and practical applications

**🚀 Self-Driven Learning Approach:**
What really sets Akshay apart is his commitment to hands-on learning:

• **Project-based learning** - He learns by building real applications
• **Industry-relevant skills** - Always staying current with emerging technologies  
• **Open source engagement** - Contributing to and learning from the community
• **Practical application** - Every technology he learns gets applied in actual projects

**📚 Continuous Skill Development:**
• **AI/ML** - From online courses to implementing research papers
• **3D Graphics** - Self-taught Three.js and WebGL through experimentation
• **Blockchain** - Learned Solidity and Web3 development through building DApps
• **Full-stack development** - Mastered modern frameworks through real projects

**🎯 Learning Philosophy:**
"Learn by doing, teach by sharing" - Akshay believes in:
✨ **Practical application** over theoretical knowledge
🔧 **Problem-solving** through hands-on experimentation  
🤝 **Knowledge sharing** with the developer community
📈 **Continuous improvement** and staying updated with tech trends

**🏆 Evidence of Learning:**
His three major projects (3D AI Companion, Personality Detection, Blockchain Chat) show how he transforms learning into real, impactful applications.

Want to know more about his specific learning experiences or how he stays current with technology?`
  }

  if (lowerQuery.includes('education') || lowerQuery.includes('background') || lowerQuery.includes('learn')) {
    return `🎓 **Akshay's Learning Journey - Self-Driven Excellence!**

Akshay's educational background reflects his passion for technology and continuous learning:

**🏫 Formal Education:**
• **Computer Science degree** with specialization in AI/ML
• Strong foundation in algorithms, data structures, and software engineering
• Focus on machine learning theory and practical applications

**🚀 Self-Driven Learning Approach:**
What really sets Akshay apart is his commitment to hands-on learning:

• **Project-based learning** - He learns by building real applications
• **Industry-relevant skills** - Always staying current with emerging technologies  
• **Open source engagement** - Contributing to and learning from the community
• **Practical application** - Every technology he learns gets applied in actual projects

**📚 Continuous Skill Development:**
• **AI/ML** - From online courses to implementing research papers
• **3D Graphics** - Self-taught Three.js and WebGL through experimentation
• **Blockchain** - Learned Solidity and Web3 development through building DApps
• **Full-stack development** - Mastered modern frameworks through real projects

**🎯 Learning Philosophy:**
"Learn by doing, teach by sharing" - Akshay believes in:
✨ **Practical application** over theoretical knowledge
🔧 **Problem-solving** through hands-on experimentation  
🤝 **Knowledge sharing** with the developer community
📈 **Continuous improvement** and staying updated with tech trends

**🏆 Evidence of Learning:**
His three major projects (3D AI Companion, Personality Detection, Blockchain Chat) show how he transforms learning into real, impactful applications.

Want to know more about his specific learning experiences or how he stays current with technology?`
  }

  // Handle questions about what he does/work
  if (lowerQuery.includes('what') && (lowerQuery.includes('do') || lowerQuery.includes('work'))) {
    return `💼 **What Akshay Does - Innovative Tech Solutions!**

Akshay is an **AI & Data Science Engineer** who creates cutting-edge applications that solve real-world problems:

**🎯 Primary Focus Areas:**
• **AI/ML Development** - Building intelligent systems that understand and respond to human needs
• **3D Web Applications** - Creating immersive experiences using Three.js and WebGL
• **Blockchain Solutions** - Developing decentralized applications for secure communication
• **Full-Stack Development** - End-to-end application development with modern tech stacks

**🚀 What makes his work special:**
✨ **Innovation-driven** - Combines multiple cutting-edge technologies in unique ways
� **User-focused** - Creates solutions that genuinely improve user experience
🔧 **Technical excellence** - Writes clean, performant, scalable code
📈 **Results-oriented** - Builds applications with measurable impact

**💡 Current projects involve:**
• Integrating AI with 3D graphics for interactive experiences
• Developing blockchain-based communication platforms
• Creating ML systems for personality analysis and prediction
• Building responsive, modern web applications

Want to know more about his specific projects or technical expertise?`
  }

  // Handle experience questions
  if (lowerQuery.includes('experience') || lowerQuery.includes('years')) {
    return `📈 **Akshay's Professional Experience:**

**🏆 Project Experience:**
• **3+ years** in AI/ML development with real-world applications
• **2+ years** in 3D web graphics and WebGL optimization
• **1+ year** in blockchain and Web3 development
• **4+ years** in full-stack development across multiple frameworks

**💼 Key Accomplishments:**
✅ **3 major projects** completed with measurable results
🎯 **85%+ accuracy** achieved in AI personality detection system
🚀 **6-month intensive development** of 3D AI companion
⛓️ **Active user base** for blockchain chat application

**🔧 Technical Depth:**
• **Advanced proficiency** in Python, React/Next.js, TypeScript
• **Production experience** with TensorFlow, Three.js, Solidity
• **Performance optimization** expertise for real-time applications
• **Full development lifecycle** from conception to deployment

**📚 Continuous Growth:**
• Self-taught advanced technologies through hands-on projects
• Stays current with emerging tech trends and best practices
• Active in open source community and knowledge sharing

Want details about any specific technology or project experience?`
  }

  // Add more specific matching before the default
  if (lowerQuery.includes('project') && !lowerQuery.includes('3d') && !lowerQuery.includes('personality') && !lowerQuery.includes('blockchain')) {
    return `🚀 **Akshay's Project Portfolio - Innovation in Action!**

**Three flagship projects showcase his diverse expertise:**

**🎭 3D AI Companion (6 months)**
Revolutionary emotion-aware 3D avatar with GPT integration
*Technologies: Three.js, React Three Fiber, GPT-4, MediaPipe*

**🧠 Personality Detection System (4 months)**  
AI-powered social media analysis with 85%+ accuracy
*Technologies: Python, TensorFlow, NLTK, PostgreSQL*

**⛓️ Blockchain Chat Application (5 months)**
Decentralized secure communication platform
*Technologies: Solidity, Ethereum, Web3.js, IPFS*

**🎯 What these projects demonstrate:**
• **Technical versatility** across AI, 3D graphics, and blockchain
• **End-to-end development** skills from concept to deployment
• **Innovation focus** - solving real problems with cutting-edge tech
• **Performance optimization** for production applications

**Want to dive deeper?**
Ask about any specific project for detailed technical information, challenges solved, and implementation details!`
  }

  // Default response - now much shorter and more action-oriented
  return `👋 **Hi! I'm Akshay's AI Assistant!**

I can help you learn about **Akshay Kumar S** - an AI & Data Science Engineer who builds innovative solutions with:

🤖 **AI/ML** • 🎮 **3D Graphics** • ⛓️ **Blockchain** • 💻 **Full-Stack Dev**

**🔥 Quick highlights:**
• Built 3 major innovative projects
• Specializes in cutting-edge tech combinations
• Open for collaboration opportunities

**What would you like to know?**
• "Tell me about the 3D AI project"
• "What are his technical skills?"
• "How can I collaborate with him?"
• "What's his experience with [technology]?"

Just ask - I know all about his work! 🚀`
  }
