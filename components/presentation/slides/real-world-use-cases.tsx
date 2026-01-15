"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { ImageIcon, Lock, Database, Play, Pause, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UseCase {
  icon: any
  title: string
  description: string
  color: string
  steps: {
    action: string
    inWorker: boolean
    duration: number
  }[]
}

const useCases: UseCase[] = [
  {
    icon: ImageIcon,
    title: "Image Processing",
    description: "Edit, resize, or compress images without slowing down your page",
    color: "text-blue-500",
    steps: [
      { action: "User uploads image", inWorker: false, duration: 500 },
      { action: "Send image data to worker", inWorker: false, duration: 300 },
      { action: "Apply blur filter", inWorker: true, duration: 1000 },
      { action: "Adjust brightness", inWorker: true, duration: 800 },
      { action: "Compress image", inWorker: true, duration: 700 },
      { action: "Send processed image back", inWorker: true, duration: 300 },
      { action: "Display result to user", inWorker: false, duration: 500 },
    ],
  },
  {
    icon: Lock,
    title: "Encryption / Decryption",
    description: "Keep data secure without making users wait",
    color: "text-green-500",
    steps: [
      { action: "User enters password", inWorker: false, duration: 500 },
      { action: "Send data to worker", inWorker: false, duration: 300 },
      { action: "Generate encryption key", inWorker: true, duration: 900 },
      { action: "Encrypt large file", inWorker: true, duration: 1200 },
      { action: "Create secure hash", inWorker: true, duration: 600 },
      { action: "Return encrypted data", inWorker: true, duration: 300 },
      { action: "Save to storage", inWorker: false, duration: 500 },
    ],
  },
  {
    icon: Database,
    title: "Data Processing",
    description: "Sort, filter, or analyze big data sets instantly",
    color: "text-purple-500",
    steps: [
      { action: "Load CSV data", inWorker: false, duration: 500 },
      { action: "Send to worker", inWorker: false, duration: 300 },
      { action: "Parse 50,000 rows", inWorker: true, duration: 1000 },
      { action: "Filter by criteria", inWorker: true, duration: 800 },
      { action: "Sort results", inWorker: true, duration: 700 },
      { action: "Calculate statistics", inWorker: true, duration: 600 },
      { action: "Send results back", inWorker: true, duration: 300 },
      { action: "Render chart", inWorker: false, duration: 500 },
    ],
  },
]

export function RealWorldUseCases() {
  const [selectedCase, setSelectedCase] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [uiCounter, setUiCounter] = useState(0)

  const currentUseCase = useCases[selectedCase]
  const currentStepData = currentUseCase.steps[currentStep]

  // UI counter to show main thread is always responsive
  useEffect(() => {
    const interval = setInterval(() => {
      setUiCounter((prev) => prev + 1)
    }, 100)
    return () => clearInterval(interval)
  }, [])

  // Auto-play animation
  useEffect(() => {
    if (!isPlaying) return

    const timer = setTimeout(() => {
      if (currentStep < currentUseCase.steps.length - 1) {
        setCurrentStep((prev) => prev + 1)
      } else {
        setIsPlaying(false)
        setCurrentStep(0)
      }
    }, currentStepData.duration)

    return () => clearTimeout(timer)
  }, [isPlaying, currentStep, currentStepData.duration, currentUseCase.steps.length])

  const handleReset = () => {
    setIsPlaying(false)
    setCurrentStep(0)
  }

  const handleNext = () => {
    if (currentStep < currentUseCase.steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">When To Use Workers</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Here are real examples where workers keep everything smooth
        </p>
      </motion.div>

      {/* Use Case Selector */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex gap-3 justify-center flex-wrap"
      >
        {useCases.map((useCase, index) => {
          const Icon = useCase.icon
          return (
            <Button
              key={index}
              variant={selectedCase === index ? "default" : "outline"}
              onClick={() => {
                setSelectedCase(index)
                setCurrentStep(0)
                setIsPlaying(false)
              }}
              className="gap-2"
            >
              <Icon className={`h-4 w-4 ${selectedCase === index ? "" : useCase.color}`} />
              {useCase.title}
            </Button>
          )
        })}
      </motion.div>

      {/* Animation Area */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="p-6 rounded-xl bg-muted/50 border border-border"
      >
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Main Thread */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Main Thread</h3>
              <div className="px-3 py-1 rounded-full bg-green-500/20 border border-green-500/50">
                <span className="text-xs font-mono text-green-500">UI Counter: {uiCounter}</span>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-background border border-border min-h-[200px] space-y-2">
              <AnimatePresence mode="wait">
                {currentUseCase.steps.slice(0, currentStep + 1).map((step, index) =>
                  !step.inWorker ? (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: index === currentStep ? 1 : 0.4, x: 0 }}
                      exit={{ opacity: 0 }}
                      className={`p-2 rounded bg-teal-500/10 border ${
                        index === currentStep ? "border-teal-500/50" : "border-teal-500/20"
                      }`}
                    >
                      <p className="text-sm text-foreground">{step.action}</p>
                    </motion.div>
                  ) : null,
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Worker Thread */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Worker Thread</h3>
            <div className="p-4 rounded-lg bg-background border border-border min-h-[200px] space-y-2">
              <AnimatePresence mode="wait">
                {currentUseCase.steps.slice(0, currentStep + 1).map((step, index) =>
                  step.inWorker ? (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: index === currentStep ? 1 : 0.4, x: 0 }}
                      exit={{ opacity: 0 }}
                      className={`p-2 rounded bg-green-500/10 border ${
                        index === currentStep ? "border-green-500/50" : "border-green-500/20"
                      }`}
                    >
                      <p className="text-sm text-foreground">{step.action}</p>
                      {index === currentStep && (
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: step.duration / 1000 }}
                          className="h-1 bg-green-500 rounded-full mt-2"
                        />
                      )}
                    </motion.div>
                  ) : null,
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Current Step Description */}
        <div className="p-4 rounded-lg bg-primary/10 border border-primary/30 mb-4">
          <p className="text-sm text-foreground">
            <span className="font-semibold">Step {currentStep + 1}:</span> {currentStepData.action}
            <span className="ml-2 text-muted-foreground">
              ({currentStepData.inWorker ? "Worker Thread" : "Main Thread"})
            </span>
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" onClick={handlePrev} disabled={currentStep === 0 || isPlaying} className="hover:bg-primary/10 hover:text-primary hover:border-primary">
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => setIsPlaying(!isPlaying)} className="hover:bg-primary/10 hover:text-primary hover:border-primary">
            {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            {isPlaying ? "Pause" : "Auto-Play"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={currentStep === currentUseCase.steps.length - 1 || isPlaying}
            className="hover:bg-primary/10 hover:text-primary hover:border-primary"
          >
            Next
          </Button>
          <Button variant="outline" size="sm" onClick={handleReset} className="hover:bg-primary/10 hover:text-primary hover:border-primary">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </motion.div>

      {/* Key Insight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-4 rounded-xl bg-chart-5/10 border border-chart-5/30"
      >
        <p className="text-sm text-center text-muted-foreground">
          <span className="font-semibold text-foreground">Notice:</span> The UI Counter keeps running smoothly even
          during heavy worker operations. This is the power of Web Workers!
        </p>
      </motion.div>
    </div>
  )
}
