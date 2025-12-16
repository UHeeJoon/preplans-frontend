import { FileText, Star, AlignLeft, Circle, Mail, Hash, Calendar, CheckSquare, Share2 } from "lucide-react"

export const QUESTION_CATEGORIES = {
  "Text Input": [
    { type: "text" as const, label: "Short Text", icon: FileText, description: "Single line text input" },
    { type: "textarea" as const, label: "Long Text", icon: AlignLeft, description: "Multi-line text area" },
    { type: "email" as const, label: "Email", icon: Mail, description: "Email address input" },
    { type: "number" as const, label: "Number", icon: Hash, description: "Numeric input" },
    { type: "date" as const, label: "Date", icon: Calendar, description: "Date picker" },
  ],
  Choice: [
    { type: "radio" as const, label: "Single Choice", icon: Circle, description: "Choose one option with branching" },
    { type: "checkbox" as const, label: "Multiple Choice", icon: CheckSquare, description: "Select multiple options" },
  ],
  Rating: [
    { type: "scale" as const, label: "Scale", icon: Star, description: "1-5 scale rating" },
    { type: "rating" as const, label: "Star Rating", icon: Star, description: "Star-based rating" },
  ],
  Control: [{ type: "end" as const, label: "End Survey", icon: Share2, description: "Survey completion point" }],
}
