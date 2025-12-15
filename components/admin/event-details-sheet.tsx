"use client"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, Clock, MapPin, Users, Edit, Trash2, Copy, CheckCircle, XCircle } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface EventDetailsSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  eventId?: string
}

export function EventDetailsSheet({ open, onOpenChange }: EventDetailsSheetProps) {
  // Mock data - would come from props or API
  const event = {
    id: "evt-001",
    title: "Thesis Consultation Session",
    professor: "Prof. Kim",
    category: "Thesis",
    department: "Computer Science",
    date: "Dec 20, 2024",
    location: "Room 305, Building A",
    description:
      "Individual consultation session for thesis guidance, research methodology, and progress review. Students can discuss their research topics, methodology, and get feedback on their work.",
    duration: 30,
    capacity: 1,
    status: "active",
    totalSlots: 8,
    bookedSlots: 5,
    waitlist: 2,
  }

  const bookings = [
    { id: 1, student: "김민수", time: "09:00", status: "confirmed", attended: true },
    { id: 2, student: "이지은", time: "09:30", status: "confirmed", attended: true },
    { id: 3, student: "박준형", time: "10:00", status: "confirmed", attended: null },
    { id: 4, student: "최서연", time: "10:30", status: "confirmed", attended: null },
    { id: 5, student: "정하은", time: "11:00", status: "confirmed", attended: null },
  ]

  const availableSlots = [
    { id: 1, time: "11:30", available: true },
    { id: 2, time: "13:00", available: true },
    { id: 3, time: "13:30", available: true },
  ]

  const waitlistStudents = [
    { id: 1, student: "강지호", position: 1, requestedTime: "09:00" },
    { id: 2, student: "윤서아", position: 2, requestedTime: "10:00" },
  ]

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{event.title}</SheetTitle>
          <SheetDescription>Event ID: {event.id}</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Status and Quick Actions */}
          <div className="flex items-center justify-between">
            <Badge variant={event.status === "active" ? "default" : "secondary"} className="text-sm">
              {event.status}
            </Badge>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button variant="outline" size="sm">
                <Copy className="mr-2 h-4 w-4" />
                Duplicate
              </Button>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Event Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <div className="flex items-center gap-3 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Professor:</span>
                  <span className="font-medium">{event.professor}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-medium">{event.date}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Location:</span>
                  <span className="font-medium">{event.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">{event.duration} minutes</span>
                </div>
              </div>
              <Separator />
              <div>
                <p className="text-sm font-medium mb-2">Description</p>
                <p className="text-sm text-muted-foreground">{event.description}</p>
              </div>
              <Separator />
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-foreground">{event.bookedSlots}</p>
                  <p className="text-xs text-muted-foreground">Booked</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{event.totalSlots - event.bookedSlots}</p>
                  <p className="text-xs text-muted-foreground">Available</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{event.waitlist}</p>
                  <p className="text-xs text-muted-foreground">Waitlist</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs for Bookings, Slots, Waitlist */}
          <Tabs defaultValue="bookings" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="bookings">Bookings ({bookings.length})</TabsTrigger>
              <TabsTrigger value="slots">Available ({availableSlots.length})</TabsTrigger>
              <TabsTrigger value="waitlist">Waitlist ({waitlistStudents.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="bookings" className="space-y-3">
              {bookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{booking.student[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{booking.student}</p>
                        <p className="text-sm text-muted-foreground">{booking.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {booking.attended === null ? (
                        <>
                          <Button variant="outline" size="sm">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Mark Attended
                          </Button>
                          <Button variant="outline" size="sm">
                            <XCircle className="mr-1 h-3 w-3" />
                            No-show
                          </Button>
                        </>
                      ) : booking.attended ? (
                        <Badge variant="default" className="bg-success">
                          Attended
                        </Badge>
                      ) : (
                        <Badge variant="destructive">No-show</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="slots" className="space-y-3">
              {availableSlots.map((slot) => (
                <Card key={slot.id}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div>
                      <p className="font-medium">{slot.time}</p>
                      <p className="text-sm text-muted-foreground">Available</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Block Slot
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="waitlist" className="space-y-3">
              {waitlistStudents.map((student) => (
                <Card key={student.id}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-medium">
                        #{student.position}
                      </div>
                      <div>
                        <p className="font-medium">{student.student}</p>
                        <p className="text-sm text-muted-foreground">Requested: {student.requestedTime}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Assign Slot
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  )
}
