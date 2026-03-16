"use client"

import { motion } from "framer-motion"

const voices = [
  {
    role: "Developer",
    quote: "It's fast enough.",
    color: "text-primary",
    bg: "bg-primary/10 border-primary/30",
  },
  {
    role: "Designer",
    quote: "The layout is correct.",
    color: "text-chart-5",
    bg: "bg-chart-5/10 border-chart-5/30",
  },
]

export function TheLie() {
  return (
    <div className="space-y-10 py-8 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">The Lie We Tell Ourselves</h2>
        <p className="text-sm text-muted-foreground uppercase tracking-widest">Act 1 — The Self-Deception</p>
      </motion.div>

      {/* The quote */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center py-6"
      >
        <div className="inline-block px-8 py-5 rounded-2xl bg-secondary border-2 border-border">
          <p className="text-3xl md:text-4xl font-bold text-muted-foreground italic">
            &ldquo;It&apos;s only 200 milliseconds.&rdquo;
          </p>
        </div>
      </motion.div>

      {/* Two voices */}
      <div className="grid md:grid-cols-2 gap-4">
        {voices.map((v, i) => (
          <motion.div
            key={v.role}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.2 }}
            className={`p-5 rounded-xl border ${v.bg}`}
          >
            <p className={`text-xs uppercase tracking-widest font-semibold mb-2 ${v.color}`}>
              As {v.role}s, we say:
            </p>
            <p className="text-lg font-medium text-foreground italic">&ldquo;{v.quote}&rdquo;</p>
          </motion.div>
        ))}
      </div>

      {/* The truth */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="space-y-4 text-center"
      >
        <div className="p-6 rounded-xl bg-card border border-border">
          <p className="text-xl font-semibold text-foreground mb-2">
            But users don&apos;t measure milliseconds.
          </p>
          <p className="text-xl font-bold text-destructive">
            They measure doubt.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="p-4 rounded-xl bg-destructive/10 border border-destructive/30"
        >
          <p className="text-foreground text-lg leading-relaxed">
            And doubt spreads faster than latency.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            One frozen moment costs more than a hundred slow ones.
            <br />
            Because freezes feel like failures.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
