# Inner Veda TeaWebsite - Netlify Deployment Guide

## 🚀 Production Deployment Setup

This guide covers deploying the Inner Veda TeaWebsite frontend to Netlify with the production backend API.

### ✅ Pre-Deployment Checklist

All necessary files have been created and configured:

- [x] **API URL Updated**: Production API endpoint configured
- [x] **netlify.toml**: Netlify build configuration
- [x] **next.config.js**: Production optimizations
- [x] **_redirects**: SPA routing and API proxy
- [x] **Environment Variables**: Production configuration template
- [x] **Deploy Script**: Automated deployment helper

### 📋 Deployment Steps

#### 1. Push to GitHub
```bash
git add .
git commit -m "Configure for Netlify production deployment"
git push origin main
```

#### 2. Connect to Netlify
1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Click "New site from Git"
3. Choose GitHub and select your repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Base directory**: `apps/frontend` (if using monorepo structure)

#### 3. Environment Variables
Set these in Netlify Dashboard → Site settings → Environment variables:

```env
NEXT_PUBLIC_API_BASE=https://teawebsite-f6328f6fe19f.herokuapp.com
NEXT_PUBLIC_USE_MOCK=0
NEXT_PUBLIC_SITE_URL=https://innerveda.netlify.app
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_cm9idXN0LWZveC0xOC5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=sk_test_OJevPg08bHoaW1cDBaBDcg6esXsp3TkZkKmrQMeupS
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_9WseLWHVqhVIfh
RAZORPAY_KEY_SECRET=your_razorpay_secret_key_here
OPENAI_API_KEY=your_openai_api_key_here
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_USER=innervedacare@gmail.com
EMAIL_PASSWORD=your_email_app_password_here
EMAIL_FROM=innervedacare@gmail.com
EMAIL_FROM_NAME=Inner Veda Support
ADMIN_EMAIL=hkchakravarty@gmail.com
```

#### 4. Deploy
1. Click "Deploy site" in Netlify
2. Monitor build logs for any issues
3. Once deployed, test all functionality

### 🔧 Configuration Details

#### netlify.toml Features
- **Build Configuration**: Optimized for Next.js
- **Redirects**: SPA routing support
- **Headers**: Security and CORS configuration
- **Environment Contexts**: Production, preview, and branch deploys

#### Production Optimizations
- **API Integration**: Direct connection to Heroku backend
- **Image Optimization**: Configured domains for external images
- **Performance**: Compression and caching enabled
- **Security**: Security headers and frame protection

### 🌐 Production Architecture

```
Frontend (Netlify)
├── Domain: https://innerveda.netlify.app
├── Custom Domain: https://innerveda.in (configurable)
└── API Proxy → Backend (Heroku)
    ├── Domain: https://teawebsite-f6328f6fe19f.herokuapp.com
    └── Database: MongoDB Atlas
```

### 🧪 Testing Checklist

After deployment, verify:

- [ ] Homepage loads with Netflix-inspired design
- [ ] Product catalog displays all 15 products from MongoDB
- [ ] Shopping cart functionality works
- [ ] Checkout process completes
- [ ] AI Tea Assistant chatbot responds
- [ ] Contact form sends emails
- [ ] User authentication (Clerk) works
- [ ] All pages (Terms, Privacy, FAQ) load correctly
- [ ] Mobile responsiveness
- [ ] API connectivity to Heroku backend

### 🚨 Troubleshooting

#### Common Issues:

1. **Build Failures**
   - Check Node.js version (should be 18+)
   - Verify all dependencies are in package.json
   - Review build logs for specific errors

2. **API Connection Issues**
   - Verify NEXT_PUBLIC_API_BASE environment variable
   - Check CORS configuration on backend
   - Test API endpoints directly

3. **Environment Variables**
   - Ensure all required variables are set in Netlify
   - Check variable names match exactly
   - Restart deployment after adding variables

### 📞 Support

- **Email**: innervedacare@gmail.com
- **Phone**: 9113920980
- **Contact**: Sonam Garg

---

**Ready for Production!** 🎉

Your Inner Veda TeaWebsite is now configured for successful Netlify deployment with full integration to the Heroku backend API.
