import { useState } from "react"
import SplashScreen from "./SplashScreen"
import Dashboard from "./components/Dashboard"
import useEsp32Sync from "./hooks/useEsp32Sync"

export default function DashboardPage() {
	const [showSplash, setShowSplash] = useState(true)

	useEsp32Sync()

	return (
		<>
			{showSplash && <SplashScreen onDone={() => setShowSplash(false)} />}
			<Dashboard />
		</>
	)
}
