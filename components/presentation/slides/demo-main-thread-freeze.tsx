"use client"

import { motion } from "framer-motion"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Play, RotateCcw } from "lucide-react"

export function DemoMainThreadFreeze() {
  const [isRunning, setIsRunning] = useState(false)
  const [result, setResult] = useState<number | null>(null)
  const [counter, setCounter] = useState(0)
  const [executionTime, setExecutionTime] = useState<number | null>(null)
  const counterRef = useRef<NodeJS.Timeout | null>(null)

  const startCounter = () => {
    counterRef.current = setInterval(() => {
      setCounter((prev) => prev + 1)
    }, 100)
  }

  const stopCounter = () => {
    if (counterRef.current) {
      clearInterval(counterRef.current)
      counterRef.current = null
    }
  }

  const runHeavyTask = () => {
    setIsRunning(true)
    setResult(null)
    setCounter(0)
    startCounter()

    const start = performance.now()

    // This will freeze the page!
    setTimeout(() => {
      let sum = 0
      for (let i = 0; i < 500000000; i++) {
        sum += i % 100
      }
      const end = performance.now()
      setExecutionTime(Math.round(end - start))
      setResult(sum)
      setIsRunning(false)
      stopCounter()
    }, 10)
  }

  const reset = () => {
    setResult(null)
    setCounter(0)
    setExecutionTime(null)
    stopCounter()
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="flex items-center justify-center gap-2 text-destructive mb-4">
          <AlertTriangle className="h-6 w-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Live Demo: Main Thread Freezes</h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Watch how a heavy task on the main thread freezes everything!
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-6 rounded-xl bg-card border border-border"
      >
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Counter Animation</h3>
            <p className="text-sm text-muted-foreground">
              This counter should update every 100ms. Watch what happens when you run the heavy task!
            </p>
            <div className="text-6xl font-bold text-primary text-center py-8 bg-primary/10 rounded-xl">{counter}</div>
            <p className="text-xs text-muted-foreground text-center">
              If the counter stops updating, the page is frozen!
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Heavy Task Control</h3>
            <p className="text-sm text-muted-foreground">
              Click the button to run 500 million calculations on the main thread.
            </p>
            <div className="space-y-4">
              <Button
                onClick={runHeavyTask}
                disabled={isRunning}
                className="w-full"
                variant={isRunning ? "secondary" : "destructive"}
              >
                {isRunning ? (
                  "Running (Page Should Freeze)..."
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Run Heavy Task on Main Thread
                  </>
                )}
              </Button>
              <Button onClick={reset} variant="outline" className="w-full bg-transparent">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>

            {result !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-xl bg-secondary"
              >
                <p className="text-sm text-muted-foreground">Result:</p>
                <p className="font-mono text-foreground">{result.toLocaleString()}</p>
                {executionTime && (
                  <p className="text-sm text-destructive mt-2">Time: {executionTime}ms (UI was frozen!)</p>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-center"
      >
        <p className="text-foreground">
          <span className="font-bold text-destructive">Notice:</span> The counter freezes while the task runs. This is
          what happens to your entire page when heavy code runs on the main thread!
        </p>
      </motion.div>
    </div>
  )
}
