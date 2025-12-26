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

export default function CreateSurveyPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    project: "",
    type: "pre-event",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Creating survey:", formData)
    // Navigate to survey builder
    router.push("/admin/surveys/builder")
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-3xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => router.push("/admin/surveys")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">설문 생성</h1>
              <p className="text-muted-foreground">새로운 설문을 생성합니다</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>기본 정보</CardTitle>
              <CardDescription>설문의 기본 정보를 입력하세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">설문 제목*</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="오리엔테이션 만족도 조사"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">설명</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="설문에 대한 간단한 설명"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="project">프로젝트 선택</Label>
                <Select value={formData.project} onValueChange={(value) => handleChange("project", value)}>
                  <SelectTrigger id="project">
                    <SelectValue placeholder="프로젝트를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">신입생 오리엔테이션 2025</SelectItem>
                    <SelectItem value="2">학과 설명회</SelectItem>
                    <SelectItem value="3">캠퍼스 투어</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">설문 유형*</Label>
                <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
                  <SelectTrigger id="type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pre-event">사전 설문</SelectItem>
                    <SelectItem value="post-event">사후 설문</SelectItem>
                    <SelectItem value="general">일반 설문</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/surveys")}>
              <X className="h-4 w-4 mr-2" />
              취소
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              다음 (질문 구성)
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
