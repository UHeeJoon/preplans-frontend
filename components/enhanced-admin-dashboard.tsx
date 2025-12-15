"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LayoutDashboard,
  Calendar,
  Users,
  ClipboardList,
  Settings,
  Bell,
  FileText,
  Search,
  Plus,
  Filter,
  Download,
  MoreVertical,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  XCircle,
  Upload,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CreateEventDialog } from "./admin/create-event-dialog"
import { EventDetailsSheet } from "./admin/event-details-sheet"
import { UserFormDialog } from "./admin/user-form-dialog"
import { ReportGeneratorDialog } from "./admin/report-generator-dialog"
import { NotificationSettingsDialog } from "./admin/notification-settings-dialog"
import { GroupManagementDialog } from "./admin/group-management-dialog"
import { SurveyResultsSheet } from "./admin/survey-results-sheet"
import Link from "next/link"

const stats = [
  {
    label: "Total Events",
    value: "247",
    change: "+12.5%",
    trend: "up",
    icon: Calendar,
    color: "text-chart-1",
  },
  {
    label: "Active Bookings",
    value: "1,842",
    change: "+8.2%",
    trend: "up",
    icon: CheckCircle2,
    color: "text-chart-3",
  },
  {
    label: "Total Users",
    value: "3,456",
    change: "+5.7%",
    trend: "up",
    icon: Users,
    color: "text-chart-2",
  },
  {
    label: "Completion Rate",
    value: "87.3%",
    change: "+2.1%",
    trend: "up",
    icon: TrendingUp,
    color: "text-chart-4",
  },
]

const recentEvents = [
  {
    id: 1,
    title: "Machine Learning Fundamentals",
    professor: "Dr. Sarah Kim",
    date: "2025-01-20",
    slots: "15/20",
    status: "active",
    category: "Computer Science",
  },
  {
    id: 2,
    title: "Research Methodology Workshop",
    professor: "Prof. Michael Chen",
    date: "2025-01-22",
    slots: "8/15",
    status: "active",
    category: "Research",
  },
  {
    id: 3,
    title: "Career Counseling Session",
    professor: "Dr. Emily Park",
    date: "2025-01-18",
    slots: "12/12",
    status: "full",
    category: "Career",
  },
  {
    id: 4,
    title: "Thesis Proposal Review",
    professor: "Prof. David Lee",
    date: "2025-01-25",
    slots: "5/10",
    status: "active",
    category: "Academic",
  },
]

const recentBookings = [
  {
    id: 1,
    student: "김민수",
    event: "Machine Learning Fundamentals",
    professor: "Dr. Sarah Kim",
    date: "2025-01-20 14:00",
    status: "confirmed",
    attended: null,
  },
  {
    id: 2,
    student: "이서연",
    event: "Research Methodology Workshop",
    professor: "Prof. Michael Chen",
    date: "2025-01-22 10:00",
    status: "pending",
    attended: null,
  },
  {
    id: 3,
    student: "박지훈",
    event: "Career Counseling Session",
    professor: "Dr. Emily Park",
    date: "2025-01-18 15:30",
    status: "confirmed",
    attended: true,
  },
  {
    id: 4,
    student: "최수진",
    event: "Thesis Proposal Review",
    professor: "Prof. David Lee",
    date: "2025-01-25 11:00",
    status: "confirmed",
    attended: null,
  },
]

const recentUsers = [
  {
    id: 1,
    name: "김민수",
    email: "minsu.kim@university.edu",
    role: "student",
    department: "Computer Science",
    status: "active",
    joined: "2025-01-10",
  },
  {
    id: 2,
    name: "Dr. Sarah Kim",
    email: "sarah.kim@university.edu",
    role: "professor",
    department: "Computer Science",
    status: "active",
    joined: "2024-09-01",
  },
  {
    id: 3,
    name: "이서연",
    email: "seoyeon.lee@university.edu",
    role: "student",
    department: "Business",
    status: "active",
    joined: "2025-01-12",
  },
]

export function EnhancedAdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [createEventOpen, setCreateEventOpen] = useState(false)
  const [eventDetailsOpen, setEventDetailsOpen] = useState(false)
  const [userFormOpen, setUserFormOpen] = useState(false)
  const [reportGeneratorOpen, setReportGeneratorOpen] = useState(false)
  const [notificationSettingsOpen, setNotificationSettingsOpen] = useState(false)
  const [groupManagementOpen, setGroupManagementOpen] = useState(false)
  const [surveyResultsOpen, setSurveyResultsOpen] = useState(false)

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Sidebar Navigation */}
      <aside className="sticky top-0 hidden h-screen w-64 border-r border-border bg-card lg:block">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="border-b border-border p-6">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">Admin Portal</h1>
                <p className="text-xs text-muted-foreground">Campus Booking</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            <Button
              variant={activeTab === "overview" ? "secondary" : "ghost"}
              className="w-full justify-start gap-3"
              onClick={() => setActiveTab("overview")}
            >
              <LayoutDashboard className="h-4 w-4" />
              Overview
            </Button>
            <Button
              variant={activeTab === "events" ? "secondary" : "ghost"}
              className="w-full justify-start gap-3"
              onClick={() => setActiveTab("events")}
            >
              <Calendar className="h-4 w-4" />
              Events
            </Button>
            <Button
              variant={activeTab === "bookings" ? "secondary" : "ghost"}
              className="w-full justify-start gap-3"
              onClick={() => setActiveTab("bookings")}
            >
              <CheckCircle2 className="h-4 w-4" />
              Bookings
            </Button>
            <Button
              variant={activeTab === "surveys" ? "secondary" : "ghost"}
              className="w-full justify-start gap-3"
              onClick={() => setActiveTab("surveys")}
            >
              <ClipboardList className="h-4 w-4" />
              Surveys
            </Button>
            <Button
              variant={activeTab === "users" ? "secondary" : "ghost"}
              className="w-full justify-start gap-3"
              onClick={() => setActiveTab("users")}
            >
              <Users className="h-4 w-4" />
              Users & Groups
            </Button>
            <Button
              variant={activeTab === "reports" ? "secondary" : "ghost"}
              className="w-full justify-start gap-3"
              onClick={() => setActiveTab("reports")}
            >
              <FileText className="h-4 w-4" />
              Reports & Analytics
            </Button>
            <Button
              variant={activeTab === "notifications" ? "secondary" : "ghost"}
              className="w-full justify-start gap-3"
              onClick={() => setActiveTab("notifications")}
            >
              <Bell className="h-4 w-4" />
              Notifications
            </Button>
          </nav>

          {/* Settings */}
          <div className="border-t border-border p-4">
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <header className="sticky top-0 z-10 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
            <div className="flex h-16 items-center justify-between px-6">
              <div>
                <h2 className="text-2xl font-semibold text-foreground">
                  {activeTab === "overview" && "Dashboard Overview"}
                  {activeTab === "events" && "Event Management"}
                  {activeTab === "bookings" && "Booking Management"}
                  {activeTab === "surveys" && "Survey System"}
                  {activeTab === "users" && "User & Group Management"}
                  {activeTab === "reports" && "Reports & Analytics"}
                  {activeTab === "notifications" && "Notification Center"}
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">Notifications</span>
                </Button>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                  A
                </div>
              </div>
            </div>
          </header>

          {/* Content Area */}
          <div className="space-y-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {stats.map((stat) => (
                    <Card key={stat.label}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                            <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                            <p className="flex items-center text-xs text-success">
                              {stat.trend === "up" ? (
                                <TrendingUp className="mr-1 h-3 w-3" />
                              ) : (
                                <TrendingDown className="mr-1 h-3 w-3" />
                              )}
                              {stat.change} from last month
                            </p>
                          </div>
                          <div className={`rounded-lg bg-muted p-3 ${stat.color}`}>
                            <stat.icon className="h-5 w-5" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="grid gap-6 lg:grid-cols-2">
                  {/* Recent Events */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Recent Events</CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => setActiveTab("events")}>
                          View All
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentEvents.map((event) => (
                          <div
                            key={event.id}
                            className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
                          >
                            <div className="space-y-1">
                              <p className="font-medium text-foreground">{event.title}</p>
                              <p className="text-sm text-muted-foreground">{event.professor}</p>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {event.category}
                                </Badge>
                                <span className="text-xs text-muted-foreground">{event.date}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge variant={event.status === "active" ? "default" : "secondary"}>
                                {event.status}
                              </Badge>
                              <p className="mt-1 text-sm text-muted-foreground">{event.slots}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Bookings */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Recent Bookings</CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => setActiveTab("bookings")}>
                          View All
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentBookings.map((booking) => (
                          <div
                            key={booking.id}
                            className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
                          >
                            <div className="space-y-1">
                              <p className="font-medium text-foreground">{booking.student}</p>
                              <p className="text-sm text-muted-foreground">{booking.event}</p>
                              <p className="text-xs text-muted-foreground">{booking.date}</p>
                            </div>
                            <div className="text-right">
                              <Badge
                                variant={
                                  booking.status === "confirmed"
                                    ? "default"
                                    : booking.status === "pending"
                                      ? "secondary"
                                      : "outline"
                                }
                              >
                                {booking.status}
                              </Badge>
                              {booking.attended !== null && (
                                <p className="mt-1 text-xs text-muted-foreground">
                                  {booking.attended ? "Attended" : "No-show"}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === "events" && (
              <div className="space-y-6">
                {/* Event Management Toolbar */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-1 items-center gap-2">
                    <div className="relative flex-1 max-w-sm">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input placeholder="Search events..." className="pl-9" />
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="full">Full</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                      <span className="sr-only">Advanced filters</span>
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline">
                      <Upload className="mr-2 h-4 w-4" />
                      Import
                    </Button>
                    <Button onClick={() => setCreateEventOpen(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Event
                    </Button>
                  </div>
                </div>

                {/* Events Table */}
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="border-b border-border bg-muted/50">
                          <tr>
                            <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Event</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Professor</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Category</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Date</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Bookings</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Status</th>
                            <th className="px-6 py-4 text-right text-sm font-medium text-foreground">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentEvents.map((event) => (
                            <tr key={event.id} className="border-b border-border last:border-0">
                              <td className="px-6 py-4">
                                <p className="font-medium text-foreground">{event.title}</p>
                              </td>
                              <td className="px-6 py-4 text-sm text-muted-foreground">{event.professor}</td>
                              <td className="px-6 py-4">
                                <Badge variant="outline">{event.category}</Badge>
                              </td>
                              <td className="px-6 py-4 text-sm text-muted-foreground">{event.date}</td>
                              <td className="px-6 py-4 text-sm text-muted-foreground">{event.slots}</td>
                              <td className="px-6 py-4">
                                <Badge variant={event.status === "active" ? "default" : "secondary"}>
                                  {event.status}
                                </Badge>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreVertical className="h-4 w-4" />
                                      <span className="sr-only">Actions</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => setEventDetailsOpen(true)}>
                                      View Details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>Edit Event</DropdownMenuItem>
                                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                    <DropdownMenuItem>Manage Slots</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-destructive">Cancel Event</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "bookings" && (
              <div className="space-y-6">
                {/* Booking Management Toolbar */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-1 items-center gap-2">
                    <div className="relative flex-1 max-w-sm">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input placeholder="Search bookings..." className="pl-9" />
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="waitlist">Waitlist</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                      <span className="sr-only">Advanced filters</span>
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </div>

                {/* Bookings Table */}
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="border-b border-border bg-muted/50">
                          <tr>
                            <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Student</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Event</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Professor</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Date & Time</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Status</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Attendance</th>
                            <th className="px-6 py-4 text-right text-sm font-medium text-foreground">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentBookings.map((booking) => (
                            <tr key={booking.id} className="border-b border-border last:border-0">
                              <td className="px-6 py-4">
                                <p className="font-medium text-foreground">{booking.student}</p>
                              </td>
                              <td className="px-6 py-4 text-sm text-muted-foreground">{booking.event}</td>
                              <td className="px-6 py-4 text-sm text-muted-foreground">{booking.professor}</td>
                              <td className="px-6 py-4 text-sm text-muted-foreground">{booking.date}</td>
                              <td className="px-6 py-4">
                                <Badge
                                  variant={
                                    booking.status === "confirmed"
                                      ? "default"
                                      : booking.status === "pending"
                                        ? "secondary"
                                        : "outline"
                                  }
                                >
                                  {booking.status}
                                </Badge>
                              </td>
                              <td className="px-6 py-4">
                                {booking.attended === null ? (
                                  <span className="text-sm text-muted-foreground">-</span>
                                ) : booking.attended ? (
                                  <Badge variant="default" className="bg-success text-success-foreground">
                                    <CheckCircle2 className="mr-1 h-3 w-3" />
                                    Attended
                                  </Badge>
                                ) : (
                                  <Badge variant="destructive">
                                    <XCircle className="mr-1 h-3 w-3" />
                                    No-show
                                  </Badge>
                                )}
                              </td>
                              <td className="px-6 py-4 text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreVertical className="h-4 w-4" />
                                      <span className="sr-only">Actions</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>View Details</DropdownMenuItem>
                                    <DropdownMenuItem>Mark as Attended</DropdownMenuItem>
                                    <DropdownMenuItem>Mark as No-show</DropdownMenuItem>
                                    <DropdownMenuItem>Reschedule</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-destructive">Cancel Booking</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "surveys" && (
              <div className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-1 items-center gap-2">
                    <div className="relative flex-1 max-w-sm">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input placeholder="Search surveys..." className="pl-9" />
                    </div>
                  </div>
                  <Link href="/admin/surveys/builder">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Survey
                    </Button>
                  </Link>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Survey Management</CardTitle>
                    <CardDescription>
                      Create and manage pre-event and post-event surveys with conditional branching
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <ClipboardList className="mx-auto h-12 w-12 text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-medium text-foreground">Survey System</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Create surveys with multiple question types, conditional branching, and formula calculations
                      </p>
                      <Link href="/admin/surveys/builder">
                        <Button className="mt-4">
                          <Plus className="mr-2 h-4 w-4" />
                          Create Your First Survey
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "users" && (
              <div className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-1 items-center gap-2">
                    <div className="relative flex-1 max-w-sm">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input placeholder="Search users..." className="pl-9" />
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="professor">Professor</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                      <span className="sr-only">Advanced filters</span>
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline">
                      <Upload className="mr-2 h-4 w-4" />
                      CSV Import
                    </Button>
                    <Button onClick={() => setUserFormOpen(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add User
                    </Button>
                  </div>
                </div>

                {/* Users Table */}
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="border-b border-border bg-muted/50">
                          <tr>
                            <th className="px-6 py-4 text-left text-sm font-medium text-foreground">User</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Email</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Role</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Department</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Status</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Joined</th>
                            <th className="px-6 py-4 text-right text-sm font-medium text-foreground">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentUsers.map((user) => (
                            <tr key={user.id} className="border-b border-border last:border-0">
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                                    {user.name.charAt(0)}
                                  </div>
                                  <p className="font-medium text-foreground">{user.name}</p>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-sm text-muted-foreground">{user.email}</td>
                              <td className="px-6 py-4">
                                <Badge variant="outline">{user.role}</Badge>
                              </td>
                              <td className="px-6 py-4 text-sm text-muted-foreground">{user.department}</td>
                              <td className="px-6 py-4">
                                <Badge variant="default">{user.status}</Badge>
                              </td>
                              <td className="px-6 py-4 text-sm text-muted-foreground">{user.joined}</td>
                              <td className="px-6 py-4 text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreVertical className="h-4 w-4" />
                                      <span className="sr-only">Actions</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                                    <DropdownMenuItem>Edit User</DropdownMenuItem>
                                    <DropdownMenuItem>Manage Permissions</DropdownMenuItem>
                                    <DropdownMenuItem>Activity History</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-destructive">Deactivate User</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "reports" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Reports & Analytics</CardTitle>
                    <CardDescription>Generate comprehensive reports and analyze system-wide metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      <Card
                        className="cursor-pointer transition-colors hover:bg-muted/50"
                        onClick={() => setReportGeneratorOpen(true)}
                      >
                        <CardContent className="flex flex-col items-center gap-3 p-6">
                          <div className="rounded-lg bg-chart-1/10 p-3">
                            <FileText className="h-6 w-6 text-chart-1" />
                          </div>
                          <h3 className="font-medium text-foreground">Event Summary</h3>
                          <p className="text-center text-sm text-muted-foreground">
                            Overview of all events and booking statistics
                          </p>
                        </CardContent>
                      </Card>
                      <Card
                        className="cursor-pointer transition-colors hover:bg-muted/50"
                        onClick={() => setReportGeneratorOpen(true)}
                      >
                        <CardContent className="flex flex-col items-center gap-3 p-6">
                          <div className="rounded-lg bg-chart-2/10 p-3">
                            <ClipboardList className="h-6 w-6 text-chart-2" />
                          </div>
                          <h3 className="font-medium text-foreground">Booking Analysis</h3>
                          <p className="text-center text-sm text-muted-foreground">
                            Detailed booking patterns and trends
                          </p>
                        </CardContent>
                      </Card>
                      <Card
                        className="cursor-pointer transition-colors hover:bg-muted/50"
                        onClick={() => setReportGeneratorOpen(true)}
                      >
                        <CardContent className="flex flex-col items-center gap-3 p-6">
                          <div className="rounded-lg bg-chart-3/10 p-3">
                            <Users className="h-6 w-6 text-chart-3" />
                          </div>
                          <h3 className="font-medium text-foreground">Student Engagement</h3>
                          <p className="text-center text-sm text-muted-foreground">
                            Student participation and activity patterns
                          </p>
                        </CardContent>
                      </Card>
                      <Card
                        className="cursor-pointer transition-colors hover:bg-muted/50"
                        onClick={() => setReportGeneratorOpen(true)}
                      >
                        <CardContent className="flex flex-col items-center gap-3 p-6">
                          <div className="rounded-lg bg-chart-4/10 p-3">
                            <CheckCircle2 className="h-6 w-6 text-chart-4" />
                          </div>
                          <h3 className="font-medium text-foreground">Attendance Report</h3>
                          <p className="text-center text-sm text-muted-foreground">
                            Attendance tracking and no-show analysis
                          </p>
                        </CardContent>
                      </Card>
                      <Card
                        className="cursor-pointer transition-colors hover:bg-muted/50"
                        onClick={() => setReportGeneratorOpen(true)}
                      >
                        <CardContent className="flex flex-col items-center gap-3 p-6">
                          <div className="rounded-lg bg-chart-1/10 p-3">
                            <Users className="h-6 w-6 text-chart-1" />
                          </div>
                          <h3 className="font-medium text-foreground">Professor Workload</h3>
                          <p className="text-center text-sm text-muted-foreground">
                            Faculty consultation hours and workload
                          </p>
                        </CardContent>
                      </Card>
                      <Card
                        className="cursor-pointer transition-colors hover:bg-muted/50"
                        onClick={() => setReportGeneratorOpen(true)}
                      >
                        <CardContent className="flex flex-col items-center gap-3 p-6">
                          <div className="rounded-lg bg-chart-2/10 p-3">
                            <ClipboardList className="h-6 w-6 text-chart-2" />
                          </div>
                          <h3 className="font-medium text-foreground">Survey Responses</h3>
                          <p className="text-center text-sm text-muted-foreground">
                            Survey completion rates and responses
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Center</CardTitle>
                    <CardDescription>Manage system-wide notifications and email alerts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Bell className="mx-auto h-12 w-12 text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-medium text-foreground">Notification System</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Configure in-app, email, and push notifications with automated reminders
                      </p>
                      <Button className="mt-4" onClick={() => setNotificationSettingsOpen(true)}>
                        Configure Notifications
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dialogs and Sheets */}
      <CreateEventDialog open={createEventOpen} onOpenChange={setCreateEventOpen} />
      <EventDetailsSheet open={eventDetailsOpen} onOpenChange={setEventDetailsOpen} />
      <UserFormDialog open={userFormOpen} onOpenChange={setUserFormOpen} />
      <ReportGeneratorDialog open={reportGeneratorOpen} onOpenChange={setReportGeneratorOpen} />
      <NotificationSettingsDialog open={notificationSettingsOpen} onOpenChange={setNotificationSettingsOpen} />
      <GroupManagementDialog open={groupManagementOpen} onOpenChange={setGroupManagementOpen} />
      <SurveyResultsSheet open={surveyResultsOpen} onOpenChange={setSurveyResultsOpen} />
    </div>
  )
}
