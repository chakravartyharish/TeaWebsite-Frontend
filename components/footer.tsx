import Link from "next/link"
import { QRCodeDisplay } from './qr-code-generator';

export default function Footer(){
  return (
    <footer className="bg-black text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-xl">🍃</span>
              </div>
              <span className="font-bold text-2xl text-white tracking-tight">INNER VEDA</span>
            </div>
            <p className="text-gray-400 mb-8 max-w-lg leading-relaxed text-base">
              Ancient wisdom for modern living. Experience the perfect blend of traditional Ayurvedic herbs 
              crafted for your wellness journey.
            </p>
            <div className="flex space-x-3">
              <a 
                href="mailto:innervedacare@gmail.com" 
                className="w-12 h-12 bg-gray-900 border border-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-800 hover:border-gray-600 transition-all duration-200"
              >
                <span className="text-xl">📧</span>
              </a>
              <a 
                href="tel:9113920980" 
                className="w-12 h-12 bg-gray-900 border border-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-800 hover:border-gray-600 transition-all duration-200"
              >
                <span className="text-xl">📱</span>
              </a>
              <a 
                href="https://instagram.com/innerveda.in" 
                className="w-12 h-12 bg-gray-900 border border-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-800 hover:border-gray-600 transition-all duration-200"
              >
                <span className="text-xl">📷</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white text-lg mb-6 tracking-tight">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors duration-200 block py-1">Home</Link></li>
              <li><Link href="/products" className="text-gray-400 hover:text-white transition-colors duration-200 block py-1">Products</Link></li>
              <li><Link href="/showcase" className="text-gray-400 hover:text-white transition-colors duration-200 block py-1">About A-ZEN</Link></li>
              <li><Link href="/cart" className="text-gray-400 hover:text-white transition-colors duration-200 block py-1">Cart</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-white text-lg mb-6 tracking-tight">Support</h3>
            <ul className="space-y-4">
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-200 block py-1">Contact Us</Link></li>
              <li><Link href="/feedback" className="text-gray-400 hover:text-white transition-colors duration-200 block py-1">Feedback</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200 block py-1">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-200 block py-1">Terms of Service</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors duration-200 block py-1">FAQ</Link></li>
            </ul>
          </div>
        </div>

        {/* QR Codes Section */}
        <div className="border-t border-gray-800 py-12">
          <div className="text-center mb-8">
            <h3 className="font-semibold text-white text-xl mb-2">Quick Access</h3>
            <p className="text-gray-400">Scan QR codes for instant access to our services</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <QRCodeDisplay
                qrCodeData="https://innerveda.netlify.app"
                title="Website"
                description="Scan to visit our website"
                size={120}
                showDownload={false}
              />
            </div>
            
            <div className="text-center">
              <QRCodeDisplay
                qrCodeData="https://instagram.com/innerveda.in"
                title="Instagram"
                description="Follow us @innerveda.in"
                size={120}
                showDownload={false}
              />
            </div>
            
            <div className="text-center">
              <QRCodeDisplay
                qrCodeData={`BEGIN:VCARD\nVERSION:3.0\nFN:Inner Veda Support\nORG:Inner Veda Tea Store\nTEL:+919113920980\nEMAIL:innervedacare@gmail.com\nURL:https://innerveda.netlify.app\nEND:VCARD`}
                title="Contact"
                description="Save our contact info"
                size={120}
                showDownload={false}
              />
            </div>
            
            <div className="text-center">
              <QRCodeDisplay
                qrCodeData="https://innerveda.netlify.app/feedback"
                title="Feedback"
                description="Share your experience"
                size={120}
                showDownload={false}
              />
            </div>
          </div>
        </div>

        {/* Contact Information Bar */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="flex items-center space-x-3 text-gray-400">
                <span className="text-lg">📧</span>
                <span className="text-sm">innervedacare@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <span className="text-lg">📱</span>
                <span className="text-sm">9113920980</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <span className="text-lg">📷</span>
                <span className="text-sm">@innerveda.in</span>
              </div>
            </div>
            <div className="text-sm text-gray-400 bg-gray-900 px-4 py-2 rounded-lg border border-gray-700">
              Contact: Sonam Garg
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} Inner Veda. All rights reserved.
            </div>
            <div className="text-sm text-gray-500">
              Made with 🍃 for your wellness journey
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}


