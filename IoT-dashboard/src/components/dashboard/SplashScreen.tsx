import { useEffect, useState } from "react"
import { Cpu, Signal } from "lucide-react"
import { useDashboardStore } from "@/store/dashboard"

type Phase = "show" | "fade" | "hidden"

export default function SplashScreen({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>("show")
  const theme = useDashboardStore((s) => s.theme)
  const isDark = theme === "dark"

  useEffect(() => {
    const fadeTimer = setTimeout(() => setPhase("fade"), 2500)
    const doneTimer = setTimeout(() => {
      setPhase("hidden")
      onDone()
    }, 3000)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(doneTimer)
    }
  }, [onDone])

  if (phase === "hidden") return null

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-all duration-500 ${
        phase === "fade" ? "opacity-0 scale-[1.05]" : "opacity-100 scale-100"
      } ${
        isDark
          ? "bg-[#060C1C] text-white"
          : "bg-[#f1f5f9] text-slate-900"
      }`}
    >
      {/* IoT signal arcs */}
      <div className="relative flex items-center justify-center mb-8">
        <span
          className={`absolute w-32 h-32 rounded-full border animate-[splash-wave_2s_ease-out_infinite] ${
            isDark ? "border-blue-400/30" : "border-blue-500/20"
          }`}
        />
        <span
          className={`absolute w-24 h-24 rounded-full border animate-[splash-wave_2s_ease-out_infinite_0.4s] ${
            isDark ? "border-blue-400/40" : "border-blue-500/30"
          }`}
        />
        <span
          className={`absolute w-16 h-16 rounded-full border animate-[splash-wave_2s_ease-out_infinite_0.8s] ${
            isDark ? "border-blue-400/50" : "border-blue-500/40"
          }`}
        />

        {/* Center icon */}
        <div
          className={`relative z-10 w-20 h-20 rounded-2xl flex items-center justify-center animate-[splash-pulse_2s_ease-in-out_infinite] ${
            isDark
              ? "bg-blue-500/10 border border-blue-500/20"
              : "bg-blue-100 border border-blue-200"
          }`}
        >
          <Cpu size={40} className={isDark ? "text-blue-400" : "text-blue-600"} />
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold tracking-tight mb-2">
        ESP32 IoT Dashboard
      </h1>

      {/* Subtitle with loading dots */}
      <p className={`text-sm flex items-center gap-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
        <Signal size={14} className={isDark ? "text-blue-400" : "text-blue-600"} />
        Initializing network
        <span className="inline-flex w-5 justify-start">
          <span className="animate-[splash-dot_1.4s_ease-in-out_infinite]">.</span>
          <span className="animate-[splash-dot_1.4s_ease-in-out_infinite_0.2s]">.</span>
          <span className="animate-[splash-dot_1.4s_ease-in-out_infinite_0.4s]">.</span>
        </span>
      </p>

      {/* Progress bar */}
      <div className={`mt-8 w-48 h-1 rounded-full overflow-hidden ${
        isDark ? "bg-slate-800" : "bg-slate-200"
      }`}>
        <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400 animate-[splash-progress_2.5s_ease-in-out_forwards]" />
      </div>
    </div>
  )
}
