import { sendCommand } from "@/hooks/useEsp32Sync";
import { useDashboardStore, type DeviceKey } from "@/store/dashboard";
import { Droplets, Fan, Lightbulb, Square } from "lucide-react";
import ControlItem from "./ControlItem";

const allDevices: {
	key: DeviceKey;
	icon: typeof Lightbulb;
	label: string;
	gpio: string;
	color: string;
	type: "toggle" | "slider";
	disabled?: boolean;
}[] = [
	{
		key: "white_light",
		icon: Lightbulb,
		label: "White Light",
		gpio: "GPIO 18",
		color: "gray",
		type: "toggle",
	},
	{
		key: "relay",
		icon: Square,
		label: "Relay",
		gpio: "GPIO 21",
		color: "teal",
		type: "toggle",
	},
	{
		key: "fan",
		icon: Fan,
		label: "Fan",
		gpio: "GPIO 19",
		color: "blue",
		type: "slider",
	},
	{
		key: "water_pump",
		icon: Droplets,
		label: "Water Pump",
		gpio: "GPIO 22",
		color: "purple",
		type: "toggle",
	},
];

export default function QuickControls() {
	const devicesState = useDashboardStore((s) => s.devices);

	const handleToggle = (key: DeviceKey) => {
		const current = useDashboardStore.getState().devices[key];
		sendCommand(key, !current);
	};

	const handleSlider = (key: DeviceKey, val: number) => {
		sendCommand(key, val, val);
	};

	return (
		<section className="card">
			<h2 className="text-[1.1rem] font-bold mb-5 max-sm:text-[1rem] max-sm:mb-[14px]">
				Quick Controls
			</h2>

			{allDevices.map((dev, i) => {
				const isLast = i === allDevices.length - 1;
				const val = devicesState[dev.key];

				return dev.type === "slider" ? (
					<ControlItem
						key={dev.key}
						icon={dev.icon}
						label={dev.label}
						gpio={dev.gpio}
						color={dev.color}
						sliderValue={val as number}
						onSliderChange={(v) => handleSlider(dev.key, v)}
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
						onToggle={() => handleToggle(dev.key)}
						disabled={dev.disabled}
						last={isLast}
					/>
				);
			})}
		</section>
	);
}
