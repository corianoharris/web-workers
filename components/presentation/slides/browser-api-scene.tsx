"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const steps = [
  {
    step: 1,
    actor: "Main Thread",
    action: 'calls new Worker()',
    note: "Added to Call Stack",
    color: "bg-primary text-primary-foreground",
    border: "border-primary/40",
  },
  {
    step: 2,
    actor: "Browser API",
    action: "creates the worker",
    note: "Off the main thread — asynchronous",
    color: "bg-accent text-accent-foreground",
    border: "border-accent/40",
  },
  {
    step: 3,
    actor: "Main Thread",
    action: "pops the API call",
    note: "Continues handling user interactions",
    color: "bg-chart-5 text-foreground",
    border: "border-chart-5/40",
  },
]

const helpers = [
  { name: "Timers", example: "setTimeout, setInterval", color: "text-accent" },
  { name: "Network", example: "fetch, XHR", color: "text-chart-3" },
  { name: "Web Workers", example: "new Worker()", color: "text-primary" },
  { name: "DOM Events", example: "click, scroll, input", color: "text-chart-5" },
]

export function BrowserApiScene() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">
          Scene 5 — Browser Helpers / API
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          The Browser Provides Helpers
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          The browser has staff outside the main thread — helpers that handle heavy lifting
          so the main thread stays free.
        </p>
      </motion.div>

      {/* Browser API helpers grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3"
      >
        {helpers.map((h, i) => (
          <motion.div
            key={h.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.1 }}
            className="p-3 rounded-xl bg-card border border-border text-center space-y-1"
          >
            <p className={`text-sm font-bold ${h.color}`}>{h.name}</p>
            <p className="text-xs font-mono text-muted-foreground">{h.example}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Call flow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-5 rounded-xl bg-card border border-border space-y-4"
      >
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest text-center">
          Browser API Call Flow — new Worker()
        </p>

        <div className="flex flex-col md:flex-row items-center gap-3">
          {steps.map((s, i) => (
            <div key={s.step} className="flex items-center gap-3 flex-1 w-full">
              <div className={`flex-1 p-4 rounded-xl border ${s.border} space-y-2`}>
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold ${s.color}`}>
                  Step {s.step} — {s.actor}
                </div>
                <p className="text-sm font-mono text-foreground">{s.action}</p>
                <p className="text-xs text-muted-foreground">{s.note}</p>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0 hidden md:block" />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75 }}
        className="grid md:grid-cols-2 gap-4"
      >
        <div className="p-4 rounded-xl bg-primary/10 border border-primary/30">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">UX Takeaway</p>
          <p className="text-sm text-foreground">UI stays responsive — the main thread is never blocked by the worker creation.</p>
        </div>
        <div className="p-4 rounded-xl bg-chart-5/10 border border-chart-5/30">
          <p className="text-xs font-semibold text-chart-5 uppercase tracking-widest mb-1">Dev Takeaway</p>
          <p className="text-sm text-foreground">Worker is created asynchronously through the Browser API — off the main thread.</p>
        </div>
      </motion.div>
    </div>
  )
}
