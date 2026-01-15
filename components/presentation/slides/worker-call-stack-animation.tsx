"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw, ChevronRight, ChevronLeft, Play, Pause } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface StackItem {
  id: string
  name: string
  color: string
}

interface MessageItem {
  id: string
  content: string
  direction: "toWorker" | "toMain"
  progress: number // 0-100
}

interface AnimationStep {
  mainStack: StackItem[]
  workerStack: StackItem[]
  workerMicrotasks: string[]
  workerMacrotasks: string[]
  messages: MessageItem[]
  workerEventLoop: string
  mainEventLoop: string
  description: string
  highlight?: "main" | "worker" | "message" | "workerQueue"
}

const animationSteps: AnimationStep[] = [
  {
    mainStack: [],
    workerStack: [],
    workerMicrotasks: [],
    workerMacrotasks: [],
    messages: [],
    workerEventLoop: "Idle",
    mainEventLoop: "Idle",
    description:
      "Both threads are idle. The worker has its OWN event loop, microtask queue, and macrotask queue - completely independent from the main thread!",
    highlight: "worker",
  },
  {
    mainStack: [{ id: "1", name: "startWork()", color: "bg-primary" }],
    workerStack: [],
    workerMicrotasks: [],
    workerMacrotasks: [],
    messages: [],
    workerEventLoop: "Idle",
    mainEventLoop: "Running",
    description: "Main thread starts executing. It will create work for the worker to do.",
    highlight: "main",
  },
  {
    mainStack: [
      { id: "1", name: "startWork()", color: "bg-primary" },
      { id: "2", name: "worker.postMessage()", color: "bg-accent" },
    ],
    workerStack: [],
    workerMicrotasks: [],
    workerMacrotasks: [],
    messages: [{ id: "m1", content: "{ task: 'calculate' }", direction: "toWorker", progress: 0 }],
    workerEventLoop: "Idle",
    mainEventLoop: "Sending",
    description:
      "postMessage() is called. The message starts traveling to the worker thread through the message channel.",
    highlight: "message",
  },
  {
    mainStack: [{ id: "1", name: "startWork()", color: "bg-primary" }],
    workerStack: [],
    workerMicrotasks: [],
    workerMacrotasks: [],
    messages: [{ id: "m1", content: "{ task: 'calculate' }", direction: "toWorker", progress: 50 }],
    workerEventLoop: "Idle",
    mainEventLoop: "Running",
    description: "postMessage() returns immediately (non-blocking). Main thread continues while message travels.",
    highlight: "message",
  },
  {
    mainStack: [],
    workerStack: [],
    workerMicrotasks: [],
    workerMacrotasks: ["onmessage event"],
    messages: [],
    workerEventLoop: "Received message",
    mainEventLoop: "Idle",
    description: "Message arrives at the worker! It enters the worker's MACROTASK queue as an 'onmessage' event.",
    highlight: "workerQueue",
  },
  {
    mainStack: [],
    workerStack: [{ id: "w1", name: "self.onmessage()", color: "bg-chart-5" }],
    workerMicrotasks: [],
    workerMacrotasks: [],
    messages: [],
    workerEventLoop: "Processing",
    mainEventLoop: "Idle",
    description:
      "Worker's event loop picks up the macrotask. self.onmessage() handler is pushed to the worker's call stack.",
    highlight: "worker",
  },
  {
    mainStack: [],
    workerStack: [
      { id: "w1", name: "self.onmessage()", color: "bg-chart-5" },
      { id: "w2", name: "processData()", color: "bg-chart-4" },
    ],
    workerMicrotasks: [],
    workerMacrotasks: [],
    messages: [],
    workerEventLoop: "Working",
    mainEventLoop: "Idle",
    description: "The handler calls processData(). Worker's call stack grows just like the main thread's would!",
    highlight: "worker",
  },
  {
    mainStack: [{ id: "3", name: "handleClick()", color: "bg-primary" }],
    workerStack: [
      { id: "w1", name: "self.onmessage()", color: "bg-chart-5" },
      { id: "w2", name: "processData()", color: "bg-chart-4" },
      { id: "w3", name: "heavyCalculation()", color: "bg-destructive" },
    ],
    workerMicrotasks: [],
    workerMacrotasks: [],
    messages: [],
    workerEventLoop: "Heavy work",
    mainEventLoop: "Running",
    description: "Worker does heavy work while main thread handles a user click. Both threads work in PARALLEL!",
    highlight: "main",
  },
  {
    mainStack: [],
    workerStack: [
      { id: "w1", name: "self.onmessage()", color: "bg-chart-5" },
      { id: "w2", name: "processData()", color: "bg-chart-4" },
      { id: "w3", name: "heavyCalculation()", color: "bg-destructive" },
    ],
    workerMicrotasks: ["Promise.resolve()"],
    workerMacrotasks: [],
    messages: [],
    workerEventLoop: "Working",
    mainEventLoop: "Idle",
    description: "Inside the worker, a Promise resolves! It goes to the worker's OWN microtask queue.",
    highlight: "workerQueue",
  },
  {
    mainStack: [],
    workerStack: [
      { id: "w1", name: "self.onmessage()", color: "bg-chart-5" },
      { id: "w2", name: "processData()", color: "bg-chart-4" },
    ],
    workerMicrotasks: ["Promise.resolve()"],
    workerMacrotasks: [],
    messages: [],
    workerEventLoop: "Calculation done",
    mainEventLoop: "Idle",
    description: "heavyCalculation() completes and is popped. The microtask is still waiting.",
    highlight: "worker",
  },
  {
    mainStack: [],
    workerStack: [{ id: "w1", name: "self.onmessage()", color: "bg-chart-5" }],
    workerMicrotasks: ["Promise.resolve()"],
    workerMacrotasks: [],
    messages: [],
    workerEventLoop: "Processing done",
    mainEventLoop: "Idle",
    description: "processData() completes and is popped. Microtask still waiting for current task to finish.",
    highlight: "worker",
  },
  {
    mainStack: [],
    workerStack: [],
    workerMicrotasks: ["Promise.resolve()"],
    workerMacrotasks: [],
    messages: [],
    workerEventLoop: "Checking microtasks",
    mainEventLoop: "Idle",
    description: "self.onmessage() completes! Stack is empty. Worker's event loop now checks the microtask queue.",
    highlight: "workerQueue",
  },
  {
    mainStack: [{ id: "w4", name: "promiseCallback()", color: "bg-chart-3" }],
    workerStack: [],
    workerMicrotasks: [],
    workerMacrotasks: [],
    messages: [],
    workerEventLoop: "Idle",
    mainEventLoop: "Running microtask",
    description: "The Promise callback runs on the worker's stack. Microtasks run the same way in workers!",
    highlight: "worker",
  },
  {
    mainStack: [],
    workerStack: [],
    workerMicrotasks: [],
    workerMacrotasks: [],
    messages: [{ id: "m2", content: "{ result: 42 }", direction: "toMain", progress: 0 }],
    workerEventLoop: "Idle",
    mainEventLoop: "Sending result",
    description: "Worker sends results back using self.postMessage(). Message starts traveling to main thread.",
    highlight: "message",
  },
  {
    mainStack: [],
    workerStack: [],
    workerMicrotasks: [],
    workerMacrotasks: [],
    messages: [{ id: "m2", content: "{ result: 42 }", direction: "toMain", progress: 50 }],
    workerEventLoop: "Idle",
    mainEventLoop: "Idle",
    description: "Worker is done and idle. Message is traveling back to the main thread.",
    highlight: "message",
  },
  {
    mainStack: [{ id: "4", name: "worker.onmessage()", color: "bg-chart-5" }],
    workerStack: [],
    workerMicrotasks: [],
    workerMacrotasks: [],
    messages: [],
    workerEventLoop: "Idle",
    mainEventLoop: "Received result",
    description: "Main thread receives the message! The onmessage handler runs with the worker's result.",
    highlight: "main",
  },
  {
    mainStack: [
      { id: "4", name: "worker.onmessage()", color: "bg-chart-5" },
      { id: "5", name: "displayResult()", color: "bg-primary" },
    ],
    workerStack: [],
    workerMicrotasks: [],
    workerMacrotasks: [],
    messages: [],
    workerEventLoop: "Idle",
    mainEventLoop: "Updating UI",
    description: "Main thread displays the result. The heavy work was done by the worker without blocking!",
    highlight: "main",
  },
  {
    mainStack: [{ id: "4", name: "worker.onmessage()", color: "bg-chart-5" }],
    workerStack: [],
    workerMicrotasks: [],
    workerMacrotasks: [],
    messages: [],
    workerEventLoop: "Idle",
    mainEventLoop: "Display complete",
    description: "displayResult() finishes and is popped from the stack. worker.onmessage() is still running.",
    highlight: "main",
  },
  {
    mainStack: [],
    workerStack: [],
    workerMicrotasks: [],
    workerMacrotasks: [],
    messages: [],
    workerEventLoop: "Idle",
    mainEventLoop: "Handler complete",
    description: "worker.onmessage() completes and is popped. The main thread's call stack is now empty.",
    highlight: "main",
  },
  {
    mainStack: [],
    workerStack: [],
    workerMicrotasks: [],
    workerMacrotasks: [],
    messages: [],
    workerEventLoop: "Idle",
    mainEventLoop: "Complete!",
    description:
      "All done! The worker's independent event loop processed the heavy task while the main thread stayed responsive throughout.",
    highlight: undefined,
  },
]

const tooltips = {
  mainStack: {
    title: "Main Thread Call Stack",
    description:
      "Where your UI code runs. Must stay clear for smooth interactions. Functions pushed when called, popped when done.",
  },
  workerStack: {
    title: "Worker Call Stack",
    description: "The worker's OWN call stack in a separate thread. Heavy functions here don't block the main thread!",
  },
  workerMicrotasks: {
    title: "Worker Microtask Queue",
    description:
      "Each worker has its own microtask queue! Promise callbacks and queueMicrotask() inside the worker go here.",
  },
  workerMacrotasks: {
    title: "Worker Macrotask Queue",
    description:
      "Incoming messages from postMessage() arrive here as macrotasks. The worker's event loop processes them.",
  },
  workerEventLoop: {
    title: "Worker Event Loop",
    description:
      "Workers have their own event loop! It runs independently, checking queues and processing tasks just like the main thread's loop.",
  },
  mainEventLoop: {
    title: "Main Thread Event Loop",
    description: "The main thread's event loop. It handles UI events, timers, and messages from workers.",
  },
  messageChannel: {
    title: "Message Channel",
    description:
      "Messages travel between threads through a structured cloning algorithm. Data is copied, not shared (with some exceptions like ArrayBuffer).",
  },
}

export function WorkerCallStackAnimation() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const step = animationSteps[currentStep]

  const next = () => setCurrentStep((prev) => Math.min(prev + 1, animationSteps.length - 1))
  const prev = () => setCurrentStep((prev) => Math.max(prev - 1, 0))
  const reset = () => {
    setCurrentStep(0)
    setIsPlaying(false)
  }

  const togglePlay = () => {
    setIsPlaying((prev) => !prev)
  }

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= animationSteps.length - 1) {
            setIsPlaying(false)
            return prev
          }
          return prev + 1
        })
      }, 2000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying])

  return (
    <TooltipProvider delayDuration={200}>
      <div className="space-y-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Worker Thread Deep Dive</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how the worker has its own complete event loop system
          </p>
          <p className="text-sm text-muted-foreground mt-1">Hover over elements for explanations</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="p-4 rounded-xl bg-card border border-border"
        >
          <div className="grid md:grid-cols-[1fr_auto_1.5fr] gap-4 items-start">
            {/* Main Thread Section */}
            <div
              className={`space-y-3 p-3 rounded-lg transition-all duration-300 ${step.highlight === "main" ? "bg-primary/10 ring-2 ring-primary" : ""}`}
            >
              <h3 className="font-semibold text-primary text-center text-sm">Main Thread</h3>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-help">
                    <p className="text-xs text-muted-foreground text-center mb-1">Call Stack</p>
                    <div className="h-32 bg-secondary/50 rounded-lg p-2 flex flex-col-reverse gap-1 overflow-hidden">
                      <AnimatePresence mode="popLayout">
                        {step.mainStack.map((item) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className={`${item.color} text-foreground px-2 py-1.5 rounded text-xs font-mono text-center`}
                          >
                            {item.name}
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      {step.mainStack.length === 0 && (
                        <div className="text-muted-foreground text-xs text-center h-full flex items-center justify-center">
                          Empty
                        </div>
                      )}
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="left" className="max-w-xs">
                  <p className="font-semibold mb-1">{tooltips.mainStack.title}</p>
                  <p className="text-sm">{tooltips.mainStack.description}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="p-2 bg-secondary rounded-lg text-center cursor-help">
                    <p className="text-xs text-muted-foreground">Event Loop</p>
                    <p className="text-xs font-semibold text-foreground">{step.mainEventLoop}</p>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="left" className="max-w-xs">
                  <p className="font-semibold mb-1">{tooltips.mainEventLoop.title}</p>
                  <p className="text-sm">{tooltips.mainEventLoop.description}</p>
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Message Channel */}
            <div
              className={`flex flex-col items-center justify-center space-y-2 py-4 ${step.highlight === "message" ? "scale-110" : ""} transition-transform duration-300`}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-help">
                    <p className="text-xs text-muted-foreground text-center mb-2">Message Channel</p>
                    <div className="relative h-40 w-16 flex items-center justify-center">
                      <div className="absolute h-full w-0.5 bg-border" />
                      <AnimatePresence>
                        {step.messages.map((msg) => (
                          <motion.div
                            key={msg.id}
                            initial={{
                              opacity: 0,
                              y: msg.direction === "toWorker" ? -60 : 60,
                            }}
                            animate={{
                              opacity: 1,
                              y: msg.direction === "toWorker" ? -60 + msg.progress * 1.2 : 60 - msg.progress * 1.2,
                            }}
                            exit={{ opacity: 0 }}
                            className="absolute bg-accent text-accent-foreground px-1 py-0.5 rounded text-[10px] font-mono whitespace-nowrap"
                          >
                            {msg.content.length > 12 ? msg.content.slice(0, 12) + "..." : msg.content}
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      <div className="absolute top-0 text-xs text-muted-foreground">Main</div>
                      <div className="absolute bottom-0 text-xs text-muted-foreground">Worker</div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  <p className="font-semibold mb-1">{tooltips.messageChannel.title}</p>
                  <p className="text-sm">{tooltips.messageChannel.description}</p>
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Worker Thread Section */}
            <div
              className={`space-y-3 p-3 rounded-lg transition-all duration-300 ${step.highlight === "worker" ? "bg-chart-5/10 ring-2 ring-chart-5" : ""}`}
            >
              <h3 className="font-semibold text-chart-5 text-center text-sm">Worker Thread (Separate!)</h3>

              <div className="grid grid-cols-2 gap-3">
                {/* Worker Call Stack */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="cursor-help">
                      <p className="text-xs text-muted-foreground text-center mb-1">Call Stack</p>
                      <div className="h-32 bg-secondary/50 rounded-lg p-2 flex flex-col-reverse gap-1 overflow-hidden">
                        <AnimatePresence mode="popLayout">
                          {step.workerStack.map((item) => (
                            <motion.div
                              key={item.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              className={`${item.color} text-foreground px-2 py-1 rounded text-xs font-mono text-center`}
                            >
                              {item.name}
                            </motion.div>
                          ))}
                        </AnimatePresence>
                        {step.workerStack.length === 0 && (
                          <div className="text-muted-foreground text-xs text-center h-full flex items-center justify-center">
                            Empty
                          </div>
                        )}
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs">
                    <p className="font-semibold mb-1">{tooltips.workerStack.title}</p>
                    <p className="text-sm">{tooltips.workerStack.description}</p>
                  </TooltipContent>
                </Tooltip>

                {/* Worker Queues */}
                <div
                  className={`space-y-2 ${step.highlight === "workerQueue" ? "ring-2 ring-chart-3 rounded-lg" : ""}`}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="cursor-help">
                        <p className="text-xs text-chart-3 text-center mb-1">Microtasks</p>
                        <div className="h-14 bg-chart-3/10 border border-chart-3/30 rounded-lg p-1 flex flex-col gap-1 overflow-hidden">
                          <AnimatePresence mode="popLayout">
                            {step.workerMicrotasks.map((task, i) => (
                              <motion.div
                                key={`micro-${i}`}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                className="bg-chart-3 text-foreground px-1 py-0.5 rounded text-[10px] font-mono text-center"
                              >
                                {task}
                              </motion.div>
                            ))}
                          </AnimatePresence>
                          {step.workerMicrotasks.length === 0 && (
                            <div className="text-muted-foreground text-[10px] text-center h-full flex items-center justify-center">
                              Empty
                            </div>
                          )}
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs">
                      <p className="font-semibold mb-1">{tooltips.workerMicrotasks.title}</p>
                      <p className="text-sm">{tooltips.workerMicrotasks.description}</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="cursor-help">
                        <p className="text-xs text-accent text-center mb-1">Macrotasks</p>
                        <div className="h-14 bg-accent/10 border border-accent/30 rounded-lg p-1 flex flex-col gap-1 overflow-hidden">
                          <AnimatePresence mode="popLayout">
                            {step.workerMacrotasks.map((task, i) => (
                              <motion.div
                                key={`macro-${i}`}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                className="bg-accent text-accent-foreground px-1 py-0.5 rounded text-[10px] font-mono text-center"
                              >
                                {task}
                              </motion.div>
                            ))}
                          </AnimatePresence>
                          {step.workerMacrotasks.length === 0 && (
                            <div className="text-muted-foreground text-[10px] text-center h-full flex items-center justify-center">
                              Empty
                            </div>
                          )}
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs">
                      <p className="font-semibold mb-1">{tooltips.workerMacrotasks.title}</p>
                      <p className="text-sm">{tooltips.workerMacrotasks.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="p-2 bg-secondary rounded-lg text-center cursor-help">
                    <p className="text-xs text-muted-foreground">Worker Event Loop</p>
                    <p className="text-xs font-semibold text-chart-5">{step.workerEventLoop}</p>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-xs">
                  <p className="font-semibold mb-1">{tooltips.workerEventLoop.title}</p>
                  <p className="text-sm">{tooltips.workerEventLoop.description}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Description */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 p-3 bg-secondary rounded-lg text-center"
          >
            <p className="text-sm text-foreground">{step.description}</p>
          </motion.div>

          {/* Controls */}
          <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={prev} disabled={currentStep === 0} className="hover:bg-primary/10 hover:text-primary hover:border-primary">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <Button variant="outline" size="sm" onClick={togglePlay} className="hover:bg-primary/10 hover:text-primary hover:border-primary">
              {isPlaying ? (
                <>
                  <Pause className="h-4 w-4 mr-1" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-1" />
                  Auto
                </>
              )}
            </Button>
            <Button variant="outline" size="sm" onClick={reset} className="hover:bg-primary/10 hover:text-primary hover:border-primary">
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
            <span className="text-sm text-muted-foreground px-2">
              {currentStep + 1} / {animationSteps.length}
            </span>
            <Button variant="outline" size="sm" onClick={next} disabled={currentStep === animationSteps.length - 1} className="hover:bg-primary/10 hover:text-primary hover:border-primary">
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </motion.div>
      </div>
    </TooltipProvider>
  )
}
