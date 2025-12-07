"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Cpu, MessageSquare, Zap } from "lucide-react"

const concepts = [
  {
    icon: Cpu,
    title: "Single-Threaded Problem",
    description: "JavaScript runs one task at a time. Heavy work blocks everything.",
    color: "text-destructive",
  },
  {
    icon: Zap,
    title: "Web Workers Solution",
    description: "Workers run code in a separate thread, keeping your UI responsive.",
    color: "text-primary",
  },
  {
    icon: MessageSquare,
    title: "postMessage Communication",
    description: "Main thread and workers talk by sending messages back and forth.",
    color: "text-accent",
  },
  {
    icon: CheckCircle2,
    title: "Best Practices",
    description: "Create workers for heavy tasks, terminate when done, use messages for data.",
    color: "text-chart-5",
  },
]

const codeSnippets = [
  { label: "Create Worker", code: "new Worker('./worker.js')" },
  { label: "Send to Worker", code: "worker.postMessage(data)" },
  { label: "Receive in Worker", code: "self.onmessage = (e) => {...}" },
  { label: "Send Back Result", code: "self.postMessage(result)" },
  { label: "Receive Result", code: "worker.onmessage = (e) => {...}" },
  { label: "Clean Up", code: "worker.terminate()" },
]

export function ReviewSummary() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Review Summary</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Let&apos;s recap everything you learned about Web Workers!
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4">
        {concepts.map((concept, index) => (
          <motion.div
            key={concept.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-xl bg-card border border-border"
          >
            <div className="flex items-start gap-3">
              <concept.icon className={`h-6 w-6 ${concept.color} mt-0.5`} />
              <div>
                <h3 className="font-semibold text-foreground mb-1">{concept.title}</h3>
                <p className="text-sm text-muted-foreground">{concept.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-6 rounded-xl bg-card border border-border"
      >
        <h3 className="font-semibold text-foreground mb-4 text-center">Quick Reference Code</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {codeSnippets.map((snippet, index) => (
            <div key={index} className="p-3 rounded-lg bg-secondary">
              <p className="text-xs text-muted-foreground mb-1">{snippet.label}</p>
              <code className="text-sm font-mono text-primary">{snippet.code}</code>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="p-4 rounded-xl bg-primary/10 border border-primary/30 text-center"
      >
        <p className="text-foreground">
          <span className="font-bold text-primary">Great job!</span> You now understand the basics of Web Workers. Head
          to the next slide to try coding your own!
        </p>
      </motion.div>
    </div>
  )
}
