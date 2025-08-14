import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const { name, email, subject, message } = body
    
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, subject, and message are required' },
        { status: 400 }
      )
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }
    
    // Prepare feedback data
    const feedbackData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      subject: subject.trim(),
      message: message.trim(),
      rating: body.rating || undefined,
      product_id: body.product_id || undefined,
      order_id: body.order_id || undefined
    }
    
    // Send to backend
    const response = await fetch(`${BACKEND_URL}/api/feedback/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedbackData)
    })
    
    if (!response.ok) {
      const errorData = await response.text()
      console.error('Backend error:', errorData)
      throw new Error('Failed to submit feedback to backend')
    }
    
    const result = await response.json()
    
    // Log the submission
    console.log('🍃 New Feedback Submission:', {
      id: result.id,
      name: feedbackData.name,
      email: feedbackData.email,
      subject: feedbackData.subject,
      rating: feedbackData.rating,
      product_id: feedbackData.product_id,
      created_at: result.created_at
    })
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Your feedback has been submitted successfully!',
      data: {
        submissionId: result.id,
        createdAt: result.created_at,
        autoReply: 'Thank you for your valuable feedback! We truly appreciate you taking the time to share your thoughts with us.',
        nextSteps: [
          'Your feedback has been recorded and will be reviewed by our team',
          'If you\'ve provided a rating, it will help us improve our products and services',
          'For urgent matters, please contact us directly at innervedacare@gmail.com'
        ],
        contactInfo: {
          email: 'innervedacare@gmail.com',
          phone: '9113920980',
          hours: 'Mon-Sat, 9 AM - 7 PM IST'
        }
      }
    })
    
  } catch (error) {
    console.error('❌ Feedback submission error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to submit feedback. Please try again or contact us directly at innervedacare@gmail.com',
        fallbackContact: {
          email: 'innervedacare@gmail.com',
          phone: '9113920980'
        }
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const productId = searchParams.get('product_id')
    const limit = searchParams.get('limit') || '50'
    const skip = searchParams.get('skip') || '0'
    
    // Build query parameters
    const params = new URLSearchParams({
      limit,
      skip
    })
    
    if (status) params.append('status', status)
    if (productId) params.append('product_id', productId)
    
    // Fetch from backend
    const response = await fetch(`${BACKEND_URL}/api/feedback/?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch feedback from backend')
    }
    
    const feedback = await response.json()
    
    return NextResponse.json({
      success: true,
      data: feedback
    })
    
  } catch (error) {
    console.error('❌ Feedback fetch error:', error)
    
    return NextResponse.json(
      { error: 'Failed to fetch feedback' },
      { status: 500 }
    )
  }
}