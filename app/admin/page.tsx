"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import {
  Calendar,
  CheckCircle2,
  ClipboardList,
  Users,
  FileText,
  Bell,
  LayoutDashboard,
  ArrowRight,
  TrendingUp,
  Clock,
} from "lucide-react"

export default function AdminPage() {
  const stats = [
    { label: "총 이벤트", value: "24", change: "+12%", icon: Calendar },
    { label: "활성 예약", value: "156", change: "+8%", icon: CheckCircle2 },
    { label: "완료된 설문", value: "89", change: "+15%", icon: ClipboardList },
    { label: "등록 사용자", value: "342", change: "+23%", icon: Users },
  ]

  const quickActions = [
    {
      title: "이벤트 관리",
      description: "이벤트 생성, 수정 및 참석자 관리",
      href: "/admin/events",
      icon: Calendar,
      color: "text-blue-500",
    },
    {
      title: "예약 관리",
      description: "모든 예약 확인 및 상태 관리",
      href: "/admin/bookings",
      icon: CheckCircle2,
      color: "text-green-500",
    },
    {
      title: "설문 시스템",
      description: "설문 생성 및 응답 분석",
      href: "/admin/surveys",
      icon: ClipboardList,
      color: "text-purple-500",
    },
    {
      title: "사용자 & 그룹",
      description: "사용자 및 그룹 관리",
      href: "/admin/users",
      icon: Users,
      color: "text-orange-500",
    },
    {
      title: "리포트 & 분석",
      description: "데이터 분석 및 리포트 생성",
      href: "/admin/reports",
      icon: FileText,
      color: "text-pink-500",
    },
    {
      title: "알림 설정",
      description: "알림 및 메시지 관리",
      href: "/admin/notifications",
      icon: Bell,
      color: "text-yellow-500",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <LayoutDashboard className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Campus Booking 관리 시스템</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <stat.icon className="h-5 w-5 text-muted-foreground" />
                  <div className="flex items-center gap-1 text-sm text-green-600">
                    <TrendingUp className="h-4 w-4" />
                    {stat.change}
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">빠른 액세스</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {quickActions.map((action) => (
              <Link key={action.title} href={action.href}>
                <Card className="transition-all hover:shadow-lg hover:border-primary">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-3">
                          <div className={`${action.color}`}>
                            <action.icon className="h-6 w-6" />
                          </div>
                          <h3 className="font-semibold">{action.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">{action.description}</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">최근 활동</h2>
              <Button variant="ghost" size="sm">
                전체 보기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              {[
                { title: "새 이벤트 생성됨", time: "5분 전", icon: Calendar },
                { title: "15개 예약이 확정됨", time: "1시간 전", icon: CheckCircle2 },
                { title: "설문 응답 23개 수신", time: "2시간 전", icon: ClipboardList },
                { title: "신규 사용자 8명 가입", time: "3시간 전", icon: Users },
              ].map((activity, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3 rounded-lg border">
                  <activity.icon className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="font-medium">{activity.title}</div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
