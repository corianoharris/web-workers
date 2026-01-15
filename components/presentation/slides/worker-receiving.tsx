"use client"

import { motion } from "framer-motion"
import { CodeStepper } from "../code-stepper"

const code = `// Worker receives data FROM the main thread
self.onmessage = (event) => {
  // event.data contains what was sent
  const { type, value } = event.data;

  console.log('Worker received:', type, value);

  // Now do something with the data!
  if (type === 'START') {
    // Start the heavy calculation
    doHeavyWork(value);
  }
};`

const steps = [
  {
    lines: [1, 2],
    explanation:
      "In your worker file, use self.onmessage to listen. This runs every time the main page sends something.",
  },
  {
    lines: [3, 4],
    explanation:
      "The 'event' has a 'data' property - that's what was sent. We can pull out the values we need.",
  },
  {
    lines: [6],
    explanation:
      "console.log works in workers! Great for checking what you received. Look in your browser's developer tools.",
  },
  {
    lines: [8, 9, 10, 11],
    explanation:
      "Now use the information. Here we check if the type is 'START' and then start working.",
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
