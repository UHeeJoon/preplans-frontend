import { ProfessorDashboard } from "@/components/professor-dashboard"
import { Calendar } from "lucide-react"
import Link from "next/link"

export default function ProfessorPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80"
        role="banner"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Calendar className="h-6 w-6 text-primary" aria-hidden="true" />
              <span className="text-xl font-semibold text-foreground">Campus Booking</span>
            </Link>
            <nav className="flex items-center gap-4" aria-label="Main navigation">
              <Link href="/professor/profile" className="text-sm text-muted-foreground hover:text-foreground">
                Profile
              </Link>
              <Link href="/professor/settings" className="text-sm text-muted-foreground hover:text-foreground">
                Settings
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8" id="main-content">
        <ProfessorDashboard />
      </main>
    </div>
  )
}
