"use client"

import { motion } from "framer-motion"
import { Heart, Cpu, Zap, Brain, Users, Layers, TrendingUp } from "lucide-react"

const takeaways = [
  { Icon: Brain,      text: "One thread is a constraint, not a destiny" },
  { Icon: Users,      text: "Workers are a promise to your users" },
  { Icon: Layers,     text: "Keep the stage clear — move the crew backstage" },
  { Icon: TrendingUp, text: "Smooth UX is not a luxury, it's an expectation" },
]

export function ClosingSlide() {
  return (
    <div className="text-center space-y-8 py-8 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center gap-4"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <Cpu className="h-10 w-10 text-primary" />
        </motion.div>
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
          <Zap className="h-10 w-10 text-accent" />
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h2 className="text-4xl md:text-5xl font-black text-foreground mb-3">Thank You</h2>
        <p className="text-xl text-primary font-semibold">Go build something generous.</p>
      </motion.div>

      {/* Key Takeaways */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-6 rounded-xl bg-card border border-border text-left space-y-3"
      >
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest text-center mb-4">
          Take These With You
        </p>
        {takeaways.map((t, i) => {
          const Icon = t.Icon
          return (
            <motion.div
              key={t.text}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.12 }}
              className="flex items-center gap-3"
            >
              <Icon className="h-4 w-4 text-primary shrink-0" />
              <p className="text-sm text-foreground">{t.text}</p>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Final quote */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1 }}
        className="p-6 rounded-xl bg-primary/10 border border-primary/30"
      >
        <p className="text-lg text-foreground font-medium leading-relaxed">
          Web Workers don&apos;t just make your app faster.
          <br />
          <span className="text-2xl font-black text-primary">They make it kind.</span>
        </p>
        <div className="flex justify-center mt-4">
          <Heart className="h-6 w-6 text-primary" />
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="text-sm text-muted-foreground"
      >
        Use arrow keys to navigate back through the slides
      </motion.p>
    </div>
  )
}
