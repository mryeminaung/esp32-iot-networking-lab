import { useState } from "react"
import SplashScreen from "@/components/dashboard/SplashScreen"
import Dashboard from "@/components/dashboard/Dashboard"

export default function App() {
  const [showSplash, setShowSplash] = useState(true)

  return (
    <>
      {showSplash && <SplashScreen onDone={() => setShowSplash(false)} />}
      <Dashboard />
    </>
  )
}
