"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

import { DropdownMenuContent } from "@/components/ui/dropdown-menu"

import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { DropdownMenu } from "@/components/ui/dropdown-menu"

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
  Download,
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
  LineChart,
  Line,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ComposedChart,
} from "recharts"

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const projectId = params.id

  // Mock data
  const project = {
    id: projectId,
    name: "2025 신입생 프로그램",
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

  const weeklyParticipationData = [
    { week: "1주차", 등록: 45, 참여: 42, 목표: 50, 달성률: 84 },
    { week: "2주차", 등록: 78, 참여: 71, 목표: 80, 달성률: 88.75 },
    { week: "3주차", 등록: 123, 참여: 115, 목표: 120, 달성률: 95.83 },
    { week: "4주차", 등록: 167, 참여: 159, 목표: 160, 달성률: 99.38 },
    { week: "5주차", 등록: 201, 참여: 195, 목표: 200, 달성률: 97.5 },
    { week: "6주차", 등록: 245, 참여: 245, 목표: 240, 달성률: 102.08 },
  ]

  const demographicData = [
    { category: "참여율", value: 87.5 },
    { category: "완료율", value: 92.3 },
    { category: "만족도", value: 85.7 },
    { category: "재참여율", value: 78.4 },
    { category: "추천의향", value: 81.2 },
  ]

  const monthlyTrendData = [
    { month: "1월", 이벤트: 3, 참여자: 245, 만족도: 4.2, 예산집행률: 23 },
    { month: "2월", 이벤트: 2, 참여자: 180, 만족도: 4.5, 예산집행률: 41 },
    { month: "3월", 이벤트: 4, 참여자: 320, 만족도: 4.3, 예산집행률: 67 },
    { month: "4월", 이벤트: 3, 참여자: 280, 만족도: 4.6, 예산집행률: 85 },
  ]

  const statisticalSummary = {
    totalEvents: projectEvents.length,
    totalParticipants: project.totalParticipants,
    avgParticipationRate: 87.5,
    avgSatisfactionScore: 4.3,
    targetAchievementRate: 95.2,
    completionRate: 92.3,
    budgetUtilizationRate: 85,
    noShowRate: 4.2,
    repeatParticipationRate: 78.4,
  }

  const exportReport = () => {
    console.log("[v0] Generating compliance report...")
    // Implementation for PDF/Excel export
    alert("보고서가 생성되었습니다. (구현 예정)")
  }

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
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <div className="flex items-center gap-3">
                <FolderKanban className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold">{project.name}</h1>
                {getStatusBadge(project.status)}
              </div>
              <p className="text-muted-foreground mt-1">{project.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href={`/admin/projects/${params.id}/edit`}>
                <Edit className="h-4 w-4 mr-2" />
                수정
              </Link>
            </Button>
            <Button onClick={() => router.push(`/admin/events/create?projectId=${params.id}`)}>
              <Plus className="h-4 w-4 mr-2" />
              이벤트 추가
            </Button>
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
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-1">통합 분석 대시보드</h3>
                <p className="text-sm text-muted-foreground">연말 보고 및 컴플라이언스 제출용 고도화 통계</p>
              </div>
              <Button onClick={exportReport} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                보고서 내보내기
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-5">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground">총 이벤트</div>
                  <div className="text-2xl font-bold">{statisticalSummary.totalEvents}건</div>
                  <Progress value={100} className="mt-2" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground">평균 참여율</div>
                  <div className="text-2xl font-bold">{statisticalSummary.avgParticipationRate}%</div>
                  <Progress value={statisticalSummary.avgParticipationRate} className="mt-2" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground">평균 만족도</div>
                  <div className="text-2xl font-bold">{statisticalSummary.avgSatisfactionScore}/5.0</div>
                  <Progress value={statisticalSummary.avgSatisfactionScore * 20} className="mt-2" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground">목표 달성률</div>
                  <div className="text-2xl font-bold">{statisticalSummary.targetAchievementRate}%</div>
                  <Progress value={statisticalSummary.targetAchievementRate} className="mt-2" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground">예산 집행률</div>
                  <div className="text-2xl font-bold">{statisticalSummary.budgetUtilizationRate}%</div>
                  <Progress value={statisticalSummary.budgetUtilizationRate} className="mt-2" />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>주간별 참여 현황 및 목표 달성률</CardTitle>
                <CardDescription>등록, 실제 참여, 목표 대비 달성 현황 (연말 보고용)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <ComposedChart data={weeklyParticipationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="등록" fill="#3b82f6" name="등록 인원" />
                    <Bar yAxisId="left" dataKey="참여" fill="#10b981" name="실제 참여" />
                    <Line yAxisId="left" type="monotone" dataKey="목표" stroke="#f59e0b" strokeWidth={2} name="목표" />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="달성률"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="달성률 (%)"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>핵심 성과 지표 분석</CardTitle>
                  <CardDescription>5가지 핵심 지표의 균형 분석</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={demographicData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="category" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar name="달성도" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>월별 종합 트렌드</CardTitle>
                  <CardDescription>이벤트 수, 참여자, 만족도, 예산 집행률</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="참여자"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        name="참여자 수"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="만족도"
                        stroke="#10b981"
                        strokeWidth={2}
                        name="만족도"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="예산집행률"
                        stroke="#f59e0b"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="예산집행률 (%)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

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

              <Card>
                <CardHeader>
                  <CardTitle>통계 요약 (Statistical Summary)</CardTitle>
                  <CardDescription>연말 보고서 및 컴플라이언스 제출용</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">총 이벤트 수</div>
                      <div className="text-lg font-semibold">{statisticalSummary.totalEvents}건</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">총 참가자 수</div>
                      <div className="text-lg font-semibold">{statisticalSummary.totalParticipants}명</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">평균 참여율</div>
                      <div className="text-lg font-semibold">{statisticalSummary.avgParticipationRate}%</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">평균 만족도</div>
                      <div className="text-lg font-semibold">{statisticalSummary.avgSatisfactionScore}/5.0</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">목표 달성률</div>
                      <div className="text-lg font-semibold">{statisticalSummary.targetAchievementRate}%</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">완료율</div>
                      <div className="text-lg font-semibold">{statisticalSummary.completionRate}%</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">예산 집행률</div>
                      <div className="text-lg font-semibold">{statisticalSummary.budgetUtilizationRate}%</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">노쇼율</div>
                      <div className="text-lg font-semibold">{statisticalSummary.noShowRate}%</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">재참여율</div>
                      <div className="text-lg font-semibold">{statisticalSummary.repeatParticipationRate}%</div>
                    </div>
                  </div>
                  <div className="pt-3 border-t">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>데이터 기준일: 2025년 2월 26일</span>
                      <span>신뢰도: 95%</span>
                    </div>
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
