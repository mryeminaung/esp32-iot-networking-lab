import { useDashboardStore } from "@/store/dashboard"
import RadialGauge from "./RadialGauge"

export default function SensorCard() {
  const moisture = useDashboardStore((s) => s.moisture)

  return (
    <section className="card">
      <h2 className="text-[1rem] sm:text-[1.1rem] font-bold mb-4 sm:mb-5">
        Sensors
      </h2>
      <RadialGauge value={moisture} />
    </section>
  )
}
