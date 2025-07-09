import { Badge } from "@/components/ui/badge"
import { Radio, Github, User } from "lucide-react"
import { TEXTS } from "@/lib/constants"

interface HeaderProps {
  entryCount: number
}

export function Header({ entryCount }: HeaderProps) {
  return (
    <header className="bg-slate-900 text-white shadow-lg">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Radio className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">{TEXTS.app.title}</h1>
              <p className="text-slate-300 text-sm">{TEXTS.app.subtitle}</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-green-900 text-green-100 border-green-700">
            {entryCount} {TEXTS.app.entriesCount}
          </Badge>
        </div>
      </div>
    </header>
  )
}
