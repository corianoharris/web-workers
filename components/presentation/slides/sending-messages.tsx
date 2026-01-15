"use client"

import { motion } from "framer-motion"
import { CodeStepper } from "../code-stepper"

const code = `// You: "Hey worker, I need help with this!"
worker.postMessage({
  type: 'START',
  value: 5
});

// You can send anything:
worker.postMessage('hello');        // Just text
worker.postMessage(42);             // Just a number
worker.postMessage([1, 2, 3]);      // A list of things
worker.postMessage({ name: 'Bob' }); // A bundle of info`

const steps = [
  {
    lines: [1],
    explanation: "Think of postMessage() like passing a note to someone. You're sending info to your worker to process.",
  },
  {
    lines: [2, 3, 4, 5],
    explanation: "Here we're sending a package of info: what type of work we want ('START') and the number to work with (5).",
  },
  {
    lines: [7, 8, 9],
    explanation: "You don't always need fancy packages. Sometimes a simple text message or number is all you need.",
  },
  {
    lines: [10, 11],
    explanation: "Lists and bundles of info work great too! The worker gets a fresh copy (not your original).",
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
          <span className="font-bold text-primary">Important:</span> The data is copied like making a photocopy. The
          worker gets its own version. If it changes something, your original stays untouched.
        </p>
      </motion.div>
    </div>
  )
}
