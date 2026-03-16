"use client"

import { usePresentation } from "./presentation-context"
import { SlideNavigation } from "./slide-navigation"
import { SlideProgress } from "./slide-progress"

import { TitleSlide } from "./slides/title-slide"
import { BrowserAtTheCounter } from "./slides/browser-at-the-counter"
import { FrozenButton } from "./slides/frozen-button"
import { SingleThreaded } from "./slides/single-threaded"
import { CallStackAnimation } from "./slides/call-stack-animation"
import { WhyWorkersExist } from "./slides/why-workers-exist"
import { BrowserApiScene } from "./slides/browser-api-scene"
import { HowPostMessageWorks } from "./slides/how-postmessage-works"
import { WorkerCallStackAnimation } from "./slides/worker-call-stack-animation"
import { AudienceParticipation } from "./slides/audience-participation"
import { UserAction } from "./slides/user-action"
import { OffloadViaBrowserApi } from "./slides/offload-via-browser-api"
import { WorkerReceiving } from "./slides/worker-receiving"
import { WorkerSendingBack } from "./slides/worker-sending-back"
import { UpdateDom } from "./slides/update-dom"
import { CompaniesUsingWorkers } from "./slides/companies-using-workers"
import { DemoUsingWorker } from "./slides/demo-using-worker"
import { CodepenGroupCoding } from "./slides/codepen-group-coding"
import { ClosingSlide } from "./slides/closing-slide"

import { useEffect, useCallback } from "react"

// 16 slides — storytelling arc
const slides = [
  // ACT 1 — HOOK: Start with the human pain, then explain the world
  TitleSlide,               //  1 — Set the stage
  FrozenButton,             //  2 — Emotional hook: you click, nothing happens
  BrowserAtTheCounter,      //  3 — Why it happens: the browser is one person

  // ACT 2 — ROOT CAUSE: Show the mechanical constraint
  SingleThreaded,           //  4 — One task at a time
  CallStackAnimation,       //  5 — Visual proof: the call stack

  // ACT 3 — SOLUTION: Introduce the hero and the mechanism
  WhyWorkersExist,          //  6 — Threads: the solution exists
  HowPostMessageWorks,      //  7 — How they communicate (animated back-and-forth)
  BrowserApiScene,          //  8 — How workers are created via the Browser API

  // ACT 4 — PARTICIPATION + THE STORY
  AudienceParticipation,    //  9 — Become the browser! (roles + props)
  UserAction,               // 10 — User gives a task
  WorkerReceiving,          // 11 — Worker receives the task
  WorkerSendingBack,        // 12 — Worker sends the result back

  // ACT 5 — FULL PICTURE: Deep dive (now the audience can appreciate it)
  // WorkerCallStackAnimation, // hidden — uncomment to restore

  // ACT 6 — PROOF: Real-world validation
  CompaniesUsingWorkers,    // 13 — Figma, Spotify, Google Docs — they all use this

  // ACT 7 — PRACTICE: Do it yourself
  CodepenGroupCoding,       // 14 — Group coding in CodePen

  // ACT 8 — CLOSE
  ClosingSlide,             // 15 — Closing lesson + thank you
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
