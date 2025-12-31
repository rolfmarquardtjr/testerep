'use client'

import { useEffect, useState } from 'react'
import { LoadingSpinner } from '@/components/shared'
import { getApiUrl } from '@/lib/api'
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
  budget?: number
  createdAt: string
}

export default function PedidosPage() {
  const [requests, setRequests] = useState<ServiceRequest[]>([])
  const [filteredRequests, setFilteredRequests] = useState<ServiceRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    fetchRequests()
  }, [])

  useEffect(() => {
    filterRequests()
  }, [requests, searchTerm, statusFilter])

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await fetch(getApiUrl('/api/service-requests'), {
        headers: { Authorization: `Bearer ${token}` },
      })

      const data = await response.json()
      if (data.success) {
        setRequests(data.data.requests || [])
      }
    } catch (error) {
      console.error('Error fetching requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterRequests = () => {
    let filtered = [...requests]

    if (statusFilter !== 'all') {
      filtered = filtered.filter((r) => r.status === statusFilter)
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (r) =>
          r.title.toLowerCase().includes(term) ||
          r.description.toLowerCase().includes(term) ||
          r.category?.name.toLowerCase().includes(term)
      )
    }

    setFilteredRequests(filtered)
  }

  const getStats = () => {
    return {
      total: requests.length,
      pending: requests.filter((r) => r.status === 'PENDING').length,
      inProgress: requests.filter((r) => r.status === 'IN_PROGRESS').length,
      completed: requests.filter((r) => r.status === 'COMPLETED').length,
    }
  }

  const stats = getStats()

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
        stats={stats}
        filteredRequests={filteredRequests}
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        setSearchTerm={setSearchTerm}
        setStatusFilter={setStatusFilter}
      />
      <PageMobile
        filteredRequests={filteredRequests}
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        setSearchTerm={setSearchTerm}
        setStatusFilter={setStatusFilter}
      />
    </div>
  )
}
