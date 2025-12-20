"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Filter, Upload, Plus, MoreVertical, Bell } from "lucide-react"

const recentUsers = [
  {
    id: 1,
    name: "김민수",
    email: "minsu.kim@university.edu",
    role: "student",
    department: "Computer Science",
    status: "active",
    joined: "2025-01-10",
  },
  {
    id: 2,
    name: "Dr. Sarah Kim",
    email: "sarah.kim@university.edu",
    role: "professor",
    department: "Computer Science",
    status: "active",
    joined: "2024-09-01",
  },
  {
    id: 3,
    name: "이서연",
    email: "seoyeon.lee@university.edu",
    role: "student",
    department: "Business",
    status: "active",
    joined: "2025-01-12",
  },
]

export default function UsersPage() {
  return (
    <div className="flex-1">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="flex h-16 items-center justify-between px-6">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">User & Group Management</h2>
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
        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center gap-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="사용자 검색..." className="pl-9" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="역할" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">모든 역할</SelectItem>
                  <SelectItem value="student">학생</SelectItem>
                  <SelectItem value="professor">교수</SelectItem>
                  <SelectItem value="admin">관리자</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">고급 필터</span>
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                CSV 가져오기
              </Button>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                사용자 추가
              </Button>
            </div>
          </div>

          {/* Users Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border bg-muted/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-foreground">사용자</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-foreground">이메일</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-foreground">역할</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-foreground">부서</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-foreground">상태</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-foreground">가입일</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-foreground">작업</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user) => (
                      <tr key={user.id} className="border-b border-border last:border-0">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                              {user.name.charAt(0)}
                            </div>
                            <p className="font-medium text-foreground">{user.name}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{user.email}</td>
                        <td className="px-6 py-4">
                          <Badge variant="outline">
                            {user.role === "student" ? "학생" : user.role === "professor" ? "교수" : "관리자"}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{user.department}</td>
                        <td className="px-6 py-4">
                          <Badge variant="default">{user.status === "active" ? "활성" : "비활성"}</Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{user.joined}</td>
                        <td className="px-6 py-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">작업</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>프로필 보기</DropdownMenuItem>
                              <DropdownMenuItem>사용자 수정</DropdownMenuItem>
                              <DropdownMenuItem>권한 관리</DropdownMenuItem>
                              <DropdownMenuItem>활동 기록</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">사용자 비활성화</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
