"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, X, CheckCircle2, XCircle } from "lucide-react"

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  type?: "warning" | "danger" | "success" | "info"
  unansweredCount?: number
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "warning",
  unansweredCount,
}: ConfirmationModalProps) {
  if (!isOpen) return null

  const getTypeStyles = () => {
    switch (type) {
      case "danger":
        return {
          gradient: "from-red-500/20 to-pink-500/20",
          border: "border-red-400/30",
          iconColor: "text-red-400",
          titleColor: "from-red-400 to-pink-400",
          confirmButton: "from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600",
        }
      case "success":
        return {
          gradient: "from-lime-500/20 to-emerald-500/20",
          border: "border-lime-400/30",
          iconColor: "text-lime-400",
          titleColor: "from-lime-400 to-emerald-400",
          confirmButton: "from-lime-400 to-emerald-500 hover:from-lime-500 hover:to-emerald-600",
        }
      case "info":
        return {
          gradient: "from-cyan-500/20 to-blue-500/20",
          border: "border-cyan-400/30",
          iconColor: "text-cyan-400",
          titleColor: "from-cyan-400 to-blue-400",
          confirmButton: "from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600",
        }
      default: // warning
        return {
          gradient: "from-yellow-500/20 to-orange-500/20",
          border: "border-yellow-400/30",
          iconColor: "text-yellow-400",
          titleColor: "from-yellow-400 to-orange-400",
          confirmButton: "from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600",
        }
    }
  }

  const styles = getTypeStyles()

  const getIcon = () => {
    switch (type) {
      case "danger":
        return <XCircle className={`w-8 h-8 sm:w-12 sm:h-12 ${styles.iconColor} animate-pulse`} />
      case "success":
        return <CheckCircle2 className={`w-8 h-8 sm:w-12 sm:h-12 ${styles.iconColor} animate-pulse`} />
      default:
        return <AlertTriangle className={`w-8 h-8 sm:w-12 sm:h-12 ${styles.iconColor} animate-pulse`} />
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {/* Floating particles background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
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
        className={`w-full max-w-md border-0 bg-gradient-to-br ${styles.gradient} backdrop-blur-sm shadow-2xl relative z-10 animate-in fade-in-0 zoom-in-95 duration-300`}
        style={{
          clipPath: "polygon(0% 0%, 95% 0%, 100% 5%, 100% 100%, 5% 100%, 0% 95%)",
          background: `linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(26,10,46,0.9) 25%, rgba(22,33,62,0.9) 50%, rgba(15,52,96,0.9) 75%, rgba(0,0,0,0.9) 100%)`,
        }}
      >
        {/* Animated border */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 via-magenta-400 to-lime-400 opacity-50 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-lime-400 via-cyan-400 to-magenta-400 opacity-50 animate-pulse" />

        {/* Close button */}
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="absolute top-3 right-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-full w-8 h-8 p-0"
        >
          <X className="w-4 h-4" />
        </Button>

        <CardHeader
          className={`text-center pb-4 sm:pb-6 border-b ${styles.border} bg-gradient-to-r from-black/50 to-purple-900/30 backdrop-blur-sm`}
        >
          {/* Icon */}
          <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-6 relative">
            <div
              className={`w-full h-full bg-gradient-to-br ${styles.gradient} rounded-lg flex items-center justify-center shadow-2xl`}
            >
              {getIcon()}
            </div>
            <div
              className={`absolute inset-0 bg-gradient-to-br ${styles.gradient} blur-xl animate-pulse rounded-lg opacity-50`}
            />
          </div>

          <CardTitle className="text-xl sm:text-2xl md:text-3xl font-black mb-2">
            <span className={`bg-gradient-to-r ${styles.titleColor} bg-clip-text text-transparent animate-pulse`}>
              {title}
            </span>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 sm:p-8 space-y-6">
          {/* Message */}
          <div className="text-center">
            <p className="text-gray-200 text-sm sm:text-base leading-relaxed mb-4">{message}</p>

            {/* Unanswered questions warning */}
            {unansweredCount && unansweredCount > 0 && (
              <div className={`p-4 bg-gradient-to-r ${styles.gradient} border ${styles.border} rounded-lg mb-6`}>
                <div className="flex items-center justify-center gap-3 mb-2">
                  <AlertTriangle className={`w-5 h-5 ${styles.iconColor} animate-pulse`} />
                  <span className={`font-bold ${styles.iconColor} text-sm sm:text-base`}>
                    Warning: Incomplete Questions
                  </span>
                </div>
                <p className="text-gray-300 text-xs sm:text-sm">
                  You have <span className={`font-bold ${styles.iconColor}`}>{unansweredCount}</span> unanswered
                  questions. These will be marked as incorrect if you proceed.
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button
              onClick={onClose}
              className="flex-1 border-2 border-gray-400 text-gray-400 bg-transparent hover:bg-gray-400/10 font-bold py-3 sm:py-4 text-sm sm:text-base transition-all duration-300 hover:shadow-lg hover:shadow-gray-400/20"
            >
              {cancelText}
            </Button>

            <Button
              onClick={() => {
                onConfirm()
                onClose()
              }}
              className={`flex-1 relative bg-gradient-to-r ${styles.confirmButton} text-white font-black py-3 sm:py-4 text-sm sm:text-base transition-all duration-300 hover:shadow-lg hover:shadow-current/30 overflow-hidden group`}
              style={{
                clipPath: "polygon(0% 0%, 90% 0%, 100% 30%, 100% 100%, 10% 100%, 0% 70%)",
              }}
            >
              {/* Button background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

              <span className="relative flex items-center justify-center gap-2 z-10">
                {getIcon()}
                {confirmText}
              </span>
            </Button>
          </div>
        </CardContent>

        {/* Corner decorations */}
        <div className={`absolute -top-2 -left-2 w-6 h-6 border-l-2 border-t-2 ${styles.border} opacity-60`} />
        <div className={`absolute -bottom-2 -right-2 w-6 h-6 border-r-2 border-b-2 ${styles.border} opacity-60`} />
      </Card>
    </div>
  )
} 