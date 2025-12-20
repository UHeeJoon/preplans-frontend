"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Clock } from "lucide-react"
import { TimePicker } from "./time-picker"

interface TimeRangePickerProps {
  startTime: string
  endTime: string
  onChange: (start: string, end: string) => void
  placeholder?: string
}

export function TimeRangePicker({ startTime, endTime, onChange }: TimeRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
          <Clock className="mr-2 h-4 w-4" />
          {startTime && endTime ? `${startTime} - ${endTime}` : "시간 선택"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="text-xs text-muted-foreground mb-1.5">시작 시간</div>
              <TimePicker value={startTime} onChange={(time) => onChange(time, endTime)} placeholder="시작 시간" />
            </div>
            <div className="text-muted-foreground self-end pb-2">-</div>
            <div className="flex-1">
              <div className="text-xs text-muted-foreground mb-1.5">종료 시간</div>
              <TimePicker value={endTime} onChange={(time) => onChange(startTime, time)} placeholder="종료 시간" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
