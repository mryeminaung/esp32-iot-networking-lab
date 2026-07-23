import { useDashboardStore } from "@/store/dashboard";
import { Activity, Clock, Globe, Lock, Monitor, Network } from "lucide-react";
import InfoRow from "./InfoRow";

export default function SystemInfo() {
	const sysInfo = useDashboardStore((s) => s.sysInfo);

	const rows = [
		{ icon: Monitor, label: "Device", value: sysInfo.device },
		{ icon: Network, label: "WiFi", value: sysInfo.wifi },
		{ icon: Activity, label: "Status", value: sysInfo.status },
		{ icon: Monitor, label: "Mode", value: sysInfo.mode },
		{ icon: Globe, label: "IP Address", value: sysInfo.ip },
		// { icon: Lock, label: "MAC Address", value: sysInfo.mac },
		{ icon: Clock, label: "Uptime", value: sysInfo.uptime },
	];

	return (
		<section className="card">
			<h2 className="text-[1.1rem] font-bold mb-5 max-sm:text-[1rem] max-sm:mb-[14px]">
				System Info
			</h2>

			{rows.map((r) => (
				<InfoRow
					key={r.label}
					icon={r.icon}
					label={r.label}
					value={r.value}
				/>
			))}
		</section>
	);
}
