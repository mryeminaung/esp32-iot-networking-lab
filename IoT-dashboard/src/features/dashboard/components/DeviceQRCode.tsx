import { Check, Copy, QrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";

export default function DeviceQRCode() {
	const DASHBOARD_URL =
		import.meta.env.VITE_DASHBOARD_URL || "http://192.168.4.1";
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(DASHBOARD_URL);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {
			// Fallback: select text manually
			const input = document.createElement("input");
			input.value = DASHBOARD_URL;
			document.body.appendChild(input);
			input.select();
			document.execCommand("copy");
			document.body.removeChild(input);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	};

	return (
		<div className="w-full w-[600px] mx-auto overflow-hidden rounded-3xl shadow-lg bg-white dark:bg-[#060C1C]">
			{/* Two-column layout: stacks on mobile */}
			<div className="flex flex-col sm:flex-row">
				{/* ── Left: Gradient info panel ── */}
				<div className="sm:w-[45%] bg-gradient-to-br from-indigo-600 via-blue-500 to-sky-400 px-5 sm:px-6 py-8 sm:py-10 text-white flex flex-col items-center sm:items-start justify-center text-center sm:text-left">
					<div className="mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-xl bg-white/10 border-2 backdrop-blur-md mx-auto sm:mx-0">
						<QrCode
							size={28}
							className="sm:size-[32px]"
						/>
					</div>

					<h2 className="text-lg sm:text-xl font-semibold">
						ESP32 IoT Dashboard
					</h2>
					<p className="mt-1 text-xs sm:text-sm text-blue-100">
						IoT Networking Over Local Area
					</p>

					<p className="mt-4 text-xs text-blue-200/80 leading-relaxed max-w-[190px] mx-auto sm:mx-0 hidden sm:block">
						Scan the QR code or use the direct link to access the dashboard from
						any device on the same network.
					</p>
				</div>

				{/* ── Right: QR code + Direct link ── */}
				<div className="sm:w-[55%] flex flex-col items-center gap-5 p-6 sm:p-8">
					{/* QR Code */}
					<div className="rounded-2xl bg-gray-50 p-4 sm:p-5 shadow-md w-full max-w-[200px]">
						<div className="aspect-square w-full">
							<QRCodeSVG
								value={DASHBOARD_URL}
								size={200}
								level="H"
								className="w-full h-auto"
								style={{ width: "100%", height: "auto" }}
							/>
						</div>
					</div>

					<p className="text-sm font-medium text-gray-700 dark:text-gray-300 -mt-2">
						Scan to connect
					</p>

					{/* ── Direct Access Link card ── */}
					<div className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-3 sm:p-4">
						<p className="text-[0.7rem] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
							Direct Access Link
						</p>

						<div className="flex items-center gap-2">
							{/* Code block */}
							<code className="flex-1 text-[0.8125rem] sm:text-[0.875rem] font-mono text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 truncate select-all">
								{DASHBOARD_URL}
							</code>

							{/* Copy button */}
							<button
								onClick={handleCopy}
								className="shrink-0 w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-500 hover:text-blue-600 hover:border-blue-300 dark:hover:text-blue-400 dark:hover:border-blue-500 transition-all cursor-pointer"
								title={copied ? "Copied!" : "Copy URL"}>
								{copied ? (
									<Check
										size={16}
										className="text-green-500"
									/>
								) : (
									<Copy size={16} />
								)}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
