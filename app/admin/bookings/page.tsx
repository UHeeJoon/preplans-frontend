"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Filter, Download, MoreVertical, CheckCircle2, XCircle, Bell } from "lucide-react"

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

export default function BookingsPage() {
  return (
    <div className="flex-1">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="flex h-16 items-center justify-between px-6">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Booking Management</h2>
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

      {/* Content */}
      <div className="p-6 space-y-6">
        <div className="space-y-6">
          {/* Booking Management Toolbar */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center gap-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="예약 검색..." className="pl-9" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="상태" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체 상태</SelectItem>
                  <SelectItem value="confirmed">확정</SelectItem>
                  <SelectItem value="pending">대기중</SelectItem>
                  <SelectItem value="waitlist">대기자 명단</SelectItem>
                  <SelectItem value="cancelled">취소됨</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">고급 필터</span>
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                내보내기
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
                      <th className="px-6 py-4 text-left text-sm font-medium text-foreground">학생</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-foreground">이벤트</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-foreground">교수</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-foreground">날짜 & 시간</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-foreground">상태</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-foreground">출석</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-foreground">작업</th>
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
                            {booking.status === "confirmed" ? "확정" : booking.status === "pending" ? "대기중" : "취소"}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          {booking.attended === null ? (
                            <span className="text-sm text-muted-foreground">-</span>
                          ) : booking.attended ? (
                            <Badge variant="default" className="bg-success text-success-foreground">
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              출석
                            </Badge>
                          ) : (
                            <Badge variant="destructive">
                              <XCircle className="mr-1 h-3 w-3" />
                              불참
                            </Badge>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">작업</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>상세 보기</DropdownMenuItem>
                              <DropdownMenuItem>출석으로 표시</DropdownMenuItem>
                              <DropdownMenuItem>불참으로 표시</DropdownMenuItem>
                              <DropdownMenuItem>일정 변경</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">예약 취소</DropdownMenuItem>
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
      </div>
    </div>
  )
}
