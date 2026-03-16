"use client"

import { motion } from "framer-motion"
import { User, Cpu, List, Globe, Settings, Monitor, ArrowUpRight, ArrowDownLeft } from "lucide-react"

const roles = [
  {
    card: "User",
    Icon: User,
    duty: "Triggers actions — clicks, inputs, scrolls",
    color: "bg-yellow-500/10 border-yellow-500/40 text-yellow-600 dark:text-yellow-400",
  },
  {
    card: "Main Thread",
    Icon: Cpu,
    duty: "Executes JS + updates the DOM",
    color: "bg-primary/10 border-primary/40 text-primary",
  },
  {
    card: "Call Stack",
    Icon: List,
    duty: "Queues and runs tasks one at a time",
    color: "bg-orange-500/10 border-orange-500/40 text-orange-600 dark:text-orange-400",
  },
  {
    card: "Browser API",
    Icon: Globe,
    duty: "Creates the worker off the main thread",
    color: "bg-accent/10 border-accent/40 text-accent",
  },
  {
    card: "Web Worker",
    Icon: Settings,
    duty: "Processes the heavy task in the background",
    color: "bg-chart-5/10 border-chart-5/40 text-chart-5",
  },
  {
    card: "DOM",
    Icon: Monitor,
    duty: "Only updated by Main Thread — never the Worker",
    color: "bg-chart-3/10 border-chart-3/40 text-chart-3",
  },
  {
    card: "postMessage Card",
    Icon: ArrowUpRight,
    duty: "Worker sends data to Main Thread",
    color: "bg-green-500/10 border-green-500/40 text-green-600 dark:text-green-400",
  },
  {
    card: "onmessage Card",
    Icon: ArrowDownLeft,
    duty: "Main Thread receives data from Worker",
    color: "bg-purple-500/10 border-purple-500/40 text-purple-600 dark:text-purple-400",
  },
]

export function AudienceParticipation() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">
          Scene 7 — Audience Participation
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          Become the Browser
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          We need volunteers. Each person plays a role in the story.
          Hold your card, play your part when called.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {roles.map((role, i) => {
          const Icon = role.Icon
          return (
            <motion.div
              key={role.card}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className={`p-4 rounded-xl border ${role.color} space-y-2`}
            >
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 shrink-0" />
                <span className="font-bold text-sm text-foreground">{role.card}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{role.duty}</p>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="p-5 rounded-xl bg-card border border-border text-center space-y-2"
      >
        <p className="text-sm font-semibold text-foreground">Props needed for this exercise:</p>
        <p className="text-sm text-muted-foreground">
          Role cards for each volunteer —{" "}
          <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded">DOM</span>{" "}
          <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded">postMessage</span>{" "}
          <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded">onmessage</span>{" "}
          <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded">Browser API</span>
        </p>
        <p className="text-xs text-muted-foreground italic">
          The next slides walk through the full story — each role activates in turn.
        </p>
      </motion.div>
    </div>
  )
}
