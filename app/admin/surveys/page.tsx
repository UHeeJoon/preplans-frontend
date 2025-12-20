"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Search, ClipboardList } from "lucide-react"
import Link from "next/link"

export default function SurveysPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <ClipboardList className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">설문조사</h1>
                <p className="text-sm text-muted-foreground">설문조사를 생성하고 관리하세요</p>
              </div>
            </div>
          </div>
          <Link href="/admin/surveys/builder">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              설문 생성
            </Button>
          </Link>
        </div>

        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="설문조사 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardContent>
        </Card>

        <div className="text-center py-12">
          <ClipboardList className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium text-foreground">아직 생성된 설문조사가 없습니다</h3>
          <p className="mt-2 text-sm text-muted-foreground">위의 버튼을 클릭하여 첫 설문조사를 만들어보세요</p>
          <Link href="/admin/surveys/builder">
            <Button className="mt-4">
              <Plus className="mr-2 h-4 w-4" />첫 설문조사 만들기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
