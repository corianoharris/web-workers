"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface PresentationContextType {
  currentSlide: number
  totalSlides: number
  nextSlide: () => void
  prevSlide: () => void
  goToSlide: (index: number) => void
}

const PresentationContext = createContext<PresentationContextType | undefined>(undefined)

export function PresentationProvider({ children }: { children: ReactNode }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = 15

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0))
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(Math.max(0, Math.min(index, totalSlides - 1)))
  }

  return (
    <PresentationContext.Provider value={{ currentSlide, totalSlides, nextSlide, prevSlide, goToSlide }}>
      {children}
    </PresentationContext.Provider>
  )
}

export function usePresentation() {
  const context = useContext(PresentationContext)
  if (!context) {
    throw new Error("usePresentation must be used within PresentationProvider")
  }
  return context
}
