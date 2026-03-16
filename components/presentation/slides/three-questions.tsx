"use client"

import { motion } from "framer-motion"

const questions = [
  {
    number: "01",
    question: "What is currently blocking your call stack?",
  },
  {
    number: "02",
    question: "What deserves its own worker?",
  },
  {
    number: "03",
    question: "Are you protecting the main thread like it's a stage during a live show?",
  },
]

export function ThreeQuestions() {
  return (
    <div className="space-y-10 py-8 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Three Questions</h2>
        <p className="text-sm text-muted-foreground uppercase tracking-widest">Closing — Take These With You</p>
      </motion.div>

      {/* Questions */}
      <div className="space-y-4">
        {questions.map((q, i) => (
          <motion.div
            key={q.number}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.3 }}
            className="flex items-start gap-5 p-6 rounded-xl bg-card border border-border"
          >
            <span className="text-4xl font-black text-primary/20 leading-none select-none">
              {q.number}
            </span>
            <p className="text-xl font-semibold text-foreground leading-snug pt-1">
              {q.question}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Closing statement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        className="space-y-4 text-center"
      >
        <div className="p-5 rounded-xl bg-secondary border border-border">
          <p className="text-base text-muted-foreground leading-relaxed">
            The browser has one visible brain.
            <br />
            Your user is watching it.
          </p>
          <p className="text-base text-foreground font-medium mt-3">
            When it freezes, they don&apos;t blame the stack.
            <br />
            <span className="text-destructive font-bold">They blame you.</span>
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8 }}
          className="p-6 rounded-xl bg-primary/10 border border-primary/30"
        >
          <p className="text-lg text-foreground mb-2">
            Web Workers don&apos;t make your code <em>fancy</em>.
          </p>
          <p className="text-2xl font-black text-primary">
            They make your experience generous.
          </p>
          <p className="text-base text-muted-foreground mt-3">
            And generous systems are the ones we come back to.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
