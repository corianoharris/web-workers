"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HowPostMessageWorks() {
  const [isAnimating, setIsAnimating] = useState(true)
  const [messagePosition, setMessagePosition] = useState(0)
  const [direction, setDirection] = useState<"toWorker" | "toMain">("toWorker")
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (!isAnimating || isPaused) return

    const interval = setInterval(() => {
      if (direction === "toWorker") {
        // Moving right (0 to 100)
        setMessagePosition((prev) => {
          if (prev >= 100) {
            setIsPaused(true)
            setTimeout(() => {
              setDirection("toMain")
              setIsPaused(false)
            }, 3000)
            return 100
          }
          return prev + 2
        })
      } else {
        // Moving left (100 to 0)
        setMessagePosition((prev) => {
          if (prev <= 0) {
            setIsPaused(true)
            setTimeout(() => {
              setDirection("toWorker")
              setIsPaused(false)
            }, 3000)
            return 0
          }
          return prev - 2
        })
      }
    }, 100)

    return () => clearInterval(interval)
  }, [isAnimating, isPaused, direction])

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How Messages Travel</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Your page and workers talk by sending messages back and forth.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative p-8 rounded-xl bg-card border border-border"
      >
        <div className="flex justify-between items-center">
          <motion.div
            className="rounded-xl bg-primary/20 border-2 border-primary flex items-center justify-center transition-all"
            animate={{
              width: direction === "toMain" && messagePosition < 20 ? "200px" : "128px",
              height: direction === "toMain" && messagePosition < 20 ? "200px" : "128px"
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center">
              <p className="font-bold text-primary">Main</p>
              <p className="text-xs text-muted-foreground">Thread</p>
              {direction === "toMain" && messagePosition < 20 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-3 text-xs bg-blue-500/20 border border-blue-500 rounded px-2 py-1"
                >
                  <p className="text-blue-600 font-semibold">Result received!</p>
                </motion.div>
              )}
            </div>
          </motion.div>

          <div className="flex-1 mx-8 relative">
            <div className="h-2 bg-secondary rounded-full" />
            <motion.div
              key={direction}
              className="absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-2xl shadow-lg border-2"
              initial={{
                backgroundColor: direction === "toWorker" ? "#fbbf24" : "#3b82f6",
                borderColor: direction === "toWorker" ? "#f59e0b" : "#2563eb",
              }}
              animate={{
                backgroundColor: direction === "toWorker" ? "#fbbf24" : "#3b82f6",
                borderColor: direction === "toWorker" ? "#f59e0b" : "#2563eb",
              }}
              style={{
                left: `${messagePosition}%`,
                transform: "translate(-50%, -50%)",
              }}
              transition={{ duration: 0.3 }}
            >
              📨
            </motion.div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>postMessage()</span>
              <span>onmessage</span>
            </div>
          </div>

          <motion.div
            className="rounded-xl bg-chart-5/20 border-2 border-chart-5 flex items-center justify-center transition-all"
            animate={{
              width: direction === "toWorker" && messagePosition > 80 ? "200px" : "128px",
              height: direction === "toWorker" && messagePosition > 80 ? "200px" : "128px"
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center">
              <p className="font-bold text-chart-5">Worker</p>
              <p className="text-xs text-muted-foreground">Thread</p>
              {direction === "toWorker" && messagePosition > 80 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-3 text-xs bg-yellow-500/20 border border-yellow-500 rounded px-2 py-1"
                >
                  <p className="text-yellow-600 font-semibold">Processing...</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground mb-2">
            {direction === "toWorker"
              ? "Main thread sending data to worker (yellow message)..."
              : "Worker sending result back (blue message)..."}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAnimating(!isAnimating)}
            className="hover:bg-primary/10 hover:text-primary hover:border-primary"
          >
            {isAnimating ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            {isAnimating ? "Pause" : "Play"}
          </Button>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-4 rounded-xl bg-primary/10 border border-primary/30"
        >
          <h4 className="font-semibold text-primary mb-2">Main → Worker</h4>
          <code className="text-sm text-muted-foreground">worker.postMessage(data)</code>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-4 rounded-xl bg-chart-5/10 border border-chart-5/30"
        >
          <h4 className="font-semibold text-chart-5 mb-2">Worker → Main</h4>
          <code className="text-sm text-muted-foreground">self.postMessage(result)</code>
        </motion.div>
      </div>
    </div>
  )
}
