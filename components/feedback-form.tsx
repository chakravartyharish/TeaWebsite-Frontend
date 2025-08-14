'use client'
import { useState } from 'react'
import { apiPost } from '@/lib/api'

interface FeedbackFormProps {
  productId?: string
  orderId?: string
  onClose?: () => void
  isModal?: boolean
}

export default function FeedbackForm({ productId, orderId, onClose, isModal = false }: FeedbackFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    rating: 0,
    product_id: productId || '',
    order_id: orderId || ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const submitData = {
        ...formData,
        product_id: formData.product_id || undefined,
        order_id: formData.order_id || undefined,
        rating: formData.rating || undefined
      }

      await apiPost('/feedback', submitData)
      setIsSubmitted(true)
      
      setTimeout(() => {
        if (onClose) {
          onClose()
        }
      }, 2000)
    } catch (err: any) {
      setError(err.message || 'Failed to submit feedback. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }))
  }

  if (isSubmitted) {
    return (
      <div className={isModal ? "bg-netflix-gray border border-netflix-lightGray/30 rounded-2xl p-6 w-full max-w-md" : "bg-netflix-gray/80 backdrop-blur-sm border border-netflix-lightGray/30 rounded-2xl p-6 shadow-2xl"}>
        <div className="text-center">
          <div className="text-5xl mb-6">🎉</div>
          <h3 className="font-heading text-2xl text-netflix-white mb-3">Thank You!</h3>
          <p className="text-netflix-text/80">Your feedback has been submitted successfully.</p>
          <div className="mt-4 inline-flex items-center space-x-2 bg-netflix-accent/20 border border-netflix-accent/30 rounded-full px-4 py-2">
            <span className="w-2 h-2 bg-netflix-accent rounded-full animate-pulse"></span>
            <span className="text-netflix-accent text-sm">We'll review this shortly</span>
          </div>
        </div>
      </div>
    )
  }

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="font-heading text-3xl font-bold text-netflix-white mb-3">Share Your Experience</h3>
        <p className="text-netflix-text/70">Help us create the perfect tea experience for everyone</p>
        <div className="w-20 h-1 bg-gradient-to-r from-netflix-red to-netflix-accent mx-auto mt-4 rounded-full"></div>
      </div>

      {error && (
        <div className="bg-netflix-red/20 border border-netflix-red/40 text-netflix-red px-4 py-3 rounded-xl text-sm backdrop-blur-sm">
          <div className="flex items-center space-x-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-netflix-white text-sm font-medium">Your Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            required
            className="w-full bg-netflix-lightGray/50 border border-netflix-lightGray/30 rounded-xl px-4 py-3 text-netflix-white placeholder-netflix-text/50 focus:outline-none focus:ring-2 focus:ring-netflix-red focus:border-netflix-red/50 transition-all duration-200 backdrop-blur-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-netflix-white text-sm font-medium">Email Address *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="your.email@example.com"
            required
            className="w-full bg-netflix-lightGray/50 border border-netflix-lightGray/30 rounded-xl px-4 py-3 text-netflix-white placeholder-netflix-text/50 focus:outline-none focus:ring-2 focus:ring-netflix-red focus:border-netflix-red/50 transition-all duration-200 backdrop-blur-sm"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-netflix-white text-sm font-medium">Subject *</label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          placeholder="What's this feedback about?"
          required
          className="w-full bg-netflix-lightGray/50 border border-netflix-lightGray/30 rounded-xl px-4 py-3 text-netflix-white placeholder-netflix-text/50 focus:outline-none focus:ring-2 focus:ring-netflix-red focus:border-netflix-red/50 transition-all duration-200 backdrop-blur-sm"
        />
      </div>

      <div className="space-y-3">
        <label className="text-netflix-white text-sm font-medium">
          Rate Your Experience
        </label>
        <div className="flex items-center space-x-2 bg-netflix-lightGray/20 rounded-xl p-4 border border-netflix-lightGray/30">
          <span className="text-netflix-text/70 text-sm mr-3">Poor</span>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingClick(star)}
                className={`text-3xl transition-all duration-200 transform hover:scale-110 ${
                  star <= formData.rating 
                    ? 'text-yellow-400 drop-shadow-lg' 
                    : 'text-netflix-lightGray hover:text-yellow-300'
                }`}
              >
                ★
              </button>
            ))}
          </div>
          <span className="text-netflix-text/70 text-sm ml-3">Excellent</span>
          {formData.rating > 0 && (
            <div className="ml-4 inline-flex items-center space-x-1 bg-netflix-accent/20 border border-netflix-accent/30 rounded-full px-3 py-1">
              <span className="text-netflix-accent text-sm font-medium">{formData.rating}/5</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-netflix-white text-sm font-medium">Your Feedback *</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Tell us about your experience, suggestions for improvement, or anything else you'd like to share..."
          required
          rows={5}
          className="w-full bg-netflix-lightGray/50 border border-netflix-lightGray/30 rounded-xl px-4 py-3 text-netflix-white placeholder-netflix-text/50 focus:outline-none focus:ring-2 focus:ring-netflix-red focus:border-netflix-red/50 transition-all duration-200 resize-vertical backdrop-blur-sm"
        />
        <div className="text-right">
          <span className="text-netflix-text/50 text-xs">
            {formData.message.length}/1000 characters
          </span>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-gradient-to-r from-netflix-red to-netflix-red/80 text-white rounded-xl px-6 py-4 font-semibold hover:from-netflix-red/90 hover:to-netflix-red/70 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-netflix-red/50 shadow-lg"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Submitting...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <span>Submit Feedback</span>
              <span>🚀</span>
            </div>
          )}
        </button>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-4 border border-netflix-lightGray/30 rounded-xl text-netflix-text hover:bg-netflix-lightGray/20 transition-all duration-200 backdrop-blur-sm"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )

  if (isModal) {
    return (
      <div className="fixed inset-0 bg-netflix-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-netflix-gray/90 backdrop-blur-md border border-netflix-lightGray/30 rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
          {formContent}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-netflix-gray/80 backdrop-blur-sm border border-netflix-lightGray/30 rounded-2xl p-8 shadow-2xl">
      {formContent}
    </div>
  )
}