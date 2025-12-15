import { StudentBookingFlow } from "@/components/student-booking-flow"
import { Calendar } from "lucide-react"
import Link from "next/link"

export default function StudentPage() {
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
              <Link href="/student/bookings" className="text-sm text-muted-foreground hover:text-foreground">
                My Bookings
              </Link>
              <Link href="/profile" className="text-sm text-muted-foreground hover:text-foreground">
                Profile
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8" id="main-content">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground">Book a Consultation</h1>
            <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
              Choose a professor and available time slot to schedule your session
            </p>
          </div>
          <StudentBookingFlow />
        </div>
      </main>
    </div>
  )
}
