"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw, ChevronRight, ChevronLeft } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface StackItem {
  id: string
  name: string
  color: string
}

interface AnimationStep {
  mainStack: StackItem[]
  workerStack: StackItem[]
  microtaskQueue: string[]
  macrotaskQueue: string[]
  eventLoop: string
  description: string
}

const animationSteps: AnimationStep[] = [
  {
    mainStack: [],
    workerStack: [],
    microtaskQueue: [],
    macrotaskQueue: [],
    eventLoop: "Waiting...",
    description: "Starting fresh. The main thread is idle and waiting for code to run.",
  },
  {
    mainStack: [{ id: "1", name: "createWorker()", color: "bg-primary" }],
    workerStack: [],
    microtaskQueue: [],
    macrotaskQueue: [],
    eventLoop: "Processing",
    description: "Main thread creates a new Web Worker. This spawns a separate thread.",
  },
  {
    mainStack: [{ id: "2", name: "postMessage()", color: "bg-accent" }],
    workerStack: [],
    microtaskQueue: [],
    macrotaskQueue: ["message to worker"],
    eventLoop: "Sending message",
    description: "postMessage() adds a macrotask to the queue. Worker messages are macrotasks!",
  },
  {
    mainStack: [{ id: "2a", name: "fetch().then()", color: "bg-chart-3" }],
    workerStack: [],
    microtaskQueue: ["Promise callback"],
    macrotaskQueue: ["message to worker"],
    eventLoop: "Promise resolved",
    description: "A Promise resolves! Its .then() callback goes to the Microtask Queue (higher priority).",
  },
  {
    mainStack: [{ id: "2b", name: "promiseCallback()", color: "bg-chart-3" }],
    workerStack: [],
    microtaskQueue: [],
    macrotaskQueue: ["message to worker"],
    eventLoop: "Running microtask",
    description: "Microtasks run FIRST! The Event Loop empties the microtask queue before any macrotask.",
  },
  {
    mainStack: [],
    workerStack: [{ id: "3", name: "onmessage()", color: "bg-chart-5" }],
    microtaskQueue: [],
    macrotaskQueue: [],
    eventLoop: "Worker receiving",
    description: "Now the macrotask runs. Worker thread receives the message and starts processing.",
  },
  {
    mainStack: [],
    workerStack: [
      { id: "3", name: "onmessage()", color: "bg-chart-5" },
      { id: "4", name: "heavyLoop()", color: "bg-destructive" },
    ],
    microtaskQueue: [],
    macrotaskQueue: [],
    eventLoop: "Worker busy",
    description: "Worker runs the heavy calculation. Main thread is FREE to do other things!",
  },
  {
    mainStack: [{ id: "5", name: "handleClick()", color: "bg-primary" }],
    workerStack: [
      { id: "3", name: "onmessage()", color: "bg-chart-5" },
      { id: "4", name: "heavyLoop()", color: "bg-destructive" },
    ],
    microtaskQueue: [],
    macrotaskQueue: ["setTimeout callback"],
    eventLoop: "Both threads active",
    description: "User clicks a button! A setTimeout inside adds a macrotask. Main thread stays responsive!",
  },
  {
    mainStack: [],
    workerStack: [{ id: "3", name: "onmessage()", color: "bg-chart-5" }],
    microtaskQueue: [],
    macrotaskQueue: ["setTimeout callback"],
    eventLoop: "Worker finishing",
    description: "heavyLoop() completes and is popped from the worker stack. Worker prepares to send result.",
  },
  {
    mainStack: [],
    workerStack: [{ id: "6", name: "postMessage()", color: "bg-accent" }],
    microtaskQueue: [],
    macrotaskQueue: ["setTimeout callback", "worker result"],
    eventLoop: "Worker sending",
    description: "Worker posts result back. The message joins the macrotask queue BEHIND setTimeout.",
  },
  {
    mainStack: [],
    workerStack: [],
    microtaskQueue: [],
    macrotaskQueue: ["setTimeout callback", "worker result"],
    eventLoop: "Worker done",
    description: "Worker's onmessage() completes. Worker thread is now idle. Main thread will process queue.",
  },
  {
    mainStack: [{ id: "5a", name: "timeoutCallback()", color: "bg-chart-4" }],
    workerStack: [],
    microtaskQueue: [],
    macrotaskQueue: ["worker result"],
    eventLoop: "Running setTimeout",
    description: "Event Loop picks the FIRST macrotask (setTimeout). Macrotasks run one at a time!",
  },
  {
    mainStack: [],
    workerStack: [],
    microtaskQueue: [],
    macrotaskQueue: ["worker result"],
    eventLoop: "setTimeout done",
    description: "timeoutCallback() completes and is popped. Event Loop checks: any microtasks? No. Next macrotask!",
  },
  {
    mainStack: [{ id: "7", name: "worker.onmessage()", color: "bg-chart-5" }],
    workerStack: [],
    microtaskQueue: [],
    macrotaskQueue: [],
    eventLoop: "Processing result",
    description: "Now the worker result macrotask runs. Main thread receives the computed result!",
  },
  {
    mainStack: [
      { id: "7", name: "worker.onmessage()", color: "bg-chart-5" },
      { id: "8", name: "updateUI()", color: "bg-primary" },
    ],
    workerStack: [],
    microtaskQueue: ["queueMicrotask()"],
    macrotaskQueue: [],
    eventLoop: "Updating UI",
    description: "updateUI() is called and queues a microtask for cleanup. Microtask waits in queue.",
  },
  {
    mainStack: [{ id: "7", name: "worker.onmessage()", color: "bg-chart-5" }],
    workerStack: [],
    microtaskQueue: ["queueMicrotask()"],
    macrotaskQueue: [],
    eventLoop: "updateUI done",
    description: "updateUI() completes and is popped. worker.onmessage() still running. Microtask still waiting.",
  },
  {
    mainStack: [],
    workerStack: [],
    microtaskQueue: ["queueMicrotask()"],
    macrotaskQueue: [],
    eventLoop: "Checking microtasks",
    description: "worker.onmessage() completes. Stack is empty! Event Loop checks microtask queue... found one!",
  },
  {
    mainStack: [{ id: "9", name: "cleanupCallback()", color: "bg-chart-3" }],
    workerStack: [],
    microtaskQueue: [],
    macrotaskQueue: [],
    eventLoop: "Running microtask",
    description: "cleanupCallback() is moved from microtask queue to call stack and executes.",
  },
  {
    mainStack: [],
    workerStack: [],
    microtaskQueue: [],
    macrotaskQueue: [],
    eventLoop: "Complete!",
    description: "cleanupCallback() completes. All queues empty, all stacks empty. Event Loop cycle complete!",
  },
]

const elementTooltips = {
  mainThread: {
    title: "Main Thread Call Stack",
    description:
      "This is where your JavaScript code runs. Functions get pushed onto the stack when called, and popped off when they return. Only one function can run at a time here!",
  },
  microtaskQueue: {
    title: "Microtask Queue (High Priority)",
    description:
      "Microtasks include Promise callbacks (.then, .catch, .finally), queueMicrotask(), and MutationObserver. They run IMMEDIATELY after the current task, before any macrotask. The queue is fully emptied before moving on!",
  },
  macrotaskQueue: {
    title: "Macrotask Queue (Normal Priority)",
    description:
      "Macrotasks include setTimeout, setInterval, I/O callbacks, UI events, and postMessage. Only ONE macrotask runs per Event Loop cycle, then all microtasks run, then the next macrotask.",
  },
  eventLoop: {
    title: "Event Loop",
    description:
      "The traffic controller! Each cycle: 1) Run one macrotask, 2) Run ALL microtasks, 3) Render if needed, 4) Repeat. Microtasks always have priority over macrotasks!",
  },
  workerThread: {
    title: "Worker Thread Call Stack",
    description:
      "A completely separate call stack running in its own thread! It has its OWN event loop, microtask queue, and macrotask queue. Heavy work here won't block the main thread.",
  },
}

export function CallStackAnimation() {
  const [currentStep, setCurrentStep] = useState(0)

  const step = animationSteps[currentStep]

  const next = () => setCurrentStep((prev) => Math.min(prev + 1, animationSteps.length - 1))
  const prev = () => setCurrentStep((prev) => Math.max(prev - 1, 0))
  const reset = () => {
    setCurrentStep(0)
  }

  return (
    <TooltipProvider delayDuration={200}>
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Interactive Call Stack Animation</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Step through to see how the main thread, worker thread, and event loop work together.
          </p>
          <p className="text-sm text-muted-foreground mt-2">Hover over each section title for a helpful explanation</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-xl bg-card border border-border"
        >
          <div className="grid md:grid-cols-4 gap-4">
            {/* Main Thread */}
            <div className="space-y-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <h3 className="font-semibold text-primary text-center cursor-help hover:underline decoration-dotted underline-offset-4">
                    Main Thread
                  </h3>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  <p className="font-semibold mb-1">{elementTooltips.mainThread.title}</p>
                  <p className="text-sm">{elementTooltips.mainThread.description}</p>
                </TooltipContent>
              </Tooltip>
              <div className="h-48 bg-secondary/50 rounded-xl p-3 flex flex-col-reverse gap-2 overflow-hidden">
                <AnimatePresence mode="popLayout">
                  {step.mainStack.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`${item.color} text-foreground px-3 py-2 rounded text-sm font-mono text-center`}
                    >
                      {item.name}
                    </motion.div>
                  ))}
                </AnimatePresence>
                {step.mainStack.length === 0 && (
                  <div className="text-muted-foreground text-sm text-center h-full flex items-center justify-center">
                    Stack Empty
                  </div>
                )}
              </div>
            </div>

            {/* Event Loop & Queues */}
            <div className="md:col-span-2 space-y-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="p-3 bg-secondary rounded-xl text-center cursor-help hover:bg-secondary/80 transition-colors">
                    <p className="text-xs text-muted-foreground mb-1">Event Loop</p>
                    <p className="text-sm font-semibold text-foreground">{step.eventLoop}</p>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  <p className="font-semibold mb-1">{elementTooltips.eventLoop.title}</p>
                  <p className="text-sm">{elementTooltips.eventLoop.description}</p>
                </TooltipContent>
              </Tooltip>

              <div className="grid grid-cols-2 gap-3">
                {/* Microtask Queue */}
                <div className="space-y-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <h4 className="text-sm font-medium text-chart-3 text-center cursor-help hover:underline decoration-dotted underline-offset-4">
                        Microtask Queue
                      </h4>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs">
                      <p className="font-semibold mb-1">{elementTooltips.microtaskQueue.title}</p>
                      <p className="text-sm">{elementTooltips.microtaskQueue.description}</p>
                    </TooltipContent>
                  </Tooltip>
                  <div className="h-32 bg-chart-3/10 border border-chart-3/30 rounded-xl p-2 flex flex-col gap-2 overflow-hidden">
                    <AnimatePresence mode="popLayout">
                      {step.microtaskQueue.map((task, i) => (
                        <motion.div
                          key={`micro-${i}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="bg-chart-3 text-foreground px-2 py-1.5 rounded text-xs font-mono text-center"
                        >
                          {task}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    {step.microtaskQueue.length === 0 && (
                      <div className="text-muted-foreground text-xs text-center h-full flex items-center justify-center">
                        Empty
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-center text-chart-3">High Priority</p>
                </div>

                {/* Macrotask Queue */}
                <div className="space-y-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <h4 className="text-sm font-medium text-accent text-center cursor-help hover:underline decoration-dotted underline-offset-4">
                        Macrotask Queue
                      </h4>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs">
                      <p className="font-semibold mb-1">{elementTooltips.macrotaskQueue.title}</p>
                      <p className="text-sm">{elementTooltips.macrotaskQueue.description}</p>
                    </TooltipContent>
                  </Tooltip>
                  <div className="h-32 bg-accent/10 border border-accent/30 rounded-xl p-2 flex flex-col gap-2 overflow-hidden">
                    <AnimatePresence mode="popLayout">
                      {step.macrotaskQueue.map((task, i) => (
                        <motion.div
                          key={`macro-${i}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="bg-accent text-accent-foreground px-2 py-1.5 rounded text-xs font-mono text-center"
                        >
                          {task}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    {step.macrotaskQueue.length === 0 && (
                      <div className="text-muted-foreground text-xs text-center h-full flex items-center justify-center">
                        Empty
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-center text-accent">Normal Priority</p>
                </div>
              </div>
            </div>

            {/* Worker Thread */}
            <div className="space-y-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <h3 className="font-semibold text-chart-5 text-center cursor-help hover:underline decoration-dotted underline-offset-4">
                    Worker Thread
                  </h3>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  <p className="font-semibold mb-1">{elementTooltips.workerThread.title}</p>
                  <p className="text-sm">{elementTooltips.workerThread.description}</p>
                </TooltipContent>
              </Tooltip>
              <div className="h-48 bg-secondary/50 rounded-xl p-3 flex flex-col-reverse gap-2 overflow-hidden">
                <AnimatePresence mode="popLayout">
                  {step.workerStack.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`${item.color} text-foreground px-3 py-2 rounded text-sm font-mono text-center`}
                    >
                      {item.name}
                    </motion.div>
                  ))}
                </AnimatePresence>
                {step.workerStack.length === 0 && (
                  <div className="text-muted-foreground text-sm text-center h-full flex items-center justify-center">
                    Stack Empty
                  </div>
                )}
              </div>
            </div>
          </div>

          <motion.div
            key={currentStep}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 p-4 bg-secondary rounded-xl text-center"
          >
            <p className="text-foreground">{step.description}</p>
          </motion.div>

          <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
            <Button variant="outline" size="sm" onClick={prev} disabled={currentStep === 0}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <Button variant="outline" size="sm" onClick={reset}>
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
            <span className="text-sm text-muted-foreground px-2">
              Step {currentStep + 1} of {animationSteps.length}
            </span>
            <Button variant="outline" size="sm" onClick={next} disabled={currentStep === animationSteps.length - 1}>
              Forward
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </motion.div>
      </div>
    </TooltipProvider>
  )
}
