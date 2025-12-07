"use client"

import { usePresentation } from "./presentation-context"

export function SlideProgress() {
  const { currentSlide, totalSlides } = usePresentation()
  const progress = ((currentSlide + 1) / totalSlides) * 100

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-secondary z-50">
      <div className="h-full bg-primary transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
    </div>
  )
}
