"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, X } from "lucide-react"

export default function EditProjectPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  // Mock data - replace with actual data fetching
  const [formData, setFormData] = useState({
    name: "신입생 오리엔테이션 2025",
    description: "2025학년도 신입생을 위한 종합 오리엔테이션 프로그램",
    startDate: "2025-01-15",
    endDate: "2025-02-15",
    status: "active",
    targetParticipants: "300",
    budget: "5000000",
    department: "학생처",
    manager: "김담당",
    contact: "02-1234-5678",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Updating project:", formData)
    // API call to update project
    router.push(`/admin/projects/${params.id}`)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-4xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">프로젝트 수정</h1>
              <p className="text-muted-foreground">프로젝트 정보를 수정합니다</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>기본 정보</CardTitle>
              <CardDescription>프로젝트의 기본 정보를 입력하세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">프로젝트 명*</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="신입생 오리엔테이션 2025"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">설명*</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="프로젝트에 대한 상세 설명을 입력하세요"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">시작일*</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleChange("startDate", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">종료일*</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleChange("endDate", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">상태*</Label>
                <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">진행중</SelectItem>
                    <SelectItem value="upcoming">예정</SelectItem>
                    <SelectItem value="completed">완료</SelectItem>
                    <SelectItem value="archived">보관</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Project Details */}
          <Card>
            <CardHeader>
              <CardTitle>프로젝트 세부 정보</CardTitle>
              <CardDescription>목표 및 예산 정보를 입력하세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="targetParticipants">목표 참가자 수</Label>
                  <Input
                    id="targetParticipants"
                    type="number"
                    value={formData.targetParticipants}
                    onChange={(e) => handleChange("targetParticipants", e.target.value)}
                    placeholder="300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">예산 (원)</Label>
                  <Input
                    id="budget"
                    type="number"
                    value={formData.budget}
                    onChange={(e) => handleChange("budget", e.target.value)}
                    placeholder="5000000"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>담당자 정보</CardTitle>
              <CardDescription>프로젝트 담당자 정보를 입력하세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">담당 부서</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => handleChange("department", e.target.value)}
                    placeholder="학생처"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manager">담당자</Label>
                  <Input
                    id="manager"
                    value={formData.manager}
                    onChange={(e) => handleChange("manager", e.target.value)}
                    placeholder="김담당"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact">연락처</Label>
                <Input
                  id="contact"
                  value={formData.contact}
                  onChange={(e) => handleChange("contact", e.target.value)}
                  placeholder="02-1234-5678"
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              <X className="h-4 w-4 mr-2" />
              취소
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              저장
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
