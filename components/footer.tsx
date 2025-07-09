import { Github, User, Code } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-100 border-t border-slate-200 mt-12">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4 text-sm text-slate-600">
            <div className="flex items-center space-x-1">
              <Code className="h-4 w-4" />
              <span>UI Frontend Prototype</span>
            </div>
            <div className="hidden sm:block">•</div>
            <div className="flex items-center space-x-1">
              <span>C5School Project</span>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-sm text-slate-600">
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>Under Markus K.</span>
            </div>
            <div className="flex items-center space-x-1">
              <Github className="h-4 w-4" />
              <a
                href="https://github.com/mazkdevf"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-900 transition-colors"
              >
                mazkdevf
              </a>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-200 text-center">
          <p className="text-xs text-slate-500">
            This is a demonstration prototype for the ICT Conscript Admission Test - Frontend Development Task
          </p>
        </div>
      </div>
    </footer>
  )
}
