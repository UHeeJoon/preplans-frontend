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
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Mail } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface NotificationSettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NotificationSettingsDialog({ open, onOpenChange }: NotificationSettingsDialogProps) {
  const [emailEnabled, setEmailEnabled] = useState(true)
  const [inAppEnabled, setInAppEnabled] = useState(true)
  const [bookingConfirm, setBookingConfirm] = useState(true)
  const [bookingReminder, setBookingReminder] = useState(true)
  const [eventUpdate, setEventUpdate] = useState(true)
  const [surveyRequest, setSurveyRequest] = useState(true)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Notification Settings</DialogTitle>
          <DialogDescription>Configure system-wide notification rules and templates</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="channels" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="channels">Channels</TabsTrigger>
            <TabsTrigger value="rules">Rules</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="channels" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Notifications
                </CardTitle>
                <CardDescription>Configure email notification settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send notifications via email</p>
                  </div>
                  <Switch checked={emailEnabled} onCheckedChange={setEmailEnabled} />
                </div>
                {emailEnabled && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      <Label htmlFor="from-email">From Email Address</Label>
                      <Input id="from-email" type="email" defaultValue="noreply@university.edu" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reply-to">Reply-To Email</Label>
                      <Input id="reply-to" type="email" defaultValue="support@university.edu" />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  In-App Notifications
                </CardTitle>
                <CardDescription>Configure in-app notification behavior</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable In-App Notifications</Label>
                    <p className="text-sm text-muted-foreground">Show notifications in the application</p>
                  </div>
                  <Switch checked={inAppEnabled} onCheckedChange={setInAppEnabled} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rules" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Notification Rules</CardTitle>
                <CardDescription>Configure when notifications are sent</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Booking Confirmation</Label>
                      <p className="text-sm text-muted-foreground">
                        Send confirmation when booking is created or updated
                      </p>
                    </div>
                    <Switch checked={bookingConfirm} onCheckedChange={setBookingConfirm} />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5 flex-1">
                      <Label>Booking Reminder</Label>
                      <p className="text-sm text-muted-foreground">Send reminder before scheduled event</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Select defaultValue="24">
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 hour</SelectItem>
                          <SelectItem value="3">3 hours</SelectItem>
                          <SelectItem value="24">24 hours</SelectItem>
                          <SelectItem value="48">48 hours</SelectItem>
                        </SelectContent>
                      </Select>
                      <Switch checked={bookingReminder} onCheckedChange={setBookingReminder} />
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Event Updates</Label>
                      <p className="text-sm text-muted-foreground">Notify users when event details change</p>
                    </div>
                    <Switch checked={eventUpdate} onCheckedChange={setEventUpdate} />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Survey Requests</Label>
                      <p className="text-sm text-muted-foreground">Send survey invitations to participants</p>
                    </div>
                    <Switch checked={surveyRequest} onCheckedChange={setSurveyRequest} />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Waitlist Promotion</Label>
                      <p className="text-sm text-muted-foreground">Notify when waitlist student gets a slot</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Email Templates</CardTitle>
                <CardDescription>Customize notification message templates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="template-type">Template Type</Label>
                  <Select defaultValue="booking-confirm">
                    <SelectTrigger id="template-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="booking-confirm">Booking Confirmation</SelectItem>
                      <SelectItem value="booking-reminder">Booking Reminder</SelectItem>
                      <SelectItem value="event-update">Event Update</SelectItem>
                      <SelectItem value="survey-request">Survey Request</SelectItem>
                      <SelectItem value="waitlist-promotion">Waitlist Promotion</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Email Subject</Label>
                  <Input
                    id="subject"
                    defaultValue="Your consultation booking has been confirmed"
                    placeholder="Email subject line..."
                  />
                  <p className="text-xs text-muted-foreground">
                    Available variables: {"{student_name}"}, {"{event_title}"}, {"{event_date}"}, {"{event_time}"}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="body">Email Body</Label>
                  <Textarea
                    id="body"
                    rows={8}
                    defaultValue={`Dear {student_name},

Your booking for "{event_title}" has been confirmed.

Event Details:
- Date: {event_date}
- Time: {event_time}
- Location: {event_location}

Please arrive 5 minutes early. If you need to cancel or reschedule, please do so at least 24 hours in advance.

Best regards,
Campus Booking Team`}
                  />
                </div>

                <div className="flex gap-2">
                  <Button variant="outline">Preview</Button>
                  <Button variant="outline">Send Test Email</Button>
                  <Button>Save Template</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>Save Settings</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
