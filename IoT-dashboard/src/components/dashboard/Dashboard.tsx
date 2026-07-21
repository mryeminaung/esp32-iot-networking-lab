import { useTheme } from "@/hooks/useTheme";
import ActivityLog from "./ActivityLog";
import Footer from "./Footer";
import Header from "./Header";
import QuickControls from "./QuickControls";
import SensorCard from "./SensorCard";
import SystemInfo from "./SystemInfo";

export default function Dashboard() {
	// Keeps <html data-theme> in sync
	useTheme();

	return (
		<div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
			<Header />

			{/* Two-column grid — stacks at 900px.
          Right column is minmax(0, 380px) so it never overflows on tiny screens. */}
			<div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,380px)] gap-4 sm:gap-6 items-start">
				{/* Left column */}
				<QuickControls />

				{/* Right column */}
				<div className="flex flex-col gap-4 sm:gap-6">
					<SystemInfo />
					<SensorCard />
				</div>
			</div>

			<ActivityLog />
			<Footer />
		</div>
	);
}
