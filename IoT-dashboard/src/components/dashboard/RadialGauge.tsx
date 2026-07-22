import { useEffect, useRef } from "react";

type RadialGaugeProps = {
	value: number; // 0–100
	size?: number;
};

const circumference = 2 * Math.PI * 68; // r=68 → ~427.26

export default function RadialGauge({ value, size = 160 }: RadialGaugeProps) {
	const fillRef = useRef<SVGCircleElement>(null);

	// Responsive: shrink on small screens
	const gaugeSize =
		size > 120 ? "w-[130px] h-[130px] sm:w-[160px] sm:h-[160px]" : "w-full";

	/* Clamp & compute offset */
	const clamped = Math.max(0, Math.min(100, value));
	const offset = circumference - (clamped / 100) * circumference;

	/* Match ESP32: ≤30 red, 31–49 yellow, ≥50 green */
	const color = clamped >= 50 ? "#22c55e" : clamped > 30 ? "#f59e0b" : "#ef4444";

	/* Animate on change */
	useEffect(() => {
		if (fillRef.current) {
			fillRef.current.style.strokeDashoffset = String(offset);
			fillRef.current.style.stroke = color;
		}
	}, [offset, color]);

	return (
		<div
			className={`relative mx-auto ${gaugeSize}`}
			style={{ aspectRatio: "1" }}>
			<svg
				className="w-full h-full -rotate-90"
				viewBox="0 0 160 160"
				preserveAspectRatio="xMidYMid meet">
				{/* Background track */}
				<circle
					cx="80"
					cy="80"
					r="68"
					fill="none"
					stroke="#e2e8f0"
					strokeWidth={10}
					className="dark:stroke-slate-700"
				/>
				{/* Filled arc */}
				<circle
					ref={fillRef}
					cx="80"
					cy="80"
					r="68"
					fill="none"
					stroke={color}
					strokeWidth={10}
					strokeLinecap="round"
					strokeDasharray={circumference}
					strokeDashoffset={circumference}
					style={{
						transition: "stroke-dashoffset 0.6s ease, stroke 0.3s ease",
					}}
				/>
			</svg>

			{/* Center label */}
			<div className="absolute inset-0 flex flex-col items-center justify-center leading-tight">
				<span className="block text-[1.6rem] sm:text-[2rem] font-bold text-slate-900 dark:text-slate-100">
					{value ?? "--"}
				</span>
				<span className="text-[0.75rem] sm:text-[0.875rem] font-semibold text-slate-500">
					%
				</span>
				<span className="block text-[0.7rem] sm:text-[0.75rem] text-slate-400 mt-1 text-center px-2">
					Soil Moisture
				</span>
			</div>
		</div>
	);
}
