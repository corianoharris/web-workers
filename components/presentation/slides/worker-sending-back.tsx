"use client"

import { motion } from "framer-motion"
import { CodeStepper } from "../code-stepper"

const codeWorker = `// Inside worker.js
self.onmessage = (event) => {
  const { value } = event.data;
  
  // Do some heavy calculation
  const result = value * 1000;
  
  // Send the result back TO the main thread
  self.postMessage({
    type: 'DONE',
    result: result
  });
};`

const codeMain = `// Back in main.js - listen for worker's response
worker.onmessage = (event) => {
  const { type, result } = event.data;
  
  if (type === 'DONE') {
    console.log('Got result from worker:', result);
    // Now you can update the UI!
    updateUI(result);
  }
};`

const stepsWorker = [
  {
    lines: [1, 2, 3],
    explanation: "First, the worker receives data from the main thread.",
  },
  {
    lines: [5, 6],
    explanation: "The worker does some calculation. In real apps, this could be a complex algorithm that takes time.",
  },
  {
    lines: [8, 9, 10, 11, 12],
    explanation: "When done, the worker sends the result back using self.postMessage(). This goes TO the main thread!",
  },
]

const stepsMain = [
  {
    lines: [1, 2],
    explanation: "In your main code, set up worker.onmessage to listen for messages FROM the worker.",
  },
  {
    lines: [3, 4],
    explanation: "The event.data contains whatever the worker sent with postMessage().",
  },
  {
    lines: [5, 6, 7, 8],
    explanation:
      "Once you get the result, you can safely update the UI! This runs on the main thread where DOM access is allowed.",
  },
]

export function WorkerSendingBack() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Worker Sending Back Results</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          After the worker finishes its task, it sends results back to the main thread.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <CodeStepper code={codeWorker} steps={stepsWorker} title="worker.js" />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <CodeStepper code={codeMain} steps={stepsMain} title="main.js" />
        </motion.div>
      </div>
    </div>
  )
}
