"use client"

import { Button } from "@/components/ui/button"
import { Radio, Plus } from "lucide-react"
import { TEXTS } from "@/lib/constants"

interface EmptyStateProps {
  onAddEntry: () => void
}

export function EmptyState({ onAddEntry }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <Radio className="h-12 w-12 mx-auto mb-4 text-slate-400" />
      <h3 className="text-lg font-medium text-slate-900 mb-2">{TEXTS.empty.title}</h3>
      <p className="text-slate-500 mb-4">{TEXTS.empty.description}</p>
      <Button onClick={onAddEntry}>
        <Plus className="h-4 w-4 mr-2" />
        {TEXTS.empty.action}
      </Button>
    </div>
  )
}
