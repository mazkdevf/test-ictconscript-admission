import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Clock } from "lucide-react"
import { MapThumbnail } from "@/components/map-thumbnail"
import { formatDateTime } from "@/lib/utils"
import type { LogEntry } from "@/lib/types"

interface LogEntryCardProps {
  entry: LogEntry
}

export function LogEntryCard({ entry }: LogEntryCardProps) {
  const hasLocation = entry.lat !== null && entry.lon !== null

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold text-slate-900">{entry.title}</CardTitle>
          <div className="flex items-center space-x-4 text-sm text-slate-500">
            {hasLocation && (
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>
                  {entry.lat!.toFixed(4)}, {entry.lon!.toFixed(4)}
                </span>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{formatDateTime(entry.isoTime)}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <div className="flex-1">
            <p className="text-slate-700 whitespace-pre-wrap">{entry.body}</p>
          </div>
          {hasLocation && (
            <div className="flex-shrink-0">
              <MapThumbnail lat={entry.lat!} lon={entry.lon!} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
