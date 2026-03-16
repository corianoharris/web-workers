"use client"

import { motion } from "framer-motion"
import { ExternalLink, Code2 } from "lucide-react"

const CODEPEN_URL = "https://codepen.io/Coriano-Harris/pen/ogzbGxx"

const steps = [
  { number: "01", instruction: "Open the CodePen link on your device" },
  { number: "02", instruction: "Fork the pen so you have your own copy" },
  { number: "03", instruction: "Follow along as we build the worker together" },
  { number: "04", instruction: "Run it — watch the UI stay smooth" },
]

export function CodepenGroupCoding() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">
          Scene 15 — Hands-On / Follow Along
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Try It Yourself — Code Along in CodePen
        </h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Open the link, fork the pen, and follow along. Five minutes to feel the difference.
        </p>
      </motion.div>

      {/* Link card */}
      <motion.a
        href={CODEPEN_URL}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-between gap-4 p-6 rounded-xl bg-card border-2 border-primary/40 hover:border-primary hover:bg-primary/5 transition-all group cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <Code2 className="h-8 w-8 text-primary shrink-0" />
          <div>
            <p className="font-bold text-foreground text-lg">Open CodePen</p>
            <p className="text-sm font-mono text-muted-foreground break-all">{CODEPEN_URL}</p>
          </div>
        </div>
        <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
      </motion.a>

      {/* Steps */}
      <div className="grid grid-cols-2 gap-3">
        {steps.map((s, i) => (
          <motion.div
            key={s.number}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="p-4 rounded-xl bg-secondary border border-border flex items-start gap-3"
          >
            <span className="font-mono text-xl font-black text-primary/30 leading-none">{s.number}</span>
            <p className="text-sm text-foreground leading-snug">{s.instruction}</p>
          </motion.div>
        ))}
      </div>

      {/* Goal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="grid md:grid-cols-2 gap-4"
      >
        <div className="p-4 rounded-xl bg-primary/10 border border-primary/30">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">UX Goal</p>
          <p className="text-sm text-foreground">Smooth interface despite heavy computation — feel it yourself.</p>
        </div>
        <div className="p-4 rounded-xl bg-chart-5/10 border border-chart-5/30">
          <p className="text-xs font-semibold text-chart-5 uppercase tracking-widest mb-1">Dev Goal</p>
          <p className="text-sm text-foreground">Offloaded computation — main thread stays free and responsive.</p>
        </div>
      </motion.div>
    </div>
  )
}
