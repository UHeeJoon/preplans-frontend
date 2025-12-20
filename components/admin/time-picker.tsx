"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Clock } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface TimePickerProps {
  value?: string // HH:mm format
  onChange: (time: string) => void
  placeholder?: string
}

export function TimePicker({ value, onChange, placeholder = "시간 선택" }: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"))
  const minutes = ["00", "15", "30", "45"]

  const [selectedHour, selectedMinute] = value ? value.split(":") : ["09", "00"]

  const handleTimeSelect = (hour: string, minute: string) => {
    onChange(`${hour}:${minute}`)
    setIsOpen(false)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
          <Clock className="mr-2 h-4 w-4" />
          {value || placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex">
          <ScrollArea className="h-[200px]">
            <div className="p-2">
              <div className="text-xs font-medium text-muted-foreground px-2 pb-1">시간</div>
              {hours.map((hour) => (
                <Button
                  key={hour}
                  variant={selectedHour === hour ? "default" : "ghost"}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => handleTimeSelect(hour, selectedMinute)}
                >
                  {hour}
                </Button>
              ))}
            </div>
          </ScrollArea>
          <div className="border-l" />
          <ScrollArea className="h-[200px]">
            <div className="p-2">
              <div className="text-xs font-medium text-muted-foreground px-2 pb-1">분</div>
              {minutes.map((minute) => (
                <Button
                  key={minute}
                  variant={selectedMinute === minute ? "default" : "ghost"}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => handleTimeSelect(selectedHour, minute)}
                >
                  {minute}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  )
}
