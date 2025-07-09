"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Radio } from "lucide-react"
import { AddEntryModal } from "@/components/add-entry-modal"
import { LogEntryCard } from "@/components/log-entry-card"
import { LoadingSpinner } from "@/components/loading-spinner"
import { EmptyState } from "@/components/empty-state"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TEXTS } from "@/lib/constants"
import type { LogEntry } from "@/lib/types"
import { logEntryService } from "@/lib/services/log-entry-service"

export default function UnitLogbook() {
  const [entries, setEntries] = useState<LogEntry[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadEntries()
  }, [])

  const loadEntries = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await logEntryService.loadSampleData()
      setEntries(data)
    } catch (err) {
      console.error("Error loading entries:", err)
      setError(TEXTS.errors.loadFailed)
    } finally {
      setLoading(false)
    }
  }

  const handleAddEntry = (newEntry: Omit<LogEntry, "id" | "isoTime">) => {
    const entry = logEntryService.createEntry(newEntry, entries)
    setEntries((prev) => [entry, ...prev])
    setIsModalOpen(false)
  }

  if (loading) {
    return <LoadingSpinner message={TEXTS.loading.entries} />
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Radio className="h-12 w-12 mx-auto mb-4 text-red-500" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">{TEXTS.errors.title}</h3>
          <p className="text-slate-500 mb-4">{error}</p>
          <Button onClick={loadEntries}>{TEXTS.actions.retry}</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header entryCount={entries.length} />

      <main className="flex-1 max-w-4xl mx-auto px-4 py-8">
        {/* Add Entry Button */}
        <div className="mb-8">
          <Button onClick={() => setIsModalOpen(true)} size="lg" className="bg-slate-900 hover:bg-slate-800 text-white">
            <Plus className="h-5 w-5 mr-2" />
            {TEXTS.actions.newEntry}
          </Button>
        </div>

        {/* Entries List */}
        {entries.length > 0 ? (
          <div className="space-y-4">
            {entries.map((entry) => (
              <LogEntryCard key={entry.id} entry={entry} />
            ))}
          </div>
        ) : (
          <EmptyState onAddEntry={() => setIsModalOpen(true)} />
        )}
      </main>

      <Footer />

      {/* Add Entry Modal */}
      <AddEntryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddEntry} />
    </div>
  )
}
