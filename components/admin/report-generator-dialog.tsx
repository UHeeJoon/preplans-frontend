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
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Download } from "lucide-react"
import { format } from "date-fns"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"

interface ReportGeneratorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  reportType?: string
}

export function ReportGeneratorDialog({ open, onOpenChange, reportType }: ReportGeneratorDialogProps) {
  const [dateFrom, setDateFrom] = useState<Date>()
  const [dateTo, setDateTo] = useState<Date>()
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(["bookings", "attendance", "completion"])

  const metrics = [
    { id: "bookings", label: "Total Bookings" },
    { id: "attendance", label: "Attendance Rate" },
    { id: "completion", label: "Completion Rate" },
    { id: "waitlist", label: "Waitlist Statistics" },
    { id: "noshow", label: "No-show Analysis" },
    { id: "feedback", label: "Survey Responses" },
  ]

  const toggleMetric = (metricId: string) => {
    setSelectedMetrics((prev) => (prev.includes(metricId) ? prev.filter((id) => id !== metricId) : [...prev, metricId]))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Generate Report</DialogTitle>
          <DialogDescription>Configure report parameters and export options</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Report Type */}
          <div className="space-y-2">
            <Label htmlFor="report-type">Report Type</Label>
            <Select defaultValue={reportType || "event-summary"}>
              <SelectTrigger id="report-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="event-summary">Event Summary Report</SelectItem>
                <SelectItem value="booking-analysis">Booking Analysis Report</SelectItem>
                <SelectItem value="student-engagement">Student Engagement Report</SelectItem>
                <SelectItem value="attendance">Attendance Report</SelectItem>
                <SelectItem value="professor-workload">Professor Workload Report</SelectItem>
                <SelectItem value="survey-responses">Survey Responses Report</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Range */}
          <div className="space-y-2">
            <Label>Date Range</Label>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="date-from" className="text-xs text-muted-foreground">
                  From
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateFrom ? format(dateFrom, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label htmlFor="date-to" className="text-xs text-muted-foreground">
                  To
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateTo ? format(dateTo, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Quick Date Ranges */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => {}}>
              Last 7 Days
            </Button>
            <Button variant="outline" size="sm" onClick={() => {}}>
              Last 30 Days
            </Button>
            <Button variant="outline" size="sm" onClick={() => {}}>
              This Semester
            </Button>
          </div>

          {/* Metrics Selection */}
          <div className="space-y-3">
            <Label>Include Metrics</Label>
            <Card>
              <CardContent className="p-4">
                <div className="grid gap-3">
                  {metrics.map((metric) => (
                    <div key={metric.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={metric.id}
                        checked={selectedMetrics.includes(metric.id)}
                        onCheckedChange={() => toggleMetric(metric.id)}
                      />
                      <label
                        htmlFor={metric.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {metric.label}
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Export Format */}
          <div className="space-y-2">
            <Label htmlFor="export-format">Export Format</Label>
            <Select defaultValue="pdf">
              <SelectTrigger id="export-format">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF Document</SelectItem>
                <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                <SelectItem value="csv">CSV File</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>
            <Download className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
