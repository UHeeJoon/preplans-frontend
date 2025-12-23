"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  FolderKanban,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Calendar,
  ClipboardList,
  TrendingUp,
  ArrowLeft,
  BarChart3,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function ProjectsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null)

  const mockProjects = [
    {
      id: 1,
      title: "2025 신입생 프로그램",
      description: "신입생 대상 오리엔테이션 및 프로그램",
      eventsCount: 5,
      surveysCount: 3,
      totalParticipants: 245,
      status: "active",
      startDate: "2025-01-15",
      endDate: "2025-02-28",
    },
    {
      id: 2,
      title: "교수 상담 시스템",
      description: "학생-교수 1:1 상담 예약",
      eventsCount: 12,
      surveysCount: 2,
      totalParticipants: 89,
      status: "active",
      startDate: "2025-01-01",
      endDate: "2025-06-30",
    },
    {
      id: 3,
      title: "스터디룸 관리",
      description: "도서관 스터디룸 예약 시스템",
      eventsCount: 8,
      surveysCount: 1,
      totalParticipants: 156,
      status: "active",
      startDate: "2025-01-01",
      endDate: "2025-12-31",
    },
  ]

  const handleEdit = (projectId: number) => {
    router.push(`/admin/projects/${projectId}/edit`)
  }

  const handleDuplicate = (projectId: number) => {
    alert(`프로젝트 #${projectId}를 복제합니다.`)
  }

  const handleDeleteClick = (projectId: number) => {
    setSelectedProjectId(projectId)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    alert(`프로젝트 #${selectedProjectId}를 삭제합니다.`)
    setDeleteDialogOpen(false)
    setSelectedProjectId(null)
  }

  const handleViewDetails = (projectId: number) => {
    router.push(`/admin/projects/${projectId}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Link href="/admin">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <FolderKanban className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">프로젝트 관리</h1>
                  <p className="text-sm text-muted-foreground">이벤트와 설문을 그룹화하여 통합 관리하세요</p>
                </div>
              </div>
            </div>
          </div>
          <Link href="/admin/projects/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              프로젝트 생성
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="프로젝트 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                필터
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Projects Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                    <Badge variant="default">{project.status === "active" ? "진행중" : "완료"}</Badge>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(project.id)}>수정</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDuplicate(project.id)}>복제</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteClick(project.id)}>
                        삭제
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    <div>
                      <div className="font-medium">{project.eventsCount}</div>
                      <div className="text-xs text-muted-foreground">이벤트</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <ClipboardList className="h-4 w-4 text-purple-500" />
                    <div>
                      <div className="font-medium">{project.surveysCount}</div>
                      <div className="text-xs text-muted-foreground">설문</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">총 참가자</div>
                    <div className="text-2xl font-bold">{project.totalParticipants}</div>
                  </div>
                </div>
                <div className="pt-2 space-y-2">
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => handleViewDetails(project.id)}
                  >
                    <BarChart3 className="mr-2 h-4 w-4" />
                    통계 및 상세 보기
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>프로젝트를 삭제하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>
              이 작업은 되돌릴 수 없습니다. 프로젝트와 관련된 모든 이벤트, 설문, 데이터가 영구적으로 삭제됩니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
