"use client"

import { motion } from "framer-motion"
import { Palette, Zap, AlertTriangle } from "lucide-react"

const breakpoints = [
  { symptom: "Stutters while filtering", impact: "User loses confidence in the search" },
  { symptom: "Freezes while calculating", impact: "User assumes the app is broken" },
  { symptom: "Janks while parsing", impact: "User exits before seeing results" },
]

export function FlowIsFragile() {
  return (
    <div className="space-y-8 py-8 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full bg-chart-5/10 border border-chart-5/30">
            <Palette className="h-8 w-8 text-chart-5" />
          </div>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Why Designers Should Care</h2>
        <p className="text-sm text-muted-foreground uppercase tracking-widest">Act 5 — Flow Is Fragile</p>
      </motion.div>

      {/* Core truth */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="grid md:grid-cols-2 gap-4"
      >
        <div className="p-5 rounded-xl bg-secondary border border-border flex items-center gap-4">
          <span className="text-3xl">❌</span>
          <div>
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide mb-1">Design is NOT</p>
            <p className="text-lg font-bold text-foreground">Layout</p>
          </div>
        </div>
        <div className="p-5 rounded-xl bg-chart-5/10 border border-chart-5/30 flex items-center gap-4">
          <Zap className="h-8 w-8 text-chart-5 flex-shrink-0" />
          <div>
            <p className="text-sm text-chart-5 font-medium uppercase tracking-wide mb-1">Design IS</p>
            <p className="text-lg font-bold text-foreground">Momentum</p>
          </div>
        </div>
      </motion.div>

      {/* Flow breakpoints */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-3"
      >
        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">When your app…</p>
        {breakpoints.map((b, i) => (
          <motion.div
            key={b.symptom}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.15 }}
            className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border"
          >
            <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground">{b.symptom}</p>
              <p className="text-sm text-muted-foreground">{b.impact}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* The solution framing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="p-6 rounded-xl bg-chart-5/10 border border-chart-5/30 text-center space-y-3"
      >
        <p className="text-lg font-bold text-foreground">Web Workers protect flow.</p>
        <p className="text-muted-foreground">
          They keep the stage crew backstage — so the performance continues uninterrupted.
        </p>
        <div className="flex justify-center gap-6 pt-2 text-sm">
          <span className="flex items-center gap-1 text-chart-5 font-medium">
            🎭 Stage crew → Worker Thread
          </span>
          <span className="flex items-center gap-1 text-primary font-medium">
            ✨ Performance → Main Thread
          </span>
        </div>
      </motion.div>
    </div>
  )
}
