import { useDashboardStore } from "@/store/dashboard";
import { History } from "lucide-react";

/* Dot color per log type */
const dotClass: Record<string, string> = {
	on: "bg-green-500",
	off: "bg-red-500",
	info: "bg-blue-500",
	adjust: "bg-amber-500",
};

export default function ActivityLog() {
	const logs = useDashboardStore((s) => s.logs);
	const clearLogs = useDashboardStore((s) => s.clearLogs);

	return (
		<section className="card mt-4 sm:mt-6">
			<h2 className="flex items-center gap-2 sm:gap-[10px] text-[1rem] sm:text-[1.1rem] font-bold mb-4 sm:mb-5">
				<History
					size={18}
					className="sm:size-5 text-slate-400 shrink-0"
				/>
				<span>Activity Log</span>
				<button
					onClick={clearLogs}
					className="ml-auto text-[0.7rem] sm:text-[0.75rem] font-semibold text-slate-400 bg-transparent border border-slate-200 dark:border-slate-600 rounded-[6px] px-2 sm:px-3 py-1 cursor-pointer transition-all hover:text-red-500 hover:border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20 whitespace-nowrap">
					Clear
				</button>
			</h2>

			<div
				className="max-h-[190px] sm:max-h-[220px] overflow-y-auto"
				style={{
					scrollbarWidth: "thin",
					scrollbarColor: "#cbd5e1 transparent",
				}}>
				{logs.length === 0 ? (
					<div className="text-center align-middle text-slate-400 py-6 text-[0.875rem]">
						No activity yet
					</div>
				) : (
					[...logs]
						.reverse()
						.slice(0, 5)
						.map((entry) => (
							<div
								key={entry.id}
								className="flex items-center gap-2 sm:gap-3 py-2 sm:py-[8px] border-b border-slate-100 dark:border-slate-700 last:border-b-0 text-[0.8125rem] sm:text-[0.875rem]">
								<span
									className={`w-2 h-2 rounded-full shrink-0 ${dotClass[entry.type] ?? "bg-slate-400"}`}
								/>
								<span className="text-slate-400 text-[0.75rem] sm:text-[0.8125rem] font-[tabular-nums] shrink-0 min-w-[55px] sm:min-w-[65px]">
									{entry.time}
								</span>
								{/* Message wraps on small screens */}
								<span className="text-slate-600 dark:text-slate-300 break-words min-w-0">
									{entry.message}
								</span>
							</div>
						))
				)}
			</div>
		</section>
	);
}
