"use client"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, TrendingUp, Users, CheckCircle } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface SurveyResultsSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  surveyId?: string
}

export function SurveyResultsSheet({ open, onOpenChange }: SurveyResultsSheetProps) {
  const survey = {
    id: "srv-001",
    title: "Pre-Consultation Survey",
    type: "pre-event",
    totalResponses: 247,
    completionRate: 87.3,
    avgCompletionTime: "3m 42s",
    status: "active",
  }

  const questions = [
    {
      id: 1,
      text: "What is your primary reason for this consultation?",
      type: "multiple-choice",
      responses: 247,
      answers: [
        { option: "Thesis guidance", count: 98, percentage: 39.7 },
        { option: "Research methodology", count: 76, percentage: 30.8 },
        { option: "Career advice", count: 45, percentage: 18.2 },
        { option: "Course selection", count: 28, percentage: 11.3 },
      ],
    },
    {
      id: 2,
      text: "How familiar are you with the topic?",
      type: "scale",
      responses: 247,
      avgRating: 3.2,
      distribution: [
        { rating: 1, count: 12, percentage: 4.9 },
        { rating: 2, count: 34, percentage: 13.8 },
        { rating: 3, count: 89, percentage: 36.0 },
        { rating: 4, count: 78, percentage: 31.6 },
        { rating: 5, count: 34, percentage: 13.8 },
      ],
    },
    {
      id: 3,
      text: "What specific topics would you like to discuss?",
      type: "text",
      responses: 247,
      sampleAnswers: [
        "Need help with research design and statistical analysis methods",
        "Want to discuss potential thesis topics in machine learning",
        "Questions about graduate school applications",
      ],
    },
  ]

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-3xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{survey.title}</SheetTitle>
          <SheetDescription>Survey ID: {survey.id}</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Survey Overview */}
          <div className="flex items-center justify-between">
            <Badge variant={survey.status === "active" ? "default" : "secondary"} className="text-sm">
              {survey.status}
            </Badge>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export Results
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{survey.totalResponses}</p>
                    <p className="text-xs text-muted-foreground">Total Responses</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10">
                    <CheckCircle className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{survey.completionRate}%</p>
                    <p className="text-xs text-muted-foreground">Completion Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-chart-2/10">
                    <TrendingUp className="h-5 w-5 text-chart-2" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{survey.avgCompletionTime}</p>
                    <p className="text-xs text-muted-foreground">Avg. Time</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Question Results */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="individual">Individual Responses</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 mt-4">
              {questions.map((question, index) => (
                <Card key={question.id}>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Q{index + 1}. {question.text}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {question.type}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{question.responses} responses</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {question.type === "multiple-choice" && question.answers && (
                      <div className="space-y-3">
                        {question.answers.map((answer, idx) => (
                          <div key={idx} className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>{answer.option}</span>
                              <span className="font-medium">
                                {answer.count} ({answer.percentage.toFixed(1)}%)
                              </span>
                            </div>
                            <Progress value={answer.percentage} className="h-2" />
                          </div>
                        ))}
                      </div>
                    )}

                    {question.type === "scale" && question.distribution && (
                      <div className="space-y-4">
                        <div className="text-center">
                          <p className="text-3xl font-bold">{question.avgRating}</p>
                          <p className="text-sm text-muted-foreground">Average Rating</p>
                        </div>
                        <Separator />
                        <div className="space-y-3">
                          {question.distribution.map((item, idx) => (
                            <div key={idx} className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span>
                                  {item.rating} {"★"}
                                </span>
                                <span className="font-medium">
                                  {item.count} ({item.percentage.toFixed(1)}%)
                                </span>
                              </div>
                              <Progress value={item.percentage} className="h-2" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {question.type === "text" && question.sampleAnswers && (
                      <div className="space-y-3">
                        <p className="text-sm font-medium">Sample Responses:</p>
                        {question.sampleAnswers.map((answer, idx) => (
                          <div key={idx} className="rounded-lg bg-muted p-3">
                            <p className="text-sm text-muted-foreground">{answer}</p>
                          </div>
                        ))}
                        <Button variant="outline" size="sm" className="w-full bg-transparent">
                          View All {question.responses} Responses
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="individual" className="space-y-3 mt-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-center text-sm text-muted-foreground">
                    Individual response data table would appear here with filters and search functionality
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  )
}
