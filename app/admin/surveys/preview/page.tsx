"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, CheckCircle, X } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function SurveyPreviewPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [surveyData, setSurveyData] = useState<any>(null)
  const [currentNodeId, setCurrentNodeId] = useState<string | null>(null)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [visitedNodes, setVisitedNodes] = useState<string[]>([])
  const [showSidebar, setShowSidebar] = useState(true)

  useEffect(() => {
    const data = sessionStorage.getItem("survey-preview-data")
    if (data) {
      const parsedData = JSON.parse(data)
      setSurveyData(parsedData)

      const startNode = parsedData.nodes.find((n: any) => n.data.type === "start")
      if (startNode) {
        const firstNode = getNextNodeFromData(parsedData, startNode.id)
        if (firstNode) {
          setCurrentNodeId(firstNode)
          setVisitedNodes([startNode.id, firstNode])
        }
      }
    }
  }, [])

  const getNextNodeFromData = (data: any, sourceId: string, answer?: any): string | null => {
    const sourceNode = data.nodes.find((n: any) => n.id === sourceId)
    if (!sourceNode) return null

    if (sourceNode.data.type === "radio" || sourceNode.data.type === "checkbox") {
      if (answer !== undefined && answer !== null) {
        const selectedOptions = Array.isArray(answer) ? answer : [answer]

        for (const option of selectedOptions) {
          const optionEdge = data.edges.find((e: any) => e.source === sourceId && e.sourceHandle === `option-${option}`)
          if (optionEdge) {
            return optionEdge.target
          }
        }
      }
    }

    const defaultEdge = data.edges.find(
      (e: any) => e.source === sourceId && (!e.sourceHandle || e.sourceHandle === "next"),
    )
    return defaultEdge?.target || null
  }

  const getPreviousNodeId = (): string | null => {
    if (visitedNodes.length < 2) return null
    return visitedNodes[visitedNodes.length - 2]
  }

  const handleAnswer = (nodeId: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [nodeId]: value }))
  }

  const goToNext = () => {
    if (!currentNodeId || !surveyData) return

    const currentNode = surveyData.nodes.find((n: any) => n.id === currentNodeId)
    if (!currentNode) return

    if (currentNode.data.required) {
      const answer = answers[currentNodeId]
      if (answer === undefined || answer === "" || answer === null || (Array.isArray(answer) && answer.length === 0)) {
        return
      }
    }

    const answer = answers[currentNodeId]
    const nextNodeId = getNextNodeFromData(surveyData, currentNodeId, answer)

    if (nextNodeId) {
      setCurrentNodeId(nextNodeId)
      setVisitedNodes((prev) => [...prev, nextNodeId])
    } else {
      const endNode = surveyData.nodes.find((n: any) => n.data.type === "end")
      if (endNode) {
        setCurrentNodeId(endNode.id)
        setVisitedNodes((prev) => [...prev, endNode.id])
      }
    }
  }

  const goToPrevious = () => {
    const prevNodeId = getPreviousNodeId()
    if (prevNodeId) {
      setCurrentNodeId(prevNodeId)
      setVisitedNodes((prev) => prev.slice(0, -1))
    }
  }

  const jumpToNode = (nodeId: string) => {
    setCurrentNodeId(nodeId)
    if (!visitedNodes.includes(nodeId)) {
      setVisitedNodes((prev) => [...prev, nodeId])
    }
  }

  const canProceed = (): boolean => {
    if (!currentNodeId || !surveyData) return false

    const currentNode = surveyData.nodes.find((n: any) => n.id === currentNodeId)
    if (!currentNode) return false
    if (currentNode.data.type === "end") return false

    if (currentNode.data.required) {
      const answer = answers[currentNodeId]
      if (answer === undefined || answer === "" || answer === null || (Array.isArray(answer) && answer.length === 0)) {
        return false
      }
    }

    return true
  }

  const renderQuestionContent = () => {
    if (!currentNodeId || !surveyData) return null

    const currentNode = surveyData.nodes.find((n: any) => n.id === currentNodeId)
    if (!currentNode) return null

    const { data } = currentNode
    const currentAnswer = answers[currentNodeId]

    if (data.type === "end") {
      return (
        <div className="text-center space-y-6 py-16">
          <div className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
            <CheckCircle className="h-14 w-14 text-green-600" />
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-bold">{data.label}</h2>
            {data.description && <p className="text-lg text-muted-foreground">{data.description}</p>}
          </div>
          <Button onClick={() => router.back()} size="lg" className="mt-8">
            Exit Preview
          </Button>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">
            {data.label}
            {data.required && <span className="text-destructive ml-1">*</span>}
          </h2>
          {data.description && <p className="text-muted-foreground">{data.description}</p>}
        </div>

        <div className="space-y-4">
          {data.type === "text" && (
            <Input
              placeholder="Type your answer..."
              value={currentAnswer || ""}
              onChange={(e) => handleAnswer(currentNodeId, e.target.value)}
            />
          )}

          {data.type === "textarea" && (
            <Textarea
              placeholder="Type your answer..."
              value={currentAnswer || ""}
              onChange={(e) => handleAnswer(currentNodeId, e.target.value)}
              rows={6}
            />
          )}

          {data.type === "number" && (
            <Input
              type="number"
              placeholder="Enter a number..."
              value={currentAnswer || ""}
              onChange={(e) => handleAnswer(currentNodeId, e.target.value)}
            />
          )}

          {data.type === "email" && (
            <Input
              type="email"
              placeholder="your@email.com"
              value={currentAnswer || ""}
              onChange={(e) => handleAnswer(currentNodeId, e.target.value)}
            />
          )}

          {data.type === "date" && (
            <Input
              type="date"
              value={currentAnswer || ""}
              onChange={(e) => handleAnswer(currentNodeId, e.target.value)}
            />
          )}

          {data.type === "radio" && (
            <RadioGroup value={currentAnswer || ""} onValueChange={(val) => handleAnswer(currentNodeId, val)}>
              <div className="space-y-3">
                {data.options?.map((option: string, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-accent cursor-pointer"
                  >
                    <RadioGroupItem value={option} id={`${currentNodeId}-${idx}`} />
                    <Label htmlFor={`${currentNodeId}-${idx}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          )}

          {data.type === "checkbox" && (
            <div className="space-y-3">
              {data.options?.map((option: string, idx: number) => (
                <div key={idx} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-accent">
                  <Checkbox
                    id={`${currentNodeId}-${idx}`}
                    checked={(currentAnswer || []).includes(option)}
                    onCheckedChange={(checked) => {
                      const newValue = checked
                        ? [...(currentAnswer || []), option]
                        : (currentAnswer || []).filter((v: string) => v !== option)
                      handleAnswer(currentNodeId, newValue)
                    }}
                  />
                  <Label htmlFor={`${currentNodeId}-${idx}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          )}

          {data.type === "dropdown" && (
            <Select value={currentAnswer || ""} onValueChange={(val) => handleAnswer(currentNodeId, val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select an option..." />
              </SelectTrigger>
              <SelectContent>
                {data.options?.map((option: string, idx: number) => (
                  <SelectItem key={idx} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {data.type === "rating" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Button
                    key={rating}
                    variant={currentAnswer === rating ? "default" : "outline"}
                    size="lg"
                    onClick={() => handleAnswer(currentNodeId, rating)}
                    className="w-16 h-16"
                  >
                    {rating}
                  </Button>
                ))}
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Not likely</span>
                <span>Very likely</span>
              </div>
            </div>
          )}

          {data.type === "scale" && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold min-w-[3ch]">{currentAnswer || 50}</span>
                <Slider
                  value={[currentAnswer || 50]}
                  onValueChange={(val) => handleAnswer(currentNodeId, val[0])}
                  min={0}
                  max={100}
                  step={1}
                  className="flex-1"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  const calculateProgress = () => {
    if (!surveyData) return 0
    const totalQuestions = surveyData.nodes.filter((n: any) => n.data.type !== "start" && n.data.type !== "end").length
    const answeredCount = visitedNodes.filter((id) => {
      const node = surveyData.nodes.find((n: any) => n.id === id)
      return node && node.data.type !== "start" && node.data.type !== "end"
    }).length
    return totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0
  }

  if (!surveyData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="text-muted-foreground">Loading preview...</p>
        </div>
      </div>
    )
  }

  const currentNode = surveyData.nodes.find((n: any) => n.id === currentNodeId)
  const isEnd = currentNode?.data.type === "end"

  return (
    <div className="min-h-screen bg-background flex">
      {showSidebar && (
        <div className="w-80 border-r bg-muted/30 flex flex-col">
          <div className="p-6 border-b bg-background">
            <h3 className="font-semibold text-lg">{surveyData.title || "Survey Preview"}</h3>
            <p className="text-sm text-muted-foreground mt-1">Question Navigator</p>
          </div>

          <div className="p-4 border-b">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{Math.round(calculateProgress())}%</span>
              </div>
              <Progress value={calculateProgress()} />
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-2">
              {surveyData.nodes
                .filter((n: any) => n.data.type !== "start")
                .map((node: any, idx: number) => {
                  const isActive = currentNodeId === node.id
                  const isAnswered = visitedNodes.includes(node.id) && answers[node.id] !== undefined

                  return (
                    <button
                      key={node.id}
                      onClick={() => jumpToNode(node.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        isActive ? "bg-primary text-primary-foreground" : "bg-background hover:bg-accent"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${
                            isActive ? "bg-primary-foreground text-primary" : "bg-muted"
                          }`}
                        >
                          {isAnswered ? "✓" : idx + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">{node.data.label}</div>
                          <div
                            className={`text-xs mt-1 ${isActive ? "text-primary-foreground/80" : "text-muted-foreground"}`}
                          >
                            {node.data.type === "end" ? "End" : node.data.type}
                            {node.data.required && " • Required"}
                          </div>
                        </div>
                      </div>
                    </button>
                  )
                })}
            </div>
          </ScrollArea>

          <div className="p-4 border-t bg-background">
            <Button onClick={() => router.back()} variant="outline" className="w-full">
              <X className="mr-2 h-4 w-4" />
              Exit Preview
            </Button>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col">
        <div className="border-b bg-background p-4 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => setShowSidebar(!showSidebar)}>
            <div className="flex flex-col gap-1">
              <div className="w-5 h-0.5 bg-current" />
              <div className="w-5 h-0.5 bg-current" />
              <div className="w-5 h-0.5 bg-current" />
            </div>
          </Button>

          <div className="text-sm text-muted-foreground">Preview Mode</div>

          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <div className="max-w-3xl mx-auto p-8 py-16">
            <Card className="p-8">{renderQuestionContent()}</Card>
          </div>
        </ScrollArea>

        {!isEnd && (
          <div className="border-t bg-background p-6">
            <div className="max-w-3xl mx-auto flex items-center justify-between">
              <Button variant="outline" size="lg" onClick={goToPrevious} disabled={visitedNodes.length < 2}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>

              <div className="text-sm text-muted-foreground">
                Question{" "}
                {
                  visitedNodes.filter((id) => {
                    const node = surveyData.nodes.find((n: any) => n.id === id)
                    return node && node.data.type !== "start" && node.data.type !== "end"
                  }).length
                }{" "}
                of {surveyData.nodes.filter((n: any) => n.data.type !== "start" && n.data.type !== "end").length}
              </div>

              <Button size="lg" onClick={goToNext} disabled={!canProceed()}>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
