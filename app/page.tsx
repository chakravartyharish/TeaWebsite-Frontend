'use client'
import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'

export default function HomePage() {
  const { user, isLoaded } = useUser()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isClient, setIsClient] = useState(false)

  const heroSlides = [
    {
      title: "Welcome to Your Wellness Journey",
      subtitle: "Discover the transformative power of A-ZEN herbal blend",
      bgGradient: "from-gray-900 via-green-900 to-emerald-900",
    },
    {
      title: "Ancient Wisdom for Modern Living",
      subtitle: "Hand-crafted with 5 sacred herbs for inner peace and radiant health",
      bgGradient: "from-emerald-900 via-teal-900 to-green-900",
    },
    {
      title: "Your Calm Ritual Awaits",
      subtitle: "Join thousands discovering the path to tranquility",
      bgGradient: "from-green-900 via-gray-900 to-teal-900",
    }
  ]

  useEffect(() => {
    setIsClient(true)
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [heroSlides.length])

  if (!isClient || !isLoaded) {
    return <div className="min-h-screen bg-black"></div>
  }

  // Show sign-in page for non-authenticated users
  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white">
        {/* Netflix-style Hero Section */}
        <div className="relative min-h-screen">
          {/* Background with animated gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${heroSlides[currentSlide].bgGradient} transition-all duration-1000`}>
            {/* Animated tea leaves pattern */}
            <div className="absolute inset-0 opacity-5">
              {[...Array(25)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-pulse text-4xl text-green-400"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 2}s`
                  }}
                >
                  🍃
                </div>
              ))}
            </div>
          </div>

          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/70"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80"></div>

          {/* Content Grid */}
          <div className="relative min-h-screen grid lg:grid-cols-2">
            {/* Left Side - Hero Content */}
            <div className="flex items-center justify-center p-8 lg:p-16">
              <div className="max-w-lg text-center lg:text-left">
                {/* Brand Logo */}
                <div className="mb-8">
                  <div className="inline-flex items-center space-x-3 group cursor-pointer">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                      <span className="text-white text-2xl animate-pulse">🍃</span>
                    </div>
                    <div className="text-left">
                      <h1 className="text-3xl font-black bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                        INNER VEDA
                      </h1>
                      <p className="text-sm text-gray-400 font-medium">Ancient wisdom for modern living</p>
                    </div>
                  </div>
                </div>

                {/* Hero Text */}
                <div className="space-y-6 mb-8">
                  <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                    {heroSlides[currentSlide].title}
                  </h2>
                  <p className="text-xl text-gray-300 leading-relaxed">
                    {heroSlides[currentSlide].subtitle}
                  </p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  {[
                    { icon: "🧘", text: "Mental Clarity" },
                    { icon: "✨", text: "Radiant Skin" },
                    { icon: "🌿", text: "Natural Herbs" }
                  ].map((feature, index) => (
                    <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/20 transition-all duration-300">
                      <div className="text-2xl mb-2">{feature.icon}</div>
                      <div className="text-sm font-medium">{feature.text}</div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="space-y-4">
                  <p className="text-gray-400 text-sm">
                    New to Inner Veda? 
                    <Link href="/sign-up" className="text-green-400 hover:text-green-300 ml-2 font-semibold transition-colors">
                      Create your account
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Sign In Form */}
            <div className="flex items-center justify-center p-8 lg:p-16">
              <div className="w-full max-w-md">
                {/* Form Container */}
                <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-gray-800">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">Welcome Back</h3>
                    <p className="text-gray-400">Sign in to continue your wellness journey</p>
                  </div>

                  {/* Clerk SignIn Component */}
                  <div className="clerk-signin-container">
                    <SignIn 
                      routing="hash" 
                      appearance={{
                        variables: {
                          colorPrimary: '#10b981',
                          colorPrimaryText: '#ffffff',
                          colorBackground: 'transparent',
                          colorInputBackground: '#1f2937',
                          colorInputText: '#f9fafb',
                          colorText: '#f9fafb',
                          colorTextSecondary: '#9ca3af',
                          borderRadius: '0.75rem',
                        },
                        elements: {
                          rootBox: { width: '100%' },
                          card: { backgroundColor: 'transparent', boxShadow: 'none', border: 'none' },
                          headerTitle: { display: 'none' },
                          headerSubtitle: { display: 'none' },
                          socialButtonsBlockButton: {
                            backgroundColor: '#1f2937',
                            border: '1px solid #374151',
                            color: '#f9fafb',
                            '&:hover': { backgroundColor: '#374151' }
                          },
                          formButtonPrimary: {
                            backgroundColor: '#10b981',
                            '&:hover': { backgroundColor: '#059669' }
                          },
                          footerActionLink: {
                            color: '#10b981',
                            '&:hover': { color: '#059669' }
                          }
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Footer Links */}
                <div className="mt-6 text-center text-sm text-gray-500">
                  <p>
                    By signing in, you agree to our{' '}
                    <Link href="/terms" className="text-green-400 hover:text-green-300 transition-colors">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-green-400 hover:text-green-300 transition-colors">
                      Privacy Policy
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-green-400 scale-125' : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Show meditative homepage for authenticated users
  return (
    <div className="bg-gradient-to-br from-green-50 via-tea-cream to-green-100 text-[#1b1b1b]">
      {/* Cinematic A-ZEN Hero Section - Premium Dark Aesthetic */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Ultra-Premium Background System */}
        <div className="absolute inset-0">
          {/* Primary Netflix-inspired Dark Base */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
          
          {/* Dynamic Cinematic Overlays */}
          <div className={`absolute inset-0 bg-gradient-to-br ${heroSlides[currentSlide].bgGradient} opacity-40 transition-all duration-[4000ms]`}></div>
          
          {/* Atmospheric Depth Layers */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-red-500/8 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '4s' }}></div>
          </div>
          
          {/* Netflix-Style Cinematic Vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent via-40% to-black/80"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50"></div>
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/30"></div>
        </div>

        {/* Main Content Grid */}
        <div className="relative w-full min-h-screen flex items-center">
          <div className="w-full max-w-8xl mx-auto px-8 py-16">
            <div className="grid lg:grid-cols-12 gap-12 items-center min-h-[85vh]">
              
              {/* Left Content - Brand & Details */}
              <div className="lg:col-span-7 space-y-12 text-center lg:text-left">
                
                {/* Brand Identity Section */}
                <div className="space-y-8">
                  {/* INNER VEDA Logo */}
                  <div className="inline-flex items-center space-x-4 group">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-500">
                      <span className="text-white text-xl">🍃</span>
                    </div>
                    <div className="text-left">
                      <div className="text-lg font-bold text-emerald-300 tracking-[3px]">INNER VEDA</div>
                      <div className="text-xs text-gray-400 tracking-wide">ANCIENT WISDOM FOR MODERN LIVING</div>
                    </div>
                  </div>
                  
                  {/* Massive A-ZEN Title */}
                  <div className="space-y-6">
                    <h1 className="text-8xl lg:text-9xl font-black leading-none tracking-tight">
                      <span className="bg-gradient-to-r from-white via-emerald-200 to-white bg-clip-text text-transparent drop-shadow-2xl">
                        A-ZEN
                      </span>
                    </h1>
                    
                    {/* Animated Accent Line */}
                    <div className="flex justify-center lg:justify-start">
                      <div className="relative">
                        <div className="h-1 w-48 bg-gradient-to-r from-emerald-400 via-teal-400 to-transparent rounded-full"></div>
                        <div className="absolute top-0 left-0 h-1 w-12 bg-white rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Product Promise */}
                <div className="space-y-6 max-w-2xl mx-auto lg:mx-0">
                  <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                    CALM & FOCUSED MIND
                    <span className="block text-emerald-300">+ RADIANT SKIN</span>
                  </h2>
                  
                  <div className="space-y-4">
                    <p className="text-xl lg:text-2xl text-emerald-200 font-medium tracking-wide">
                      INSTANT TEA/LATTE MIX
                    </p>
                    <p className="text-lg text-gray-300 leading-relaxed">
                      Just add hot milk or water. Hand-crafted with 5 sacred herbs combining ancient wisdom with modern convenience.
                    </p>
                  </div>
                </div>

                {/* Feature Highlights Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto lg:mx-0">
                  {[
                    { icon: '☕', title: '16 CUPS', desc: 'Long lasting' },
                    { icon: '✓', title: 'PURE & SAFE', desc: '100% natural' },
                    { icon: '🌱', title: 'PLANT BASED', desc: 'Herbal formula' },
                    { icon: '⚡', title: 'INSTANT MIX', desc: 'Quick prep' }
                  ].map((item, index) => (
                    <div key={index} className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-emerald-400/30 transition-all duration-300">
                      <div className="text-center space-y-2">
                        <div className="text-2xl mb-2">{item.icon}</div>
                        <div className="text-xs font-bold text-white tracking-wide">{item.title}</div>
                        <div className="text-xs text-gray-400">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Premium CTA Section */}
                <div className="flex flex-col sm:flex-row gap-6 pt-8 justify-center lg:justify-start">
                  <Link href="/products" className="group relative bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-12 py-5 rounded-2xl font-bold text-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-emerald-500/25 overflow-hidden">
                    <div className="relative flex items-center justify-center gap-4 z-10">
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-300">▶</span>
                      <span>Experience A-ZEN - ₹249</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 transform translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                  </Link>
                  
                  <Link href="/showcase" className="bg-white/10 backdrop-blur-sm text-white px-12 py-5 rounded-2xl font-semibold text-xl hover:bg-white/15 transition-all duration-300 border border-white/20 hover:border-white/30 hover:scale-105">
                    Discover More
                  </Link>
                </div>
              </div>

              {/* Right Visual - Product Showcase */}
              <div className="lg:col-span-5 relative flex items-center justify-center">
                <div className="relative w-full max-w-md">
                  
                  {/* Atmospheric Product Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-teal-400/20 to-emerald-400/20 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-green-300/15 to-emerald-500/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                  
                  {/* Main Product Container */}
                  <div className="relative w-80 h-80 lg:w-96 lg:h-96 mx-auto transform hover:scale-105 transition-all duration-700">
                    
                    {/* Product Package Circle */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-emerald-200 to-emerald-300 rounded-full shadow-2xl border-4 border-white/30">
                      <div className="absolute inset-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-full shadow-inner flex flex-col items-center justify-center space-y-3">
                        
                        {/* Logo Icon */}
                        <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-black rounded-full flex items-center justify-center mb-2 shadow-lg">
                          <span className="text-emerald-400 text-lg">🍃</span>
                        </div>
                        
                        {/* Brand Text */}
                        <div className="text-gray-800 font-black text-base tracking-[2px] drop-shadow-sm">INNER VEDA</div>
                        
                        {/* Product Name */}
                        <div className="text-gray-900 font-black text-4xl lg:text-5xl tracking-wider leading-none drop-shadow-md">A-ZEN</div>
                        
                        {/* Tagline */}
                        <div className="text-gray-700 text-xs text-center px-4 font-bold leading-tight tracking-wide max-w-[200px]">
                          CALM & FOCUSED MIND + RADIANT SKIN
                        </div>
                        
                        {/* Tea Cup Visual */}
                        <div className="relative mt-4">
                          <div className="w-16 h-12 bg-gradient-to-br from-amber-800 to-amber-900 rounded-full relative shadow-lg">
                            <div className="w-3 h-8 bg-gradient-to-br from-amber-800 to-amber-900 absolute -right-0.5 top-2 rounded-r-full"></div>
                            <div className="absolute inset-1.5 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full"></div>
                          </div>
                          
                          {/* Floating Tea Leaves */}
                          <div className="absolute -top-1 -left-2 text-emerald-600 text-sm animate-bounce">🍃</div>
                          <div className="absolute -top-1 -right-2 text-emerald-600 text-sm animate-bounce" style={{ animationDelay: '1s' }}>🍃</div>
                          <div className="absolute -bottom-1 -left-3 text-emerald-600 text-xs animate-bounce" style={{ animationDelay: '2s' }}>🍃</div>
                          <div className="absolute -bottom-1 -right-3 text-emerald-600 text-xs animate-bounce" style={{ animationDelay: '1.5s' }}>🍃</div>
                        </div>
                        
                        {/* Bottom Product Details */}
                        <div className="text-gray-800 font-bold text-sm mt-3 tracking-wide">INSTANT TEA/LATTE MIX</div>
                        <div className="text-gray-700 text-xs font-medium tracking-wide">JUST ADD HOT MILK/WATER</div>
                      </div>
                    </div>
                    
                    {/* Floating Benefit Icons */}
                    <div className="absolute -top-6 -left-6 w-12 h-12 bg-emerald-500/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-float" style={{animationDuration: '4s'}}>
                      <span className="text-lg">🧘</span>
                    </div>
                    <div className="absolute -top-4 -right-8 w-10 h-10 bg-teal-500/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-float" style={{animationDelay: '1s', animationDuration: '4s'}}>
                      <span className="text-base">✨</span>
                    </div>
                    <div className="absolute -bottom-6 -left-4 w-11 h-11 bg-green-500/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-float" style={{animationDelay: '2s', animationDuration: '4s'}}>
                      <span className="text-sm">🌿</span>
                    </div>
                    <div className="absolute -bottom-4 -right-6 w-9 h-9 bg-emerald-600/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-float" style={{animationDelay: '3s', animationDuration: '4s'}}>
                      <span className="text-sm">💚</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Elegant Slide Navigation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-500 rounded-full ${
                index === currentSlide 
                  ? 'w-12 h-2 bg-emerald-400 shadow-lg' 
                  : 'w-2 h-2 bg-white/30 hover:bg-white/50 hover:scale-125'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Sacred Herbs Section - Stunning Dark Theme */}
      <section className="py-12 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              The Sacred Five
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Five sacred herbs carefully selected for their unique properties to bring you peace, focus, and radiant skin.
            </p>
          </div>

          {/* Stunning Netflix-style cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { name: "Shankhpushpi", title: "The Quieter", benefit: "Eases mental noise and reduces anxiety in 30 minutes.", emoji: "🧠", gradient: "from-purple-600 to-pink-600" },
              { name: "Brahmi", title: "The Builder", benefit: "Nourishes memory, clarity, and mindful focus.", emoji: "🌿", gradient: "from-green-600 to-emerald-600" },
              { name: "Tulsi", title: "The Shield", benefit: "Protects your peace from stress.", emoji: "🛡️", gradient: "from-blue-600 to-cyan-600" },
              { name: "Rose Petals", title: "The Soother", benefit: "Energizes skin to glow from within.", emoji: "🌹", gradient: "from-rose-600 to-pink-600" },
              { name: "Yashtimadhu", title: "The Harmonizer", benefit: "Gently sweetens without impacting insulin.", emoji: "🍯", gradient: "from-amber-600 to-orange-600" }
            ].map((herb, index) => (
              <div key={index} className="group relative bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 hover:bg-gray-700/80 transition-all duration-500 transform hover:scale-105 border border-gray-700/50">
                <div className="text-center space-y-4">
                  <div className={`w-20 h-20 mx-auto bg-gradient-to-r ${herb.gradient} rounded-full flex items-center justify-center text-3xl shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                    {herb.emoji}
                  </div>
                  <h3 className="text-xl font-bold text-white">{herb.name}</h3>
                  <p className="text-sm italic text-gray-400">{herb.title}</p>
                  <p className="text-sm text-gray-300 leading-relaxed">{herb.benefit}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Inspirational Quote */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-amber-900/40 to-orange-900/40 backdrop-blur-sm border border-amber-500/30 rounded-3xl p-12 max-w-5xl mx-auto">
              <p className="text-2xl font-medium italic text-amber-200 leading-relaxed">
                &quot;When your mind reaches for a quick fix – reach inward instead. This is your calm ritual – no jitters, no crashes.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Netflix-Inspired Wellness Journey Section */}
      <section className="relative py-16 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          {/* Floating particles */}
          <div className="absolute inset-0 opacity-5">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute text-2xl animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${8 + Math.random() * 4}s`
                }}
              >
                {['🧘‍♀️', '✨', '🌅', '🌙', '🌿', '☕'][Math.floor(Math.random() * 6)]}
              </div>
            ))}
          </div>
          
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-900/10 to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block">
              <h2 className="text-6xl font-black mb-4 bg-gradient-to-r from-white via-green-300 to-emerald-400 bg-clip-text text-transparent">
                Your Wellness Journey
              </h2>
              <div className="h-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mx-auto mb-8"></div>
            </div>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
              Transform your daily routine with these three sacred moments of mindfulness
            </p>
          </div>

          {/* Journey Timeline Cards */}
          <div className="relative">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 transform -translate-y-1/2 opacity-30"></div>
            
            <div className="grid lg:grid-cols-3 gap-12 relative">
              {[
                {
                  step: "01",
                  title: "Morning Ritual",
                  desc: "Start your day with intention. Mix 1/2 tsp in warm milk, breathe deeply and set your peaceful tone.",
                  icon: "🌅",
                  time: "6:00 - 9:00 AM",
                  gradient: "from-orange-500 via-red-500 to-pink-500",
                  bgGradient: "from-orange-900/20 to-red-900/20",
                  glowColor: "orange-500/30"
                },
                {
                  step: "02",
                  title: "Mindful Moment",
                  desc: "Take a pause in your busy day. Feel the ancient herbs working their magic, clarity emerging naturally.",
                  icon: "🧘‍♀️",
                  time: "12:00 - 3:00 PM",
                  gradient: "from-blue-500 via-purple-500 to-indigo-500",
                  bgGradient: "from-blue-900/20 to-purple-900/20",
                  glowColor: "blue-500/30"
                },
                {
                  step: "03",
                  title: "Evening Peace",
                  desc: "Wind down naturally as the day ends. Let ancient wisdom guide you to restful, rejuvenating sleep.",
                  icon: "🌙",
                  time: "7:00 - 10:00 PM",
                  gradient: "from-indigo-500 via-purple-600 to-blue-600",
                  bgGradient: "from-indigo-900/20 to-purple-900/20",
                  glowColor: "indigo-500/30"
                }
              ].map((step, index) => (
                <div key={index} className="relative group">
                  {/* Timeline connector dots */}
                  <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-4 border-black z-10 group-hover:scale-150 transition-all duration-500"></div>
                  
                  {/* Main Card */}
                  <div className={`relative bg-gradient-to-br ${step.bgGradient} backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 group overflow-hidden`}>
                    {/* Card glow effect */}
                    <div className={`absolute inset-0 bg-${step.glowColor} rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10`}></div>
                    
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[300%] transition-transform duration-1000"></div>
                    
                    <div className="relative text-center space-y-6">
                      {/* Step Number */}
                      <div className="flex justify-between items-start mb-4">
                        <div className={`text-8xl font-black bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent opacity-20 group-hover:opacity-40 transition-opacity duration-500`}>
                          {step.step}
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-400 font-medium">BEST TIME</div>
                          <div className="text-green-300 font-bold">{step.time}</div>
                        </div>
                      </div>
                      
                      {/* Icon */}
                      <div className="relative mx-auto w-fit">
                        <div className={`w-28 h-28 bg-gradient-to-r ${step.gradient} rounded-full flex items-center justify-center text-5xl shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                          {step.icon}
                        </div>
                        <div className={`absolute inset-0 bg-gradient-to-r ${step.gradient} rounded-full blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500`}></div>
                      </div>
                      
                      {/* Content */}
                      <div className="space-y-4">
                        <h3 className="text-3xl font-black text-white group-hover:text-green-200 transition-colors duration-300">{step.title}</h3>
                        <p className="text-gray-300 text-lg leading-relaxed group-hover:text-white transition-colors duration-300">{step.desc}</p>
                      </div>
                      
                      {/* Action Indicator */}
                      <div className="pt-4">
                        <div className={`inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r ${step.gradient} rounded-full text-white font-bold shadow-xl group-hover:scale-105 transition-transform duration-300`}>
                          <span className="text-sm">Step {step.step}</span>
                          <span className="text-lg group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA Section */}
          <div className="mt-20 text-center">
            <div className="relative max-w-5xl mx-auto">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 via-emerald-500/30 to-green-600/20 rounded-3xl blur-3xl"></div>
              
              <div className="relative bg-gradient-to-r from-green-900/40 via-emerald-800/50 to-green-900/40 backdrop-blur-xl border border-green-500/30 rounded-3xl p-12">
                <div className="space-y-6">
                  <div className="text-4xl">✨</div>
                  <h3 className="text-3xl font-bold text-white mb-4">The Sacred Practice</h3>
                  <p className="text-xl text-green-200 leading-relaxed max-w-3xl mx-auto">
                    &quot;Enjoy up to twice daily, like tea or coffee. Consistency enhances the stress-combating ability of mind and body. When your mind reaches for a quick fix – reach inward instead.&quot;
                  </p>
                  
                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                    <Link href="/products" className="group bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center gap-3">
                      <span className="group-hover:rotate-12 transition-transform duration-300">🍵</span>
                      <span>Start Your Journey</span>
                    </Link>
                    <Link href="/showcase" className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 border border-white/30 hover:border-white/50">
                      Learn More About Rituals
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section - Stunning Dark Theme */}
      <section className="py-12 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden text-white">
        {/* Background sparkles */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-ping text-3xl text-green-400"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 3}s`
              }}
            >
              ✨
            </div>
          ))}
        </div>
        
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-black text-white mb-6">
            Ready to Transform
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent block">
              Your Daily Ritual?
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands who have discovered the path to inner peace and radiant health through ancient wisdom.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/products" className="bg-gradient-to-r from-red-600 to-red-700 text-white px-12 py-4 rounded-xl font-bold text-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center gap-3">
              <span>▶</span>
              Order A-ZEN Now
            </Link>
            <Link href="/showcase" className="bg-gray-800/60 backdrop-blur-sm text-white px-12 py-4 rounded-xl font-semibold text-xl hover:bg-gray-700/80 transition-all duration-300 border border-gray-600">
              Explore More
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}


