"use client"

import { motion } from "framer-motion"
import { Monitor, Cpu, ArrowLeftRight } from "lucide-react"

export function MainVsWorker() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Main Thread vs Worker Thread</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Think of them as two separate workers that can work at the same time!
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-xl bg-primary/10 border-2 border-primary"
        >
          <div className="flex items-center gap-3 mb-4">
            <Monitor className="h-8 w-8 text-primary" />
            <h3 className="text-xl font-bold text-foreground">Main Thread</h3>
          </div>
          <ul className="space-y-2 text-muted-foreground text-sm">
            <li>• Updates the screen (DOM)</li>
            <li>• Handles user clicks</li>
            <li>• Runs animations</li>
            <li>• Executes your main code</li>
          </ul>
          <div className="mt-4 p-3 rounded-lg bg-primary/20 text-center">
            <span className="text-primary font-semibold">Your UI lives here</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center gap-4"
        >
          <ArrowLeftRight className="h-12 w-12 text-accent animate-bounce-arrow" />
          <div className="text-center">
            <p className="text-sm font-semibold text-accent">postMessage</p>
            <p className="text-xs text-muted-foreground">They talk through messages</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-xl bg-chart-5/10 border-2 border-chart-5"
        >
          <div className="flex items-center gap-3 mb-4">
            <Cpu className="h-8 w-8 text-chart-5" />
            <h3 className="text-xl font-bold text-foreground">Worker Thread</h3>
          </div>
          <ul className="space-y-2 text-muted-foreground text-sm">
            <li>• Runs heavy calculations</li>
            <li>• Processes large data</li>
            <li>• Works in background</li>
            <li>• No DOM access</li>
          </ul>
          <div className="mt-4 p-3 rounded-lg bg-chart-5/20 text-center">
            <span className="text-chart-5 font-semibold">Heavy work goes here</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="p-4 rounded-xl bg-card border border-border text-center"
      >
        <p className="text-foreground">
          <span className="font-bold text-primary">Key Point:</span> Workers can&apos;t touch the DOM directly. They can
          only send messages back to the main thread with results.
        </p>
      </motion.div>
    </div>
  )
}
