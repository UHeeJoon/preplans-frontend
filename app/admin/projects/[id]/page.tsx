"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  FolderKanban,
  ArrowLeft,
  Calendar,
  ClipboardList,
  TrendingUp,
  Users,
  BarChart3,
  Plus,
  Edit,
  MapPin,
  Clock,
} from "lucide-react"

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const projectId = params.id

  // Mock data
  const project = {
    id: projectId,
    title: "2025 신입생 프로그램",
    description: "신입생 대상 오리엔테이션 및 프로그램",
    status: "active",
    startDate: "2025-01-15",
    endDate: "2025-02-28",
    totalParticipants: 245,
  }

  const events = [
    { id: 1, title: "신입생 오리엔테이션", date: "2025-02-01", participants: 145, capacity: 200, location: "대강당" },
    { id: 2, title: "학과 소개", date: "2025-02-05", participants: 89, capacity: 150, location: "공학관 301호" },
    { id: 3, title: "캠퍼스 투어", date: "2025-02-10", participants: 67, capacity: 100, location: "중앙광장" },
  ]

  const surveys = [
    { id: 1, title: "오리엔테이션 만족도", responses: 89, totalSent: 145 },
    { id: 2, title: "프로그램 개선 의견", responses: 56, totalSent: 145 },
    { id: 3, title: "사전 수요 조사", responses: 123, totalSent: 200 },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/admin/projects">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <FolderKanban className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{project.title}</h1>
                <p className="text-sm text-muted-foreground">{project.description}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href={`/admin/projects/${projectId}/edit`}>
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                수정
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">이벤트</span>
              </div>
              <div className="text-3xl font-bold">{events.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <ClipboardList className="h-4 w-4" />
                <span className="text-sm">설문</span>
              </div>
              <div className="text-3xl font-bold">{surveys.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Users className="h-4 w-4" />
                <span className="text-sm">총 참가자</span>
              </div>
              <div className="text-3xl font-bold">{project.totalParticipants}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">평균 참여율</span>
              </div>
              <div className="text-3xl font-bold">68%</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="events" className="space-y-4">
          <TabsList>
            <TabsTrigger value="events">이벤트</TabsTrigger>
            <TabsTrigger value="surveys">설문</TabsTrigger>
            <TabsTrigger value="analytics">통계</TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">프로젝트 이벤트</h3>
              <Link href={`/admin/events/create?projectId=${projectId}`}>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  이벤트 추가
                </Button>
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <Card key={event.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{event.participants}</span>
                      <span className="text-muted-foreground">/ {event.capacity}</span>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => router.push(`/admin/events/${event.id}`)}
                    >
                      상세 보기
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="surveys" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">프로젝트 설문</h3>
              <Link href={`/admin/surveys/builder?projectId=${projectId}`}>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  설문 추가
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {surveys.map((survey) => (
                <Card key={survey.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold mb-2">{survey.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>
                            응답: {survey.responses} / {survey.totalSent}
                          </span>
                          <Badge variant="secondary">
                            {Math.round((survey.responses / survey.totalSent) * 100)}% 완료
                          </Badge>
                        </div>
                      </div>
                      <Button variant="outline">결과 보기</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>프로젝트 통계</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                  <div className="text-center space-y-2">
                    <BarChart3 className="h-12 w-12 mx-auto" />
                    <p>통계 차트 구현 예정</p>
                    <p className="text-sm">이벤트별 참여율, 기간별 추이, 설문 응답률 등</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
