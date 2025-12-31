'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from './Sidebar'
import MobileNav from './MobileNav'
import DashboardHeader from './DashboardHeader'

interface User {
  id: string
  name: string
  email: string
  role: 'CLIENT' | 'PROFESSIONAL' | 'ADMIN'
  avatar?: string
}

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [notificationCount, setNotificationCount] = useState(0)

  useEffect(() => {
    // Check authentication
    const userData = localStorage.getItem('user')
    const token = localStorage.getItem('accessToken')

    if (!userData || !token) {
      router.push('/login')
      return
    }

    try {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      fetchNotifications(token)
    } catch (error) {
      console.error('Error parsing user data:', error)
      router.push('/login')
    } finally {
      setLoading(false)
    }
  }, [router])

  const fetchNotifications = async (token: string) => {
    try {
      const response = await fetch('http://localhost:3001/api/notifications', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      if (data.success) {
        const unreadCount = data.data.notifications?.filter((n: any) => !n.read).length || 0
        setNotificationCount(unreadCount)
      }
    } catch (error) {
      console.error('Error fetching notifications:', error)
    }
  }

  const handleLogout = () => {
    localStorage.clear()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-mustard-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const userRole = user.role === 'PROFESSIONAL' ? 'PROFESSIONAL' : 'CLIENT'

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop */}
      <Sidebar
        userRole={userRole}
        userName={user.name}
        userAvatar={user.avatar}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <DashboardHeader
          userName={user.name}
          userAvatar={user.avatar}
          notificationCount={notificationCount}
        />

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 pb-24 lg:pb-6">
          {children}
        </main>
      </div>

      {/* Mobile Navigation */}
      <MobileNav userRole={userRole} />
    </div>
  )
}
