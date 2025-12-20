"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Users, Search } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import type { TargetAudience, Group, User } from "@/types/event-types"

interface AudienceSelectorProps {
  value: TargetAudience
  onChange: (value: TargetAudience) => void
}

export function AudienceSelector({ value, onChange }: AudienceSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data - 실제로는 props나 API에서 받아와야 함
  const availableGroups: Group[] = [
    { id: "g1", name: "Undergraduate", type: "Academic", members: 1234 },
    { id: "g2", name: "Graduate", type: "Academic", members: 456 },
    { id: "g3", name: "Year 1", type: "Year", members: 345 },
    { id: "g4", name: "Year 2", type: "Year", members: 321 },
    { id: "g5", name: "Computer Science", type: "Department", members: 456 },
    { id: "g6", name: "Engineering", type: "Department", members: 389 },
  ]

  const availableUsers: User[] = [
    { id: "u1", name: "김민수", email: "minsu@univ.edu", role: "student", department: "CS", status: "active" },
    { id: "u2", name: "이서연", email: "seoyeon@univ.edu", role: "student", department: "Business", status: "active" },
    { id: "u3", name: "박지훈", email: "jihun@univ.edu", role: "student", department: "Engineering", status: "active" },
  ]

  const handleModeChange = (mode: "public" | "groups" | "individuals") => {
    onChange({ ...value, mode, selectedGroups: [], selectedUsers: [] })
  }

  const toggleGroup = (groupId: string) => {
    const currentGroups = value.selectedGroups || []
    const newGroups = currentGroups.includes(groupId)
      ? currentGroups.filter((id) => id !== groupId)
      : [...currentGroups, groupId]
    onChange({ ...value, selectedGroups: newGroups })
  }

  const toggleUser = (userId: string) => {
    const currentUsers = value.selectedUsers || []
    const newUsers = currentUsers.includes(userId)
      ? currentUsers.filter((id) => id !== userId)
      : [...currentUsers, userId]
    onChange({ ...value, selectedUsers: newUsers })
  }

  const getSelectedGroupNames = () => {
    return availableGroups.filter((g) => value.selectedGroups?.includes(g.id)).map((g) => g.name)
  }

  const getSelectedUserNames = () => {
    return availableUsers.filter((u) => value.selectedUsers?.includes(u.id)).map((u) => u.name)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">
          <Users className="inline h-4 w-4 mr-1" />
          예약 대상 선택
        </CardTitle>
        <CardDescription>이 이벤트를 예약할 수 있는 사용자를 지정합니다</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <RadioGroup value={value.mode} onValueChange={handleModeChange}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="public" id="mode-public" />
            <Label htmlFor="mode-public" className="font-normal cursor-pointer">
              공개 (모든 사용자)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="groups" id="mode-groups" />
            <Label htmlFor="mode-groups" className="font-normal cursor-pointer">
              그룹 기반 선택
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="individuals" id="mode-individuals" />
            <Label htmlFor="mode-individuals" className="font-normal cursor-pointer">
              개별 사용자 선택
            </Label>
          </div>
        </RadioGroup>

        {value.mode === "groups" && (
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="그룹 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <ScrollArea className="h-[200px] rounded-md border p-3">
              <div className="space-y-2">
                {availableGroups
                  .filter((group) => group.name.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((group) => (
                    <div key={group.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`group-${group.id}`}
                        checked={value.selectedGroups?.includes(group.id)}
                        onCheckedChange={() => toggleGroup(group.id)}
                      />
                      <label
                        htmlFor={`group-${group.id}`}
                        className="flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <span>{group.name}</span>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {group.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{group.members}명</span>
                          </div>
                        </div>
                      </label>
                    </div>
                  ))}
              </div>
            </ScrollArea>

            {(value.selectedGroups?.length || 0) > 0 && (
              <div className="flex flex-wrap gap-2">
                {getSelectedGroupNames().map((name) => (
                  <Badge key={name} variant="secondary">
                    {name}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        )}

        {value.mode === "individuals" && (
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="사용자 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <ScrollArea className="h-[200px] rounded-md border p-3">
              <div className="space-y-2">
                {availableUsers
                  .filter(
                    (user) =>
                      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
                  )
                  .map((user) => (
                    <div key={user.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`user-${user.id}`}
                        checked={value.selectedUsers?.includes(user.id)}
                        onCheckedChange={() => toggleUser(user.id)}
                      />
                      <label
                        htmlFor={`user-${user.id}`}
                        className="flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span>{user.name}</span>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {user.department}
                          </Badge>
                        </div>
                      </label>
                    </div>
                  ))}
              </div>
            </ScrollArea>

            {(value.selectedUsers?.length || 0) > 0 && (
              <div className="flex flex-wrap gap-2">
                {getSelectedUserNames().map((name) => (
                  <Badge key={name} variant="secondary">
                    {name}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
