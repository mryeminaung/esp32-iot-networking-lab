import { create } from "zustand"

// ── Type definitions ──
export type DeviceKey = "blue_light" | "yellow_light" | "green_light" | "white_light" | "relay" | "water_pump"

export type LogEntry = {
  id: number
  time: string
  message: string
  type: "on" | "off" | "info" | "adjust"
}

export type SysInfo = {
  device: string
  ip: string
  mac: string
  uptime: string
}

export type Theme = "light" | "dark"

export type DashboardState = {
  connected: boolean
  connecting: boolean
  devices: Record<DeviceKey, boolean | number> // boolean for toggles, number for slider (relay)
  sysInfo: SysInfo
  moisture: number
  logs: LogEntry[]
  theme: Theme
}

export type DashboardActions = {
  setConnected: (val: boolean) => void
  setConnecting: (val: boolean) => void
  toggleDevice: (key: DeviceKey) => void
  setSlider: (key: DeviceKey, val: number) => void
  setSysInfo: (info: Partial<SysInfo>) => void
  setMoisture: (val: number) => void
  addLog: (entry: Omit<LogEntry, "id">) => void
  clearLogs: () => void
  toggleTheme: () => void
  setTheme: (t: Theme) => void
}

const initialSysInfo: SysInfo = {
  device: "ESP32 Development Board",
  ip: "--",
  mac: "--:--:--:--:--:--",
  uptime: "0d 00:00:00",
}

let logId = 0

export const useDashboardStore = create<DashboardState & DashboardActions>((set) => ({
  // ── State ──
  connected: false,
  connecting: false,
  devices: {
    blue_light: false,
    yellow_light: false,
    green_light: false,
    white_light: false,
    relay: 0,
    water_pump: false,
  },
  sysInfo: initialSysInfo,
  moisture: 0,
  logs: [],
  theme: (localStorage.getItem("theme") as Theme) || "light",

  // ── Actions ──
  setConnected: (connected) => set({ connected }),
  setConnecting: (connecting) => set({ connecting }),

  toggleDevice: (key) =>
    set((s) => ({
      devices: { ...s.devices, [key]: !s.devices[key] },
    })),

  setSlider: (key, val) =>
    set((s) => ({
      devices: { ...s.devices, [key]: val },
    })),

  setSysInfo: (info) =>
    set((s) => ({
      sysInfo: { ...s.sysInfo, ...info },
    })),

  setMoisture: (moisture) => set({ moisture }),

  addLog: (entry) =>
    set((s) => ({
      logs: [...s.logs.slice(-99), { ...entry, id: ++logId }],
    })),

  clearLogs: () => set({ logs: [] }),

  toggleTheme: () =>
    set((s) => {
      const next = s.theme === "light" ? "dark" : "light"
      localStorage.setItem("theme", next)
      return { theme: next }
    }),

  setTheme: (theme) => {
    localStorage.setItem("theme", theme)
    set({ theme })
  },
}))
