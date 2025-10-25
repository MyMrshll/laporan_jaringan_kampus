"use client"

import { useState, useCallback } from "react"
import { NotificationToast, type Toast } from "./notification-toast"

export function NotificationContainer() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration || 5000,
    }
    setToasts((prev) => [...prev, newToast])
    return id
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  // Expose methods globally for easy access
  if (typeof window !== "undefined") {
    ;(window as any).showNotification = addToast
  }

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 max-w-md pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <NotificationToast toast={toast} onClose={removeToast} />
        </div>
      ))}
    </div>
  )
}
