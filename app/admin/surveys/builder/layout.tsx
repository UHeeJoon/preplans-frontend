"use client"

import type React from "react"
import { useEffect } from "react"

if (typeof window !== "undefined") {
  const originalError = console.error
  console.error = (...args: any[]) => {
    if (args[0] && typeof args[0] === "string" && args[0].includes("ResizeObserver")) {
      return
    }
    originalError.apply(console, args)
  }

  window.addEventListener(
    "error",
    (e: ErrorEvent) => {
      if (e.message && e.message.includes("ResizeObserver")) {
        e.stopImmediatePropagation()
        e.preventDefault()
        return false
      }
    },
    true,
  )

  window.addEventListener("unhandledrejection", (e: PromiseRejectionEvent) => {
    if (e.reason && e.reason.message && e.reason.message.includes("ResizeObserver")) {
      e.stopImmediatePropagation()
      e.preventDefault()
    }
  })
}

export default function SurveyBuilderLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const originalError = console.error
    console.error = (...args: any[]) => {
      if (args[0] && typeof args[0] === "string" && args[0].includes("ResizeObserver")) {
        return
      }
      originalError.apply(console, args)
    }

    return () => {
      console.error = originalError
    }
  }, [])

  return <div className="h-screen w-full overflow-hidden">{children}</div>
}
