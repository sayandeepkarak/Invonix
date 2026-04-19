"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { autoLoginRequest } from "@/features/auth/store"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [checked, setChecked] = useState<boolean>(false)

  useEffect(() => {
    dispatch(autoLoginRequest())
  }, [dispatch])

  useEffect(() => {
    if (!isLoading) {
      setChecked(true)
      if (!isAuthenticated) {
        router.replace("/auth/login")
      }
    }
  }, [isLoading, isAuthenticated, router])

  if (!checked || isLoading || !isAuthenticated) return null

  return <>{children}</>
}
