"use client"

import { signIn } from "@/auth"

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">NextEleven Code</h1>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
          onClick={() => signIn("github")}
        >
          Sign in with GitHub
        </button>
      </div>
    </div>
  )
}