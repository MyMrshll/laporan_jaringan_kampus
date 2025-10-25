"use client"

import { useEffect } from "react"
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react"

export interface Toast {
  id: string
  type: "success" | "error" | "info" | "warning"
  title: string
  message: string
  duration?: number
}

interface NotificationToastProps {
  toast: Toast
  onClose: (id: string) => void
}

export function NotificationToast({ toast, onClose }: NotificationToastProps) {
  useEffect(() => {
    if (toast.duration) {
      const timer = setTimeout(() => onClose(toast.id), toast.duration)
      return () => clearTimeout(timer)
    }
  }, [toast, onClose])

  const getStyles = () => {
    switch (toast.type) {
      case "success":
        return "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-900"
      case "error":
        return "bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-900"
      case "warning":
        return "bg-orange-50 border-orange-200 dark:bg-orange-950 dark:border-orange-900"
      default:
        return "bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-900"
    }
  }

  const getIconColor = () => {
    switch (toast.type) {
      case "success":
        return "text-green-600 dark:text-green-400"
      case "error":
        return "text-red-600 dark:text-red-400"
      case "warning":
        return "text-orange-600 dark:text-orange-400"
      default:
        return "text-blue-600 dark:text-blue-400"
    }
  }

  const getTextColor = () => {
    switch (toast.type) {
      case "success":
        return "text-green-900 dark:text-green-100"
      case "error":
        return "text-red-900 dark:text-red-100"
      case "warning":
        return "text-orange-900 dark:text-orange-100"
      default:
        return "text-blue-900 dark:text-blue-100"
    }
  }

  const Icon = toast.type === "success" ? CheckCircle2 : toast.type === "error" ? AlertCircle : Info

  return (
    <div
      className={`flex items-start gap-3 rounded-lg border p-4 ${getStyles()} animate-in fade-in slide-in-from-top-2 duration-300`}
      role="alert"
    >
      <Icon className={`h-5 w-5 flex-shrink-0 mt-0.5 ${getIconColor()}`} />
      <div className="flex-1">
        <h3 className={`font-semibold ${getTextColor()}`}>{toast.title}</h3>
        <p className={`mt-1 text-sm ${getTextColor()} opacity-90`}>{toast.message}</p>
      </div>
      <button
        onClick={() => onClose(toast.id)}
        className={`flex-shrink-0 ${getTextColor()} hover:opacity-70 transition-opacity`}
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  )
}
