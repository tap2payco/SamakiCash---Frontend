# 🐟 SamakiCash PWA - Frontend

> **AI-powered platform for Tanzanian fishers with market insights and comprehensive financial services**

[![Next.js](https://img.shields.io/badge/Next.js-14.2.33-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.9-38B2AC)](https://tailwindcss.com/)
[![PWA](https://img.shields.io/badge/PWA-Ready-4285F4)](https://web.dev/progressive-web-apps/)

## 📱 Overview

SamakiCash is a Progressive Web App (PWA) designed to empower Tanzanian fishers with:

- **🤖 AI-Powered Fish Analysis** - Upload fish photos for instant market insights
- **💰 Financial Services** - Credit scoring, loans, and insurance for fishers
- **🔗 Matchmaking** - Connect fishers with buyers and sellers
- **📊 Market Intelligence** - Real-time pricing and market trends
- **📱 Mobile-First Design** - Works offline and installs like a native app

## ✨ Features

### 🎯 Core Functionality
- **Multi-User Registration** - Fishers, Sellers/Vendors, and Buyers
- **AI Fish Analysis** - Photo upload with market price recommendations
- **Credit Scoring** - AI-powered credit assessment for fishers
- **Loan Applications** - Streamlined loan application process
- **Insurance Quotes** - Marine insurance for fishing equipment
- **Matchmaking** - Connect fishers with potential buyers/sellers

### 🚀 Technical Features
- **Progressive Web App** - Installable, works offline
- **Responsive Design** - Optimized for mobile and desktop
- **Real-time Analytics** - Google Analytics integration
- **AI Chatbot** - Mistral AI-powered customer support
- **Voice Integration** - ElevenLabs text-to-speech for market insights
- **Modern UI/UX** - Built with Radix UI and Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14.2.33 (App Router)
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS 4.1.9
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Mono

### AI & Services
- **Chat AI**: Mistral AI (mistral-large-v2)
- **Text-to-Speech**: ElevenLabs
- **Image Analysis**: Nebius AI
- **ML Services**: AI/ML API
- **Analytics**: Google Analytics

### Development
- **Package Manager**: npm
- **Linting**: ESLint
- **Type Checking**: TypeScript
- **Build Tool**: Next.js built-in

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18.0 or later
- **npm** 9.0 or later
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone [https://github.com/your-username/samakicash-pwa.git](https://github.com/tap2payco/SamakiCash---Frontend.git)
   cd SamakiCash---Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` with your API keys:
   ```env
   # API Configuration
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
   
   # AI Service API Keys
   NEXT_PUBLIC_MISTRAL_AI_API_KEY=your_mistral_api_key_here
   NEXT_PUBLIC_ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
   NEXT_PUBLIC_NEBIUS_AI_API_KEY=your_nebius_api_key_here
   NEXT_PUBLIC_AIML_API_KEY=your_aiml_api_key_here
   
   # Google Analytics
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-ED02BDY28F
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
SamakiCash---Frontend/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   └── chat/                 # AI chatbot endpoint
│   ├── (pages)/                  # Application pages
│   │   ├── about/                # About page
│   │   ├── contact/              # Contact page
│   │   ├── credit/               # Credit scoring page
│   │   ├── dashboard/            # Main dashboard
│   │   ├── features/             # Features showcase
│   │   ├── help/                 # Help & support
│   │   ├── history/              # Catch history
│   │   ├── insurance/            # Insurance quotes
│   │   ├── login/                # User login
│   │   ├── profile/              # User profile
│   │   └── register/             # User registration
│   ├── globals.css               # Global styles
│   └── layout.tsx                # Root layout
├── components/                   # Reusable components
│   ├── ui/                       # UI primitives (Radix UI)
│   ├── ai-chatbot.tsx            # AI chatbot component
│   ├── bottom-nav.tsx            # Mobile navigation
│   ├── floating-help-button.tsx  # Help button
│   ├── google-analytics.tsx      # Analytics component
│   ├── navigation.tsx            # Main navigation
│   └── pwa-install.tsx           # PWA install prompt
├── hooks/                        # Custom React hooks
├── lib/                          # Utility libraries
│   ├── api.ts                    # API service layer
│   ├── auth.ts                   # Authentication utilities
│   └── utils.ts                  # General utilities
├── public/                       # Static assets
│   ├── manifest.json             # PWA manifest
│   ├── sw.js                     # Service worker
│   └── icons/                    # App icons
├── styles/                       # Additional styles
├── next.config.mjs               # Next.js configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies and scripts
```

## 🎨 UI Components

### Built with Radix UI Primitives
- **Accessible** - WCAG compliant components
- **Customizable** - Fully styled with Tailwind CSS
- **Type-safe** - Full TypeScript support
- **Responsive** - Mobile-first design

### Key Components
- **Navigation** - Responsive navigation with mobile menu
- **Forms** - User registration, login, fish analysis
- **Cards** - Feature cards, analysis results, stats
- **Modals** - AI chatbot, help dialogs
- **Bottom Navigation** - Mobile-optimized navigation

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API URL | ✅ |
| `NEXT_PUBLIC_MISTRAL_AI_API_KEY` | Mistral AI API key | ✅ |
| `NEXT_PUBLIC_ELEVENLABS_API_KEY` | ElevenLabs API key | ✅ |
| `NEXT_PUBLIC_NEBIUS_AI_API_KEY` | Nebius AI API key | ✅ |
| `NEXT_PUBLIC_AIML_API_KEY` | AI/ML API key | ✅ |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics ID | ❌ |

### Next.js Configuration
- **App Router** - Latest Next.js routing system
- **TypeScript** - Full type safety
- **ESLint** - Code quality and consistency
- **Image Optimization** - Automatic image optimization
- **PWA Support** - Service worker and manifest

## 📱 PWA Features

### Progressive Web App Capabilities
- **Installable** - Add to home screen on mobile/desktop
- **Offline Support** - Works without internet connection
- **Push Notifications** - Real-time updates (future feature)
- **Background Sync** - Sync data when connection restored
- **App-like Experience** - Native app feel

### Service Worker
- **Caching Strategy** - Cache static assets and API responses
- **Offline Fallback** - Show offline page when no connection
- **Update Management** - Automatic updates in background

## 🚀 Deployment

### Render Deployment (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Render**
   - Go to [render.com](https://render.com)
   - Create new Web Service
   - Connect your GitHub repository

3. **Configure Build Settings**
   ```
   Build Command: npm install && npm run build
   Start Command: npm start
   ```

4. **Set Environment Variables**
   Add all required environment variables in Render dashboard

5. **Deploy**
   Render will automatically build and deploy your app

### Other Deployment Options
- **Vercel** - Zero-config deployment
- **Netlify** - JAMstack deployment
- **AWS Amplify** - Full-stack deployment
- **Docker** - Containerized deployment

## 📊 Analytics & Monitoring

### Google Analytics Integration
- **Automatic tracking** - Page views, user interactions
- **Real-time data** - Live user activity
- **Performance metrics** - Page load times, Core Web Vitals
- **User behavior** - Navigation patterns, feature usage

### Performance Monitoring
- **Core Web Vitals** - LCP, FID, CLS metrics
- **Bundle analysis** - Optimized bundle sizes
- **Image optimization** - Automatic image compression
- **Code splitting** - Lazy loading for better performance

## 🧪 Testing

### Development Testing
```bash
# Run development server
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint

# Build test
npm run build
```

### Manual Testing Checklist
- [ ] User registration (all user types)
- [ ] User login/logout
- [ ] Fish analysis with photo upload
- [ ] Credit scoring
- [ ] Loan applications
- [ ] Insurance quotes
- [ ] AI chatbot functionality
- [ ] Mobile responsiveness
- [ ] PWA installation
- [ ] Offline functionality

## 🔒 Security

### Security Measures
- **Environment Variables** - Sensitive data in env vars
- **API Key Protection** - Client-side API keys prefixed with `NEXT_PUBLIC_`
- **Input Validation** - Form validation and sanitization
- **HTTPS Only** - Secure connections in production
- **CORS Configuration** - Proper cross-origin setup

### Best Practices
- Never commit API keys to version control
- Use environment variables for all sensitive data
- Validate all user inputs
- Implement proper error handling
- Regular dependency updates

## 🤝 Contributing

### Development Workflow
1. **Fork the repository**
2. **Create feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make changes** and test thoroughly
4. **Commit changes** (`git commit -m 'Add amazing feature'`)
5. **Push to branch** (`git push origin feature/amazing-feature`)
6. **Open Pull Request**

### Code Standards
- **TypeScript** - Use TypeScript for all new code
- **ESLint** - Follow ESLint rules and fix warnings
- **Prettier** - Consistent code formatting
- **Component Structure** - Follow established patterns
- **Documentation** - Comment complex logic

## 📚 API Integration

### Backend API Endpoints
The frontend integrates with a FastAPI backend providing:

- **Authentication** - User registration, login, logout
- **Fish Analysis** - AI-powered catch analysis
- **Financial Services** - Credit scoring, loans, insurance
- **Matchmaking** - Connect users based on needs
- **User Management** - Profile management, preferences

### API Service Layer
Located in `lib/api.ts`, provides:
- **Type-safe API calls** - Full TypeScript support
- **Error handling** - Consistent error management
- **Request/Response types** - Proper type definitions
- **Authentication** - Token management and refresh

## 🐛 Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

#### Environment Variables Not Loading
```bash
# Check .env.local file exists
ls -la .env.local

# Restart development server
npm run dev
```

#### API Connection Issues
- Verify `NEXT_PUBLIC_API_BASE_URL` is correct
- Check backend server is running
- Verify CORS configuration on backend

#### PWA Not Installing
- Check `manifest.json` is accessible
- Verify service worker is registered
- Test on HTTPS (required for PWA)

### Getting Help
- **GitHub Issues** - Report bugs and request features
- **Documentation** - Check this README and inline comments
- **Community** - Join our developer community

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Tanzanian Fishing Communities** - For inspiration and feedback
- **Open Source Contributors** - For amazing tools and libraries
- **AI Service Providers** - Mistral AI, ElevenLabs, Nebius AI
- **UI Library Maintainers** - Radix UI, Tailwind CSS teams

## 📞 Support

- **Email**: support@samakicash.com
- **GitHub Issues**: [Report bugs](https://github.com/your-username/samakicash-pwa/issues)
- **Documentation**: [Full documentation](https://docs.samakicash.com)

---

**Built with ❤️ for Tanzanian fishers** 🐟🇹🇿

*Empowering the fishing community with AI and modern technology*
