export const TEXTS = {
  app: {
    title: "C5School - Unit Logbook",
    subtitle: "Field Operations Log",
    entriesCount: "entries",
  },
  loading: {
    entries: "Loading log entries...",
    location: "Getting location...",
  },
  errors: {
    title: "Error",
    loadFailed: "Failed to load log entries",
    locationNotSupported: "Geolocation is not supported by this browser",
    locationPermissionDenied: "Location permission denied",
    locationUnavailable: "Location information is unavailable",
    locationTimeout: "Location request timed out",
    locationUnknown: "An unknown location error occurred",
  },
  actions: {
    newEntry: "New Entry",
    addEntry: "Add Entry",
    cancel: "Cancel",
    retry: "Try Again",
  },
  modal: {
    title: "New Log Entry",
  },
  form: {
    title: "Title",
    titlePlaceholder: "Brief description of the event",
    body: "Details",
    bodyPlaceholder: "Detailed description of what happened...",
    location: "Location (Optional)",
    latitude: "Latitude",
    longitude: "Longitude",
    useGps: "Use GPS",
    gettingLocation: "Getting...",
    characters: "characters",
  },
  empty: {
    title: "No entries yet",
    description: "Start logging your unit's activities",
    action: "Add First Entry",
  },
} as const
