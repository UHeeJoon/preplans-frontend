"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Plus, X, Clock, Users, MapPin, Repeat, Zap, AlertCircle, UserCircle } from "lucide-react"
import { format } from "date-fns"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { TimePicker } from "./time-picker"
import { AudienceSelector } from "./audience-selector"
import { BookingConstraintsConfig } from "./booking-constraints-config"
import type {
  EventCategory,
  EventType,
  RecurrencePattern,
  TimeSlot,
  TargetAudience,
  BookingConstraints,
  EventDateConfig,
} from "@/types/event-types"

interface CreateEventDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const mockAssignees = [
  { id: "prof-1", name: "김교수", role: "professor" as const, email: "kim@univ.edu" },
  { id: "prof-2", name: "이교수", role: "professor" as const, email: "lee@univ.edu" },
  { id: "prof-3", name: "박교수", role: "professor" as const, email: "park@univ.edu" },
  { id: "mentor-1", name: "최멘토", role: "mentor" as const, email: "choi@univ.edu" },
  { id: "staff-1", name: "정직원", role: "staff" as const, email: "jung@univ.edu" },
]

export function CreateEventDialog({ open, onOpenChange }: CreateEventDialogProps) {
  const [category, setCategory] = useState<EventCategory>("reservation")
  const [eventType, setEventType] = useState<EventType>("consultation")
  const [date, setDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()

  const [dateConfigs, setDateConfigs] = useState<EventDateConfig[]>([])
  const [currentDateConfig, setCurrentDateConfig] = useState<EventDateConfig | null>(null)

  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])

  const [autoGenerateMode, setAutoGenerateMode] = useState(false)
  const [autoStartTime, setAutoStartTime] = useState("09:00")
  const [autoEndTime, setAutoEndTime] = useState("18:00")
  const [sessionDuration, setSessionDuration] = useState("30")
  const [breakDuration, setBreakDuration] = useState("10")

  const [defaultLocation, setDefaultLocation] = useState("")

  // 반복 일정
  const [recurrence, setRecurrence] = useState<RecurrencePattern>("none")
  const [recurrenceEndDate, setRecurrenceEndDate] = useState<Date>()
  const [selectedDays, setSelectedDays] = useState<number[]>([])

  // 사전 요구사항
  const [requireSurvey, setRequireSurvey] = useState(false)
  const [requireDocuments, setRequireDocuments] = useState(false)
  const [documents, setDocuments] = useState<string[]>([])

  // 대기자 명단
  const [enableWaitlist, setEnableWaitlist] = useState(true)

  // 리소스 전용
  const [checkoutRequired, setCheckoutRequired] = useState(false)
  const [resourceName, setResourceName] = useState("")

  // 등록형 전용
  const [requiresApproval, setRequiresApproval] = useState(false)
  const [earlyBirdDeadline, setEarlyBirdDeadline] = useState<Date>()

  const [targetAudience, setTargetAudience] = useState<TargetAudience>({
    mode: "public",
  })

  const [bookingConstraints, setBookingConstraints] = useState<BookingConstraints>({
    allowMultipleSlotsPerDay: true,
    allowSameAssigneeBooking: true,
    preventOverlappingBookings: true,
  })

  const generateTimeSlots = () => {
    const slots: TimeSlot[] = []
    const [startHour, startMin] = autoStartTime.split(":").map(Number)
    const [endHour, endMin] = autoEndTime.split(":").map(Number)

    const totalMinutes = endHour * 60 + endMin - (startHour * 60 + startMin)
    const slotDuration = Number.parseInt(sessionDuration) + Number.parseInt(breakDuration)
    const numberOfSlots = Math.floor(totalMinutes / slotDuration)

    let currentMinutes = startHour * 60 + startMin

    for (let i = 0; i < numberOfSlots; i++) {
      const slotStartHour = Math.floor(currentMinutes / 60)
      const slotStartMin = currentMinutes % 60
      const slotStart = `${String(slotStartHour).padStart(2, "0")}:${String(slotStartMin).padStart(2, "0")}`

      currentMinutes += Number.parseInt(sessionDuration)
      const slotEndHour = Math.floor(currentMinutes / 60)
      const slotEndMin = currentMinutes % 60
      const slotEnd = `${String(slotEndHour).padStart(2, "0")}:${String(slotEndMin).padStart(2, "0")}`

      slots.push({
        id: `slot-${Date.now()}-${i}`,
        startTime: slotStart,
        endTime: slotEnd,
        capacity: 1,
        booked: 0,
        waitlist: 0,
        available: true,
      })
      currentMinutes += Number.parseInt(breakDuration)
    }

    setTimeSlots(slots)
    setAutoGenerateMode(false)
  }

  const addTimeSlot = (start: string, end: string) => {
    const newSlot: TimeSlot = {
      id: `slot-${Date.now()}`,
      startTime: start,
      endTime: end,
      capacity: 1,
      booked: 0,
      waitlist: 0,
      available: true,
    }
    setTimeSlots([...timeSlots, newSlot])
  }

  const updateSlotAssignee = (slotId: string, assigneeId: string) => {
    const assignee = mockAssignees.find((a) => a.id === assigneeId)
    if (!assignee) return

    setTimeSlots((slots) => slots.map((slot) => (slot.id === slotId ? { ...slot, assignee } : slot)))
  }

  const removeTimeSlot = (slotId: string) => {
    setTimeSlots(timeSlots.filter((slot) => slot.id !== slotId))
  }

  const addDateConfig = () => {
    if (!date || timeSlots.length === 0) {
      alert("날짜와 타임슬롯을 먼저 설정해주세요")
      return
    }

    const config: EventDateConfig = {
      date: format(date, "yyyy-MM-dd"),
      timeSlots: [...timeSlots],
      location: defaultLocation,
    }

    setDateConfigs([...dateConfigs, config])
    // 추가 후 초기화
    setDate(undefined)
    setTimeSlots([])
    setDefaultLocation("")
  }

  const removeDateConfig = (dateStr: string) => {
    setDateConfigs(dateConfigs.filter((config) => config.date !== dateStr))
  }

  const toggleDay = (day: number) => {
    setSelectedDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]))
  }

  const getEventTypesByCategory = (cat: EventCategory): EventType[] => {
    switch (cat) {
      case "reservation":
        return ["consultation", "mentoring"]
      case "resource":
        return ["study-room", "equipment"]
      case "registration":
        return ["session", "seminar", "workshop"]
      default:
        return []
    }
  }

  const eventTypeLabels: Record<EventType, string> = {
    consultation: "교수 상담",
    mentoring: "멘토링",
    "study-room": "스터디룸",
    equipment: "연구 장비",
    session: "행사 세션",
    seminar: "세미나",
    workshop: "워크샵",
  }

  const categoryDescriptions = {
    reservation: "1:1 또는 소규모 개인화 상담 및 멘토링 예약 - 반복 일정, 담당자별 관리 지원",
    resource: "공간, 장비 등 물리적 리소스 대여 및 반납 관리 - 체크아웃 시스템 지원",
    registration: "다수 참여 이벤트 등록 및 출석 관리 - 승인 시스템, 조기 등록 지원",
  }

  const weekDays = ["일", "월", "화", "수", "목", "금", "토"]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>새 이벤트 생성</DialogTitle>
          <DialogDescription>이벤트 유형을 선택하고 상세 정보를 입력하세요</DialogDescription>
        </DialogHeader>

        <Tabs
          value={category}
          onValueChange={(v) => {
            setCategory(v as EventCategory)
            // 카테고리 변경 시 첫 번째 타입으로 자동 설정
            const types = getEventTypesByCategory(v as EventCategory)
            if (types.length > 0) setEventType(types[0])
          }}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="reservation">예약형</TabsTrigger>
            <TabsTrigger value="resource">리소스</TabsTrigger>
            <TabsTrigger value="registration">등록형</TabsTrigger>
          </TabsList>

          <Alert className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{categoryDescriptions[category]}</AlertDescription>
          </Alert>

          <div className="mt-6 space-y-6">
            {/* 이벤트 유형 선택 */}
            <div className="space-y-2">
              <Label htmlFor="event-type">이벤트 유형</Label>
              <Select value={eventType} onValueChange={(v) => setEventType(v as EventType)}>
                <SelectTrigger id="event-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {getEventTypesByCategory(category).map((type) => (
                    <SelectItem key={type} value={type}>
                      {eventTypeLabels[type]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 기본 정보 */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">제목</Label>
                <Input id="title" placeholder="예: 논문 지도 상담" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">설명</Label>
                <Textarea id="description" placeholder="이벤트에 대한 자세한 설명을 입력하세요..." rows={3} />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="organizer">주최자/담당자</Label>
                  <Select>
                    <SelectTrigger id="organizer">
                      <SelectValue placeholder="담당자 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockAssignees
                        .filter((a) => a.role !== "mentor")
                        .map((assignee) => (
                          <SelectItem key={assignee.id} value={assignee.id}>
                            {assignee.name} ({assignee.role === "professor" ? "교수" : "직원"})
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">학과</Label>
                  <Select>
                    <SelectTrigger id="department">
                      <SelectValue placeholder="학과 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cs">컴퓨터공학과</SelectItem>
                      <SelectItem value="eng">공학부</SelectItem>
                      <SelectItem value="biz">경영학과</SelectItem>
                      <SelectItem value="arts">예술학과</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {category === "resource" && (
                <div className="space-y-2">
                  <Label htmlFor="resource-name">리소스 명칭</Label>
                  <Input
                    id="resource-name"
                    value={resourceName}
                    onChange={(e) => setResourceName(e.target.value)}
                    placeholder={eventType === "study-room" ? "예: 스터디룸 A" : "예: 3D 프린터"}
                  />
                </div>
              )}
            </div>

            {category === "reservation" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    <CalendarIcon className="inline h-4 w-4 mr-1" />
                    행사 기간 설정
                  </CardTitle>
                  <CardDescription>날짜별로 다른 타임슬롯과 장소를 설정할 수 있습니다</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>날짜 선택</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal bg-transparent"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>날짜 선택</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={date} onSelect={setDate} />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date-location">
                        <MapPin className="inline h-4 w-4 mr-1" />이 날짜의 장소
                      </Label>
                      <Input
                        id="date-location"
                        placeholder="예: A동 305호"
                        value={defaultLocation}
                        onChange={(e) => setDefaultLocation(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* 타임슬롯 생성 */}
                  <Card className="border-dashed">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-sm">
                            <Clock className="inline h-4 w-4 mr-1" />
                            타임슬롯 설정
                          </CardTitle>
                          <CardDescription className="text-xs">각 슬롯마다 담당자 지정 가능</CardDescription>
                        </div>
                        <Button
                          type="button"
                          variant={autoGenerateMode ? "default" : "outline"}
                          size="sm"
                          onClick={() => setAutoGenerateMode(!autoGenerateMode)}
                        >
                          <Zap className="h-4 w-4 mr-1" />
                          자동 생성
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {autoGenerateMode ? (
                        <div className="space-y-4">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="auto-start">시작 시간</Label>
                              <TimePicker value={autoStartTime} onChange={setAutoStartTime} placeholder="09:00" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="auto-end">종료 시간</Label>
                              <TimePicker value={autoEndTime} onChange={setAutoEndTime} placeholder="18:00" />
                            </div>
                          </div>

                          <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="session-duration">세션 시간 (분)</Label>
                              <Input
                                id="session-duration"
                                type="number"
                                value={sessionDuration}
                                onChange={(e) => setSessionDuration(e.target.value)}
                                placeholder="30"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="break-duration">휴식 시간 (분)</Label>
                              <Input
                                id="break-duration"
                                type="number"
                                value={breakDuration}
                                onChange={(e) => setBreakDuration(e.target.value)}
                                placeholder="10"
                              />
                            </div>
                          </div>

                          <Button type="button" onClick={generateTimeSlots} className="w-full">
                            타임테이블 생성하기
                          </Button>
                        </div>
                      ) : (
                        <ManualSlotInput onAdd={addTimeSlot} />
                      )}

                      {timeSlots.length > 0 && (
                        <div className="space-y-2">
                          <Label>생성된 슬롯 ({timeSlots.length}개)</Label>
                          <div className="space-y-2 max-h-64 overflow-y-auto border rounded-md p-3">
                            {timeSlots.map((slot) => (
                              <div key={slot.id} className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                                <Badge variant="outline" className="whitespace-nowrap">
                                  {slot.startTime} ~ {slot.endTime}
                                </Badge>

                                <Select
                                  value={slot.assignee?.id}
                                  onValueChange={(value) => updateSlotAssignee(slot.id, value)}
                                >
                                  <SelectTrigger className="h-8 text-xs flex-1">
                                    <SelectValue placeholder="담당자 선택">
                                      {slot.assignee && (
                                        <span className="flex items-center gap-1">
                                          <UserCircle className="h-3 w-3" />
                                          {slot.assignee.name}
                                        </span>
                                      )}
                                    </SelectValue>
                                  </SelectTrigger>
                                  <SelectContent>
                                    {mockAssignees.map((assignee) => (
                                      <SelectItem key={assignee.id} value={assignee.id}>
                                        {assignee.name} (
                                        {assignee.role === "professor"
                                          ? "교수"
                                          : assignee.role === "mentor"
                                            ? "멘토"
                                            : "직원"}
                                        )
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>

                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => removeTimeSlot(slot.id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* 날짜 설정 추가 버튼 */}
                  {date && timeSlots.length > 0 && (
                    <Button type="button" onClick={addDateConfig} variant="secondary" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />이 날짜 설정 추가하기
                    </Button>
                  )}

                  {/* 추가된 날짜별 설정 목록 */}
                  {dateConfigs.length > 0 && (
                    <div className="space-y-2">
                      <Label>설정된 날짜 ({dateConfigs.length}일)</Label>
                      <div className="space-y-2">
                        {dateConfigs.map((config) => (
                          <Card key={config.date} className="border-l-4 border-l-primary">
                            <CardContent className="p-3">
                              <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                  <div className="font-medium">{config.date}</div>
                                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                                    <MapPin className="h-3 w-3" />
                                    {config.location || "장소 미지정"}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    타임슬롯 {config.timeSlots.length}개
                                  </div>
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeDateConfig(config.date)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* 리소스/등록형을 위한 간단한 날짜/시간 선택 */}
            {category !== "reservation" && (
              <>
                <div className="space-y-2">
                  <Label>
                    <CalendarIcon className="inline h-4 w-4 mr-1" />
                    날짜
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>날짜 선택</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={date} onSelect={setDate} />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">
                    <MapPin className="inline h-4 w-4 mr-1" />
                    장소
                  </Label>
                  <Input id="location" placeholder="예: A동 305호" />
                </div>

                {category === "registration" && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="event-start">시작 시간</Label>
                      <TimePicker value="" onChange={() => {}} placeholder="시작 시간" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="event-end">종료 시간</Label>
                      <TimePicker value="" onChange={() => {}} placeholder="종료 시간" />
                    </div>
                  </div>
                )}
              </>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="capacity">
                  <Users className="inline h-4 w-4 mr-1" />
                  {category === "registration" ? "전체 정원" : "슬롯당 정원"}
                </Label>
                <Input
                  id="capacity"
                  type="number"
                  placeholder={category === "registration" ? "50" : "1"}
                  defaultValue={category === "registration" ? "50" : "1"}
                />
              </div>

              {category !== "registration" && (
                <div className="space-y-2">
                  <Label htmlFor="duration">소요 시간 (분)</Label>
                  <Input id="duration" type="number" placeholder="30" defaultValue="30" />
                </div>
              )}
            </div>

            {category === "reservation" && <AudienceSelector value={targetAudience} onChange={setTargetAudience} />}

            {category === "reservation" && (
              <BookingConstraintsConfig value={bookingConstraints} onChange={setBookingConstraints} />
            )}

            {/* 반복 일정 (예약형 전용) */}
            {category === "reservation" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    <Repeat className="inline h-4 w-4 mr-1" />
                    반복 일정 설정
                  </CardTitle>
                  <CardDescription>정기 상담/멘토링을 위한 반복 스케줄</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select value={recurrence} onValueChange={(v) => setRecurrence(v as RecurrencePattern)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">반복 안 함</SelectItem>
                      <SelectItem value="daily">매일</SelectItem>
                      <SelectItem value="weekly">매주</SelectItem>
                      <SelectItem value="biweekly">격주</SelectItem>
                      <SelectItem value="monthly">매월</SelectItem>
                    </SelectContent>
                  </Select>

                  {recurrence === "weekly" && (
                    <div className="space-y-2">
                      <Label>요일 선택</Label>
                      <div className="flex gap-2">
                        {weekDays.map((day, idx) => (
                          <Button
                            key={idx}
                            type="button"
                            variant={selectedDays.includes(idx) ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleDay(idx)}
                            className="flex-1"
                          >
                            {day}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {recurrence !== "none" && (
                    <div className="space-y-2">
                      <Label>반복 종료일</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal bg-transparent"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {recurrenceEndDate ? format(recurrenceEndDate, "PPP") : <span>종료일 선택</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={recurrenceEndDate} onSelect={setRecurrenceEndDate} />
                        </PopoverContent>
                      </Popover>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* 리소스 전용 옵션 */}
            {category === "resource" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">리소스 관리 옵션</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>반납 체크아웃 필수</Label>
                      <p className="text-sm text-muted-foreground">사용 후 반납 확인 필요</p>
                    </div>
                    <Switch checked={checkoutRequired} onCheckedChange={setCheckoutRequired} />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 등록형 전용 옵션 */}
            {category === "registration" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">등록 관리 옵션</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>관리자 승인 필요</Label>
                      <p className="text-sm text-muted-foreground">등록 후 승인 절차 필요</p>
                    </div>
                    <Switch checked={requiresApproval} onCheckedChange={setRequiresApproval} />
                  </div>

                  <div className="space-y-2">
                    <Label>조기 등록 마감일</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {earlyBirdDeadline ? format(earlyBirdDeadline, "PPP") : <span>마감일 선택 (선택사항)</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={earlyBirdDeadline} onSelect={setEarlyBirdDeadline} />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="total-capacity">
                      <Users className="inline h-4 w-4 mr-1" />
                      전체 정원
                    </Label>
                    <Input id="total-capacity" type="number" placeholder="50" defaultValue="50" />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 사전 요구사항 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">사전 요구사항</CardTitle>
                <CardDescription>예약/등록 전 필요한 준비사항</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>사전 설문 필수</Label>
                    <p className="text-sm text-muted-foreground">예약 전 설문 작성 필요</p>
                  </div>
                  <Switch checked={requireSurvey} onCheckedChange={setRequireSurvey} />
                </div>

                {requireSurvey && (
                  <div className="space-y-2">
                    <Label htmlFor="survey">설문 선택</Label>
                    <Select>
                      <SelectTrigger id="survey">
                        <SelectValue placeholder="설문 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pre-consultation">사전 상담 설문</SelectItem>
                        <SelectItem value="research-interest">연구 관심사 설문</SelectItem>
                        <SelectItem value="custom">커스텀 설문</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* 등록형 이벤트는 대기자 명단 미지원 */}
                {category !== "registration" && (
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>대기자 명단 활성화</Label>
                      <p className="text-sm text-muted-foreground">정원 초과 시 대기 가능</p>
                    </div>
                    <Switch checked={enableWaitlist} onCheckedChange={setEnableWaitlist} />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button type="submit">이벤트 생성</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function ManualSlotInput({ onAdd }: { onAdd: (start: string, end: string) => void }) {
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")

  const handleAdd = () => {
    if (start && end) {
      onAdd(start, end)
      setStart("")
      setEnd("")
    }
  }

  return (
    <div className="flex gap-2">
      <div className="flex-1">
        <TimePicker value={start} onChange={setStart} placeholder="시작" />
      </div>
      <span className="flex items-center">~</span>
      <div className="flex-1">
        <TimePicker value={end} onChange={setEnd} placeholder="종료" />
      </div>
      <Button type="button" onClick={handleAdd} size="icon">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  )
}
