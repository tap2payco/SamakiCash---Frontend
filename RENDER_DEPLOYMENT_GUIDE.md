# 🚀 SamakiCash PWA - Render Deployment Guide

## 📋 Prerequisites

1. **Render Account**: Sign up at [render.com](https://render.com)
2. **GitHub Repository**: Push your code to GitHub
3. **Google Analytics Account**: For tracking (optional but recommended)

## 🔧 Step 1: Prepare Your Repository

### 1.1 Update Environment Variables
Copy `env.example` to `.env.local` and fill in your values:

```bash
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://your-backend-url.onrender.com

# AI Service API Keys
NEXT_PUBLIC_MISTRAL_AI_API_KEY=your_mistral_api_key_here
NEXT_PUBLIC_ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
NEXT_PUBLIC_NEBIUS_AI_API_KEY=your_nebius_api_key_here
NEXT_PUBLIC_AIML_API_KEY=your_aiml_api_key_here

# Google Analytics (for Render deployment)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 1.2 Google Analytics Setup
1. Go to [Google Analytics](https://analytics.google.com)
2. Create a new property for your website
3. Get your Measurement ID (starts with `G-`)
4. Add it to your environment variables

## 🚀 Step 2: Deploy to Render

### 2.1 Create New Web Service
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository

### 2.2 Configure Build Settings
```
Name: samakicash-pwa
Environment: Node
Build Command: npm install && npm run build
Start Command: npm start
```

### 2.3 Set Environment Variables
In Render dashboard, go to **Environment** tab and add:

| Key | Value | Description |
|-----|-------|-------------|
| `NODE_ENV` | `production` | Environment |
| `NEXT_PUBLIC_API_BASE_URL` | `https://your-backend.onrender.com` | Backend URL |
| `NEXT_PUBLIC_MISTRAL_AI_API_KEY` | `your_key` | Mistral AI API |
| `NEXT_PUBLIC_ELEVENLABS_API_KEY` | `your_key` | ElevenLabs API |
| `NEXT_PUBLIC_NEBIUS_AI_API_KEY` | `your_key` | Nebius AI API |
| `NEXT_PUBLIC_AIML_API_KEY` | `your_key` | AI/ML API |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-XXXXXXXXXX` | Google Analytics |

### 2.4 Deploy
1. Click **"Create Web Service"**
2. Render will automatically build and deploy your app
3. Wait for deployment to complete (5-10 minutes)

## 📊 Step 3: Analytics Setup

### 3.1 Google Analytics
- **Automatic**: Analytics will work once you add `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- **Dashboard**: View data at [analytics.google.com](https://analytics.google.com)
- **Features**: Page views, user behavior, performance metrics

### 3.2 Render Analytics
- **Built-in**: Render provides basic metrics in dashboard
- **Logs**: View application logs in Render dashboard
- **Performance**: Monitor response times and errors

## 🔗 Step 4: Backend Integration

### 4.1 Deploy Backend
1. Deploy your FastAPI backend to Render
2. Update `NEXT_PUBLIC_API_BASE_URL` to point to your backend
3. Ensure CORS is configured for your frontend domain

### 4.2 Test Integration
1. Visit your deployed frontend URL
2. Test registration, login, and fish analysis
3. Check browser console for any errors

## 🎯 Step 5: Custom Domain (Optional)

### 5.1 Add Custom Domain
1. In Render dashboard, go to **Settings** → **Custom Domains**
2. Add your domain (e.g., `samakicash.com`)
3. Update DNS records as instructed

### 5.2 SSL Certificate
- **Automatic**: Render provides free SSL certificates
- **HTTPS**: Your site will be accessible via HTTPS

## 📱 Step 6: PWA Features

### 6.1 Service Worker
- **Automatic**: PWA features work out of the box
- **Offline**: App works offline after first visit
- **Install**: Users can install as native app

### 6.2 Mobile Optimization
- **Responsive**: Works on all device sizes
- **Touch-friendly**: Optimized for mobile interaction
- **Fast loading**: Optimized for slow connections

## 🔍 Monitoring & Maintenance

### 6.1 Health Checks
- **Automatic**: Render monitors your app health
- **Alerts**: Get notified of downtime
- **Logs**: View real-time application logs

### 6.2 Performance
- **Metrics**: Monitor response times
- **Errors**: Track application errors
- **Usage**: Monitor resource usage

## 🆘 Troubleshooting

### Common Issues:

1. **Build Fails**
   - Check environment variables
   - Verify Node.js version compatibility
   - Review build logs in Render dashboard

2. **API Calls Fail**
   - Verify `NEXT_PUBLIC_API_BASE_URL` is correct
   - Check CORS configuration on backend
   - Ensure backend is deployed and running

3. **Analytics Not Working**
   - Verify `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set
   - Check Google Analytics property is active
   - Wait 24-48 hours for data to appear

## 🎉 Success!

Your SamakiCash PWA is now live on Render with:
- ✅ **Production deployment**
- ✅ **Google Analytics tracking**
- ✅ **PWA functionality**
- ✅ **Mobile optimization**
- ✅ **Backend integration**
- ✅ **SSL certificate**

**Your app URL**: `https://samakicash-pwa.onrender.com`

---

## 📞 Support

- **Render Docs**: [render.com/docs](https://render.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Google Analytics**: [support.google.com/analytics](https://support.google.com/analytics)
