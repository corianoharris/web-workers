"use client"

import { motion } from "framer-motion"
import { CodeStepper } from "../code-stepper"
import { XCircle } from "lucide-react"

const code = `// When you're done with a worker, clean it up!
const worker = new Worker('worker.js');

// Do some work...
worker.postMessage({ data: 'process this' });

// When finished, terminate the worker
worker.terminate();
// The worker stops immediately
// All pending tasks are cancelled

// You can also stop from inside the worker:
// self.close(); // Worker terminates itself`

const steps = [
  {
    lines: [1, 2],
    explanation: "Create your worker like normal.",
  },
  {
    lines: [4, 5],
    explanation: "The worker does its job with the data you send.",
  },
  {
    lines: [7, 8, 9, 10],
    explanation:
      "When done, call terminate(). This stops the worker right away and clears its memory.",
  },
  {
    lines: [12, 13],
    explanation:
      "Or, the worker can stop itself using self.close(). Good when the worker knows it finished.",
  },
]

export function TerminatingWorker() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Stopping a Worker</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Workers use memory and resources. Stop them when you're done!
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <CodeStepper code={code} steps={steps} title="Cleaning Up Workers" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="grid md:grid-cols-2 gap-4"
      >
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30">
          <div className="flex items-center gap-2 mb-2">
            <XCircle className="h-5 w-5 text-destructive" />
            <span className="font-semibold text-foreground">When to terminate</span>
          </div>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• One-time calculations are done</li>
            <li>• User navigates away</li>
            <li>• Worker is no longer needed</li>
          </ul>
        </div>
        <div className="p-4 rounded-xl bg-primary/10 border border-primary/30">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-foreground">Keep running when</span>
          </div>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Worker handles continuous tasks</li>
            <li>• Real-time data processing</li>
            <li>• You&apos;ll need it again soon</li>
          </ul>
        </div>
      </motion.div>
    </div>
  )
}
