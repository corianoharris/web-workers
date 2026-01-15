"use client"

import { motion } from "framer-motion"
import { CodeStepper } from "../code-stepper"

const code = `// Creates a new Web Worker
const worker = new Worker(
  // new URL resolves relative paths safely
  new URL('./worker.js', import.meta.url),
  { type: 'module' } // allows ES modules
);`

const steps = [
  {
    lines: [1],
    explanation: "This is a comment explaining what we're doing. Comments help other developers understand your code!",
  },
  {
    lines: [2],
    explanation: "We create a new Worker by calling 'new Worker()'. This starts a brand new background thread.",
  },
  {
    lines: [3, 4],
    explanation:
      "The first argument is the path to your worker file. Using 'new URL()' makes sure the path works correctly in all situations.",
  },
  {
    lines: [5],
    explanation:
      "The second argument is an options object. Setting type: 'module' lets you use modern import/export statements in your worker.",
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
