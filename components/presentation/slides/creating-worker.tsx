"use client"

import { motion } from "framer-motion"
import { CodeStepper } from "../code-stepper"

const code = `// Step 1: Hire a new worker for background tasks
const worker = new Worker(
  // Tell it where to find its job description
  new URL('./worker.js', import.meta.url),
  { type: 'module' } // Use modern JavaScript
);`

const steps = [
  {
    lines: [1],
    explanation: "This friendly comment tells you (and future you) what's happening. Always leave breadcrumbs!",
  },
  {
    lines: [2],
    explanation: "This is like hiring a new employee. You're creating a fresh background thread to handle heavy work.",
  },
  {
    lines: [3, 4],
    explanation:
      "You're telling the worker where to find its instructions (worker.js file). The 'new URL()' makes sure it finds the file no matter where your code runs.",
  },
  {
    lines: [5],
    explanation:
      "This option says 'use modern JavaScript syntax.' Without it, you'd be stuck with old-school code patterns.",
  },
]

export function CreatingWorker() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Creating a Worker</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          It only takes a few lines of code. Let&apos;s break it down:
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <CodeStepper code={code} steps={steps} title="main.js - Creating a Worker" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="p-4 rounded-xl bg-accent/10 border border-accent/30 text-center"
      >
        <p className="text-foreground">
          <span className="font-bold text-accent">Important:</span> Workers run in their own world.
          They use <code className="bg-secondary px-1 rounded">self</code> instead of{" "}
          <code className="bg-secondary px-1 rounded">window</code>.
        </p>
      </motion.div>
    </div>
  )
}
