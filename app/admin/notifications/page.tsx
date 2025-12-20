"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotificationsPage() {
  return (
    <div className="flex-1">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="flex h-16 items-center justify-between px-6">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Notification Center</h2>
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
        <Card>
          <CardHeader>
            <CardTitle>알림 설정</CardTitle>
            <CardDescription>시스템 알림 및 이메일 설정을 관리하세요</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Bell className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium text-foreground">알림 센터</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                이벤트 알림, 예약 확인, 리마인더 등을 설정하고 관리할 수 있습니다
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
