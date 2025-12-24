"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
  Target,
  Activity,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  MessageSquare,
  Eye,
  MoreVertical,
} from "lucide-react"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

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
    budget: 5000000,
    spent: 3200000,
  }

  const projectEvents = [
    {
      id: 1,
      title: "교수 상담",
      type: "예약형",
      date: "2025년 1월 15일",
      participants: 12,
      capacity: 20,
      participationRate: 60,
      satisfaction: 4.5,
      feedbackCount: 10,
      feedbackEnabled: true,
    },
    {
      id: 2,
      title: "논문 작성 워크샵",
      type: "등록형",
      date: "2025년 2월 1일",
      participants: 145,
      capacity: 200,
      participationRate: 72.5,
      satisfaction: 4.2,
      feedbackCount: 120,
      feedbackEnabled: true,
    },
    {
      id: 3,
      title: "학과 행사",
      type: "등록형",
      date: "2025년 3월 10일",
      participants: 0,
      capacity: 150,
      participationRate: 0,
      satisfaction: null,
      feedbackCount: 0,
      feedbackEnabled: false,
    },
  ]

  const surveys = [
    {
      id: 1,
      title: "오리엔테이션 만족도",
      responses: 89,
      totalSent: 145,
      questionCount: 12,
      completionTime: "3분",
      completionRate: 61.4,
      status: "active",
    },
    {
      id: 2,
      title: "프로그램 개선 의견",
      responses: 56,
      totalSent: 145,
      questionCount: 8,
      completionTime: "5분",
      completionRate: 38.6,
      status: "active",
    },
    {
      id: 3,
      title: "사전 수요 조사",
      responses: 123,
      totalSent: 200,
      questionCount: 5,
      completionTime: "2분",
      completionRate: 61.5,
      status: "completed",
    },
  ]

  const participationTrendData = [
    { date: "1/15", participants: 45, target: 50 },
    { date: "1/20", participants: 78, target: 80 },
    { date: "1/25", participants: 123, target: 120 },
    { date: "2/1", participants: 167, target: 160 },
    { date: "2/5", participants: 201, target: 200 },
    { date: "2/10", participants: 245, target: 240 },
  ]

  const eventComparisonData = projectEvents.map((event) => ({
    name: event.title.length > 15 ? event.title.slice(0, 15) + "..." : event.title,
    참여율: Math.round((event.participants / event.capacity) * 100),
    만족도: event.satisfaction ? event.satisfaction * 20 : 0,
  }))

  const surveyResponseData = surveys.map((survey) => ({
    name: survey.title.length > 10 ? survey.title.slice(0, 10) + "..." : survey.title,
    응답률: Math.round((survey.responses / survey.totalSent) * 100),
  }))

  const eventTypeDistribution = [
    { name: "오리엔테이션", value: 35, color: "#3b82f6" },
    { name: "학과 소개", value: 28, color: "#8b5cf6" },
    { name: "캠퍼스 투어", value: 22, color: "#10b981" },
    { name: "기타 활동", value: 15, color: "#f59e0b" },
  ]

  const COLORS = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b"]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">진행중</Badge>
      case "upcoming":
        return <Badge variant="secondary">예정</Badge>
      case "completed":
        return <Badge variant="outline">완료</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

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
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">{project.title}</h1>
                  {getStatusBadge(project.status)}
                </div>
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">이벤트</span>
              </div>
              <div className="text-3xl font-bold">{projectEvents.length}</div>
              <div className="flex items-center gap-1 text-xs text-green-600 mt-2">
                <ArrowUpRight className="h-3 w-3" />
                <span>활성 {projectEvents.filter((e) => e.participationRate > 0).length}개</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <ClipboardList className="h-4 w-4" />
                <span className="text-sm">설문</span>
              </div>
              <div className="text-3xl font-bold">{surveys.length}</div>
              <div className="flex items-center gap-1 text-xs text-blue-600 mt-2">
                <MessageSquare className="h-3 w-3" />
                <span>
                  평균 응답률{" "}
                  {Math.round((surveys.reduce((acc, s) => acc + s.responses / s.totalSent, 0) / surveys.length) * 100)}%
                </span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Users className="h-4 w-4" />
                <span className="text-sm">총 참가자</span>
              </div>
              <div className="text-3xl font-bold">{project.totalParticipants}</div>
              <div className="flex items-center gap-1 text-xs text-green-600 mt-2">
                <TrendingUp className="h-3 w-3" />
                <span>목표 대비 102%</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Target className="h-4 w-4" />
                <span className="text-sm">평균 참여율</span>
              </div>
              <div className="text-3xl font-bold">68%</div>
              <Progress value={68} className="mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Activity className="h-4 w-4" />
                <span className="text-sm">평균 만족도</span>
              </div>
              <div className="text-3xl font-bold">4.3</div>
              <div className="flex items-center gap-1 text-xs text-yellow-600 mt-2">
                <span>★★★★☆</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="events" className="space-y-4">
          <TabsList>
            <TabsTrigger value="events">이벤트</TabsTrigger>
            <TabsTrigger value="surveys">설문</TabsTrigger>
            <TabsTrigger value="analytics">통합 통계</TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">프로젝트 이벤트</h3>
                <p className="text-sm text-muted-foreground">프로젝트에 포함된 모든 이벤트 관리</p>
              </div>
              <Link href={`/admin/events/create?projectId=${projectId}`}>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  이벤트 추가
                </Button>
              </Link>
            </div>

            <div className="grid gap-4">
              {projectEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CardTitle className="text-base">{event.title}</CardTitle>
                        <Badge variant="outline">{event.type}</Badge>
                        {event.feedbackEnabled && (
                          <Badge variant="secondary" className="gap-1">
                            <MessageSquare className="h-3 w-3" />
                            후기 {event.feedbackCount}
                          </Badge>
                        )}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => router.push(`/admin/events/${event.id}`)}>
                            <Eye className="mr-2 h-4 w-4" />
                            상세 보기
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => router.push(`/admin/events/${event.id}/feedback`)}>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            후기 관리
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => router.push(`/admin/events/${event.id}/edit`)}>
                            <Edit className="mr-2 h-4 w-4" />
                            수정
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">날짜</span>
                        <span className="font-medium">{event.date}</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">참여 현황</span>
                          <span className="font-medium">
                            {event.participants} / {event.capacity}
                          </span>
                        </div>
                        <Progress value={event.participationRate} className="h-2" />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">만족도</span>
                        <span className="font-medium">
                          {event.satisfaction ? (
                            <span className="flex items-center gap-1">
                              {event.satisfaction.toFixed(1)} ★
                              <span className="text-xs text-muted-foreground">({event.feedbackCount}명 응답)</span>
                            </span>
                          ) : event.feedbackEnabled ? (
                            "응답 대기 중"
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                alert(`이벤트 #${event.id}에 후기 수집 기능을 활성화합니다.`)
                              }}
                            >
                              후기 수집 활성화
                            </Button>
                          )}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="surveys" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">프로젝트 설문</h3>
                <p className="text-sm text-muted-foreground">프로젝트 관련 설문 조사 현황</p>
              </div>
              <Link href={`/admin/surveys/builder?projectId=${projectId}`}>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  설문 추가
                </Button>
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {surveys.map((survey) => (
                <Card key={survey.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{survey.title}</CardTitle>
                      {getStatusBadge(survey.status)}
                    </div>
                    <CardDescription>
                      {survey.questionCount}개 질문 · 평균 완료 시간: {survey.completionTime}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">응답 현황</div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold">{survey.responses}</span>
                          <span className="text-sm text-muted-foreground">/ {survey.totalSent}</span>
                        </div>
                        <Progress value={survey.completionRate} className="mt-2" />
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">완료율</div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold">{survey.completionRate.toFixed(1)}%</span>
                          {survey.completionRate > 50 ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-yellow-500" />
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">{survey.questionCount}개 질문</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 bg-transparent">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        결과 보기
                      </Button>
                      <Button variant="outline" className="flex-1 bg-transparent">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        응답 보기
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-1">통합 분석 대시보드</h3>
              <p className="text-sm text-muted-foreground">프로젝트 전체 성과 및 트렌드 분석</p>
            </div>

            {/* Participation Trend Chart */}
            <Card>
              <CardHeader>
                <CardTitle>참여자 추이</CardTitle>
                <CardDescription>시간에 따른 참여자 증가 추이 및 목표 달성률</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={participationTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="participants"
                      stackId="1"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      name="실제 참여자"
                    />
                    <Area
                      type="monotone"
                      dataKey="target"
                      stackId="2"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.3}
                      name="목표"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Event Comparison Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>이벤트별 비교</CardTitle>
                  <CardDescription>참여율 및 만족도 비교 분석</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={eventComparisonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="참여율" fill="#3b82f6" />
                      <Bar dataKey="만족도" fill="#8b5cf6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Survey Response Rate */}
              <Card>
                <CardHeader>
                  <CardTitle>설문 응답률</CardTitle>
                  <CardDescription>각 설문의 응답 현황</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={surveyResponseData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip />
                      <Bar dataKey="응답률" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Event Type Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>이벤트 유형 분포</CardTitle>
                  <CardDescription>프로젝트 내 이벤트 유형별 비율</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={eventTypeDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.name} (${entry.value}%)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {eventTypeDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Key Metrics Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>핵심 지표 요약</CardTitle>
                  <CardDescription>프로젝트 주요 성과 지표</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">전체 목표 달성률</span>
                      <span className="font-bold">102%</span>
                    </div>
                    <Progress value={102} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">평균 이벤트 참여율</span>
                      <span className="font-bold">66%</span>
                    </div>
                    <Progress value={66} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">평균 설문 응답률</span>
                      <span className="font-bold">55%</span>
                    </div>
                    <Progress value={55} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">예산 집행률</span>
                      <span className="font-bold">64%</span>
                    </div>
                    <Progress value={64} className="h-2" />
                  </div>

                  <div className="pt-4 border-t space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">종합 평가</span>
                      <Badge className="bg-green-500">우수</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      목표를 초과 달성했으며, 높은 참여율과 만족도를 기록하고 있습니다.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
