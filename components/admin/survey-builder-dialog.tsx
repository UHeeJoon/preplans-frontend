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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, GripVertical, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface SurveyBuilderDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type QuestionType = "text" | "multiple-choice" | "scale" | "checkbox" | "dropdown"

interface Question {
  id: string
  type: QuestionType
  text: string
  required: boolean
  options?: string[]
  conditionalLogic?: {
    questionId: string
    answer: string
    action: "show" | "hide"
  }
}

export function SurveyBuilderDialog({ open, onOpenChange }: SurveyBuilderDialogProps) {
  const [surveyTitle, setSurveyTitle] = useState("")
  const [surveyType, setSurveyType] = useState<"pre" | "post">("pre")
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState("")
  const [currentQuestionType, setCurrentQuestionType] = useState<QuestionType>("text")

  const addQuestion = () => {
    if (currentQuestion) {
      const newQuestion: Question = {
        id: `q-${Date.now()}`,
        type: currentQuestionType,
        text: currentQuestion,
        required: false,
        options:
          currentQuestionType !== "text" && currentQuestionType !== "scale" ? ["Option 1", "Option 2"] : undefined,
      }
      setQuestions([...questions, newQuestion])
      setCurrentQuestion("")
    }
  }

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id))
  }

  const toggleRequired = (id: string) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, required: !q.required } : q)))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Survey Builder</DialogTitle>
          <DialogDescription>Create pre-event or post-event surveys with conditional branching</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Survey Settings */}
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="survey-title">Survey Title</Label>
                <Input
                  id="survey-title"
                  value={surveyTitle}
                  onChange={(e) => setSurveyTitle(e.target.value)}
                  placeholder="e.g., Pre-consultation Survey"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="survey-type">Survey Type</Label>
                <Select value={surveyType} onValueChange={(value: "pre" | "post") => setSurveyType(value)}>
                  <SelectTrigger id="survey-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pre">Pre-event Survey</SelectItem>
                    <SelectItem value="post">Post-event Survey</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator />

          {/* Add Question Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Add Question</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="question-text">Question Text</Label>
                <Textarea
                  id="question-text"
                  value={currentQuestion}
                  onChange={(e) => setCurrentQuestion(e.target.value)}
                  placeholder="Enter your question..."
                  rows={2}
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="question-type">Question Type</Label>
                  <Select
                    value={currentQuestionType}
                    onValueChange={(value: QuestionType) => setCurrentQuestionType(value)}
                  >
                    <SelectTrigger id="question-type">
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

                <div className="flex items-end">
                  <Button onClick={addQuestion}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Question
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Questions List */}
          {questions.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Survey Questions ({questions.length})</h3>
              {questions.map((question, index) => (
                <Card key={question.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 cursor-move">
                        <GripVertical className="h-5 w-5 text-muted-foreground" />
                      </div>

                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">Q{index + 1}.</span>
                              <p className="text-sm font-medium">{question.text}</p>
                            </div>
                            <div className="mt-1 flex items-center gap-2">
                              <Badge variant="secondary" className="text-xs">
                                {question.type}
                              </Badge>
                              {question.required && (
                                <Badge variant="outline" className="text-xs">
                                  Required
                                </Badge>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" onClick={() => toggleRequired(question.id)}>
                              {question.required ? "Optional" : "Required"}
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => removeQuestion(question.id)}>
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>

                        {/* Show options for non-text questions */}
                        {question.options && (
                          <div className="space-y-1 pl-6">
                            {question.options.map((option, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span className="text-xs">•</span>
                                <span>{option}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Conditional Logic Indicator */}
                        {question.conditionalLogic && (
                          <div className="flex items-center gap-2 rounded-md bg-muted p-2 text-xs">
                            <ArrowRight className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              Conditional: Show if answer is "{question.conditionalLogic.answer}"
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>Save Survey</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
