import type { LogEntry } from "@/lib/types"

/**
 * Service for managing log entries
 */
class LogEntryService {
  /**
   * Load sample data from the public directory
   * Uses relative path that works with GitHub Pages
   */
  async loadSampleData(): Promise<LogEntry[]> {
    try {
      const response = await fetch("/test-ictconscript-admission/sample-data/entries.json")

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: LogEntry[] = await response.json()

      // Sort entries by date (newest first)
      return data.sort((a, b) => new Date(b.isoTime).getTime() - new Date(a.isoTime).getTime())
    } catch (error) {
      console.error("Failed to load sample data:", error)
      throw error
    }
  }

  /**
   * Create a new log entry with generated ID and timestamp
   */
  createEntry(entryData: Omit<LogEntry, "id" | "isoTime">, existingEntries: LogEntry[]): LogEntry {
    // Generate new ID based on existing entries
    const maxId = existingEntries.length > 0 ? Math.max(...existingEntries.map((e) => Number.parseInt(e.id) || 0)) : 0

    return {
      ...entryData,
      id: (maxId + 1).toString(),
      isoTime: new Date().toISOString(),
    }
  }

  /**
   * Validate log entry data
   */
  validateEntry(entry: Partial<LogEntry>): boolean {
    return !!(entry.title?.trim() && entry.body?.trim())
  }
}

export const logEntryService = new LogEntryService()
