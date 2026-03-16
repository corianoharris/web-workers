"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Cpu, MessageSquare, Zap, Heart } from "lucide-react"

const concepts = [
  {
    icon: Cpu,
    title: "The Problem",
    description: "JavaScript does one thing at a time. Heavy work freezes your page — and freezes leak trust.",
    color: "text-destructive",
  },
  {
    icon: Zap,
    title: "The Solution",
    description: "Workers do hard work separately. Your page stays smooth. Your experience stays generous.",
    color: "text-primary",
  },
  {
    icon: MessageSquare,
    title: "How They Talk",
    description: "They send messages back and forth using postMessage. Isolation forces clarity.",
    color: "text-accent",
  },
  {
    icon: CheckCircle2,
    title: "Remember This",
    description: "Use workers for heavy tasks. Clean them up when you're done.",
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
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">The Real Lesson</h2>
        <p className="text-sm text-muted-foreground uppercase tracking-widest mb-3">The Emotional Architecture</p>
        <p className="text-lg text-foreground max-w-2xl mx-auto font-medium">
          Web Workers are not about speed.
          <br />
          <span className="text-primary font-bold">They&apos;re about respect.</span>
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
            <div key={index} className="p-3 rounded-lg bg-secondary hover:bg-primary/10 hover:border hover:border-primary transition-all cursor-pointer">
              <p className="text-xs text-muted-foreground mb-1">{snippet.label}</p>
              <code className="text-sm font-mono text-primary">{snippet.code}</code>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Respect pillars */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3"
      >
        {["Attention", "Interaction", "Momentum", "Human patience"].map((item, i) => (
          <div key={item} className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-center">
            <Heart className="h-4 w-4 text-primary mx-auto mb-1" />
            <p className="text-sm font-semibold text-foreground">{item}</p>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="p-4 rounded-xl bg-primary/10 border border-primary/30 text-center"
      >
        <p className="text-foreground">
          You are not optimizing for CPU cycles.{" "}
          <span className="font-bold text-primary">You are optimizing for trust.</span>
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          And generous systems are the ones we come back to.
        </p>
      </motion.div>
    </div>
  )
}
