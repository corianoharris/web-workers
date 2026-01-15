"use client"

import { motion } from "framer-motion"
import { CodeStepper } from "../code-stepper"

const code = `// Send data TO the worker
worker.postMessage({
  type: 'START',
  value: 5
});

// You can send any data type:
worker.postMessage('hello');        // strings
worker.postMessage(42);             // numbers
worker.postMessage([1, 2, 3]);      // arrays
worker.postMessage({ name: 'Bob' }); // objects`

const steps = [
  {
    lines: [1],
    explanation: "postMessage() is how you send information to your worker.",
  },
  {
    lines: [2, 3, 4, 5],
    explanation: "Here we send an object with 'type' and 'value'. The worker gets this exact information.",
  },
  {
    lines: [7, 8],
    explanation: "You can send simple text or numbers without wrapping them up.",
  },
  {
    lines: [9, 10, 11],
    explanation: "Lists and objects work too! JavaScript makes a copy when sending to the worker.",
  },
]

export function SendingMessages() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Talking to Your Worker</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Use <code className="bg-secondary px-2 py-1 rounded">postMessage()</code> to send information from your page to
          the worker.
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <CodeStepper code={code} steps={steps} title="main.js - Sending Messages" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="p-4 rounded-xl bg-primary/10 border border-primary/30"
      >
        <p className="text-foreground text-center">
          <span className="font-bold text-primary">Remember:</span> The data is copied, not shared. Changes in the
          worker won&apos;t affect the original data in main thread.
        </p>
      </motion.div>
    </div>
  )
}
