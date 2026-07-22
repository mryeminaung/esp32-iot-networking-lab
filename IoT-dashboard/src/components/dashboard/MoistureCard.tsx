import { Lightbulb } from "lucide-react";

interface DeviceCardProps {
	name: string;
	gpio: number;
	color: "red" | "yellow" | "green";
	active: boolean;
}

const colors = {
	red: {
		bg: "bg-red-100",
		text: "text-red-500",
		activeBg: "bg-red-500",
		activeText: "text-white",
		activeIconBg: "bg-white/25",
	},
	yellow: {
		bg: "bg-yellow-100",
		text: "text-amber-500",
		activeBg: "bg-amber-500",
		activeText: "text-white",
		activeIconBg: "bg-white/25",
	},
	green: {
		bg: "bg-green-100",
		text: "text-green-500",
		activeBg: "bg-green-500",
		activeText: "text-white",
		activeIconBg: "bg-white/25",
	},
};

export function MoistureCard({ name, gpio, color, active }: DeviceCardProps) {
	const c = colors[color];

	return (
		<div
			className={`flex w-full flex-col items-center gap-3 py-6 rounded-2xl p-4 shadow-sm transition-all duration-300 hover:shadow-md ${
				active
					? `${c.activeBg} shadow-md`
					: "bg-white shadow-sm card r dark:shadow-slate-700"
			}`}>
			{/* Icon */}
			<div
				className={`flex h-12 w-12 items-center justify-center rounded-xl sm:h-14 sm:w-14 md:h-16 md:w-16 ${active ? c.activeIconBg : c.bg}`}>
				<Lightbulb
					className={`h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 transition-colors duration-300 ${active ? "text-white" : c.text}`}
				/>
			</div>

			{/* Label */}
			<div className="text-center">
				<h3
					className={`text-sm font-semibold leading-tight sm:text-base md:text-lg transition-colors duration-300 ${active ? "text-white" : ""}`}>
					{name}
				</h3>

				<p
					className={`mt-1 text-xs sm:text-sm transition-colors duration-300 ${active ? "text-white/80" : "text-muted-foreground"}`}>
					GPIO {gpio}
				</p>
			</div>
		</div>
	);
}
