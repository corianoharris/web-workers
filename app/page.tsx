import { PresentationProvider } from "@/components/presentation/presentation-context"
import { PresentationContainer } from "@/components/presentation/presentation-container"

export default function Home() {
  return (
    <PresentationProvider>
      <PresentationContainer />
    </PresentationProvider>
  )
}
