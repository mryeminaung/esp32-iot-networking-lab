import { Monitor, Globe, Lock, Clock } from "lucide-react"
import { useDashboardStore } from "@/store/dashboard"
import InfoRow from "./InfoRow"

export default function SystemInfo() {
  const sysInfo = useDashboardStore((s) => s.sysInfo)

  const rows = [
    { icon: Monitor, label: "Device", value: sysInfo.device },
    { icon: Globe, label: "IP Address", value: sysInfo.ip },
    { icon: Lock, label: "MAC Address", value: sysInfo.mac },
    { icon: Clock, label: "Uptime", value: sysInfo.uptime },
  ]

  return (
    <section className="card">
      <h2 className="text-[1.1rem] font-bold mb-5 max-sm:text-[1rem] max-sm:mb-[14px]">
        System Info
      </h2>

      {rows.map((r) => (
        <InfoRow key={r.label} icon={r.icon} label={r.label} value={r.value} />
      ))}
    </section>
  )
}
