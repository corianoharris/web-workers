"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

interface Step {
  lines: number[]
  explanation: string
}

interface CodeStepperProps {
  code: string
  steps: Step[]
  title?: string
}

export function CodeStepper({ code, steps, title }: CodeStepperProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const lines = code.split("\n")
  const activeLines = steps[currentStep]?.lines || []

  const next = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  const prev = () => setCurrentStep((prev) => Math.max(prev - 1, 0))
  const reset = () => setCurrentStep(0)

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {title && (
        <div className="px-4 py-2 bg-secondary/50 border-b border-border">
          <span className="text-sm font-medium text-foreground">{title}</span>
        </div>
      )}
      <div className="p-4 bg-[var(--code-bg)] font-mono text-sm overflow-x-auto">
        <pre>
          {lines.map((line, index) => {
            const lineNumber = index + 1
            const isActive = activeLines.includes(lineNumber)
            return (
              <div
                key={index}
                className={cn(
                  "px-2 py-0.5 -mx-2 rounded transition-all duration-300",
                  isActive ? "bg-[var(--highlight)]/20 border-l-2 border-[var(--highlight)]" : "opacity-40",
                )}
              >
                <span className="inline-block w-8 text-muted-foreground text-right mr-4 select-none">{lineNumber}</span>
                <span className={cn("transition-colors", isActive ? "text-foreground" : "text-muted-foreground")}>
                  {highlightSyntax(line)}
                </span>
              </div>
            )
          })}
        </pre>
      </div>
      <div className="p-4 border-t border-border bg-secondary/30">
        <div className="min-h-[60px] mb-4">
          <p className="text-foreground leading-relaxed">{steps[currentStep]?.explanation}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={prev} disabled={currentStep === 0}>
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button variant="outline" size="sm" onClick={next} disabled={currentStep === steps.length - 1}>
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </span>
            <Button variant="ghost" size="sm" onClick={reset}>
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function highlightSyntax(line: string): React.ReactNode {
  const patterns = [
    { regex: /(\/\/.*$)/g, className: "text-muted-foreground italic" },
    { regex: /\b(const|let|var|function|return|new|if|else|for)\b/g, className: "text-chart-3" },
    { regex: /\b(Worker|URL|self|window|console)\b/g, className: "text-primary" },
    { regex: /(["'`].*?["'`])/g, className: "text-chart-5" },
    { regex: /\b(postMessage|onmessage|terminate|log)\b/g, className: "text-accent" },
    { regex: /(\{|\}|$$|$$|\[|\])/g, className: "text-muted-foreground" },
  ]

  let result: React.ReactNode = line

  patterns.forEach(({ regex, className }) => {
    if (typeof result === "string") {
      const parts = result.split(regex)
      result = parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} className={className}>
            {part}
          </span>
        ) : (
          part
        ),
      )
    }
  })

  return result
}
