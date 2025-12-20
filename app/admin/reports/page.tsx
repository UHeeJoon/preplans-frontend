"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, ClipboardList, Users, CheckCircle2, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ReportsPage() {
  return (
    <div className="flex-1">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="flex h-16 items-center justify-between px-6">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Reports & Analytics</h2>
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
            <CardTitle>리포트 & 분석</CardTitle>
            <CardDescription>종합 리포트를 생성하고 시스템 전체 지표를 분석하세요</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="cursor-pointer transition-colors hover:bg-muted/50">
                <CardContent className="flex flex-col items-center gap-3 p-6">
                  <div className="rounded-lg bg-chart-1/10 p-3">
                    <FileText className="h-6 w-6 text-chart-1" />
                  </div>
                  <h3 className="font-medium text-foreground">이벤트 요약</h3>
                  <p className="text-center text-sm text-muted-foreground">모든 이벤트 및 예약 통계 개요</p>
                </CardContent>
              </Card>
              <Card className="cursor-pointer transition-colors hover:bg-muted/50">
                <CardContent className="flex flex-col items-center gap-3 p-6">
                  <div className="rounded-lg bg-chart-2/10 p-3">
                    <ClipboardList className="h-6 w-6 text-chart-2" />
                  </div>
                  <h3 className="font-medium text-foreground">예약 분석</h3>
                  <p className="text-center text-sm text-muted-foreground">상세 예약 패턴 및 트렌드</p>
                </CardContent>
              </Card>
              <Card className="cursor-pointer transition-colors hover:bg-muted/50">
                <CardContent className="flex flex-col items-center gap-3 p-6">
                  <div className="rounded-lg bg-chart-3/10 p-3">
                    <Users className="h-6 w-6 text-chart-3" />
                  </div>
                  <h3 className="font-medium text-foreground">학생 참여도</h3>
                  <p className="text-center text-sm text-muted-foreground">학생 참여 및 활동 패턴</p>
                </CardContent>
              </Card>
              <Card className="cursor-pointer transition-colors hover:bg-muted/50">
                <CardContent className="flex flex-col items-center gap-3 p-6">
                  <div className="rounded-lg bg-chart-4/10 p-3">
                    <CheckCircle2 className="h-6 w-6 text-chart-4" />
                  </div>
                  <h3 className="font-medium text-foreground">출석 리포트</h3>
                  <p className="text-center text-sm text-muted-foreground">출석 추적 및 불참 분석</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
