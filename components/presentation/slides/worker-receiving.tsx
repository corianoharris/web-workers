"use client"

import { motion } from "framer-motion"
import { CodeStepper } from "../code-stepper"

const code = `// Worker: "Got your message! Let me check what you need"
self.onmessage = (event) => {
  // Unpack what you sent me
  const { type, value } = event.data;

  console.log('Worker: I got your request!', type, value);

  // Time to get to work!
  if (type === 'START') {
    // Rolling up my sleeves...
    doHeavyWork(value);
  }
};`

const steps = [
  {
    lines: [1, 2],
    explanation:
      "This is your worker's inbox. Every time the main page sends something, this function wakes up and reads it.",
  },
  {
    lines: [3, 4],
    explanation:
      "The message arrives in event.data. We're unpacking it like opening a package to see what's inside.",
  },
  {
    lines: [6],
    explanation:
      "Your worker can talk back to you through console.log! Check your browser's console to see what it says.",
  },
  {
    lines: [8, 9, 10, 11],
    explanation:
      "Now we're checking what kind of work you want. If you said 'START', the worker starts crunching numbers.",
  },
]

export function WorkerReceiving() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Worker Receives Your Message</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Inside the worker, use{" "}
          <code className="bg-secondary px-2 py-1 rounded">self.onmessage</code> to listen for messages.
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <CodeStepper code={code} steps={steps} title="worker.js - Receiving Messages" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="p-4 rounded-xl bg-chart-5/10 border border-chart-5/30"
      >
        <p className="text-foreground text-center">
          <span className="font-bold text-chart-5">Note:</span> In a worker,
          <code className="bg-secondary px-1 mx-1 rounded">self</code> refers to the worker&apos;s global scope (similar
          to <code className="bg-secondary px-1 mx-1 rounded">window</code> in the main thread).
        </p>
      </motion.div>
    </div>
  )
}
