"use client"

import type React from "react"
import { type EdgeProps, getBezierPath, EdgeLabelRenderer, BaseEdge } from "reactflow"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })

  const onEdgeClick = (evt: React.MouseEvent, edgeId: string) => {
    evt.stopPropagation()
    if (data?.onInsertNode) {
      data.onInsertNode(edgeId, labelX, labelY)
    }
  }

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
          }}
          className="nodrag nopan"
        >
          <Button
            onClick={(event) => onEdgeClick(event, id)}
            size="icon"
            variant="secondary"
            className="h-6 w-6 rounded-full bg-primary/90 hover:bg-primary text-primary-foreground shadow-lg border-2 border-background"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </EdgeLabelRenderer>
    </>
  )
}
