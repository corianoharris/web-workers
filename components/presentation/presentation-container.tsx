"use client"

import { usePresentation } from "./presentation-context"
import { SlideNavigation } from "./slide-navigation"
import { SlideProgress } from "./slide-progress"
import { TitleSlide } from "./slides/title-slide"
import { WhyWorkersExist } from "./slides/why-workers-exist"
import { SingleThreaded } from "./slides/single-threaded"
import { MainVsWorker } from "./slides/main-vs-worker"
import { HowPostMessageWorks } from "./slides/how-postmessage-works"
import { CreatingWorker } from "./slides/creating-worker"
import { SendingMessages } from "./slides/sending-messages"
import { WorkerReceiving } from "./slides/worker-receiving"
import { WorkerSendingBack } from "./slides/worker-sending-back"
import { HeavyLoopExample } from "./slides/heavy-loop-example"
import { RealWorldUseCases } from "./slides/real-world-use-cases"
import { CompaniesUsingWorkers } from "./slides/companies-using-workers"
import { DemoMainThreadFreeze } from "./slides/demo-main-thread-freeze"
import { DemoUsingWorker } from "./slides/demo-using-worker"
import { CallStackAnimation } from "./slides/call-stack-animation"
import { WorkerCallStackAnimation } from "./slides/worker-call-stack-animation"
import { WorkerTypesAndLimitations } from "./slides/worker-types-and-limitations"
import { ReviewSummary } from "./slides/review-summary"
import { Playground } from "./slides/playground"
import { useEffect, useCallback } from "react"

// 1-10: Basics, 11: Real-world examples, 12-13: Demos, 14-15: Mechanics, 16: Advanced topics, 17-18: Review & Practice
const slides = [
  TitleSlide, // 1
  WhyWorkersExist, // 2
  SingleThreaded, // 3
  MainVsWorker, // 4
  HowPostMessageWorks, // 5
  CreatingWorker, // 6
  SendingMessages, // 7
  WorkerReceiving, // 8
  WorkerSendingBack, // 9
  HeavyLoopExample, // 10
  RealWorldUseCases, // 11 - Interactive examples
  CompaniesUsingWorkers, // 12 - NEW: Real companies and products
  DemoMainThreadFreeze, // 13
  DemoUsingWorker, // 14
  CallStackAnimation, // 15
  WorkerCallStackAnimation, // 16
  WorkerTypesAndLimitations, // 17
  ReviewSummary, // 18
  Playground, // 19
]

export function PresentationContainer() {
  const { currentSlide, nextSlide, prevSlide } = usePresentation()

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        nextSlide()
      } else if (e.key === "ArrowLeft") {
        prevSlide()
      }
    },
    [nextSlide, prevSlide],
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  const CurrentSlideComponent = slides[currentSlide]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SlideProgress />
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-6xl">
          <CurrentSlideComponent />
        </div>
      </main>
      <SlideNavigation />
    </div>
  )
}
