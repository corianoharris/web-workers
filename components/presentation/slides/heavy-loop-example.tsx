"use client"

import { motion } from "framer-motion"
import { CodeStepper } from "../code-stepper"
import { AlertTriangle, CheckCircle2 } from "lucide-react"

const badCode = `// This will FREEZE your page! 😱
function heavyTask() {
  let sum = 0;
  for (let i = 0; i < 2000000000; i++) {
    sum += i;
  }
  return sum;
}

// When you call this, page freezes:
const result = heavyTask();
console.log(result);`

const goodCode = `// worker.js - This runs in background! 🎉
self.onmessage = () => {
  let sum = 0;
  for (let i = 0; i < 2000000000; i++) {
    sum += i;
  }
  self.postMessage({ result: sum });
};

// main.js - Page stays responsive!
const worker = new Worker('worker.js');
worker.onmessage = (e) => console.log(e.data.result);
worker.postMessage('start');`

const badSteps = [
  {
    lines: [1, 2, 3, 4, 5, 6, 7, 8],
    explanation: "This function loops 2 BILLION times! On the main thread, this blocks everything.",
  },
  {
    lines: [10, 11, 12],
    explanation:
      "When you call heavyTask(), your page completely freezes until all 2 billion loops are done. Users can't click anything!",
  },
]

const goodSteps = [
  {
    lines: [1, 2, 3, 4, 5, 6, 7, 8],
    explanation: "The same heavy loop, but now it runs inside a worker. The main thread stays free!",
  },
  {
    lines: [10, 11, 12, 13],
    explanation: "In main.js, we create the worker and listen for results. The UI stays responsive the whole time!",
  },
]

export function HeavyLoopExample() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Real Example: Heavy Loop</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Compare what happens with and without a Web Worker.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            <span className="font-semibold">Without Worker (Bad)</span>
          </div>
          <CodeStepper code={badCode} steps={badSteps} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2 text-primary">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-semibold">With Worker (Good)</span>
          </div>
          <CodeStepper code={goodCode} steps={goodSteps} />
        </motion.div>
      </div>
    </div>
  )
}
