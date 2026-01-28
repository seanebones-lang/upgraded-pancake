"use client"

import { useSession } from "@/auth"
import { redirect } from "next/navigation"

export default function Home() {
  const session = useSession()
  
  if (session) {
    redirect("/workspace")
  }

  return null // middleware handles redirect to /login
}