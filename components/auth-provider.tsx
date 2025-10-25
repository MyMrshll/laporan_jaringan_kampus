"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

const protectedRoutes = ["/dashboard", "/report", "/history"]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthed, setIsAuthed] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser")
    const isProtected = protectedRoutes.some((route) => pathname.startsWith(route))

    if (isProtected && !currentUser) {
      router.push("/login")
    } else if (currentUser) {
      setIsAuthed(true)
    }

    setLoading(false)
  }, [pathname, router])

  if (loading) {
    return <>{children}</>
  }

  return <>{children}</>
}
