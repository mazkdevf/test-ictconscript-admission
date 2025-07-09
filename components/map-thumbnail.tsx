"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"

interface MapThumbnailProps {
  lat: number
  lon: number
}

export function MapThumbnail({ lat, lon }: MapThumbnailProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Create a simple static map using OpenStreetMap tiles
  const zoom = 13
  const tileX = Math.floor(((lon + 180) / 360) * Math.pow(2, zoom))
  const tileY = Math.floor(
    ((1 - Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) / Math.PI) / 2) *
      Math.pow(2, zoom),
  )
  const mapUrl = `https://tile.openstreetmap.org/${zoom}/${tileX}/${tileY}.png`

  return (
    <div className="relative">
      <div
        className="w-24 h-24 bg-slate-200 rounded border border-slate-300 relative overflow-hidden"
        title={`Location: ${lat.toFixed(4)}, ${lon.toFixed(4)}`}
      >
        {/* Background map tile */}
        {!imageError && (
          <img
            src={mapUrl}
            alt="Map"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            crossOrigin="anonymous"
          />
        )}

        {/* Fallback content */}
        <div
          className={`absolute inset-0 flex items-center justify-center bg-slate-100 transition-opacity duration-300 ${
            imageLoaded && !imageError ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="text-center">
            <MapPin className="w-4 h-4 text-slate-600 mx-auto mb-1" />
            <div className="text-xs text-slate-600 leading-tight">
              {lat.toFixed(2)}
              <br />
              {lon.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Center marker */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
        </div>

        {/* Loading indicator */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  )
}
