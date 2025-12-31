'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'

import { LoadingSpinner } from '@/components/shared'

// Dynamic imports for Leaflet components (they need window)
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
)
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
)

interface MapProps {
  center?: [number, number]
  zoom?: number
  markers?: MapMarker[]
  onMarkerClick?: (marker: MapMarker) => void
  className?: string
  showUserLocation?: boolean
}

export interface MapMarker {
  id: string
  position: [number, number]
  type: 'professional' | 'request'
  title: string
  subtitle?: string
  rating?: number
  image?: string
  data?: unknown
}

export default function Map({
  center = [-23.5505, -46.6333], // Sao Paulo default
  zoom = 13,
  markers = [],
  onMarkerClick,
  className = 'h-[400px] w-full',
  showUserLocation = false,
}: MapProps) {
  const [mounted, setMounted] = useState(false)
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
  const [L, setL] = useState<any>(null)

  useEffect(() => {
    setMounted(true)

    // Import Leaflet and setup icons
    import('leaflet').then((leaflet) => {
      setL(leaflet.default)

      // Fix default marker icons
      delete (leaflet.default.Icon.Default.prototype as any)._getIconUrl
      leaflet.default.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      })
    })

    // Get user location
    if (showUserLocation && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude])
        },
        (error) => {
          console.error('Error getting location:', error)
        }
      )
    }
  }, [showUserLocation])

  if (!mounted || !L) {
    return (
      <div className={`${className} flex items-center justify-center bg-gray-100 rounded-lg`}>
        <LoadingSpinner size="lg" text="Carregando mapa..." />
      </div>
    )
  }

  // Create custom icons
  const professionalIcon = new L.DivIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: 40px;
        height: 40px;
        background: #D4A017;
        border: 3px solid #1A2B4A;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: #1A2B4A;
        font-size: 18px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      ">P</div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  })

  const requestIcon = new L.DivIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: 40px;
        height: 40px;
        background: #1A2B4A;
        border: 3px solid #D4A017;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: #D4A017;
        font-size: 18px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      ">S</div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  })

  const userIcon = new L.DivIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: 24px;
        height: 24px;
        background: #3B82F6;
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      "></div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  })

  const mapCenter = userLocation || center

  return (
    <div className={className}>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.css"
      />
      <MapContainer
        center={mapCenter}
        zoom={zoom}
        style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User location marker */}
        {userLocation && (
          <Marker position={userLocation} icon={userIcon}>
            <Popup>
              <div className="text-center">
                <p className="font-medium">Sua localizacao</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Other markers */}
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            icon={marker.type === 'professional' ? professionalIcon : requestIcon}
            eventHandlers={{
              click: () => onMarkerClick?.(marker),
            }}
          >
            <Popup>
              <div className="min-w-[200px]">
                {marker.image && (
                  <img
                    src={marker.image}
                    alt={marker.title}
                    className="w-full h-24 object-cover rounded-t-lg -mt-3 -mx-3 mb-2"
                    style={{ width: 'calc(100% + 24px)' }}
                  />
                )}
                <h4 className="font-semibold text-navy-900">{marker.title}</h4>
                {marker.subtitle && (
                  <p className="text-sm text-gray-600">{marker.subtitle}</p>
                )}
                {marker.rating && (
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm font-medium">{marker.rating.toFixed(1)}</span>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
