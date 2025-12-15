"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Calendar,
  Clock,
  User,
  Plus,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit,
  Trash2,
  Loader2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { BookingCardSkeleton, TimeSlotCardSkeleton, StatCardSkeleton } from "@/components/skeleton-loader"

interface Booking {
  id: string
  studentName: string
  studentEmail: string
  date: string
  time: string
  status: "pending" | "confirmed" | "cancelled"
  note?: string
}

interface TimeSlot {
  id: string
  date: string
  time: string
  duration: number
  available: boolean
  bookingId?: string
}

const mockBookings: Booking[] = [
  {
    id: "1",
    studentName: "Alice Johnson",
    studentEmail: "alice@university.edu",
    date: "2024-01-15",
    time: "10:00 AM",
    status: "pending",
    note: "Would like to discuss research opportunities in ML",
  },
  {
    id: "2",
    studentName: "Bob Smith",
    studentEmail: "bob@university.edu",
    date: "2024-01-15",
    time: "2:00 PM",
    status: "confirmed",
    note: "Career guidance needed",
  },
  {
    id: "3",
    studentName: "Carol Davis",
    studentEmail: "carol@university.edu",
    date: "2024-01-16",
    time: "11:00 AM",
    status: "confirmed",
  },
]

const mockTimeSlots: TimeSlot[] = [
  { id: "1", date: "2024-01-15", time: "10:00 AM", duration: 30, available: false, bookingId: "1" },
  { id: "2", date: "2024-01-15", time: "11:00 AM", duration: 30, available: true },
  { id: "3", date: "2024-01-15", time: "2:00 PM", duration: 30, available: false, bookingId: "2" },
  { id: "4", date: "2024-01-15", time: "3:00 PM", duration: 30, available: true },
  { id: "5", date: "2024-01-16", time: "10:00 AM", duration: 30, available: true },
  { id: "6", date: "2024-01-16", time: "11:00 AM", duration: 30, available: false, bookingId: "3" },
  { id: "7", date: "2024-01-16", time: "2:00 PM", duration: 30, available: true },
  { id: "8", date: "2024-01-17", time: "10:00 AM", duration: 30, available: true },
]

export function ProfessorDashboard() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings)
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(mockTimeSlots)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isAddSlotOpen, setIsAddSlotOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isActionLoading, setIsActionLoading] = useState<string | null>(null)

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.studentEmail.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleApproveBooking = async (bookingId: string) => {
    setIsActionLoading(bookingId)
    setBookings((prev) =>
      prev.map((booking) => (booking.id === bookingId ? { ...booking, status: "confirmed" as const } : booking)),
    )
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    setIsActionLoading(null)
  }

  const handleCancelBooking = async (bookingId: string) => {
    setIsActionLoading(bookingId)
    setBookings((prev) =>
      prev.map((booking) => (booking.id === bookingId ? { ...booking, status: "cancelled" as const } : booking)),
    )
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    setIsActionLoading(null)
  }

  const handleDeleteTimeSlot = (slotId: string) => {
    setTimeSlots((prev) => prev.filter((slot) => slot.id !== slotId))
  }

  const handleToggleAvailability = (slotId: string) => {
    setTimeSlots((prev) => prev.map((slot) => (slot.id === slotId ? { ...slot, available: !slot.available } : slot)))
  }

  const pendingCount = bookings.filter((b) => b.status === "pending").length
  const confirmedCount = bookings.filter((b) => b.status === "confirmed").length
  const availableSlots = timeSlots.filter((s) => s.available).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground">Schedule Dashboard</h2>
        <p className="mt-2 text-pretty text-muted-foreground leading-relaxed">
          Manage your availability and student consultations
        </p>
      </div>

      {/* Stats Overview */}
      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
              <AlertCircle className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{pendingCount}</div>
              <p className="text-xs text-muted-foreground">Awaiting your response</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Confirmed Sessions</CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{confirmedCount}</div>
              <p className="text-xs text-muted-foreground">Scheduled this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Slots</CardTitle>
              <Calendar className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{availableSlots}</div>
              <p className="text-xs text-muted-foreground">Open for booking</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content Tabs */}
      <Tabs defaultValue="bookings" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="schedule">My Schedule</TabsTrigger>
        </TabsList>

        {/* Bookings Tab */}
        <TabsContent value="bookings" className="space-y-4">
          {/* Search and Filter */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by student name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bookings List */}
          <div className="space-y-4">
            {isLoading ? (
              <>
                {Array.from({ length: 3 }).map((_, i) => (
                  <BookingCardSkeleton key={i} />
                ))}
              </>
            ) : filteredBookings.length === 0 ? (
              <Card className="p-12 text-center">
                <Calendar className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <p className="text-muted-foreground">No bookings found</p>
              </Card>
            ) : (
              filteredBookings.map((booking) => (
                <Card key={booking.id} className="overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    <div className="flex-1 p-6">
                      <div className="mb-4 flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback>
                              <User className="h-6 w-6" />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-foreground">{booking.studentName}</h3>
                            <p className="text-sm text-muted-foreground">{booking.studentEmail}</p>
                          </div>
                        </div>
                        <Badge
                          variant={
                            booking.status === "confirmed"
                              ? "default"
                              : booking.status === "pending"
                                ? "secondary"
                                : "outline"
                          }
                          className={cn(
                            booking.status === "confirmed" && "bg-success text-success-foreground",
                            booking.status === "pending" && "bg-warning text-warning-foreground",
                            booking.status === "cancelled" && "bg-muted text-muted-foreground",
                          )}
                        >
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </Badge>
                      </div>

                      <div className="mb-4 flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{booking.time}</span>
                        </div>
                      </div>

                      {booking.note && (
                        <div className="rounded-lg bg-muted/50 p-3">
                          <p className="text-sm text-foreground">
                            <span className="font-medium">Note: </span>
                            {booking.note}
                          </p>
                        </div>
                      )}

                      {booking.status === "pending" && (
                        <div className="mt-4 flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleApproveBooking(booking.id)}
                            disabled={isActionLoading === booking.id}
                            className="gap-2"
                          >
                            {isActionLoading === booking.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <CheckCircle className="h-4 w-4" />
                            )}
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCancelBooking(booking.id)}
                            disabled={isActionLoading === booking.id}
                            className="gap-2 text-destructive hover:text-destructive"
                          >
                            <XCircle className="h-4 w-4" />
                            Decline
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        {/* Schedule Tab */}
        <TabsContent value="schedule" className="space-y-4">
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Time Slots</h3>
              <p className="text-sm text-muted-foreground">Manage your availability for student consultations</p>
            </div>
            <Dialog open={isAddSlotOpen} onOpenChange={setIsAddSlotOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Slot
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Time Slot</DialogTitle>
                  <DialogDescription>Create a new available time slot for student bookings</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Input id="time" type="time" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Select defaultValue="30">
                      <SelectTrigger id="duration">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddSlotOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddSlotOpen(false)}>Create Slot</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <TimeSlotCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {timeSlots.map((slot) => (
                <Card key={slot.id} className={cn("p-4", !slot.available && "bg-muted/30")}>
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "flex h-12 w-12 items-center justify-center rounded-lg",
                          slot.available ? "bg-accent/10" : "bg-muted",
                        )}
                      >
                        <Clock className={cn("h-6 w-6", slot.available ? "text-accent" : "text-muted-foreground")} />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{slot.time}</p>
                        <p className="text-sm text-muted-foreground">{slot.date}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3 flex items-center justify-between">
                    <Badge variant={slot.available ? "default" : "secondary"} className="text-xs">
                      {slot.available ? "Available" : "Booked"}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{slot.duration} min</span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 gap-2 bg-transparent"
                      onClick={() => handleToggleAvailability(slot.id)}
                    >
                      <Edit className="h-3 w-3" />
                      Toggle
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteTimeSlot(slot.id)}
                      className="gap-2 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
