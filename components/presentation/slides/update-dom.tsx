"use client"

import { motion } from "framer-motion"
import { CheckCircle, Settings, Globe, Cpu, Monitor, ArrowUpRight, ArrowDownLeft } from "lucide-react"

const flow = [
  {
    Icon: Settings,
    label: "Web Worker",
    action: "raises postMessage — result is ready",
    BadgeIcon: ArrowUpRight,
    badge: "postMessage",
    color: "bg-chart-5/10 border-chart-5/40",
    iconColor: "text-chart-5",
    badgeColor: "bg-green-500/20 text-green-700 dark:text-green-400",
    delay: 0.2,
  },
  {
    Icon: Globe,
    label: "Browser API",
    action: "routes the message to the Main Thread",
    BadgeIcon: ArrowRight,
    badge: "routing",
    color: "bg-accent/10 border-accent/40",
    iconColor: "text-accent",
    badgeColor: "bg-accent/20 text-accent",
    delay: 0.5,
  },
  {
    Icon: Cpu,
    label: "Main Thread",
    action: "raises onmessage — receives result",
    BadgeIcon: ArrowDownLeft,
    badge: "onmessage",
    color: "bg-primary/10 border-primary/40",
    iconColor: "text-primary",
    badgeColor: "bg-purple-500/20 text-purple-700 dark:text-purple-400",
    delay: 0.8,
  },
  {
    Icon: Monitor,
    label: "DOM",
    action: "updated by Main Thread — UI reflects result instantly",
    BadgeIcon: CheckCircle,
    badge: "DOM updated",
    color: "bg-chart-3/10 border-chart-3/40",
    iconColor: "text-chart-3",
    badgeColor: "bg-primary/20 text-primary",
    delay: 1.1,
  },
]

// Placeholder to satisfy JSX — ArrowRight is used inline
function ArrowRight({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

export function UpdateDom() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">
          Scene 12 — Update the DOM
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Only Main Thread Touches the DOM
        </h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          The Worker sends the result via{" "}
          <span className="font-mono text-primary">postMessage</span>.
          The Main Thread receives it via{" "}
          <span className="font-mono text-primary">onmessage</span> — then updates the UI.
        </p>
      </motion.div>

      {/* Visual flow */}
      <div className="space-y-3">
        {flow.map((item) => {
          const Icon = item.Icon
          const BadgeIcon = item.BadgeIcon
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: item.delay }}
              className={`flex items-center gap-4 p-4 rounded-xl border ${item.color}`}
            >
              <Icon className={`h-5 w-5 ${item.iconColor} shrink-0`} />
              <div className="flex-1">
                <p className="font-bold text-sm text-foreground">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.action}</p>
              </div>
              <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${item.badgeColor} shrink-0`}>
                <BadgeIcon className="h-3 w-3" />
                {item.badge}
              </span>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="p-5 rounded-xl bg-primary/10 border border-primary/30 flex items-start gap-3"
      >
        <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-foreground">The rule is absolute:</p>
          <p className="text-sm text-muted-foreground">
            The Worker cannot touch the DOM.
            It does the math, sends the answer, and the Main Thread does the painting.
            That&apos;s the contract. That&apos;s why it works.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.7 }}
        className="grid md:grid-cols-2 gap-4"
      >
        <div className="p-4 rounded-xl bg-card border border-border">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">UX Takeaway</p>
          <p className="text-sm text-foreground">Users see the result instantly — smooth interface throughout.</p>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border">
          <p className="text-xs font-semibold text-chart-5 uppercase tracking-widest mb-1">Dev Takeaway</p>
          <p className="text-sm text-foreground">Safe message passing — only main thread manipulates the DOM.</p>
        </div>
      </motion.div>
    </div>
  )
}
