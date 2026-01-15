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

// Flow: Problem → Solution → Implementation → Examples → Deep Dive → Practice
const slides = [
  TitleSlide, // 1
  WhyWorkersExist, // 2 - Introduction
  SingleThreaded, // 3 - Understand the constraint
  DemoMainThreadFreeze, // 4 - SHOW the problem (moved up)
  MainVsWorker, // 5 - Introduce the solution
  CompaniesUsingWorkers, // 6 - Real-world validation (moved up)
  HowPostMessageWorks, // 7 - How they communicate
  CreatingWorker, // 8 - Start implementation
  SendingMessages, // 9
  WorkerReceiving, // 10
  WorkerSendingBack, // 11
  HeavyLoopExample, // 12 - Code example
  DemoUsingWorker, // 13 - SHOW the solution
  RealWorldUseCases, // 14 - Interactive examples
  CallStackAnimation, // 15 - Understand mechanics
  WorkerCallStackAnimation, // 16 - Deep dive
  WorkerTypesAndLimitations, // 17 - Advanced topics
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
