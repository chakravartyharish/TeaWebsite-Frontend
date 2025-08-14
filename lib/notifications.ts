/**
 * Frontend notification utilities for Tea Store
 */

export interface NotificationPreferences {
  email_enabled: boolean
  sms_enabled: boolean
  whatsapp_enabled: boolean
  push_enabled: boolean
  order_notifications: boolean
  marketing_notifications: boolean
  support_notifications: boolean
  inventory_notifications: boolean
}

export interface NotificationRequest {
  event: string
  channels: string[]
  recipient: string
  data: Record<string, any>
  priority?: 'low' | 'medium' | 'high' | 'critical'
  scheduled_at?: string
}

export interface NotificationResponse {
  success: boolean
  message: string
  notification_id?: string
  results?: Record<string, any>
}

export interface NotificationStats {
  total_sent: number
  total_failed: number
  success_rate: number
  by_channel: Record<string, number>
  by_event: Record<string, number>
  recent_activity: Array<{
    event: string
    channel: string
    recipient: string
    status: string
    created_at: string
  }>
}

class NotificationService {
  private baseUrl: string

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
  }

  /**
   * Send a notification
   */
  async sendNotification(request: NotificationRequest): Promise<NotificationResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/notifications/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Failed to send notification:', error)
      throw error
    }
  }

  /**
   * Send order placed notification
   */
  async sendOrderPlacedNotification(orderData: Record<string, any>): Promise<NotificationResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/notifications/send/order-placed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Failed to send order placed notification:', error)
      throw error
    }
  }

  /**
   * Send order shipped notification
   */
  async sendOrderShippedNotification(orderData: Record<string, any>): Promise<NotificationResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/notifications/send/order-shipped`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Failed to send order shipped notification:', error)
      throw error
    }
  }

  /**
   * Send contact form notification
   */
  async sendContactFormNotification(contactData: Record<string, any>): Promise<NotificationResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/notifications/send/contact-form`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Failed to send contact form notification:', error)
      throw error
    }
  }

  /**
   * Get user notification preferences
   */
  async getUserPreferences(userId: string): Promise<NotificationPreferences> {
    try {
      const response = await fetch(`${this.baseUrl}/notifications/preferences/${userId}`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data.preferences || this.getDefaultPreferences()
    } catch (error) {
      console.error('Failed to get user preferences:', error)
      return this.getDefaultPreferences()
    }
  }

  /**
   * Update user notification preferences
   */
  async updateUserPreferences(
    userId: string,
    preferences: NotificationPreferences,
    unsubscribedEvents?: string[],
    unsubscribedChannels?: string[]
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/notifications/preferences/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          preferences,
          unsubscribed_events: unsubscribedEvents,
          unsubscribed_channels: unsubscribedChannels,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Failed to update user preferences:', error)
      throw error
    }
  }

  /**
   * Get notification statistics
   */
  async getNotificationStats(days: number = 7): Promise<NotificationStats> {
    try {
      const response = await fetch(`${this.baseUrl}/notifications/stats?days=${days}`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Failed to get notification stats:', error)
      throw error
    }
  }

  /**
   * Get notification logs
   */
  async getNotificationLogs(params: {
    recipient?: string
    event?: string
    channel?: string
    status?: string
    limit?: number
    offset?: number
  } = {}): Promise<{
    logs: any[]
    total: number
    limit: number
    offset: number
  }> {
    try {
      const searchParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })

      const response = await fetch(`${this.baseUrl}/notifications/logs?${searchParams}`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Failed to get notification logs:', error)
      throw error
    }
  }

  /**
   * Get default notification preferences
   */
  private getDefaultPreferences(): NotificationPreferences {
    return {
      email_enabled: true,
      sms_enabled: false,
      whatsapp_enabled: true,
      push_enabled: false,
      order_notifications: true,
      marketing_notifications: false,
      support_notifications: true,
      inventory_notifications: false,
    }
  }
}

// Create singleton instance
export const notificationService = new NotificationService()

// Utility functions for common notification scenarios
export const notifyOrderPlaced = async (orderData: {
  order_id: string
  customer_name: string
  customer_email: string
  customer_phone?: string
  amount: number
  order_date: string
}) => {
  try {
    return await notificationService.sendOrderPlacedNotification(orderData)
  } catch (error) {
    console.error('Order placed notification failed:', error)
    throw error
  }
}

export const notifyOrderShipped = async (orderData: {
  order_id: string
  customer_name: string
  customer_email: string
  customer_phone?: string
  tracking_id: string
  delivery_date: string
  tracking_url?: string
}) => {
  try {
    return await notificationService.sendOrderShippedNotification(orderData)
  } catch (error) {
    console.error('Order shipped notification failed:', error)
    throw error
  }
}

export const notifyContactForm = async (contactData: {
  name: string
  email: string
  phone?: string
  category: string
  subject: string
  message: string
  reference_id: string
}) => {
  try {
    return await notificationService.sendContactFormNotification(contactData)
  } catch (error) {
    console.error('Contact form notification failed:', error)
    throw error
  }
}

// React hook for notification preferences
export const useNotificationPreferences = (userId: string) => {
  const [preferences, setPreferences] = useState<NotificationPreferences | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        setLoading(true)
        const userPrefs = await notificationService.getUserPreferences(userId)
        setPreferences(userPrefs)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load preferences')
        setPreferences(notificationService.getDefaultPreferences())
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      loadPreferences()
    }
  }, [userId])

  const updatePreferences = async (
    newPreferences: NotificationPreferences,
    unsubscribedEvents?: string[],
    unsubscribedChannels?: string[]
  ) => {
    try {
      await notificationService.updateUserPreferences(
        userId,
        newPreferences,
        unsubscribedEvents,
        unsubscribedChannels
      )
      setPreferences(newPreferences)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update preferences')
      throw err
    }
  }

  return {
    preferences,
    loading,
    error,
    updatePreferences,
  }
}

// Import useState and useEffect for the hook
import { useState, useEffect } from 'react'