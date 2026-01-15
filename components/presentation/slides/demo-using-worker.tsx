"use client"

import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Play, RotateCcw } from "lucide-react"

export function DemoUsingWorker() {
  const [isRunning, setIsRunning] = useState(false)
  const [result, setResult] = useState<number | null>(null)
  const [counter, setCounter] = useState(0)
  const [executionTime, setExecutionTime] = useState<number | null>(null)
  const workerRef = useRef<Worker | null>(null)
  const startTimeRef = useRef<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => prev + 1)
    }, 2000) // Updated from 100ms to 2000ms (2 seconds)

    return () => clearInterval(interval)
  }, [])

  const runWithWorker = () => {
    setIsRunning(true)
    setResult(null)
    startTimeRef.current = performance.now()

    // Create an inline worker using a Blob
    const workerCode = `
      self.onmessage = function() {
        let sum = 0;
        for (let i = 0; i < 500000000; i++) {
          sum += i % 100;
        }
        self.postMessage({ result: sum });
      };
    `
    const blob = new Blob([workerCode], { type: "application/javascript" })
    const workerUrl = URL.createObjectURL(blob)
    workerRef.current = new Worker(workerUrl)

    workerRef.current.onmessage = (e) => {
      const end = performance.now()
      setExecutionTime(Math.round(end - startTimeRef.current))
      setResult(e.data.result)
      setIsRunning(false)
      URL.revokeObjectURL(workerUrl)
    }

    workerRef.current.postMessage("start")
  }

  const reset = () => {
    setResult(null)
    setExecutionTime(null)
    if (workerRef.current) {
      workerRef.current.terminate()
      workerRef.current = null
    }
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="flex items-center justify-center gap-2 text-primary mb-4">
          <CheckCircle2 className="h-6 w-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Live Demo: Worker to the Rescue</h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Same hard work, but now in a worker. Watch the counter keep going!
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
            <h3 className="font-semibold text-foreground">Watch This Counter</h3>
            <p className="text-sm text-muted-foreground">
              This updates every 2 seconds. It should never stop!
            </p>
            <div className="text-6xl font-bold text-primary text-center py-8 bg-primary/10 rounded-xl">{counter}</div>
            <p className="text-xs text-muted-foreground text-center">
              The counter keeps counting even during heavy work!
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Try It Out</h3>
            <p className="text-sm text-muted-foreground">Same 500 million calculations, but now the page stays smooth.</p>
            <div className="space-y-4">
              <Button onClick={runWithWorker} disabled={isRunning} className="w-full">
                {isRunning ? (
                  "Worker Running (UI Still Works!)..."
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Run Heavy Task in Worker
                  </>
                )}
              </Button>
              <Button onClick={reset} variant="outline" className="w-full bg-transparent hover:bg-primary/10 hover:text-primary hover:border-primary">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>

            {result !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-xl bg-primary/10 border border-primary/30"
              >
                <p className="text-sm text-muted-foreground">Result:</p>
                <p className="font-mono text-foreground">{result.toLocaleString()}</p>
                {executionTime && (
                  <p className="text-sm text-primary mt-2">Time: {executionTime}ms (UI stayed responsive!)</p>
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
        className="p-4 rounded-xl bg-primary/10 border border-primary/30 text-center"
      >
        <p className="text-foreground">
          <span className="font-bold text-primary">See the difference?</span> Everything keeps working. Buttons click, counters count.
          This is why workers matter!
        </p>
      </motion.div>
    </div>
  )
}
