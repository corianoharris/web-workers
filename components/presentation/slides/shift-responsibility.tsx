"use client"

import { motion } from "framer-motion"
import { Code2, Heart } from "lucide-react"

const modernDemands = [
  "Image manipulation",
  "Video editing",
  "Data visualization",
  "AI inference",
]

export function ShiftResponsibility() {
  return (
    <div className="space-y-8 py-8 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full bg-primary/10 border border-primary/30">
            <Code2 className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Why Developers Should Care</h2>
        <p className="text-sm text-muted-foreground uppercase tracking-widest">Act 6 — The Shift in Responsibility</p>
      </motion.div>

      {/* The choice */}
      <div className="grid md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="p-5 rounded-xl bg-destructive/10 border border-destructive/30"
        >
          <p className="text-xs text-destructive font-semibold uppercase tracking-wide mb-3">
            Without Web Workers, you&apos;re saying:
          </p>
          <p className="text-lg font-bold text-foreground leading-snug">
            &ldquo;Computation first.
            <br />
            Experience second.&rdquo;
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="p-5 rounded-xl bg-primary/10 border border-primary/30"
        >
          <p className="text-xs text-primary font-semibold uppercase tracking-wide mb-3">
            With Web Workers, you&apos;re saying:
          </p>
          <p className="text-lg font-bold text-foreground leading-snug flex items-start gap-2">
            <Heart className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
            &ldquo;Experience is sacred.&rdquo;
          </p>
        </motion.div>
      </div>

      {/* Modern demands */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="p-6 rounded-xl bg-card border border-border"
      >
        <p className="text-base text-foreground font-medium mb-4">
          Modern web apps do things browsers were never meant to do:
        </p>
        <div className="grid grid-cols-2 gap-3">
          {modernDemands.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className="flex items-center gap-2 p-3 rounded-lg bg-secondary"
            >
              <span className="text-primary">→</span>
              <span className="text-sm font-medium text-foreground">{item}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Punchline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="p-6 rounded-xl bg-primary/10 border border-primary/30 text-center"
      >
        <p className="text-xl font-bold text-foreground mb-2">
          And yet we pretend one thread is enough?
        </p>
        <p className="text-2xl font-black text-primary">It isn&apos;t.</p>
        <p className="text-sm text-muted-foreground mt-3">
          Using Web Workers isn&apos;t an optimization.
          <br />
          It&apos;s a declaration of values.
        </p>
      </motion.div>
    </div>
  )
}
