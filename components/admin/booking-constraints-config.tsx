"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Shield, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { BookingConstraints } from "@/types/event-types"

interface BookingConstraintsConfigProps {
  value: BookingConstraints
  onChange: (value: BookingConstraints) => void
}

export function BookingConstraintsConfig({ value, onChange }: BookingConstraintsConfigProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">
          <Shield className="inline h-4 w-4 mr-1" />
          예약 제약 조건
        </CardTitle>
        <CardDescription>예약 가능 횟수 및 중복 예약 방지 설정</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            이 설정은 학생들의 예약 패턴을 제어하여 공정한 기회를 보장합니다
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <Label htmlFor="max-bookings">한 사람당 최대 예약 가능 개수</Label>
          <Input
            id="max-bookings"
            type="number"
            min="1"
            placeholder="제한 없음"
            value={value.maxBookingsPerPerson || ""}
            onChange={(e) =>
              onChange({
                ...value,
                maxBookingsPerPerson: e.target.value ? Number.parseInt(e.target.value) : undefined,
              })
            }
          />
          <p className="text-sm text-muted-foreground">
            비워두면 제한 없음. 예: 3으로 설정하면 한 학생이 최대 3개의 상담 예약 가능
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>같은 날짜 다른 시간대 예약 허용</Label>
            <p className="text-sm text-muted-foreground">예: 월요일 10시와 월요일 14시를 동시에 예약 가능</p>
          </div>
          <Switch
            checked={value.allowMultipleSlotsPerDay}
            onCheckedChange={(checked) =>
              onChange({
                ...value,
                allowMultipleSlotsPerDay: checked,
              })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>동일 담당자 중복 예약 허용</Label>
            <p className="text-sm text-muted-foreground">같은 교수/멘토와 여러 시간대 상담 가능</p>
          </div>
          <Switch
            checked={value.allowSameAssigneeBooking}
            onCheckedChange={(checked) =>
              onChange({
                ...value,
                allowSameAssigneeBooking: checked,
              })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>시간 충돌 방지 (다른 이벤트 포함)</Label>
            <p className="text-sm text-muted-foreground">같은 시간대에 다른 상담/행사 예약 불가</p>
          </div>
          <Switch
            checked={value.preventOverlappingBookings}
            onCheckedChange={(checked) =>
              onChange({
                ...value,
                preventOverlappingBookings: checked,
              })
            }
          />
        </div>
      </CardContent>
    </Card>
  )
}
