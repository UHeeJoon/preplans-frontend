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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Card } from "@/components/ui/card"
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
  ArrowLeft,
  Download,
  Upload,
  Trash2,
  Copy,
} from "lucide-react"
import Link from "next/link"

type QuestionType = "text" | "multiple-choice" | "scale" | "checkbox" | "dropdown" | "start" | "end"

interface QuestionNodeData {
  label: string
  type: QuestionType
  required?: boolean
  options?: string[]
  description?: string
}

function QuestionNode({ data, selected }: { data: QuestionNodeData; selected: boolean }) {
  const getIcon = () => {
    switch (data.type) {
      case "start":
        return <Play className="h-5 w-5" />
      case "end":
        return <Share2 className="h-5 w-5" />
      case "text":
        return <FileText className="h-5 w-5" />
      case "multiple-choice":
      case "dropdown":
        return <ListChecks className="h-5 w-5" />
      case "checkbox":
        return <ToggleLeft className="h-5 w-5" />
      case "scale":
        return <Star className="h-5 w-5" />
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

  return (
    <div
      className={`min-w-[260px] rounded-xl border-2 bg-background p-4 shadow-xl transition-all ${
        selected ? "ring-2 ring-primary ring-offset-2" : ""
      } ${getColor()}`}
    >
      {data.type !== "start" && <Handle type="target" position={Position.Top} className="!bg-primary !h-3 !w-3" />}

      <div className="flex items-start gap-3">
        <div className="mt-0.5">{getIcon()}</div>
        <div className="flex-1 space-y-1.5">
          <div className="text-base font-semibold">{data.label}</div>
          {data.description && <div className="text-sm opacity-70">{data.description}</div>}
          {data.required && (
            <Badge variant="secondary" className="text-xs">
              Required
            </Badge>
          )}
        </div>
      </div>

      {data.options && data.options.length > 0 && (
        <div className="mt-3 space-y-1 border-t pt-3">
          {data.options.slice(0, 3).map((option, idx) => (
            <div key={idx} className="text-sm opacity-60">
              • {option}
            </div>
          ))}
          {data.options.length > 3 && <div className="text-sm opacity-60">+{data.options.length - 3} more</div>}
        </div>
      )}

      {data.type !== "end" && <Handle type="source" position={Position.Bottom} className="!bg-primary !h-3 !w-3" />}
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
    position: { x: 400, y: 100 },
    data: { label: "Start Survey", type: "start", description: "Survey entry point" },
  },
]

const initialEdges: Edge[] = []

function SurveyBuilderPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [selectedNode, setSelectedNode] = useState<Node<QuestionNodeData> | null>(null)
  const [surveyTitle, setSurveyTitle] = useState("Untitled Survey")

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
      position: { x: Math.random() * 400 + 200, y: Math.random() * 400 + 300 },
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
  }

  const deleteSelectedNode = () => {
    if (!selectedNode) return
    setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id))
    setEdges((eds) => eds.filter((edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id))
    setSelectedNode(null)
  }

  const duplicateSelectedNode = () => {
    if (!selectedNode) return
    const newNode: Node<QuestionNodeData> = {
      ...selectedNode,
      id: `node-${Date.now()}`,
      position: {
        x: selectedNode.position.x + 50,
        y: selectedNode.position.y + 50,
      },
    }
    setNodes((nds) => [...nds, newNode])
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
    <div className="flex h-screen w-screen flex-col bg-background">
      <div className="flex items-center justify-between border-b bg-background px-6 py-3 shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/admin">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Admin
            </Button>
          </Link>
          <Separator orientation="vertical" className="h-6" />
          <Input
            value={surveyTitle}
            onChange={(e) => setSurveyTitle(e.target.value)}
            className="w-80 font-medium"
            placeholder="Survey title..."
          />
          <Badge variant="outline">Draft</Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Separator orientation="vertical" className="h-6" />
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
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-80 border-r bg-muted/30">
          <ScrollArea className="h-full">
            <div className="p-6 space-y-6">
              <div>
                <h3 className="mb-3 text-base font-semibold">Question Types</h3>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-background hover:bg-accent"
                    size="default"
                    onClick={() => addNode("text")}
                  >
                    <FileText className="mr-3 h-5 w-5" />
                    <div className="flex-1 text-left">
                      <div className="font-medium">Short Text</div>
                      <div className="text-xs text-muted-foreground">Single line input</div>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-background hover:bg-accent"
                    size="default"
                    onClick={() => addNode("multiple-choice")}
                  >
                    <ListChecks className="mr-3 h-5 w-5" />
                    <div className="flex-1 text-left">
                      <div className="font-medium">Multiple Choice</div>
                      <div className="text-xs text-muted-foreground">Select one option</div>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-background hover:bg-accent"
                    size="default"
                    onClick={() => addNode("checkbox")}
                  >
                    <ToggleLeft className="mr-3 h-5 w-5" />
                    <div className="flex-1 text-left">
                      <div className="font-medium">Checkbox</div>
                      <div className="text-xs text-muted-foreground">Select multiple</div>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-background hover:bg-accent"
                    size="default"
                    onClick={() => addNode("dropdown")}
                  >
                    <ChevronDown className="mr-3 h-5 w-5" />
                    <div className="flex-1 text-left">
                      <div className="font-medium">Dropdown</div>
                      <div className="text-xs text-muted-foreground">Compact selection</div>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-background hover:bg-accent"
                    size="default"
                    onClick={() => addNode("scale")}
                  >
                    <Star className="mr-3 h-5 w-5" />
                    <div className="flex-1 text-left">
                      <div className="font-medium">Rating Scale</div>
                      <div className="text-xs text-muted-foreground">1-5 or 1-10 scale</div>
                    </div>
                  </Button>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-3 text-base font-semibold">Control</h3>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-background hover:bg-accent"
                  size="default"
                  onClick={() => addNode("end")}
                >
                  <Share2 className="mr-3 h-5 w-5" />
                  <div className="flex-1 text-left">
                    <div className="font-medium">End Node</div>
                    <div className="text-xs text-muted-foreground">Survey completion</div>
                  </div>
                </Button>
              </div>

              <Separator />

              <Card className="p-4 bg-background">
                <h4 className="mb-3 text-sm font-semibold">Canvas Stats</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Questions</span>
                    <span className="font-medium">{nodes.length - 1}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Connections</span>
                    <span className="font-medium">{edges.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Selected</span>
                    <span className="font-medium">{selectedNode ? "Yes" : "None"}</span>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-muted">
                <h4 className="mb-2 text-sm font-semibold">Instructions</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Click buttons to add nodes</li>
                  <li>• Drag handles to connect</li>
                  <li>• Click nodes to edit</li>
                  <li>• Scroll/pinch to zoom</li>
                  <li>• Drag canvas to pan</li>
                </ul>
              </Card>
            </div>
          </ScrollArea>
        </div>

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
            minZoom={0.3}
            maxZoom={2}
          >
            <Background gap={16} size={1} />
            <Controls showInteractive={false} />
            <Panel position="bottom-right" className="mb-4 mr-4">
              <Card className="p-3">
                <div className="text-sm text-muted-foreground">
                  {nodes.length - 1} questions • {edges.length} connections
                </div>
              </Card>
            </Panel>
          </ReactFlow>
        </div>

        {selectedNode && (
          <div className="w-[420px] border-l bg-background">
            <ScrollArea className="h-full">
              <div className="p-6 space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Edit Question</h3>
                    <p className="text-sm text-muted-foreground mt-1">Configure question settings and options</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedNode(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <Separator />

                {selectedNode?.data.type !== "start" && selectedNode?.data.type !== "end" ? (
                  <>
                    <div className="space-y-2">
                      <Label className="text-base">Question Text</Label>
                      <Textarea
                        value={editingLabel}
                        onChange={(e) => setEditingLabel(e.target.value)}
                        placeholder="Enter your question..."
                        rows={4}
                        className="resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-base">Description</Label>
                      <p className="text-sm text-muted-foreground">Optional context for respondents</p>
                      <Input
                        value={editingDescription}
                        onChange={(e) => setEditingDescription(e.target.value)}
                        placeholder="Add helpful context..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-base">Question Type</Label>
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

                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <Label htmlFor="required" className="text-base">
                          Required Question
                        </Label>
                        <p className="text-sm text-muted-foreground">Respondents must answer</p>
                      </div>
                      <Switch id="required" checked={editingRequired} onCheckedChange={setEditingRequired} />
                    </div>

                    {editingType !== "text" && editingType !== "scale" && (
                      <>
                        <Separator />
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label className="text-base">Answer Options</Label>
                              <p className="text-sm text-muted-foreground mt-1">Define response choices</p>
                            </div>
                            <Button size="sm" variant="outline" onClick={addOption}>
                              <Plus className="mr-1 h-4 w-4" />
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

                    <div className="space-y-2">
                      <Button onClick={updateNodeData} className="w-full" size="lg">
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" onClick={duplicateSelectedNode}>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </Button>
                        <Button variant="destructive" onClick={deleteSelectedNode}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <Card className="p-6 bg-muted text-center">
                    <div className="space-y-2">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-background">
                        {selectedNode.data.type === "start" ? (
                          <Play className="h-6 w-6 text-green-500" />
                        ) : (
                          <Share2 className="h-6 w-6 text-red-500" />
                        )}
                      </div>
                      <h4 className="font-semibold">
                        {selectedNode.data.type === "start" ? "Start Node" : "End Node"}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedNode.data.type === "start"
                          ? "This is the survey entry point. Connect it to your first question to begin the flow."
                          : "This is the survey completion point. Connect your final question here to end the flow."}
                      </p>
                    </div>
                  </Card>
                )}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SurveyBuilderPageWrapper() {
  return (
    <ReactFlowProvider>
      <SurveyBuilderPage />
    </ReactFlowProvider>
  )
}
