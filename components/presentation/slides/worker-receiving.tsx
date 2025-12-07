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
      "Inside your worker file, you set up a listener using self.onmessage. This function runs whenever the main thread sends a message.",
  },
  {
    lines: [3, 4],
    explanation:
      "The 'event' parameter contains a 'data' property - this is exactly what postMessage() sent. We can destructure it to get our values.",
  },
  {
    lines: [6],
    explanation:
      "console.log works in workers too! Great for debugging. Check your browser's dev tools to see worker logs.",
  },
  {
    lines: [8, 9, 10, 11],
    explanation:
      "Now we can use the received data. Here we check if the message type is 'START' and then begin our heavy calculation.",
  },
]

export function WorkerReceiving() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Worker Receiving Messages</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Inside the worker file, we listen for messages using{" "}
          <code className="bg-secondary px-2 py-1 rounded">self.onmessage</code>.
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
