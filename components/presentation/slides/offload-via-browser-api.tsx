"use client"

import { motion } from "framer-motion"
import { ArrowRight, ArrowDown, Cpu, Globe, Settings } from "lucide-react"

export function OffloadViaBrowserApi() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">
          Scene 9 — Offload Work via Browser API
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          The Main Thread Calls for Backup
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Instead of doing the heavy task itself, the Main Thread delegates to the Browser API,
          which spins up a Web Worker — completely off the main thread.
        </p>
      </motion.div>

      {/* Flow diagram */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="p-5 rounded-xl bg-card border border-border"
      >
        <div className="flex flex-col md:flex-row items-center gap-3 justify-center mb-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="p-4 rounded-xl bg-primary/10 border border-primary/40 text-center w-52"
          >
            <Cpu className="h-5 w-5 text-primary mx-auto mb-1" />
            <p className="font-bold text-sm text-foreground">Main Thread</p>
            <p className="font-mono text-xs text-primary mt-1">new Worker()</p>
            <p className="text-xs text-muted-foreground mt-1">on Call Stack</p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}>
            <ArrowRight className="h-5 w-5 text-muted-foreground hidden md:block" />
            <ArrowDown className="h-5 w-5 text-muted-foreground md:hidden" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            className="p-4 rounded-xl bg-accent/10 border border-accent/40 text-center w-52"
          >
            <Globe className="h-5 w-5 text-accent mx-auto mb-1" />
            <p className="font-bold text-sm text-foreground">Browser API</p>
            <p className="text-xs text-muted-foreground mt-1">Creates worker off main thread</p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}>
            <ArrowRight className="h-5 w-5 text-muted-foreground hidden md:block" />
            <ArrowDown className="h-5 w-5 text-muted-foreground md:hidden" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1 }}
            className="p-4 rounded-xl bg-chart-5/10 border border-chart-5/40 text-center w-52"
          >
            <Settings className="h-5 w-5 text-chart-5 mx-auto mb-1" />
            <p className="font-bold text-sm text-foreground">Web Worker</p>
            <p className="text-xs text-muted-foreground mt-1">Separate thread — heavy task runs here</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mt-4 p-3 rounded-xl bg-primary/5 border border-primary/20 text-center"
        >
          <p className="text-sm text-foreground">
            <span className="font-bold text-primary">Main Thread pops the API call</span> — continues handling clicks,
            animations, and DOM updates uninterrupted.
          </p>
        </motion.div>
      </motion.div>

      {/* Props note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.7 }}
        className="p-4 rounded-xl bg-muted border border-border text-center"
      >
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">Audience Props</p>
        <p className="text-sm text-foreground">
          The{" "}
          <span className="font-mono bg-background px-2 py-0.5 rounded border text-xs">Browser API card</span>{" "}
          moves from Main Thread volunteer to Web Worker volunteer.
          Main Thread volunteer sits back down — they&apos;re free.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.9 }}
        className="grid md:grid-cols-2 gap-4"
      >
        <div className="p-4 rounded-xl bg-primary/10 border border-primary/30">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">UX Takeaway</p>
          <p className="text-sm text-foreground">Main thread is free to respond to the user while the worker runs.</p>
        </div>
        <div className="p-4 rounded-xl bg-chart-5/10 border border-chart-5/30">
          <p className="text-xs font-semibold text-chart-5 uppercase tracking-widest mb-1">Dev Takeaway</p>
          <p className="text-sm text-foreground">Heavy computation runs asynchronously — main thread never blocks.</p>
        </div>
      </motion.div>
    </div>
  )
}
