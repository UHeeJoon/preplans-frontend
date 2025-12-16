"use client"
import { useState } from "react"
import { Handle, Position, type Node } from "reactflow"
import { Button } from "@/components/ui/button"
import {
  Play,
  Share2,
  FileText,
  Star,
  AlignLeft,
  Circle,
  CheckSquare,
  Mail,
  Hash,
  Calendar,
  Plus,
  Pencil,
} from "lucide-react"

export type QuestionType =
  | "text"
  | "scale"
  | "start"
  | "end"
  | "textarea"
  | "number"
  | "email"
  | "date"
  | "radio"
  | "checkbox"
  | "rating"

export interface QuestionNodeData {
  label: string
  type: QuestionType
  required?: boolean
  options?: string[]
  description?: string
  conditionalTargets?: Record<string, string>
  question?: string
}

interface NodeProps<T> extends Node<T> {
  selected: boolean
}

export const QuestionNode = ({ id, data, selected }: NodeProps<QuestionNodeData>) => {
  const [isHovered, setIsHovered] = useState(false)
  const [showPlusButtons, setShowPlusButtons] = useState(false)

  const getIcon = () => {
    switch (data.type) {
      case "start":
        return <Play className="h-5 w-5" />
      case "end":
        return <Share2 className="h-5 w-5" />
      case "text":
        return <FileText className="h-5 w-5" />
      case "scale":
      case "rating":
        return <Star className="h-5 w-5" />
      case "textarea":
        return <AlignLeft className="h-5 w-5" />
      case "radio":
        return <Circle className="h-5 w-5" />
      case "checkbox":
        return <CheckSquare className="h-5 w-5" />
      case "email":
        return <Mail className="h-5 w-5" />
      case "number":
        return <Hash className="h-5 w-5" />
      case "date":
        return <Calendar className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  const getColor = () => {
    switch (data.type) {
      case "start":
        return "bg-green-500/10 border-green-500 text-green-700 dark:text-green-400"
      case "end":
        return "bg-red-500/10 border-red-500 text-red-700 dark:text-red-400"
      default:
        return "bg-blue-500/10 border-blue-500 text-blue-700 dark:text-blue-400"
    }
  }

  const canBranch = data.type === "radio"
  const hasOptions = data.options && data.options.length > 0

  return (
    <div
      onMouseEnter={() => {
        setIsHovered(true)
        setShowPlusButtons(true)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        setShowPlusButtons(false)
      }}
      className={
        selected
          ? `relative min-w-[280px] max-w-[340px] rounded-xl border-2 bg-background p-4 shadow-xl transition-all ring-2 ring-primary ring-offset-2 ${getColor()}`
          : `relative min-w-[280px] max-w-[340px] rounded-xl border-2 bg-background p-4 shadow-xl transition-all ${getColor()}`
      }
    >
      {/* Target Handles - All nodes except start */}
      {data.type !== "start" && (
        <>
          <Handle
            type="target"
            position={Position.Top}
            id={`${id}-target-top`}
            className={
              isHovered
                ? "!w-3 !h-3 !border-2 !border-primary !bg-background transition-opacity opacity-100"
                : "!w-3 !h-3 !border-2 !border-primary !bg-background transition-opacity opacity-0"
            }
            style={{ top: "-6px" }}
          />
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-target-left`}
            className={
              isHovered
                ? "!w-3 !h-3 !border-2 !border-primary !bg-background transition-opacity opacity-100"
                : "!w-3 !h-3 !border-2 !border-primary !bg-background transition-opacity opacity-0"
            }
            style={{ left: "-6px" }}
          />
          {!canBranch && (
            <Handle
              type="target"
              position={Position.Right}
              id={`${id}-target-right`}
              className={
                isHovered
                  ? "!w-3 !h-3 !border-2 !border-primary !bg-background transition-opacity opacity-100"
                  : "!w-3 !h-3 !border-2 !border-primary !bg-background transition-opacity opacity-0"
              }
              style={{ right: "-6px" }}
            />
          )}
          <Handle
            type="target"
            position={Position.Bottom}
            id={`${id}-target-bottom`}
            className={
              isHovered
                ? "!w-3 !h-3 !border-2 !border-primary !bg-background transition-opacity opacity-100"
                : "!w-3 !h-3 !border-2 !border-primary !bg-background transition-opacity opacity-0"
            }
            style={{ bottom: "-6px" }}
          />
        </>
      )}

      {/* Source Handles - All nodes except end and branching nodes */}
      {data.type !== "end" && !canBranch && (
        <>
          <Handle
            type="source"
            position={Position.Top}
            id={`${id}-source-top`}
            className={
              isHovered
                ? "!w-3 !h-3 !border-2 !border-primary !bg-background transition-opacity opacity-100"
                : "!w-3 !h-3 !border-2 !border-primary !bg-background transition-opacity opacity-0"
            }
            style={{ top: "-6px" }}
          />
          <Handle
            type="source"
            position={Position.Left}
            id={`${id}-source-left`}
            className={
              isHovered
                ? "!w-3 !h-3 !border-2 !border-primary !bg-background transition-opacity opacity-100"
                : "!w-3 !h-3 !border-2 !border-primary !bg-background transition-opacity opacity-0"
            }
            style={{ left: "-6px" }}
          />
          <Handle
            type="source"
            position={Position.Right}
            id={`${id}-source-right`}
            className={
              isHovered
                ? "!w-3 !h-3 !border-2 !border-primary !bg-background transition-opacity opacity-100"
                : "!w-3 !h-3 !border-2 !border-primary !bg-background transition-opacity opacity-0"
            }
            style={{ right: "-6px" }}
          />
          <Handle
            type="source"
            position={Position.Bottom}
            id={`${id}-source-bottom`}
            className={
              isHovered
                ? "!w-3 !h-3 !border-2 !border-primary !bg-background transition-opacity opacity-100"
                : "!w-3 !h-3 !border-2 !border-primary !bg-background transition-opacity opacity-0"
            }
            style={{ bottom: "-6px" }}
          />
        </>
      )}

      {/* Main content */}
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">{getIcon()}</div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm mb-1">
            {data.type === "start" && "Start Survey"}
            {data.type === "end" && "End Survey"}
            {data.type === "text" && "Short Text"}
            {data.type === "textarea" && "Long Text"}
            {data.type === "email" && "Email"}
            {data.type === "number" && "Number"}
            {data.type === "date" && "Date"}
            {data.type === "radio" && "Single Choice"}
            {data.type === "checkbox" && "Multiple Choice"}
            {data.type === "scale" && "Scale"}
            {data.type === "rating" && "Rating"}
          </div>
          <div className="text-xs opacity-70 line-clamp-2">{data.question || data.label || "New question"}</div>

          {canBranch && hasOptions && (
            <div className="mt-3 space-y-2">
              {data.options?.map((option: string, idx: number) => (
                <div key={idx} className="relative group">
                  <div className="flex items-center gap-2 text-xs bg-muted/50 rounded-md px-3 py-2 border border-border/50 hover:border-primary/50 transition-colors pr-12">
                    <Circle className="h-3 w-3 flex-shrink-0 text-primary" />
                    <span className="flex-1 truncate font-medium">{option}</span>

                    {/* Connection handle positioned at right border center */}
                    <Handle
                      type="source"
                      position={Position.Right}
                      id={`${id}-option-${idx}`}
                      className={
                        isHovered
                          ? "!absolute !right-0 !top-1/2 !-translate-y-1/2 !translate-x-1/2 !w-3 !h-3 !border-2 !border-primary !bg-background transition-opacity opacity-100 !z-10"
                          : "!absolute !right-0 !top-1/2 !-translate-y-1/2 !translate-x-1/2 !w-3 !h-3 !border-2 !border-primary !bg-background transition-opacity opacity-0 !z-10"
                      }
                      onMouseDown={(e) => {
                        const clickTime = Date.now()
                        ;(e.target as any).__clickTime = clickTime
                      }}
                      onMouseUp={(e) => {
                        const clickTime = (e.target as any).__clickTime
                        const now = Date.now()
                        if (now - clickTime < 200) {
                          e.stopPropagation()
                          ;(window as any).__triggerAddNode?.({
                            nodeId: id,
                            direction: "right",
                            optionIndex: idx,
                          })
                        }
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Edit button */}
        {data.type !== "start" && data.type !== "end" && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => {
              ;(window as any).__editNode?.(id)
            }}
          >
            <Pencil className="h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Plus buttons for adding nodes - not shown for single choice */}
      {showPlusButtons && data.type !== "end" && data.type !== "radio" && (
        <>
          <Handle
            type="source"
            position={Position.Top}
            id={`${id}-top`}
            className="absolute -top-5 left-1/2 -translate-x-1/2 h-9 w-9 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg border-2 border-background flex items-center justify-center cursor-pointer z-10 opacity-100"
            style={{ background: "hsl(var(--primary))", border: "2px solid hsl(var(--background))" }}
            onMouseDown={(e) => {
              const clickTime = Date.now()
              ;(e.target as any).__clickTime = clickTime
            }}
            onMouseUp={(e) => {
              const clickTime = (e.target as any).__clickTime
              const now = Date.now()
              if (now - clickTime < 200) {
                e.stopPropagation()
                ;(window as any).__triggerAddNode?.({ nodeId: id, direction: "top" })
              }
            }}
          >
            <Plus className="h-5 w-5 pointer-events-none" style={{ color: "hsl(var(--primary-foreground))" }} />
          </Handle>

          <Handle
            type="source"
            position={Position.Right}
            id={`${id}-right`}
            className="absolute top-1/2 -translate-y-1/2 -right-5 h-9 w-9 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg border-2 border-background flex items-center justify-center cursor-pointer z-10 opacity-100"
            style={{ background: "hsl(var(--primary))", border: "2px solid hsl(var(--background))" }}
            onMouseDown={(e) => {
              const clickTime = Date.now()
              ;(e.target as any).__clickTime = clickTime
            }}
            onMouseUp={(e) => {
              const clickTime = (e.target as any).__clickTime
              const now = Date.now()
              if (now - clickTime < 200) {
                e.stopPropagation()
                ;(window as any).__triggerAddNode?.({ nodeId: id, direction: "right" })
              }
            }}
          >
            <Plus className="h-5 w-5 pointer-events-none" style={{ color: "hsl(var(--primary-foreground))" }} />
          </Handle>

          <Handle
            type="source"
            position={Position.Bottom}
            id={`${id}-bottom`}
            className="absolute -bottom-5 left-1/2 -translate-x-1/2 h-9 w-9 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg border-2 border-background flex items-center justify-center cursor-pointer z-10 opacity-100"
            style={{ background: "hsl(var(--primary))", border: "2px solid hsl(var(--background))" }}
            onMouseDown={(e) => {
              const clickTime = Date.now()
              ;(e.target as any).__clickTime = clickTime
            }}
            onMouseUp={(e) => {
              const clickTime = (e.target as any).__clickTime
              const now = Date.now()
              if (now - clickTime < 200) {
                e.stopPropagation()
                ;(window as any).__triggerAddNode?.({ nodeId: id, direction: "bottom" })
              }
            }}
          >
            <Plus className="h-5 w-5 pointer-events-none" style={{ color: "hsl(var(--primary-foreground))" }} />
          </Handle>

          <Handle
            type="source"
            position={Position.Left}
            id={`${id}-left`}
            className="absolute top-1/2 -translate-y-1/2 -left-5 h-9 w-9 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg border-2 border-background flex items-center justify-center cursor-pointer z-10 opacity-100"
            style={{ background: "hsl(var(--primary))", border: "2px solid hsl(var(--background))" }}
            onMouseDown={(e) => {
              const clickTime = Date.now()
              ;(e.target as any).__clickTime = clickTime
            }}
            onMouseUp={(e) => {
              const clickTime = (e.target as any).__clickTime
              const now = Date.now()
              if (now - clickTime < 200) {
                e.stopPropagation()
                ;(window as any).__triggerAddNode?.({ nodeId: id, direction: "left" })
              }
            }}
          >
            <Plus className="h-5 w-5 pointer-events-none" style={{ color: "hsl(var(--primary-foreground))" }} />
          </Handle>
        </>
      )}
    </div>
  )
}
