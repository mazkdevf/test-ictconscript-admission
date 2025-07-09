import { TEXTS } from "@/lib/constants"
import type { Position, LocationError } from "@/lib/types"

/**
 * Service for handling geolocation functionality
 */
class LocationService {
  /**
   * Get current position using browser geolocation API
   * Returns a promise that resolves with coordinates
   */
  async getCurrentPosition(): Promise<Position> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error(TEXTS.errors.locationNotSupported))
        return
      }

      // First try with high accuracy but shorter timeout
      const highAccuracyOptions: PositionOptions = {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 30000,
      }

      // Fallback options with lower accuracy but longer timeout
      const fallbackOptions: PositionOptions = {
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 60000,
      }

      // Try high accuracy first
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          })
        },
        (error) => {
          // If high accuracy fails due to timeout, trying with lower accuracy
          if (error.code === 3) {
            console.log("Higher GPS timed out, trying with lower accuracy...")

            navigator.geolocation.getCurrentPosition(
              (position) => {
                resolve({
                  lat: position.coords.latitude,
                  lon: position.coords.longitude,
                })
              },
              (fallbackError) => {
                console.error("Both GPS attempts failed:", fallbackError)
                reject(fallbackError)
              },
              fallbackOptions,
            )
          } else {
            reject(error)
          }
        },
        highAccuracyOptions,
      )
    })
  }

  /**
   * Convert geolocation error to user-friendly message
   */
  getErrorMessage(error: unknown): string {
    if (error instanceof Error && "code" in error) {
      const locationError = error as LocationError

      switch (locationError.code) {
        case 1: // PERMISSION_DENIED
          return TEXTS.errors.locationPermissionDenied
        case 2: // POSITION_UNAVAILABLE
          return TEXTS.errors.locationUnavailable
        case 3: // TIMEOUT
          return TEXTS.errors.locationTimeout
        default:
          return TEXTS.errors.locationUnknown
      }
    }

    return error instanceof Error ? error.message : TEXTS.errors.locationUnknown
  }

  /**
   * Check if geolocation is supported
   */
  isSupported(): boolean {
    return "geolocation" in navigator
  }

  /**
   * Get cached position if available, otherwise get current position
   */
  async getCachedOrCurrentPosition(): Promise<Position> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error(TEXTS.errors.locationNotSupported))
        return
      }

      // Try to get cached position first (up to 5 minutes old)
      const cachedOptions: PositionOptions = {
        enableHighAccuracy: false,
        timeout: 3000,
        maximumAge: 300000,
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          })
        },
        async (error) => {
          try {
            const position = await this.getCurrentPosition()
            resolve(position)
          } catch (fullError) {
            reject(fullError)
          }
        },
        cachedOptions,
      )
    })
  }
}

export const locationService = new LocationService()
