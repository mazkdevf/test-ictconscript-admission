"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MapPin, Loader2, AlertCircle } from "lucide-react"
import { TEXTS } from "@/lib/constants"
import { locationService } from "@/lib/services/location-service"
import type { LogEntry } from "@/lib/types"

interface AddEntryModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (entry: Omit<LogEntry, "id" | "isoTime">) => void
}

export function AddEntryModal({ isOpen, onClose, onSubmit }: AddEntryModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    lat: "",
    lon: "",
  })
  const [isGettingLocation, setIsGettingLocation] = useState(false)
  const [locationError, setLocationError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim() || !formData.body.trim()) {
      return
    }

    onSubmit({
      title: formData.title.trim(),
      body: formData.body.trim(),
      lat: formData.lat ? Number.parseFloat(formData.lat) : null,
      lon: formData.lon ? Number.parseFloat(formData.lon) : null,
    })

    resetForm()
  }

  const resetForm = () => {
    setFormData({ title: "", body: "", lat: "", lon: "" })
    setLocationError(null)
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const handleGetCurrentLocation = async () => {
    setIsGettingLocation(true)
    setLocationError(null)

    try {
      // Try cached position first, then current position
      const position = await locationService.getCachedOrCurrentPosition()
      setFormData((prev) => ({
        ...prev,
        lat: position.lat.toFixed(6),
        lon: position.lon.toFixed(6),
      }))
    } catch (error) {
      console.error("Location error:", error)

      // Provide more helpful error message
      let errorMessage = locationService.getErrorMessage(error)

      // Add helpful tips for timeout errors
      if (error instanceof Error && "code" in error && (error as any).code === 3) {
        errorMessage += " Try moving outdoors or enter coordinates manually."
      }

      setLocationError(errorMessage)
    } finally {
      setIsGettingLocation(false)
    }
  }

  const updateFormData = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const isFormValid = formData.title.trim() && formData.body.trim()

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{TEXTS.modal.title}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">{TEXTS.form.title} *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => updateFormData("title", e.target.value)}
              placeholder={TEXTS.form.titlePlaceholder}
              maxLength={120}
              required
            />
            <p className="text-xs text-slate-500 mt-1">
              {formData.title.length}/120 {TEXTS.form.characters}
            </p>
          </div>

          <div>
            <Label htmlFor="body">{TEXTS.form.body} *</Label>
            <Textarea
              id="body"
              value={formData.body}
              onChange={(e) => updateFormData("body", e.target.value)}
              placeholder={TEXTS.form.bodyPlaceholder}
              rows={4}
              required
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>{TEXTS.form.location}</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleGetCurrentLocation}
                disabled={isGettingLocation}
                className="text-xs bg-transparent"
              >
                {isGettingLocation ? (
                  <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                ) : (
                  <MapPin className="h-3 w-3 mr-1" />
                )}
                {isGettingLocation ? TEXTS.form.gettingLocation : TEXTS.form.useGps}
              </Button>
            </div>

            {locationError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{locationError}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="lat" className="text-xs">
                  {TEXTS.form.latitude}
                </Label>
                <Input
                  id="lat"
                  type="number"
                  step="any"
                  value={formData.lat}
                  onChange={(e) => updateFormData("lat", e.target.value)}
                  placeholder="60.1503"
                />
              </div>
              <div>
                <Label htmlFor="lon" className="text-xs">
                  {TEXTS.form.longitude}
                </Label>
                <Input
                  id="lon"
                  type="number"
                  step="any"
                  value={formData.lon}
                  onChange={(e) => updateFormData("lon", e.target.value)}
                  placeholder="25.0293"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              {TEXTS.actions.cancel}
            </Button>
            <Button type="submit" disabled={!isFormValid} className="bg-slate-900 hover:bg-slate-800">
              {TEXTS.actions.addEntry}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
