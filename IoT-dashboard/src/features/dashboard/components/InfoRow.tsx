import type { LucideIcon } from "lucide-react"

type InfoRowProps = {
  icon: LucideIcon
  label: string
  value: string
}

export default function InfoRow({ icon: Icon, label, value }: InfoRowProps) {
  return (
    <div className="flex items-center py-[14px] border-b border-slate-50 dark:border-slate-800 first-of-type:pt-1 last:border-b-0 last:pb-0">
      <div className="w-8 h-8 flex items-center justify-center text-slate-400 shrink-0">
        <Icon size={18} />
      </div>
      <span className="flex-1 ml-[14px] text-[0.875rem] sm:text-[0.9375rem] text-slate-600 dark:text-slate-400 truncate">
        {label}
      </span>
      {/* Value: truncate if too long on small screens */}
      <span className="text-[0.8125rem] sm:text-[0.9375rem] font-semibold text-right ml-2 truncate max-w-[120px] sm:max-w-none">
        {value}
      </span>
    </div>
  )
}
