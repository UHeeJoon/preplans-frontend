"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Plus, X } from "lucide-react"
import { format } from "date-fns"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

interface CreateEventDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateEventDialog({ open, onOpenChange }: CreateEventDialogProps) {
  const [date, setDate] = useState<Date>()
  const [timeSlots, setTimeSlots] = useState<string[]>([])
  const [newTimeSlot, setNewTimeSlot] = useState("")
  const [requireSurvey, setRequireSurvey] = useState(false)
  const [enableWaitlist, setEnableWaitlist] = useState(true)

  const addTimeSlot = () => {
    if (newTimeSlot && !timeSlots.includes(newTimeSlot)) {
      setTimeSlots([...timeSlots, newTimeSlot])
      setNewTimeSlot("")
    }
  }

  const removeTimeSlot = (slot: string) => {
    setTimeSlots(timeSlots.filter((s) => s !== slot))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
          <DialogDescription>Fill in the details to create a new consultation event</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title</Label>
              <Input id="title" placeholder="e.g., Thesis Consultation Session" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the purpose and topics for this consultation..."
                rows={3}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="professor">Professor</Label>
                <Select>
                  <SelectTrigger id="professor">
                    <SelectValue placeholder="Select professor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prof-kim">Prof. Kim</SelectItem>
                    <SelectItem value="prof-lee">Prof. Lee</SelectItem>
                    <SelectItem value="prof-park">Prof. Park</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="thesis">Thesis</SelectItem>
                    <SelectItem value="academic">Academic</SelectItem>
                    <SelectItem value="career">Career</SelectItem>
                    <SelectItem value="research">Research</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cs">Computer Science</SelectItem>
                    <SelectItem value="eng">Engineering</SelectItem>
                    <SelectItem value="biz">Business</SelectItem>
                    <SelectItem value="arts">Arts</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="e.g., Room 305, Building A" />
              </div>
            </div>
          </div>

          {/* Date and Time Slots */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Event Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Time Slots</Label>
              <div className="flex gap-2">
                <Input
                  type="time"
                  value={newTimeSlot}
                  onChange={(e) => setNewTimeSlot(e.target.value)}
                  placeholder="Add time slot"
                />
                <Button type="button" onClick={addTimeSlot} size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {timeSlots.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {timeSlots.map((slot) => (
                    <Badge key={slot} variant="secondary" className="gap-1">
                      {slot}
                      <button onClick={() => removeTimeSlot(slot)} className="hover:text-destructive">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input id="duration" type="number" placeholder="30" defaultValue="30" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacity">Max Capacity per Slot</Label>
                <Input id="capacity" type="number" placeholder="1" defaultValue="1" />
              </div>
            </div>
          </div>

          {/* Additional Settings */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Waitlist</Label>
                <p className="text-sm text-muted-foreground">Allow students to join waitlist when slots are full</p>
              </div>
              <Switch checked={enableWaitlist} onCheckedChange={setEnableWaitlist} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Require Pre-event Survey</Label>
                <p className="text-sm text-muted-foreground">Students must complete survey before booking</p>
              </div>
              <Switch checked={requireSurvey} onCheckedChange={setRequireSurvey} />
            </div>

            {requireSurvey && (
              <div className="space-y-2">
                <Label htmlFor="survey">Select Survey</Label>
                <Select>
                  <SelectTrigger id="survey">
                    <SelectValue placeholder="Choose a survey" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pre-consultation">Pre-consultation Survey</SelectItem>
                    <SelectItem value="research-interest">Research Interest Survey</SelectItem>
                    <SelectItem value="custom">Custom Survey</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>Create Event</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
