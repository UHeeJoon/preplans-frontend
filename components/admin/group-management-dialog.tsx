"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, X, Users, Search } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

interface GroupManagementDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function GroupManagementDialog({ open, onOpenChange }: GroupManagementDialogProps) {
  const [newGroupName, setNewGroupName] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const existingGroups = [
    { id: 1, name: "Undergraduate", type: "Academic", members: 1234, color: "blue" },
    { id: 2, name: "Graduate", type: "Academic", members: 456, color: "purple" },
    { id: 3, name: "Year 1", type: "Year", members: 345, color: "green" },
    { id: 4, name: "Year 2", type: "Year", members: 321, color: "green" },
    { id: 5, name: "Year 3", type: "Year", members: 298, color: "green" },
    { id: 6, name: "Year 4", type: "Year", members: 270, color: "green" },
    { id: 7, name: "Computer Science", type: "Department", members: 456, color: "cyan" },
    { id: 8, name: "Engineering", type: "Department", members: 389, color: "cyan" },
    { id: 9, name: "Business", type: "Department", members: 412, color: "cyan" },
    { id: 10, name: "International Students", type: "Special", members: 234, color: "orange" },
  ]

  const groupRules = [
    { id: 1, field: "role", operator: "equals", value: "student" },
    { id: 2, field: "department", operator: "equals", value: "cs" },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Group Management</DialogTitle>
          <DialogDescription>Create and manage user groups for targeted event assignments</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="groups" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="groups">All Groups</TabsTrigger>
            <TabsTrigger value="create">Create Group</TabsTrigger>
          </TabsList>

          <TabsContent value="groups" className="space-y-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search groups..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="year">Year</SelectItem>
                  <SelectItem value="department">Department</SelectItem>
                  <SelectItem value="special">Special</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <ScrollArea className="h-[400px]">
              <div className="space-y-3">
                {existingGroups.map((group) => (
                  <Card key={group.id}>
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{group.name}</p>
                            <Badge variant="outline" className="text-xs">
                              {group.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{group.members} members</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          View Members
                        </Button>
                        <Button variant="ghost" size="sm">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="create" className="space-y-4 mt-4">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="group-name">Group Name</Label>
                  <Input
                    id="group-name"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    placeholder="e.g., Spring 2025 Cohort"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="group-description">Description</Label>
                  <Textarea id="group-description" placeholder="Describe the purpose of this group..." rows={3} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="group-type">Group Type</Label>
                  <Select>
                    <SelectTrigger id="group-type">
                      <SelectValue placeholder="Select group type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="academic">Academic Level</SelectItem>
                      <SelectItem value="year">Year Group</SelectItem>
                      <SelectItem value="department">Department</SelectItem>
                      <SelectItem value="special">Special Interest</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Membership Rules</Label>
                    <Button variant="outline" size="sm">
                      <Plus className="mr-1 h-3 w-3" />
                      Add Rule
                    </Button>
                  </div>

                  <Card className="bg-muted/50">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {groupRules.map((rule, index) => (
                          <div key={rule.id} className="flex items-center gap-2">
                            {index > 0 && <span className="text-sm text-muted-foreground">AND</span>}
                            <Select defaultValue={rule.field}>
                              <SelectTrigger className="w-[140px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="role">Role</SelectItem>
                                <SelectItem value="department">Department</SelectItem>
                                <SelectItem value="year">Year</SelectItem>
                                <SelectItem value="status">Status</SelectItem>
                              </SelectContent>
                            </Select>

                            <Select defaultValue={rule.operator}>
                              <SelectTrigger className="w-[120px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="equals">Equals</SelectItem>
                                <SelectItem value="not-equals">Not Equals</SelectItem>
                                <SelectItem value="contains">Contains</SelectItem>
                              </SelectContent>
                            </Select>

                            <Input className="flex-1" defaultValue={rule.value} />

                            <Button variant="ghost" size="icon">
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>

                      <p className="mt-3 text-xs text-muted-foreground">
                        Rules are evaluated automatically. Users matching all conditions will be added to this group.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Manual Member Addition</Label>
                  <div className="flex gap-2">
                    <Input placeholder="Search and add users..." />
                    <Button variant="outline">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Members
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Add specific users who don't match the automatic rules
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={() => onOpenChange(false)}>Create Group</Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
