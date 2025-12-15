"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Search, User, CheckCircle2, ArrowLeft, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { ProfessorCardSkeleton, TimeSlotCardSkeleton } from "@/components/skeleton-loader"

type BookingStep = "select-professor" | "select-time" | "confirm"

interface Professor {
  id: string
  name: string
  department: string
  expertise: string[]
  avatar?: string
  availability: TimeSlot[]
}

interface TimeSlot {
  id: string
  date: string
  time: string
  available: boolean
}

// Mock data
const professors: Professor[] = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    department: "Computer Science",
    expertise: ["Machine Learning", "Data Science", "AI Research"],
    avatar: "/diverse-professor-lecturing.png",
    availability: [
      { id: "1", date: "2024-01-15", time: "10:00 AM", available: true },
      { id: "2", date: "2024-01-15", time: "2:00 PM", available: true },
      { id: "3", date: "2024-01-16", time: "11:00 AM", available: true },
    ],
  },
  {
    id: "2",
    name: "Prof. Michael Park",
    department: "Business Administration",
    expertise: ["Entrepreneurship", "Strategy", "Marketing"],
    avatar: "/diverse-professor-lecturing.png",
    availability: [
      { id: "4", date: "2024-01-15", time: "1:00 PM", available: true },
      { id: "5", date: "2024-01-16", time: "3:00 PM", available: true },
    ],
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    department: "Psychology",
    expertise: ["Clinical Psychology", "Behavioral Science", "Mental Health"],
    avatar: "/diverse-professor-lecturing.png",
    availability: [
      { id: "6", date: "2024-01-15", time: "9:00 AM", available: true },
      { id: "7", date: "2024-01-16", time: "10:00 AM", available: true },
      { id: "8", date: "2024-01-17", time: "2:00 PM", available: true },
    ],
  },
]

export function StudentBookingFlow() {
  const [step, setStep] = useState<BookingStep>("select-professor")
  const [selectedProfessor, setSelectedProfessor] = useState<Professor | null>(null)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [bookingNote, setBookingNote] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const filteredProfessors = professors.filter(
    (prof) =>
      prof.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prof.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prof.expertise.some((exp) => exp.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleProfessorSelect = (professor: Professor) => {
    setSelectedProfessor(professor)
    setStep("select-time")
  }

  const handleTimeSlotSelect = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot)
    setStep("confirm")
  }

  const handleConfirmBooking = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsConfirmed(true)
  }

  const handleBack = () => {
    if (step === "select-time") {
      setStep("select-professor")
      setSelectedProfessor(null)
    } else if (step === "confirm") {
      setStep("select-time")
      setSelectedTimeSlot(null)
    }
  }

  const handleNewBooking = () => {
    setStep("select-professor")
    setSelectedProfessor(null)
    setSelectedTimeSlot(null)
    setBookingNote("")
    setIsConfirmed(false)
  }

  // Success state
  if (isConfirmed) {
    return (
      <Card className="p-8 text-center md:p-12">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
          <CheckCircle2 className="h-12 w-12 text-success" />
        </div>
        <h3 className="mb-2 text-2xl font-bold text-foreground">Booking Confirmed!</h3>
        <p className="mb-6 text-muted-foreground leading-relaxed">
          Your consultation session with {selectedProfessor?.name} on {selectedTimeSlot?.date} at{" "}
          {selectedTimeSlot?.time} has been confirmed. You'll receive a confirmation email shortly.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={handleNewBooking}>Book Another Session</Button>
          <Button variant="outline" asChild>
            <a href="/student/bookings">View My Bookings</a>
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <nav aria-label="Booking progress">
        <ol className="flex items-center justify-center gap-2">
          <li>
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold",
                step === "select-professor" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
              )}
              aria-current={step === "select-professor" ? "step" : undefined}
            >
              <span className="sr-only">Step </span>1
            </div>
          </li>
          <li>
            <div
              className={cn("h-1 w-16 rounded", step !== "select-professor" ? "bg-primary" : "bg-muted")}
              role="presentation"
            />
          </li>
          <li>
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold",
                step === "select-time"
                  ? "bg-primary text-primary-foreground"
                  : step === "confirm"
                    ? "bg-muted text-muted-foreground"
                    : "bg-muted text-muted-foreground",
              )}
              aria-current={step === "select-time" ? "step" : undefined}
            >
              <span className="sr-only">Step </span>2
            </div>
          </li>
          <li>
            <div
              className={cn("h-1 w-16 rounded", step === "confirm" ? "bg-primary" : "bg-muted")}
              role="presentation"
            />
          </li>
          <li>
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold",
                step === "confirm" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
              )}
              aria-current={step === "confirm" ? "step" : undefined}
            >
              <span className="sr-only">Step </span>3
            </div>
          </li>
        </ol>
      </nav>

      {/* Back button */}
      {step !== "select-professor" && (
        <Button variant="ghost" size="sm" onClick={handleBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back
        </Button>
      )}

      {/* Step 1: Select Professor */}
      {step === "select-professor" && (
        <section aria-labelledby="select-professor-heading">
          <h2 id="select-professor-heading" className="sr-only">
            Select a professor
          </h2>
          <div className="space-y-6">
            <div className="relative">
              <Label htmlFor="professor-search" className="sr-only">
                Search professors
              </Label>
              <Search
                className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                id="professor-search"
                placeholder="Search professors by name, department, or expertise..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {isLoading ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="status" aria-live="polite">
                <span className="sr-only">Loading professors...</span>
                {Array.from({ length: 6 }).map((_, i) => (
                  <ProfessorCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProfessors.length === 0 ? (
                  <p className="col-span-full text-center text-muted-foreground">No professors found</p>
                ) : (
                  filteredProfessors.map((professor) => (
                    <Card
                      key={professor.id}
                      className="cursor-pointer p-6 transition-all hover:border-primary hover:shadow-md focus-within:ring-2 focus-within:ring-ring"
                      onClick={() => handleProfessorSelect(professor)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault()
                          handleProfessorSelect(professor)
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label={`Select ${professor.name}, ${professor.department}, ${professor.availability.length} slots available`}
                    >
                      <div className="mb-4 flex items-start gap-4">
                        <Avatar className="h-14 w-14">
                          <AvatarImage src={professor.avatar || "/placeholder.svg"} alt="" />
                          <AvatarFallback>
                            <User className="h-6 w-6" aria-hidden="true" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <h3 className="truncate font-semibold text-foreground">{professor.name}</h3>
                          <p className="text-sm text-muted-foreground">{professor.department}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {professor.expertise.slice(0, 2).map((exp) => (
                          <Badge key={exp} variant="secondary" className="text-xs">
                            {exp}
                          </Badge>
                        ))}
                        {professor.expertise.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{professor.expertise.length - 2} more
                          </Badge>
                        )}
                      </div>
                      <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" aria-hidden="true" />
                        <span>{professor.availability.length} slots available</span>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Step 2: Select Time Slot */}
      {step === "select-time" && selectedProfessor && (
        <section aria-labelledby="select-time-heading">
          <h2 id="select-time-heading" className="sr-only">
            Select a time slot
          </h2>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={selectedProfessor.avatar || "/placeholder.svg"} alt={selectedProfessor.name} />
                <AvatarFallback>
                  <User className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold text-foreground">{selectedProfessor.name}</h3>
                <p className="text-muted-foreground">{selectedProfessor.department}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedProfessor.expertise.map((exp) => (
                    <Badge key={exp} variant="secondary" className="text-xs">
                      {exp}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-foreground">Available Time Slots</h3>
            {isLoading ? (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <TimeSlotCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {selectedProfessor.availability.map((slot) => (
                  <Card
                    key={slot.id}
                    className={cn(
                      "cursor-pointer p-4 transition-all",
                      slot.available ? "hover:border-accent hover:shadow-md" : "cursor-not-allowed opacity-50",
                    )}
                    onClick={() => slot.available && handleTimeSlotSelect(slot)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        slot.available && handleTimeSlotSelect(slot)
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`Select ${slot.time} on ${slot.date}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                        <Clock className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{slot.time}</p>
                        <p className="text-sm text-muted-foreground">{slot.date}</p>
                      </div>
                    </div>
                    {slot.available && (
                      <Badge className="mt-3 w-full justify-center" variant="outline">
                        Available
                      </Badge>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Step 3: Confirm Booking */}
      {step === "confirm" && selectedProfessor && selectedTimeSlot && (
        <section aria-labelledby="confirm-booking-heading">
          <h2 id="confirm-booking-heading" className="sr-only">
            Confirm your booking
          </h2>
          <Card className="p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Booking Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={selectedProfessor.avatar || "/placeholder.svg"} alt={selectedProfessor.name} />
                  <AvatarFallback>
                    <User className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-foreground">{selectedProfessor.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedProfessor.department}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-4">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Date & Time</p>
                  <p className="font-medium text-foreground">
                    {selectedTimeSlot.date} at {selectedTimeSlot.time}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="note">Meeting Note (Optional)</Label>
                <Textarea
                  id="note"
                  placeholder="Add any topics or questions you'd like to discuss..."
                  value={bookingNote}
                  onChange={(e) => setBookingNote(e.target.value)}
                  rows={4}
                  className="mt-2"
                />
              </div>
            </div>
          </Card>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button variant="outline" onClick={handleBack} disabled={isSubmitting}>
              Go Back
            </Button>
            <Button onClick={handleConfirmBooking} disabled={isSubmitting} className="gap-2" size="lg">
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Confirming...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-5 w-5" />
                  Confirm Booking
                </>
              )}
            </Button>
          </div>
        </section>
      )}
    </div>
  )
}
