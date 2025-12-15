"use client"

import type React from "react"

import { useCallback, useState } from "react"
import ReactFlow, {
  addEdge,
  Background,
  type Connection,
  Controls,
  type Edge,
  type Node,
  Panel,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  MarkerType,
  Handle,
  Position,
} from "reactflow"
import "reactflow/dist/style.css"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
  Plus,
  FileText,
  ListChecks,
  ToggleLeft,
  ChevronDown,
  Star,
  Save,
  Play,
  Share2,
  Settings,
  X,
} from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"

interface SurveyFlowBuilderProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type QuestionType = "text" | "multiple-choice" | "scale" | "checkbox" | "dropdown" | "start" | "end"

interface QuestionNodeData {
  label: string
  type: QuestionType
  required?: boolean
  options?: string[]
  description?: string
}

// Custom node component for questions
function QuestionNode({ data, selected }: { data: QuestionNodeData; selected: boolean }) {
  const getIcon = () => {
    switch (data.type) {
      case "start":
        return <Play className="h-4 w-4" />
      case "end":
        return <Share2 className="h-4 w-4" />
      case "text":
        return <FileText className="h-4 w-4" />
      case "multiple-choice":
      case "dropdown":
        return <ListChecks className="h-4 w-4" />
      case "checkbox":
        return <ToggleLeft className="h-4 w-4" />
      case "scale":
        return <Star className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
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

  return (
    <div
      className={`min-w-[220px] rounded-lg border-2 bg-background p-3 shadow-lg transition-all ${
        selected ? "ring-2 ring-primary" : ""
      } ${getColor()}`}
    >
      {data.type !== "start" && <Handle type="target" position={Position.Top} className="!bg-primary" />}

      <div className="flex items-start gap-2">
        <div className="mt-0.5">{getIcon()}</div>
        <div className="flex-1 space-y-1">
          <div className="text-sm font-semibold">{data.label}</div>
          {data.description && <div className="text-xs opacity-70">{data.description}</div>}
          {data.required && (
            <Badge variant="secondary" className="text-xs">
              Required
            </Badge>
          )}
        </div>
      </div>

      {data.options && data.options.length > 0 && (
        <div className="mt-2 space-y-1 border-t pt-2">
          {data.options.slice(0, 2).map((option, idx) => (
            <div key={idx} className="text-xs opacity-60">
              • {option}
            </div>
          ))}
          {data.options.length > 2 && <div className="text-xs opacity-60">+{data.options.length - 2} more</div>}
        </div>
      )}

      {data.type !== "end" && <Handle type="source" position={Position.Bottom} className="!bg-primary" />}
    </div>
  )
}

const nodeTypes = {
  question: QuestionNode,
}

const initialNodes: Node<QuestionNodeData>[] = [
  {
    id: "start",
    type: "question",
    position: { x: 250, y: 50 },
    data: { label: "Start Survey", type: "start", description: "Survey entry point" },
  },
]

const initialEdges: Edge[] = []

function SurveyFlowBuilderContent({ onOpenChange }: { onOpenChange: (open: boolean) => void }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [selectedNode, setSelectedNode] = useState<Node<QuestionNodeData> | null>(null)
  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(false)
  const [surveyTitle, setSurveyTitle] = useState("Untitled Survey")

  // Node editing state
  const [editingLabel, setEditingLabel] = useState("")
  const [editingType, setEditingType] = useState<QuestionType>("text")
  const [editingRequired, setEditingRequired] = useState(false)
  const [editingDescription, setEditingDescription] = useState("")
  const [editingOptions, setEditingOptions] = useState<string[]>([])

  const onConnect = useCallback(
    (params: Connection) => {
      const edge = {
        ...params,
        type: "smoothstep",
        animated: true,
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      }
      setEdges((eds) => addEdge(edge, eds))
    },
    [setEdges],
  )

  const addNode = (type: QuestionType) => {
    const newNode: Node<QuestionNodeData> = {
      id: `node-${Date.now()}`,
      type: "question",
      position: { x: Math.random() * 300 + 100, y: Math.random() * 300 + 200 },
      data: {
        label: type === "end" ? "End Survey" : "New Question",
        type,
        required: false,
        description: "",
        options: type !== "text" && type !== "scale" && type !== "end" ? ["Option 1", "Option 2"] : undefined,
      },
    }
    setNodes((nds) => [...nds, newNode])
  }

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node<QuestionNodeData>) => {
    setSelectedNode(node)
    setEditingLabel(node.data.label)
    setEditingType(node.data.type)
    setEditingRequired(node.data.required || false)
    setEditingDescription(node.data.description || "")
    setEditingOptions(node.data.options || [])
    setIsDetailsPanelOpen(true)
  }, [])

  const updateNodeData = () => {
    if (!selectedNode) return

    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.id) {
          return {
            ...node,
            data: {
              ...node.data,
              label: editingLabel,
              type: editingType,
              required: editingRequired,
              description: editingDescription,
              options: editingOptions,
            },
          }
        }
        return node
      }),
    )
    setIsDetailsPanelOpen(false)
  }

  const deleteSelectedNode = () => {
    if (!selectedNode) return
    setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id))
    setEdges((eds) => eds.filter((edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id))
    setIsDetailsPanelOpen(false)
  }

  const addOption = () => {
    setEditingOptions([...editingOptions, `Option ${editingOptions.length + 1}`])
  }

  const updateOption = (index: number, value: string) => {
    const newOptions = [...editingOptions]
    newOptions[index] = value
    setEditingOptions(newOptions)
  }

  const removeOption = (index: number) => {
    setEditingOptions(editingOptions.filter((_, idx) => idx !== index))
  }

  return (
    <div className="flex h-full w-full flex-col">
      {/* Top toolbar */}
      <div className="flex items-center justify-between border-b bg-background px-4 py-3">
        <div className="flex items-center gap-3">
          <Input
            value={surveyTitle}
            onChange={(e) => setSurveyTitle(e.target.value)}
            className="w-64 font-medium"
            placeholder="Survey title..."
          />
          <Badge variant="outline">Draft</Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button variant="outline" size="sm">
            <Play className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button size="sm">
            <Save className="mr-2 h-4 w-4" />
            Save Survey
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Left sidebar - Node palette */}
        <div className="w-64 border-r bg-muted/30">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-4">
              <div>
                <h3 className="mb-2 text-sm font-semibold">Question Types</h3>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    size="sm"
                    onClick={() => addNode("text")}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Short Text
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    size="sm"
                    onClick={() => addNode("multiple-choice")}
                  >
                    <ListChecks className="mr-2 h-4 w-4" />
                    Multiple Choice
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    size="sm"
                    onClick={() => addNode("checkbox")}
                  >
                    <ToggleLeft className="mr-2 h-4 w-4" />
                    Checkbox
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    size="sm"
                    onClick={() => addNode("dropdown")}
                  >
                    <ChevronDown className="mr-2 h-4 w-4" />
                    Dropdown
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    size="sm"
                    onClick={() => addNode("scale")}
                  >
                    <Star className="mr-2 h-4 w-4" />
                    Rating Scale
                  </Button>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-2 text-sm font-semibold">Control</h3>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  size="sm"
                  onClick={() => addNode("end")}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  End Node
                </Button>
              </div>

              <Separator />

              <div className="rounded-lg bg-background p-3">
                <h4 className="mb-2 text-xs font-semibold">Instructions</h4>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• Click to add nodes</li>
                  <li>• Drag to connect nodes</li>
                  <li>• Click nodes to edit</li>
                  <li>• Use mouse to pan/zoom</li>
                </ul>
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Main canvas */}
        <div className="flex-1 bg-muted/10">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
            minZoom={0.5}
            maxZoom={1.5}
          >
            <Background />
            <Controls />
            <Panel position="bottom-right" className="mb-4 mr-4 rounded-lg bg-background/95 p-2 shadow-lg">
              <div className="text-xs text-muted-foreground">
                {nodes.length - 1} questions • {edges.length} connections
              </div>
            </Panel>
          </ReactFlow>
        </div>
      </div>

      {/* Node details panel */}
      <Sheet open={isDetailsPanelOpen} onOpenChange={setIsDetailsPanelOpen}>
        <SheetContent className="w-96 overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Edit Question</SheetTitle>
            <SheetDescription>Configure question settings and options</SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            {selectedNode?.data.type !== "start" && selectedNode?.data.type !== "end" && (
              <>
                <div className="space-y-2">
                  <Label>Question Text</Label>
                  <Textarea
                    value={editingLabel}
                    onChange={(e) => setEditingLabel(e.target.value)}
                    placeholder="Enter your question..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Description (Optional)</Label>
                  <Input
                    value={editingDescription}
                    onChange={(e) => setEditingDescription(e.target.value)}
                    placeholder="Add helpful context..."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Question Type</Label>
                  <Select value={editingType} onValueChange={(value: QuestionType) => setEditingType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Short Text</SelectItem>
                      <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                      <SelectItem value="checkbox">Checkbox</SelectItem>
                      <SelectItem value="dropdown">Dropdown</SelectItem>
                      <SelectItem value="scale">Rating Scale</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="required">Required Question</Label>
                  <Switch id="required" checked={editingRequired} onCheckedChange={setEditingRequired} />
                </div>

                {editingType !== "text" && editingType !== "scale" && (
                  <>
                    <Separator />
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Answer Options</Label>
                        <Button size="sm" variant="outline" onClick={addOption}>
                          <Plus className="mr-1 h-3 w-3" />
                          Add
                        </Button>
                      </div>

                      <div className="space-y-2">
                        {editingOptions.map((option, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              value={option}
                              onChange={(e) => updateOption(index, e.target.value)}
                              placeholder={`Option ${index + 1}`}
                            />
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => removeOption(index)}
                              disabled={editingOptions.length <= 2}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <Separator />

                <div className="flex gap-2">
                  <Button onClick={updateNodeData} className="flex-1">
                    Save Changes
                  </Button>
                  <Button variant="destructive" onClick={deleteSelectedNode}>
                    Delete
                  </Button>
                </div>
              </>
            )}

            {(selectedNode?.data.type === "start" || selectedNode?.data.type === "end") && (
              <div className="rounded-lg bg-muted p-4 text-center text-sm text-muted-foreground">
                {selectedNode.data.type === "start"
                  ? "This is the survey entry point. Connect it to your first question."
                  : "This is the survey completion point. Connect your final question here."}
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export function SurveyFlowBuilder({ open, onOpenChange }: SurveyFlowBuilderProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0" aria-describedby="survey-flow-description">
        <DialogHeader className="sr-only">
          <DialogTitle>Survey Flow Builder</DialogTitle>
          <DialogDescription id="survey-flow-description">
            Create and edit surveys using a visual node-based interface
          </DialogDescription>
        </DialogHeader>
        <div className="h-[90vh]">
          <ReactFlowProvider>
            <SurveyFlowBuilderContent onOpenChange={onOpenChange} />
          </ReactFlowProvider>
        </div>
      </DialogContent>
    </Dialog>
  )
}
