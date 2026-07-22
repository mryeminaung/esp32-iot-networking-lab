import { useState } from "react"
import SplashScreen from "@/components/dashboard/SplashScreen"
import Dashboard from "@/components/dashboard/Dashboard"
import useEsp32Sync from "@/hooks/useEsp32Sync"

export default function App() {
  const [showSplash, setShowSplash] = useState(true)

  useEsp32Sync()

  return (
    <>
      {showSplash && <SplashScreen onDone={() => setShowSplash(false)} />}
      <Dashboard />
    </>
  )
}
