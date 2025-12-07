"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HowPostMessageWorks() {
  const [isAnimating, setIsAnimating] = useState(true)
  const [messagePosition, setMessagePosition] = useState(0)
  const [direction, setDirection] = useState<"toWorker" | "toMain">("toWorker")

  useEffect(() => {
    if (!isAnimating) return

    const interval = setInterval(() => {
      setMessagePosition((prev) => {
        if (prev >= 100) {
          setDirection((d) => (d === "toWorker" ? "toMain" : "toWorker"))
          return 0
        }
        return prev + 2
      })
    }, 100)

    return () => clearInterval(interval)
  }, [isAnimating])

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How postMessage Works</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          The main thread and workers communicate by sending messages back and forth.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative p-8 rounded-xl bg-card border border-border"
      >
        <div className="flex justify-between items-center">
          <div className="w-32 h-32 rounded-xl bg-primary/20 border-2 border-primary flex items-center justify-center">
            <div className="text-center">
              <p className="font-bold text-primary">Main</p>
              <p className="text-xs text-muted-foreground">Thread</p>
            </div>
          </div>

          <div className="flex-1 mx-8 relative">
            <div className="h-2 bg-secondary rounded-full" />
            <motion.div
              className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                direction === "toWorker" ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"
              }`}
              style={{
                left: direction === "toWorker" ? `${messagePosition}%` : `${100 - messagePosition}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              📨
            </motion.div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>postMessage()</span>
              <span>onmessage</span>
            </div>
          </div>

          <div className="w-32 h-32 rounded-xl bg-chart-5/20 border-2 border-chart-5 flex items-center justify-center">
            <div className="text-center">
              <p className="font-bold text-chart-5">Worker</p>
              <p className="text-xs text-muted-foreground">Thread</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground mb-2">
            {direction === "toWorker"
              ? "Main thread sending data to worker (yellow)..."
              : "Worker sending modified result back (blue)..."}
          </p>
          <Button variant="outline" size="sm" onClick={() => setIsAnimating(!isAnimating)}>
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
