import { ExternalLink, X } from "lucide-react"
import { useEffect } from "react"
import type { Experiment } from "./experiments"
import { statusConfig } from "./experiments"

type Props = {
	experiment: Experiment
	onClose: () => void
}

export default function ExperimentDetail({ experiment, onClose }: Props) {
	const Icon = experiment.icon
	const cfg = statusConfig[experiment.status]
	const d = experiment.detail

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose()
		}
		document.addEventListener("keydown", handler)
		return () => document.removeEventListener("keydown", handler)
	}, [onClose])

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
			onClick={(e) => {
				if (e.target === e.currentTarget) onClose()
			}}>
			<div className="card max-w-xl w-full max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
				{/* ── Header (sticky) ── */}
				<div className="flex items-start justify-between shrink-0">
					<div className="flex items-center gap-4 min-w-0">
						<div
							className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${experiment.iconBg} ${experiment.iconColor}`}>
							<Icon size={22} />
						</div>
						<div className="min-w-0">
							<h2 className="text-[1.15rem] font-bold truncate">
								{experiment.title}
							</h2>
							<span
								className={`inline-flex items-center gap-1.5 text-[0.65rem] font-semibold px-2.5 py-0.5 rounded-full border mt-1 ${cfg.badge}`}>
								<span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
								{cfg.label}
							</span>
						</div>
					</div>
					<button
						onClick={onClose}
						className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer shrink-0 ml-4"
						aria-label="Close">
						<X size={16} />
					</button>
				</div>

				{/* ── Scrollable body ── */}
				<div className="mt-6 space-y-5 overflow-y-auto pr-1 -mr-1">
					{/* Overview */}
					<section>
						<h3 className="text-[0.75rem] font-bold uppercase tracking-wider text-slate-400 mb-2">
							Overview
						</h3>
						<p className="text-[0.875rem] text-slate-600 dark:text-slate-300 leading-relaxed">
							{d.objective}
						</p>
					</section>

					<hr className="border-slate-100 dark:border-slate-700" />

					{/* Hardware */}
					<section>
						<h3 className="text-[0.75rem] font-bold uppercase tracking-wider text-slate-400 mb-2">
							Hardware
						</h3>
						<ul className="space-y-1">
							{d.hardware.map((item) => (
								<li
									key={item}
									className="text-[0.875rem] text-slate-600 dark:text-slate-300 flex items-center gap-2">
									<span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
									{item}
								</li>
							))}
						</ul>
					</section>

					<hr className="border-slate-100 dark:border-slate-700" />

					{/* Technologies */}
					<section>
						<h3 className="text-[0.75rem] font-bold uppercase tracking-wider text-slate-400 mb-2">
							Technologies
						</h3>
						<div className="flex flex-wrap gap-1.5">
							{d.technologies.map((t) => (
								<span
									key={t}
									className="text-[0.7rem] font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/25 dark:text-blue-400">
									{t}
								</span>
							))}
						</div>
					</section>

					{/* Circuit diagram placeholder */}
					{d.circuitImage && (
						<>
							<hr className="border-slate-100 dark:border-slate-700" />
							<section>
								<h3 className="text-[0.75rem] font-bold uppercase tracking-wider text-slate-400 mb-2">
									Circuit
								</h3>
								<div className="w-full h-40 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 text-[0.8rem]">
									Circuit diagram — image coming soon
								</div>
							</section>
						</>
					)}

					{/* Implementation steps */}
					<hr className="border-slate-100 dark:border-slate-700" />
					<section>
						<h3 className="text-[0.75rem] font-bold uppercase tracking-wider text-slate-400 mb-2">
							Implementation
						</h3>
						<ol className="space-y-1.5 list-decimal list-inside">
							{d.steps.map((step, i) => (
								<li
									key={i}
									className="text-[0.875rem] text-slate-600 dark:text-slate-300 leading-relaxed">
									{step}
								</li>
							))}
						</ol>
					</section>

					{/* API Endpoints */}
					{d.endpoints && (
						<>
							<hr className="border-slate-100 dark:border-slate-700" />
							<section>
								<h3 className="text-[0.75rem] font-bold uppercase tracking-wider text-slate-400 mb-2">
									API Endpoints
								</h3>
								<div className="space-y-1.5">
									{d.endpoints.map((ep) => (
										<div
											key={ep.path}
											className="flex items-center gap-3 font-mono text-[0.8125rem]">
											<span className="text-[0.65rem] font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 uppercase">
												{ep.method}
											</span>
											<span className="text-slate-600 dark:text-slate-300">
												{ep.path}
											</span>
										</div>
									))}
								</div>
							</section>
						</>
					)}

					{/* Result */}
					<hr className="border-slate-100 dark:border-slate-700" />
					<section>
						<h3 className="text-[0.75rem] font-bold uppercase tracking-wider text-slate-400 mb-2">
							Result
						</h3>
						<div className="rounded-xl bg-green-50 dark:bg-green-900/15 border border-green-200 dark:border-green-700/30 px-4 py-3">
							<p className="text-[0.875rem] text-green-700 dark:text-green-400 leading-relaxed">
								{d.result}
							</p>
						</div>
					</section>

					{/* Resources */}
					<hr className="border-slate-100 dark:border-slate-700" />
					<section className="pb-1">
						<h3 className="text-[0.75rem] font-bold uppercase tracking-wider text-slate-400 mb-2">
							Resources
						</h3>
						<div className="flex flex-wrap gap-2">
							{d.resources.map((r) => (
								<span
									key={r.label}
									className="inline-flex items-center gap-1.5 text-[0.75rem] font-semibold px-3 py-1.5 rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
									<ExternalLink size={12} />
									{r.label}
								</span>
							))}
						</div>
					</section>
				</div>
			</div>
		</div>
	)
}
