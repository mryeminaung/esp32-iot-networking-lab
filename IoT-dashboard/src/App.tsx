import DashboardPage from "@/features/dashboard/DashboardPage"
import ExperimentsPage from "@/features/experiments/ExperimentsPage"
import { BrowserRouter, Navigate, Route, Routes } from "react-router"

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<DashboardPage />} />
				<Route path="/experiments" element={<ExperimentsPage />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</BrowserRouter>
	)
}
