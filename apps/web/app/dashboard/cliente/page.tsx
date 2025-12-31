'use client'

import { useEffect, useState } from 'react'
import { LoadingSpinner } from '@/components/shared'
import { getApiUrl } from '@/lib/api'
import {
  Zap,
  Droplets,
  Paintbrush,
  Wind,
  SprayCan,
  Wrench,
  Clock,
  TrendingUp,
  CheckCircle,
  XCircle,
} from 'lucide-react'
import PageDesktop from './PageDesktop'
import PageMobile from './PageMobile'

interface ServiceRequest {
  id: string
  title: string
  description: string
  status: string
  city: string
  state: string
  category?: { name: string }
  quotes?: any[]
  createdAt: string
}

interface Category {
  id: string
  name: string
  icon: any
  count: number
  image: string
  color: string
}

export default function ClienteDashboard() {
  const [requests, setRequests] = useState<ServiceRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState('')
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
  })

  // Static Data
  const featuredPros = [
    {
      id: '1',
      name: 'Joao Silva',
      category: 'Eletricista',
      rating: 4.9,
      reviews: 127,
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
      coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600',
      verified: true,
      available: true,
      price: 'R$ 150',
      responseTime: 15,
      completedJobs: 89,
    },
    {
      id: '2',
      name: 'Maria Santos',
      category: 'Encanadora',
      rating: 5.0,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
      coverImage: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600',
      verified: true,
      available: true,
      price: 'R$ 120',
      responseTime: 10,
      completedJobs: 65,
    },
    {
      id: '3',
      name: 'Carlos Oliveira',
      category: 'Pintor',
      rating: 4.8,
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      coverImage: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600',
      verified: true,
      available: false,
      price: 'R$ 80/m2',
      responseTime: 20,
      completedJobs: 156,
    },
    {
      id: '4',
      name: 'Ana Costa',
      category: 'Limpeza',
      rating: 4.9,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
      coverImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600',
      verified: true,
      available: true,
      price: 'R$ 100',
      responseTime: 12,
      completedJobs: 112,
    },
  ]

  const categories: Category[] = [
    { id: 'eletrica', name: 'Eletricista', icon: Zap, count: 48, image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400', color: 'from-amber-500 to-orange-600' },
    { id: 'hidraulica', name: 'Encanador', icon: Droplets, count: 35, image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400', color: 'from-blue-500 to-cyan-600' },
    { id: 'pintura', name: 'Pintor', icon: Paintbrush, count: 29, image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400', color: 'from-orange-500 to-red-600' },
    { id: 'ar-condicionado', name: 'Ar Cond.', icon: Wind, count: 22, image: 'https://plus.unsplash.com/premium_photo-1682126012378-859ca7a9f4cf?w=400', color: 'from-cyan-500 to-blue-600' },
    { id: 'limpeza', name: 'Limpeza', icon: SprayCan, count: 67, image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400', color: 'from-violet-500 to-purple-600' },
    { id: 'montagem', name: 'Montador', icon: Wrench, count: 41, image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400', color: 'from-slate-500 to-gray-600' },
  ]

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const user = JSON.parse(userData)
      setUserName(user.name?.split(' ')[0] || 'Usuario')
    }
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await fetch(getApiUrl('/api/service-requests'), {
        headers: { Authorization: `Bearer ${token}` },
      })

      const data = await response.json()
      if (data.success) {
        const reqs = data.data.requests || []
        setRequests(reqs)
        setStats({
          total: reqs.length,
          pending: reqs.filter((r: ServiceRequest) => r.status === 'PENDING').length,
          inProgress: reqs.filter((r: ServiceRequest) => r.status === 'IN_PROGRESS').length,
          completed: reqs.filter((r: ServiceRequest) => r.status === 'COMPLETED').length,
        })
      }
    } catch (error) {
      console.error('Error fetching requests:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <LoadingSpinner size="lg" text="Carregando..." />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageDesktop
        loading={loading}
        userName={userName}
        requests={requests}
        stats={stats}
        categories={categories}
        featuredPros={featuredPros}
      />
      <PageMobile

        userName={userName}
        recentRequests={requests}
        stats={stats}
        categories={categories}
      />
    </div>
  )
}
