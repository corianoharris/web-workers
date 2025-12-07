"use client"

import { motion } from "framer-motion"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Play, RotateCcw, Copy, Check, Zap } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const defaultMainCode = `// Main thread code
// Worker is already created for you as 'worker'

// Listen for results
worker.onmessage = (e) => {
  console.log('Result from worker:', e.data);
};

// Send work to worker
worker.postMessage({ limit: 100000 });
console.log('Message sent! UI is not blocked.');`

const defaultWorkerCode = `// Worker code
self.onmessage = (e) => {
  const { limit } = e.data;
  
  // Find all prime numbers up to 'limit'
  function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return true;
  }
  
  let primeCount = 0;
  for (let i = 2; i <= limit; i++) {
    if (isPrime(i)) primeCount++;
  }
  
  // Send back how many primes we found
  self.postMessage({ limit, primeCount });
};`

const presets = {
  largeLimit: {
    main: `// Main thread code
// Worker is already created for you as 'worker'

// Listen for results
worker.onmessage = (e) => {
  console.log('Result from worker:', e.data);
};

// Send work to worker with LARGE limit
worker.postMessage({ limit: 500000 });
console.log('Sent limit of 500,000! UI still responds!');`,
    worker: defaultWorkerCode,
  },
  moreLogging: {
    main: `// Main thread code with more logging
// Worker is already created for you as 'worker'

console.log('1. Setting up worker...');

// Listen for results
worker.onmessage = (e) => {
  console.log('5. Got result back!');
  console.log('6. Data received:', e.data);
  console.log('7. Prime count:', e.data.primeCount);
};

console.log('2. About to send message...');
worker.postMessage({ limit: 100000 });
console.log('3. Message sent!');
console.log('4. Waiting for worker...');`,
    worker: `// Worker code with more logging
self.onmessage = (e) => {
  console.log('Worker: Received message!');
  const { limit } = e.data;
  console.log('Worker: Finding primes up to', limit);
  
  function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return true;
  }
  
  let primeCount = 0;
  for (let i = 2; i <= limit; i++) {
    if (isPrime(i)) primeCount++;
  }
  
  console.log('Worker: Done! Found', primeCount, 'primes');
  self.postMessage({ limit, primeCount });
};`,
  },
  differentCalc: {
    main: `// Main thread code
// Worker is already created for you as 'worker'

worker.onmessage = (e) => {
  console.log('Fibonacci result:', e.data);
};

// Calculate Fibonacci numbers in worker
worker.postMessage({ type: 'fibonacci', n: 40 });
console.log('Calculating Fibonacci(40)...');`,
    worker: `// Worker: Fibonacci calculator
self.onmessage = (e) => {
  const { type, n } = e.data;
  
  if (type === 'fibonacci') {
    // Recursive Fibonacci (intentionally slow)
    function fib(num) {
      if (num <= 1) return num;
      return fib(num - 1) + fib(num - 2);
    }
    
    const startTime = Date.now();
    const result = fib(n);
    const endTime = Date.now();
    
    self.postMessage({
      type: 'fibonacci',
      input: n,
      result: result,
      timeMs: endTime - startTime
    });
  }
};`,
  },
  multipleMessages: {
    main: `// Main thread code
// Worker is already created for you as 'worker'

let completedTasks = 0;

worker.onmessage = (e) => {
  completedTasks++;
  console.log('Task ' + completedTasks + ' done:', e.data);
};

// Send multiple messages to the worker
console.log('Sending 5 tasks to worker...');
worker.postMessage({ task: 1, limit: 10000 });
worker.postMessage({ task: 2, limit: 20000 });
worker.postMessage({ task: 3, limit: 30000 });
worker.postMessage({ task: 4, limit: 40000 });
worker.postMessage({ task: 5, limit: 50000 });
console.log('All tasks sent! Worker processes them in order.');`,
    worker: `// Worker: Handle multiple messages
self.onmessage = (e) => {
  const { task, limit } = e.data;
  
  function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return true;
  }
  
  let primeCount = 0;
  for (let i = 2; i <= limit; i++) {
    if (isPrime(i)) primeCount++;
  }
  
  // Send back which task completed
  self.postMessage({
    task: task,
    limit: limit,
    primeCount: primeCount
  });
};`,
  },
}

export function Playground() {
  const [mainCode, setMainCode] = useState(defaultMainCode)
  const [workerCode, setWorkerCode] = useState(defaultWorkerCode)
  const [logs, setLogs] = useState<string[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("main")
  const workerRef = useRef<Worker | null>(null)

  const loadPreset = (presetKey: keyof typeof presets) => {
    const preset = presets[presetKey]
    setMainCode(preset.main)
    setWorkerCode(preset.worker)
    setLogs([])
    setIsRunning(false)
    if (workerRef.current) {
      workerRef.current.terminate()
      workerRef.current = null
    }
  }

  const runCode = () => {
    if (workerRef.current) {
      workerRef.current.terminate()
      workerRef.current = null
    }

    setLogs([])
    setIsRunning(true)

    try {
      const customLog = (...args: unknown[]) => {
        const message = args.map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : String(arg))).join(" ")
        setLogs((prev) => [...prev, `> ${message}`])
      }

      const blob = new Blob([workerCode], { type: "application/javascript" })
      const workerUrl = URL.createObjectURL(blob)
      const worker = new Worker(workerUrl)
      workerRef.current = worker

      worker.onmessage = (e) => {
        customLog("Result from worker:", e.data)
        setIsRunning(false)
        URL.revokeObjectURL(workerUrl)
      }

      worker.onerror = (e) => {
        setLogs((prev) => [...prev, `Error: Worker Error: ${e.message}`])
        setIsRunning(false)
      }

      const modifiedMainCode = mainCode.replace(/console\.log/g, "customLog")

      // eslint-disable-next-line no-new-func
      const fn = new Function("worker", "customLog", modifiedMainCode)
      fn(worker, customLog)
    } catch (error) {
      setLogs((prev) => [...prev, `Error: ${(error as Error).message}`])
      setIsRunning(false)
    }
  }

  const reset = () => {
    setMainCode(defaultMainCode)
    setWorkerCode(defaultWorkerCode)
    setLogs([])
    setIsRunning(false)
    if (workerRef.current) {
      workerRef.current.terminate()
      workerRef.current = null
    }
  }

  const copyCode = () => {
    navigator.clipboard.writeText(`// worker.js\n${workerCode}\n\n// main.js\n${mainCode}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Try It Yourself Playground</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Edit the code below and run it to see Web Workers in action!
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid lg:grid-cols-2 gap-4"
      >
        <div className="space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="main">main.js</TabsTrigger>
              <TabsTrigger value="worker">worker.js</TabsTrigger>
            </TabsList>
            <TabsContent value="main" className="mt-4">
              <div className="text-xs text-muted-foreground mb-2 px-1">
                Note: <code className="bg-muted px-1 rounded">worker</code> is pre-created for you
              </div>
              <textarea
                value={mainCode}
                onChange={(e) => setMainCode(e.target.value)}
                className="w-full h-60 p-4 rounded-xl bg-[var(--code-bg)] border border-border font-mono text-sm text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                spellCheck={false}
              />
            </TabsContent>
            <TabsContent value="worker" className="mt-4">
              <div className="text-xs text-muted-foreground mb-2 px-1">This code runs in the background thread</div>
              <textarea
                value={workerCode}
                onChange={(e) => setWorkerCode(e.target.value)}
                className="w-full h-60 p-4 rounded-xl bg-[var(--code-bg)] border border-border font-mono text-sm text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                spellCheck={false}
              />
            </TabsContent>
          </Tabs>

          <div className="flex gap-2">
            <Button onClick={runCode} disabled={isRunning} className="flex-1">
              <Play className="h-4 w-4 mr-2" />
              {isRunning ? "Running..." : "Run Code"}
            </Button>
            <Button variant="outline" onClick={reset}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button variant="outline" onClick={copyCode}>
              {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">Console Output</h3>
          <div className="h-72 p-4 rounded-xl bg-[var(--code-bg)] border border-border overflow-y-auto font-mono text-sm">
            {logs.length === 0 ? (
              <p className="text-muted-foreground">Click &quot;Run Code&quot; to see output here...</p>
            ) : (
              logs.map((log, i) => (
                <div key={i} className={`py-1 ${log.startsWith("Error") ? "text-destructive" : "text-foreground"}`}>
                  {log}
                </div>
              ))
            )}
          </div>

          <div className="p-4 rounded-xl bg-secondary/50 border border-border">
            <h4 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              Quick Experiments (click to load):
            </h4>
            <div className="grid grid-cols-1 gap-2">
              <Button
                variant="outline"
                size="sm"
                className="justify-start text-xs h-auto py-2 px-3 text-left bg-transparent"
                onClick={() => loadPreset("largeLimit")}
              >
                <span className="text-primary mr-2">1.</span>
                Change limit to 500,000 and watch it still respond
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="justify-start text-xs h-auto py-2 px-3 text-left bg-transparent"
                onClick={() => loadPreset("moreLogging")}
              >
                <span className="text-primary mr-2">2.</span>
                Add more console.log statements
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="justify-start text-xs h-auto py-2 px-3 text-left bg-transparent"
                onClick={() => loadPreset("differentCalc")}
              >
                <span className="text-primary mr-2">3.</span>
                Try different calculations (Fibonacci)
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="justify-start text-xs h-auto py-2 px-3 text-left bg-transparent"
                onClick={() => loadPreset("multipleMessages")}
              >
                <span className="text-primary mr-2">4.</span>
                Send multiple messages to the worker
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
