"use client"

import { Button } from "@/components/ui/button"
import { usePresentation } from "./presentation-context"
import { ChevronLeft, ChevronRight, Menu } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const slideNames = [
  // Act 1 — Hook
  "Web Workers: Keeping the Browser Responsive", //  1
  "A Frozen Button — The Trust Leak",            //  2
  "The Browser at the Counter",                  //  3
  // Act 2 — Root Cause
  "One Task at a Time",                          //  4
  "The Call Stack — Visual Proof",               //  5
  // Act 3 — Solution
  "Threads — The Solution Exists",               //  6
  "postMessage & onmessage — Animated",          //  7
  "Browser API — How Workers Are Created",       //  8
  // Act 4 — Participation + Story
  "Become the Browser! (Roles + Props)",         //  9
  "User Gives a Task",                           // 10
  "Worker Receives the Task",                    // 11
  "Worker Sends the Result Back",                // 12
  // Act 6 — Proof
  "Real Products Using Workers",                 // 13
  // Act 7 — Practice
  "Group Coding in CodePen",                     // 14
  // Act 8 — Close
  "Closing Lesson — Thank You",                  // 15
]

export function SlideNavigation() {
  const { currentSlide, totalSlides, nextSlide, prevSlide, goToSlide } = usePresentation()

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-sm border-t border-border">
      <div className="p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Button variant="ghost" size="lg" onClick={prevSlide} disabled={currentSlide === 0} className="gap-2 hover:bg-primary/10 hover:text-primary">
            <ChevronLeft className="h-5 w-5" />
            <span className="hidden sm:inline">Previous</span>
          </Button>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent hover:bg-primary/10 hover:text-primary hover:border-primary">
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
            className="gap-2 hover:bg-primary/10 hover:text-primary"
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
