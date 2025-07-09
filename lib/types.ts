// Type definitions for the application
export interface LogEntry {
  id: string
  title: string
  body: string
  isoTime: string
  lat: number | null
  lon: number | null
}

export interface Position {
  lat: number
  lon: number
}

export interface LocationError extends Error {
  code?: number
}
