import { type LucideIcon } from "lucide-react"

// Map of color names → Tailwind classes for the icon circle
const colorMap: Record<string, { bg: string; text: string; toggle: string }> = {
  blue: { bg: "bg-blue-100", text: "text-blue-600", toggle: "blue" },
  yellow: { bg: "bg-amber-100", text: "text-amber-600", toggle: "yellow" },
  green: { bg: "bg-green-100", text: "text-green-600", toggle: "green" },
  gray: { bg: "bg-slate-100", text: "text-slate-500", toggle: "gray" },
  teal: { bg: "bg-teal-100", text: "text-teal-600", toggle: "teal" },
  purple: { bg: "bg-purple-100", text: "text-purple-600", toggle: "purple" },
  red: { bg: "bg-red-100", text: "text-red-500", toggle: "red" },
}

type ControlItemProps = {
  icon: LucideIcon
  label: string
  gpio: string
  color?: string
  checked?: boolean
  onToggle?: () => void
  sliderValue?: number
  onSliderChange?: (val: number) => void
  last?: boolean
}

export default function ControlItem({
  icon: Icon,
  label,
  gpio,
  color = "blue",
  checked = false,
  onToggle,
  sliderValue,
  onSliderChange,
  last = false,
}: ControlItemProps) {
  const c = colorMap[color] ?? colorMap.blue
  const toggleColor = c.toggle

  return (
    <div
      className={`flex items-center py-[18px] border-b border-slate-100 dark:border-slate-700 first-of-type:pt-0 gap-3 sm:gap-0 ${
        last ? "border-b-0 pb-0" : ""
      }`}
    >
      {/* Icon — smaller on mobile */}
      <div
        className={`w-[42px] h-[42px] sm:w-[52px] sm:h-[52px] rounded-xl flex items-center justify-center shrink-0 ${c.bg} ${c.text}`}
      >
        <Icon size={20} className="sm:size-6" />
      </div>

      {/* Label + GPIO — truncates on very small screens */}
      <div className="flex-1 min-w-0 ml-3 sm:ml-[18px]">
        <span className="block text-[0.9rem] sm:text-[1rem] font-semibold truncate">{label}</span>
        <span className="block text-[0.75rem] sm:text-[0.8125rem] text-slate-400 dark:text-slate-500 mt-[2px]">
          {gpio}
        </span>
      </div>

      {/* Slider or Toggle */}
      {sliderValue !== undefined ? (
        <div className="flex items-center gap-2 sm:gap-[14px] min-w-0 sm:min-w-[200px] shrink-0">
          <input
            type="range"
            min={0}
            max={100}
            value={sliderValue}
            onChange={(e) => onSliderChange?.(Number(e.target.value))}
            className="device-slider !w-[90px] sm:!w-[130px] max-sm:flex-1"
          />
          <span className="text-[0.875rem] sm:text-[0.9375rem] font-semibold text-blue-500 min-w-[32px] sm:min-w-[42px] text-right">
            {sliderValue}%
          </span>
        </div>
      ) : (
        <label
          className={`toggle-switch ${toggleColor} relative inline-block w-[52px] sm:w-[56px] h-[28px] sm:h-[30px] cursor-pointer shrink-0`}
        >
          <input
            type="checkbox"
            checked={checked}
            onChange={onToggle}
            className="opacity-0 w-0 h-0 absolute"
          />
          <span className="toggle-slider" />
        </label>
      )}
    </div>
  )
}
