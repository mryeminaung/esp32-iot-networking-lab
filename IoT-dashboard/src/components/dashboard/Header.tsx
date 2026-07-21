import { Cpu, Sun, Moon } from "lucide-react"
import { useDashboardStore } from "@/store/dashboard"

export default function Header() {
  const connected = useDashboardStore((s) => s.connected)
  const connecting = useDashboardStore((s) => s.connecting)
  const theme = useDashboardStore((s) => s.theme)
  const toggleTheme = useDashboardStore((s) => s.toggleTheme)

  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-7 bg-white dark:bg-[#060C1C] p-5 sm:px-7 sm:py-5 rounded-[20px] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] gap-3 sm:gap-0">
      {/* Brand */}
      <div className="flex items-center gap-3 sm:gap-[14px] w-full sm:w-auto">
        <Cpu className="text-blue-500 shrink-0 max-sm:w-7 max-sm:h-7" size={36} />
        <div className="min-w-0">
          <h1 className="text-[1.2rem] sm:text-[1.5rem] font-bold truncate">ESP32 IoT Dashboard</h1>
          <span className="block text-[0.75rem] sm:text-[0.8125rem] text-slate-400 dark:text-slate-500 font-medium mt-[2px]">
            ECE 5000 Capstone Project
          </span>
        </div>
      </div>

      {/* Actions — wraps on <400px screens */}
      <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto flex-wrap">
        {/* Connection status */}
        <div
          className={`flex items-center gap-2 px-3.5 sm:px-[18px] py-2 sm:py-[10px] rounded-full text-sm ${
            connected
              ? "bg-green-50 border border-green-200 dark:bg-green-900/15 dark:border-green-700/30"
              : "bg-red-50 border border-red-200 dark:bg-red-900/15 dark:border-red-700/30"
          }`}
        >
          <span
            className={`w-2.5 h-2.5 rounded-full shrink-0 ${
              connected ? "bg-green-600" : "bg-red-500 animate-[pulse_2s_infinite]"
            }`}
          />
          <span className="text-[0.8125rem] sm:text-[0.875rem] text-slate-600 font-medium whitespace-nowrap">
            {connecting ? "Connecting…" : connected ? "Connected" : "Disconnected"}
          </span>
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="w-[38px] h-[38px] sm:w-11 sm:h-11 rounded-xl border border-slate-200 bg-slate-50 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100 flex items-center justify-center cursor-pointer text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-600 transition-all shrink-0"
          title="Toggle dark mode"
        >
          {theme === "light" ? (
            <Moon size={18} className="sm:size-5" />
          ) : (
            <Sun size={18} className="sm:size-5" />
          )}
        </button>

        {/* Connect button */}
        <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-4 sm:px-6 py-2.5 sm:py-3 font-semibold text-[0.8125rem] sm:text-[0.9rem] cursor-pointer hover:-translate-y-px hover:shadow-lg transition-all whitespace-nowrap">
          Connect to ESP32
        </button>
      </div>
    </header>
  )
}
