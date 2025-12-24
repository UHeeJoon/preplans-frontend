"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Star, TrendingUp } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

export default function EventFeedbackPage() {
  const router = useRouter()
  const params = useParams()
  const eventId = params.id as string

  const [feedbackEnabled, setFeedbackEnabled] = useState(true)
  const [autoSend, setAutoSend] = useState(true)

  // Mock data
  const event = {
    id: eventId,
    title: "교수 상담",
    totalParticipants: 12,
    feedbackCount: 10,
    averageRating: 4.5,
  }

  const ratingDistribution = [
    { rating: "5★", count: 6, percentage: 60 },
    { rating: "4★", count: 3, percentage: 30 },
    { rating: "3★", count: 1, percentage: 10 },
    { rating: "2★", count: 0, percentage: 0 },
    { rating: "1★", count: 0, percentage: 0 },
  ]

  const feedbackList = [
    {
      id: 1,
      student: "김민수",
      studentId: "2021001",
      rating: 5,
      comment: "교수님께서 친절하게 설명해주셔서 많은 도움이 되었습니다.",
      createdAt: "2025-01-15 10:30",
    },
    {
      id: 2,
      student: "이지은",
      studentId: "2021002",
      rating: 5,
      comment: "논문 방향성에 대해 명확한 피드백을 받을 수 있었습니다.",
      createdAt: "2025-01-15 11:00",
    },
    {
      id: 3,
      student: "박준형",
      studentId: "2021003",
      rating: 4,
      comment: "시간이 조금 부족했지만 전반적으로 만족스러웠습니다.",
      createdAt: "2025-01-15 11:30",
    },
  ]

  const sentimentData = [
    { name: "긍정", value: 80, color: "#22c55e" },
    { name: "중립", value: 15, color: "#f59e0b" },
    { name: "부정", value: 5, color: "#ef4444" },
  ]

  const responseRate = (event.feedbackCount / event.totalParticipants) * 100

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{event.title} - 후기 관리</h1>
              <p className="text-sm text-muted-foreground">참여자 후기 및 만족도 관리</p>
            </div>
          </div>
        </div>

        {/* Settings Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">후기 수집 설정</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>후기 수집 활성화</Label>
                <p className="text-sm text-muted-foreground">이벤트 참여 후 자동으로 후기 요청</p>
              </div>
              <Switch checked={feedbackEnabled} onCheckedChange={setFeedbackEnabled} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>자동 전송</Label>
                <p className="text-sm text-muted-foreground">이벤트 종료 1시간 후 자동으로 후기 요청 전송</p>
              </div>
              <Switch checked={autoSend} onCheckedChange={setAutoSend} />
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">평균 만족도</p>
                <div className="flex items-center justify-center gap-1">
                  <p className="text-3xl font-bold">{event.averageRating}</p>
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">응답률</p>
                <p className="text-3xl font-bold">{responseRate.toFixed(0)}%</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">총 후기</p>
                <p className="text-3xl font-bold">{event.feedbackCount}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">긍정 비율</p>
                <div className="flex items-center justify-center gap-1">
                  <p className="text-3xl font-bold text-green-600">80%</p>
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">평점 분포</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ratingDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="rating" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">감성 분석</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={sentimentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name} ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Feedback List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">후기 목록</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {feedbackList.map((feedback) => (
              <div key={feedback.id} className="space-y-3 pb-4 border-b last:border-0">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{feedback.student[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{feedback.student}</p>
                      <p className="text-sm text-muted-foreground">{feedback.studentId}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: feedback.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground pl-12">{feedback.comment}</p>
                <p className="text-xs text-muted-foreground pl-12">{feedback.createdAt}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
