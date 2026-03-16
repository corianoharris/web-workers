"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { X } from "lucide-react"

export function FrozenButton() {
  const [judging, setJudging] = useState(false)
  const [clicks, setClicks] = useState(0)

  useEffect(() => {
    if (clicks >= 2) setJudging(true)
  }, [clicks])

  return (
    <div className="space-y-12 py-8 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">A Frozen Button</h2>
        <p className="text-sm text-muted-foreground uppercase tracking-widest">Scene 2 — The Trust Leak</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col items-center gap-8"
      >
        {/* Frozen spinner */}
        <div className="relative flex items-center justify-center w-24 h-24">
          <motion.div
            animate={{ rotate: judging ? 0 : 360 }}
            transition={judging ? { duration: 0 } : { duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full"
          />
          {judging && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <X className="h-8 w-8 text-amber-500" />
            </motion.div>
          )}
        </div>

        {/* Dramatic prose */}
        <div className="text-center space-y-4 max-w-lg">
          {[
            "You click a button.",
            "Nothing happens.",
            "You wait.",
            "You click again.",
          ].map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.4 }}
              className="text-xl md:text-2xl text-foreground font-medium"
            >
              {line}
            </motion.p>
          ))}

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2 }}
            className="text-lg text-muted-foreground italic"
          >
            Now you&apos;re not clicking anymore —
            <br />you&apos;re <span className="font-semibold text-amber-500 not-italic">judging</span>.
          </motion.p>
        </div>

        {/* Interactive demo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8 }}
          className="flex flex-col items-center gap-3"
        >
          <button
            onClick={() => setClicks((c) => c + 1)}
            className="px-6 py-3 rounded-xl bg-card border border-border text-foreground font-medium hover:border-primary/50 transition-colors cursor-pointer"
          >
            {judging ? "Already judging..." : clicks === 0 ? "Click me" : "Click again..."}
          </button>
          {clicks > 0 && !judging && (
            <p className="text-xs text-muted-foreground">One more time...</p>
          )}
        </motion.div>

        {/* The punchline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2 }}
          className="p-6 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center max-w-lg"
        >
          <p className="text-lg text-foreground leading-relaxed">
            That moment?
          </p>
          <p className="text-xl font-bold text-foreground mt-1">
            That&apos;s not a performance bug.
          </p>
          <p className="text-xl font-bold text-amber-500 mt-1">
            That&apos;s a trust leak.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
