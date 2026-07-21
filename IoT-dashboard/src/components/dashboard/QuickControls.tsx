import { Lightbulb, Square, Droplets } from "lucide-react"
import { useDashboardStore, type DeviceKey } from "@/store/dashboard"
import ControlItem from "./ControlItem"

// Device configs matching the original HTML
const devices: {
  key: DeviceKey
  icon: typeof Lightbulb
  label: string
  gpio: string
  color: string
  type: "toggle" | "slider"
}[] = [
  { key: "blue_light", icon: Lightbulb, label: "Blue Light", gpio: "GPIO 2", color: "blue", type: "toggle" },
  { key: "yellow_light", icon: Lightbulb, label: "Yellow Light", gpio: "GPIO 4", color: "yellow", type: "toggle" },
  { key: "green_light", icon: Lightbulb, label: "Green Light", gpio: "GPIO 5", color: "green", type: "toggle" },
  { key: "white_light", icon: Lightbulb, label: "White Light", gpio: "GPIO 18", color: "gray", type: "toggle" },
  { key: "relay", icon: Square, label: "Relay", gpio: "GPIO 21", color: "teal", type: "slider" },
  { key: "water_pump", icon: Droplets, label: "Water Pump", gpio: "GPIO 22", color: "purple", type: "toggle" },
]

export default function QuickControls() {
  const devicesState = useDashboardStore((s) => s.devices)
  const toggleDevice = useDashboardStore((s) => s.toggleDevice)
  const setSlider = useDashboardStore((s) => s.setSlider)

  return (
    <section className="card">
      <h2 className="text-[1.1rem] font-bold mb-5 max-sm:text-[1rem] max-sm:mb-[14px]">
        Quick Controls
      </h2>

      {devices.map((dev, i) => {
        const isLast = i === devices.length - 1
        const val = devicesState[dev.key]

        return dev.type === "slider" ? (
          <ControlItem
            key={dev.key}
            icon={dev.icon}
            label={dev.label}
            gpio={dev.gpio}
            color={dev.color}
            sliderValue={val as number}
            onSliderChange={(v) => setSlider(dev.key, v)}
            last={isLast}
          />
        ) : (
          <ControlItem
            key={dev.key}
            icon={dev.icon}
            label={dev.label}
            gpio={dev.gpio}
            color={dev.color}
            checked={val as boolean}
            onToggle={() => toggleDevice(dev.key)}
            last={isLast}
          />
        )
      })}
    </section>
  )
}
