import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card" role="banner">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-6 w-6 text-primary" aria-hidden="true" />
              <h1 className="text-xl font-semibold text-foreground">Campus Booking</h1>
            </div>
            <nav className="flex items-center gap-2" aria-label="Main navigation">
              <Button variant="ghost" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link href="/student">Get Started</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24" id="main-content">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            Book consultation sessions with professors
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            Connect with faculty members for academic guidance, career advice, and research opportunities. Simple, fast,
            and designed for mobile.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <Link href="/student">
                Book a Session
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full bg-transparent sm:w-auto" asChild>
              <Link href="/professor">For Professors</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-muted/30 py-16" aria-labelledby="features-heading">
        <div className="container mx-auto px-4">
          <h2 id="features-heading" className="sr-only">
            Features
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <article className="flex flex-col items-center text-center">
              <div
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-accent text-accent-foreground"
                aria-hidden="true"
              >
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">Easy Scheduling</h3>
              <p className="leading-relaxed text-muted-foreground">
                View available time slots and book in seconds. Mobile-optimized for students on the go.
              </p>
            </article>
            <article className="flex flex-col items-center text-center">
              <div
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-primary text-primary-foreground"
                aria-hidden="true"
              >
                <User className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">Professor Profiles</h3>
              <p className="leading-relaxed text-muted-foreground">
                Explore faculty expertise, research areas, and consultation topics before booking.
              </p>
            </article>
            <article className="flex flex-col items-center text-center">
              <div
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-success text-success-foreground"
                aria-hidden="true"
              >
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">Real-time Updates</h3>
              <p className="leading-relaxed text-muted-foreground">
                Get instant confirmations and reminders. Never miss an important meeting.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8" role="contentinfo">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">© 2025 Campus Booking. All rights reserved.</p>
            <nav className="flex gap-6" aria-label="Footer navigation">
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}
