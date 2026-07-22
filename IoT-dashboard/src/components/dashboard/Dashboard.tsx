import { useTheme } from "@/hooks/useTheme";
import ActivityLog from "./ActivityLog";
import CardContainer from "./CardContainer";
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
			<div className="grid gap-5 lg:grid-cols-[400px_1fr]">
				<aside className="space-y-5">
					<QuickControls />
					<SystemInfo />
				</aside>

				<main className="space-y-5">
					<CardContainer />
					<SensorCard />
					<ActivityLog />
				</main>
			</div>

			<Footer />
		</div>
	);
}
