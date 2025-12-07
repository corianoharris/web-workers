"use client"

import { Button } from "@/components/ui/button"
import { usePresentation } from "./presentation-context"
import { ChevronLeft, ChevronRight, Menu } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const slideNames = [
  "Title",
  "Why Web Workers Exist",
  "JavaScript Is Single-Threaded",
  "Main Thread vs Worker Thread",
  "How postMessage Works",
  "Creating a Worker",
  "Sending Messages to the Worker",
  "Worker Receiving Messages",
  "Worker Sending Back Results",
  "Real Example: Heavy Loop",
  "Real-World Use Cases",
  "Who Actually Uses Web Workers?",
  "Live Demo: Main Thread Freezes",
  "Live Demo: Using a Web Worker",
  "Interactive Call Stack Animation",
  "Worker Thread Deep Dive",
  "Worker Types & Limitations",
  "Review Summary",
  "Try It Yourself Playground",
]

export function SlideNavigation() {
  const { currentSlide, totalSlides, nextSlide, prevSlide, goToSlide } = usePresentation()

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-sm border-t border-border">
      <div className="p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Button variant="ghost" size="lg" onClick={prevSlide} disabled={currentSlide === 0} className="gap-2">
            <ChevronLeft className="h-5 w-5" />
            <span className="hidden sm:inline">Previous</span>
          </Button>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Menu className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    Slide {currentSlide + 1} of {totalSlides}
                  </span>
                  <span className="sm:hidden">
                    {currentSlide + 1}/{totalSlides}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="max-h-80 overflow-y-auto">
                {slideNames.map((name, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={currentSlide === index ? "bg-primary/20" : ""}
                  >
                    <span className="font-mono text-xs mr-2 text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Button
            variant="ghost"
            size="lg"
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
            className="gap-2"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <div className="pb-2 text-center text-xs text-muted-foreground border-t border-border/50">
        © 2025 powered by Coriano Harris. All rights reserved.
      </div>
    </div>
  )
}
