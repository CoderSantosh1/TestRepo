"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Phone,
  ArrowRight,
  ArrowLeft,
  Zap,
  Brain,
  Hexagon,
  AlertCircle,
  CheckCircle2,
  Shield,
  User,
  Mail,
} from "lucide-react"

interface AuthModalProps {
  onSuccess: (user: any) => void
}

export default function AuthModal({ onSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(false)
  const [name, setName] = useState("")
  const [mobile, setMobile] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const validateRegistration = () => {
    if (name.trim().length < 2) return "Name must be at least 2 characters."
    if (name.trim().length > 50) return "Name must be less than 50 characters."
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) return "Name can only contain letters and spaces."
    if (!/^\d{10}$/.test(mobile)) return "Mobile number must be exactly 10 digits."
    if (!/^[6-9]\d{9}$/.test(mobile)) return "Mobile number must start with 6, 7, 8, or 9."
    return null
  }

  const validateLogin = () => {
    if (!/^\d{10}$/.test(mobile)) return "Mobile number must be exactly 10 digits."
    return null
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    const err = validateRegistration()
    if (err) {
      setError(err)
      return
    }
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), mobile }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Registration failed")
      localStorage.setItem("user", JSON.stringify(data.user))
      onSuccess(data.user)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const err = validateLogin()
    if (err) {
      setError(err)
      return
    }
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Login failed")
      localStorage.setItem("user", JSON.stringify(data.user))
      onSuccess(data.user)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    if (isLogin) {
      handleLogin(e)
    } else {
      handleRegister(e)
    }
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setError(null)
    setName("")
    setMobile("")
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900/95 via-purple-900/95 to-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {/* Floating particles background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${4 + Math.random() * 3}s ease-in-out infinite ${Math.random() * 2}s`,
              boxShadow: "0 0 4px currentColor",
            }}
          />
        ))}
      </div>

      <Card
        className="w-full max-w-md border-0 bg-black/80 backdrop-blur-sm shadow-2xl relative z-10"
        style={{
          clipPath: "polygon(0% 0%, 95% 0%, 100% 5%, 100% 100%, 5% 100%, 0% 95%)",
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(26,10,46,0.9) 25%, rgba(22,33,62,0.9) 50%, rgba(15,52,96,0.9) 75%, rgba(0,0,0,0.9) 100%)",
        }}
      >
        {/* Animated border */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 via-magenta-400 to-lime-400 opacity-50 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-lime-400 via-cyan-400 to-magenta-400 opacity-50 animate-pulse" />

        <CardHeader className="text-center pb-6 border-b border-cyan-400/30 bg-gradient-to-r from-black/50 to-purple-900/30 backdrop-blur-sm">
          {/* Neural Interface Icon */}
          <div className="mx-auto w-20 h-20 mb-6 relative">
            <div
              className="w-full h-full bg-gradient-to-br from-cyan-400 to-magenta-500 rounded-lg flex items-center justify-center shadow-2xl"
              style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
            >
              <Brain className="w-10 h-10 text-white animate-pulse" />
            </div>
            <div className="absolute inset-0 bg-cyan-400/20 blur-xl animate-pulse rounded-lg" />

            {/* Orbiting elements */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-lime-400 to-emerald-500 rounded-full flex items-center justify-center animate-bounce">
              <Shield className="w-3 h-3 text-white" />
            </div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br from-magenta-400 to-purple-500 rounded-full animate-ping" />
          </div>

          <CardTitle className="text-2xl font-black mb-2">
            <span className="bg-gradient-to-r from-cyan-400 via-magenta-400 to-lime-400 bg-clip-text text-transparent animate-pulse">
              {isLogin ? "Sarkariresultsnow Test Series" : "Sarkariresultsnow Test Series"}
            </span>
          </CardTitle>
          <p className="text-cyan-300 text-sm font-semibold">
            {isLogin ? "Sign in to access your test dashboard" : "REGISTER YOUR PROFILE"}
          </p>
        </CardHeader>

        <CardContent className="p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-3">
                <Label htmlFor="name" className="text-sm font-bold text-cyan-400 uppercase tracking-wider">
                  ENTER YOUR NAME
                </Label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                    <User className="w-5 h-5 text-cyan-400 group-focus-within:text-magenta-400 transition-colors duration-300" />
                  </div>
                  <Input
                    id="name"
                    type="text"
                    placeholder="ENTER YOUR NAME"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-12 pr-4 py-3 bg-black/50 border-2 border-cyan-400/30 text-white placeholder-gray-400 focus:border-magenta-400 focus:ring-2 focus:ring-magenta-400/20 transition-all duration-300 rounded-lg"
                    required={!isLogin}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-magenta-400/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none" />
                </div>
              </div>
            )}

            <div className="space-y-3">
              <Label htmlFor="mobile" className="text-sm font-bold text-cyan-400 uppercase tracking-wider">
                ENTER YOUR NUMBER OR EMAIL
              </Label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                  {mobile.includes("@") ? (
                    <Mail className="w-5 h-5 text-cyan-400 group-focus-within:text-magenta-400 transition-colors duration-300" />
                  ) : (
                    <Phone className="w-5 h-5 text-cyan-400 group-focus-within:text-magenta-400 transition-colors duration-300" />
                  )}
                </div>
                <Input
                  id="mobile"
                  type="text"
                  placeholder="ENTER YOUR NUMBER OR EMAIL"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="pl-12 pr-4 py-3 bg-black/50 border-2 border-cyan-400/30 text-white placeholder-gray-400 focus:border-magenta-400 focus:ring-2 focus:ring-magenta-400/20 transition-all duration-300 rounded-lg"
                  required
                />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-magenta-400/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none" />
              </div>
            </div>

            {error && (
              <Alert className="border-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-sm">
                <AlertCircle className="h-5 w-5 text-red-400 animate-pulse" />
                <AlertDescription className="text-red-300 font-semibold ml-2">{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full relative bg-gradient-to-r from-cyan-400 via-magenta-400 to-lime-400 hover:from-cyan-500 hover:via-magenta-500 hover:to-lime-500 text-black font-black py-4 text-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/30 overflow-hidden group"
              style={{
                clipPath: "polygon(0% 0%, 90% 0%, 100% 30%, 100% 100%, 10% 100%, 0% 70%)",
              }}
            >
              {/* Button background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-lime-400/20 via-cyan-400/20 to-magenta-400/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

              {loading ? (
                <span className="relative flex items-center justify-center gap-3 z-10">
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  {isLogin ? "SIGNING IN..." : "CREATING ACCOUNT..."}
                </span>
              ) : (
                <span className="relative flex items-center justify-center gap-3 z-10">
                  <Zap className="w-5 h-5 animate-pulse" />
                  {isLogin ? "SIGN IN TO DASHBOARD" : "CREATE YOUR ACCOUNT"}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 group-hover:scale-125 transition-all duration-300" />
                </span>
              )}

              {/* Glitch effect on button */}
              <div className="absolute inset-0 bg-gradient-to-r from-magenta-400/30 to-cyan-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 animate-pulse" />
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gradient-to-r from-cyan-400/30 via-magenta-400/30 to-cyan-400/30" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-black px-4 text-cyan-400 font-bold tracking-wider">OR</span>
            </div>
          </div>

          <Button
            onClick={toggleMode}
            className="w-full border-2 border-cyan-400/50 text-cyan-400 bg-transparent hover:bg-cyan-400/10 font-bold py-3 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/20 group"
          >
            <span className="flex items-center justify-center gap-3">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform duration-300" />
              {isLogin ? "CREATE NEW ACCOUNT" : "ALREADY HAVE AN ACCOUNT? SIGN IN"}
              <Hexagon className="w-5 h-5 animate-spin" style={{ animationDuration: "3s" }} />
            </span>
          </Button>

          {/* Success indicator when form is valid */}
          {((isLogin && mobile.length >= 3) || (!isLogin && name.trim().length >= 2 && mobile.length >= 3)) && (
            <div className="flex items-center justify-center gap-2 text-lime-400 animate-pulse">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-sm font-bold">Profile information validated</span>
            </div>
          )}
        </CardContent>

        {/* Corner decorations */}
        <div className="absolute -top-2 -left-2 w-6 h-6 border-l-2 border-t-2 border-cyan-400 opacity-60" />
        <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-2 border-b-2 border-magenta-400 opacity-60" />
      </Card>
    </div>
  )
}
