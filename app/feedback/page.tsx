import FeedbackForm from '@/components/feedback-form'

export const metadata = {
  title: 'Feedback | Inner Veda Tea Store',
  description: 'Share your feedback with us. We value your thoughts and suggestions to improve our products and services.',
}

export default function FeedbackPage() {
  return (
    <div className="min-h-screen bg-netflix-black text-netflix-text relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-netflix-dark via-netflix-black to-netflix-gray opacity-50"></div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgo8cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZjEwNzAyIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9wYXR0ZXJuPgo8L2RlZnM+CjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiIC8+Cjwvc3ZnPg==')]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-netflix-red/20 border border-netflix-red/30 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-netflix-red rounded-full animate-pulse"></span>
            <span className="text-netflix-red text-sm font-medium">We're Listening</span>
          </div>
          
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-netflix-white via-netflix-text to-netflix-accent bg-clip-text text-transparent">
              Your Voice
            </span>
            <br />
            <span className="text-netflix-red">Matters</span>
          </h1>
          
          <p className="text-xl text-netflix-text/80 max-w-2xl mx-auto leading-relaxed">
            Share your experience, rate our products, and help us craft the perfect tea journey for you and fellow tea enthusiasts worldwide.
          </p>
        </div>
        
        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Feedback Form - Takes up 2 columns */}
          <div className="lg:col-span-2">
            <FeedbackForm />
          </div>

          {/* Contact Information Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-netflix-gray/50 backdrop-blur-sm border border-netflix-lightGray/30 rounded-2xl p-6">
              <h3 className="text-netflix-white font-semibold text-lg mb-4">Community Impact</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-netflix-text/70">Reviews This Month</span>
                  <span className="text-netflix-accent font-bold">1,247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-netflix-text/70">Average Rating</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-netflix-accent font-bold">4.8</span>
                    <div className="flex text-yellow-400">
                      {'★'.repeat(5)}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-netflix-text/70">Response Time</span>
                  <span className="text-netflix-accent font-bold">24h</span>
                </div>
              </div>
            </div>

            {/* Contact Methods */}
            <div className="bg-netflix-gray/50 backdrop-blur-sm border border-netflix-lightGray/30 rounded-2xl p-6">
              <h3 className="text-netflix-white font-semibold text-lg mb-4">Get In Touch</h3>
              <div className="space-y-4">
                <div className="group hover:bg-netflix-lightGray/20 rounded-lg p-3 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-netflix-red/20 rounded-lg flex items-center justify-center">
                      <span className="text-netflix-red text-sm">📧</span>
                    </div>
                    <span className="text-netflix-white font-medium">Email Support</span>
                  </div>
                  <p className="text-netflix-text/70 text-sm ml-11">innervedacare@gmail.com</p>
                  <p className="text-netflix-text/50 text-xs ml-11">Usually responds within 2-4 hours</p>
                </div>

                <div className="group hover:bg-netflix-lightGray/20 rounded-lg p-3 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-netflix-accent/20 rounded-lg flex items-center justify-center">
                      <span className="text-netflix-accent text-sm">📞</span>
                    </div>
                    <span className="text-netflix-white font-medium">Phone Support</span>
                  </div>
                  <p className="text-netflix-text/70 text-sm ml-11">+91 9113920980</p>
                  <p className="text-netflix-text/50 text-xs ml-11">Mon-Sat, 9 AM - 7 PM IST</p>
                </div>

                <div className="group hover:bg-netflix-lightGray/20 rounded-lg p-3 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-blue-400 text-sm">📱</span>
                    </div>
                    <span className="text-netflix-white font-medium">Social Media</span>
                  </div>
                  <p className="text-netflix-text/70 text-sm ml-11">@innerveda.in</p>
                  <p className="text-netflix-text/50 text-xs ml-11">Follow for updates & wellness tips</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-r from-netflix-gray/30 to-netflix-lightGray/30 backdrop-blur-sm border border-netflix-lightGray/20 rounded-2xl p-8">
          <h3 className="text-2xl font-heading font-semibold text-netflix-white mb-3">
            Join Our Tea Community
          </h3>
          <p className="text-netflix-text/70 mb-6 max-w-xl mx-auto">
            Every review helps us improve and helps fellow tea lovers discover their perfect cup. Your feedback shapes our future blends.
          </p>
          <div className="flex justify-center space-x-4">
            <span className="inline-flex items-center space-x-2 bg-netflix-red/10 border border-netflix-red/30 rounded-full px-4 py-2">
              <span className="text-netflix-red">✨</span>
              <span className="text-netflix-text text-sm">Premium Quality</span>
            </span>
            <span className="inline-flex items-center space-x-2 bg-netflix-accent/10 border border-netflix-accent/30 rounded-full px-4 py-2">
              <span className="text-netflix-accent">🌿</span>
              <span className="text-netflix-text text-sm">Organic Sourced</span>
            </span>
            <span className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2">
              <span className="text-blue-400">🤝</span>
              <span className="text-netflix-text text-sm">Community Driven</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}