export type EventCategory = "reservation" | "resource" | "registration"

export type EventType =
  | "consultation" // 상담 (reservation)
  | "mentoring" // 멘토링 (reservation)
  | "study-room" // 스터디룸 (resource)
  | "equipment" // 장비 (resource)
  | "session" // 행사 세션 (registration)
  | "seminar" // 세미나 (registration)
  | "workshop" // 워크샵 (registration)

export type RecurrencePattern = "none" | "daily" | "weekly" | "biweekly" | "monthly"

export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed" | "no-show"

export type ResourceType = "room" | "equipment" | "facility"

export interface TimeSlot {
  id: string
  startTime: string // HH:mm format
  endTime: string // HH:mm format
  capacity: number
  booked: number
  waitlist: number
  available: boolean
  // 담당자 정보 (예약형 전용)
  assignee?: {
    id: string
    name: string
    role: "professor" | "staff" | "mentor"
    email?: string
  }
}

export interface RecurrenceConfig {
  pattern: RecurrencePattern
  endDate?: string
  daysOfWeek?: number[] // 0-6 (Sun-Sat)
  interval?: number // Every N weeks/months
}

export interface PrerequisiteConfig {
  surveyRequired: boolean
  surveyId?: string
  documentsRequired: string[]
  minimumLevel?: string // 학년 제한
}

export interface TargetAudience {
  mode: "public" | "groups" | "individuals" // 공개 / 그룹 기반 / 개인별
  selectedGroups?: string[] // 그룹 ID 배열
  selectedUsers?: string[] // 사용자 ID 배열
  excludedUsers?: string[] // 제외할 사용자 ID
}

export interface BookingConstraints {
  // 한 사람당 최대 예약 가능한 상담 개수
  maxBookingsPerPerson?: number
  // 같은 날짜 다른 시간대 예약 가능 여부
  allowMultipleSlotsPerDay: boolean
  // 동일 담당자 중복 예약 가능 여부
  allowSameAssigneeBooking: boolean
  // 같은 시간대 중복 예약 방지 (다른 이벤트 포함)
  preventOverlappingBookings: boolean
}

export interface EventDateConfig {
  date: string // YYYY-MM-DD
  timeSlots: TimeSlot[]
  location?: string // 날짜별 장소 변경 가능
  notes?: string
}

export interface Event {
  id: string
  title: string
  description: string
  category: EventCategory
  type: EventType

  // 기본 정보
  date: string // 시작 날짜
  endDate?: string // 종료 날짜 (기간 설정)
  location: string
  department?: string

  // 담당자 정보
  organizer: {
    id: string
    name: string
    role: "professor" | "admin" | "staff"
  }

  targetAudience?: TargetAudience

  bookingConstraints?: BookingConstraints

  // 예약 설정
  timeSlots: TimeSlot[]
  duration: number // minutes
  capacity: number // per slot

  dateConfigs?: EventDateConfig[]

  // 리소스 전용 (resource category)
  resourceType?: ResourceType
  resourceId?: string
  checkoutRequired?: boolean

  // 반복 일정
  recurrence?: RecurrenceConfig

  // 사전 요구사항
  prerequisites?: PrerequisiteConfig

  // 대기자 명단
  waitlistEnabled: boolean
  maxWaitlist?: number

  // 상태
  status: "draft" | "published" | "ongoing" | "completed" | "cancelled"
  registrationDeadline?: string

  // 통계
  totalBookings: number
  totalAttendees: number

  // 메타데이터
  createdAt: string
  updatedAt: string
  createdBy: string
}

export interface Booking {
  id: string
  eventId: string
  event: {
    title: string
    type: EventType
    date: string
    location: string
  }

  // 학생 정보
  student: {
    id: string
    name: string
    email: string
    department?: string
    year?: number
  }

  // 예약 정보
  timeSlot: TimeSlot
  status: BookingStatus
  bookingDate: string

  // 참석 정보
  attended: boolean | null
  checkInTime?: string
  checkOutTime?: string

  // 사전 준비
  surveyCompleted: boolean
  surveyResponseId?: string
  documentsSubmitted: string[]

  // 대기자
  isWaitlist: boolean
  waitlistPosition?: number

  // 노트/메모
  notes?: string
  adminNotes?: string

  // 취소 정보
  cancellationReason?: string
  cancelledAt?: string

  createdAt: string
  updatedAt: string
}

export interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  type: EventType
  category: EventCategory
  status: BookingStatus
  color?: string
}

export interface User {
  id: string
  name: string
  email: string
  role: "student" | "professor" | "admin" | "staff"
  department?: string
  year?: number
  status: "active" | "inactive"
}

export interface Group {
  id: string
  name: string
  type: "Academic" | "Year" | "Department" | "Special" | "Custom"
  description?: string
  members: number
  memberIds?: string[]
}
