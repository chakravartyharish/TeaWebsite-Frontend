#!/bin/bash

# Netlify Deployment Script for Inner Veda TeaWebsite Frontend
# This script automates the deployment process to Netlify

echo "🚀 Starting Netlify deployment for Inner Veda TeaWebsite..."

# Check if we're in the frontend directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the frontend directory."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build the application
echo "🔨 Building the application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo ""
    echo "📋 Deployment Checklist:"
    echo "1. ✅ Updated API URL to production: https://teawebsite-f6328f6fe19f.herokuapp.com"
    echo "2. ✅ Created netlify.toml configuration"
    echo "3. ✅ Created .env.production template"
    echo "4. ✅ Updated next.config.js for production"
    echo "5. ✅ Created _redirects file"
    echo ""
    echo "🌐 Next Steps:"
    echo "1. Push this code to GitHub"
    echo "2. Connect your GitHub repository to Netlify"
    echo "3. Set environment variables in Netlify dashboard:"
    echo "   - NEXT_PUBLIC_API_BASE=https://teawebsite-f6328f6fe19f.herokuapp.com"
    echo "   - NEXT_PUBLIC_USE_MOCK=0"
    echo "   - NEXT_PUBLIC_SITE_URL=https://innerveda.netlify.app"
    echo "   - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_cm9idXN0LWZveC0xOC5jbGVyay5hY2NvdW50cy5kZXYk"
    echo "   - CLERK_SECRET_KEY=sk_test_OJevPg08bHoaW1cDBaBDcg6esXsp3TkZkKmrQMeupS"
    echo "   - OPENAI_API_KEY=your_openai_api_key_here"
    echo "   - EMAIL_HOST=smtp.gmail.com"
    echo "   - EMAIL_USER=innervedacare@gmail.com"
    echo "   - EMAIL_PASSWORD=your_email_app_password_here"
    echo "   - ADMIN_EMAIL=hkchakravarty@gmail.com"
    echo ""
    echo "🎉 Ready for Netlify deployment!"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi
