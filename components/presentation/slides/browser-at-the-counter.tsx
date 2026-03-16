"use client"

import { motion } from "framer-motion"
import { Coffee, MousePointer, Monitor } from "lucide-react"

const duties = [
  {
    icon: MousePointer,
    role: "Takes orders",
    detail: "User clicks, scrolls, types",
    ux: "Every interaction starts here",
    dev: "Event listeners on the main thread",
    color: "text-primary",
    bg: "bg-primary/10 border-primary/30",
  },
  {
    icon: Coffee,
    role: "Makes coffee",
    detail: "Runs JavaScript code",
    ux: "Logic, calculations, data transforms",
    dev: "JS engine executes on call stack",
    color: "text-accent",
    bg: "bg-accent/10 border-accent/30",
  },
  {
    icon: Monitor,
    role: "Updates the display",
    detail: "Paints pixels to screen",
    ux: "Animations, layouts, DOM changes",
    dev: "Only the main thread can touch the DOM",
    color: "text-chart-5",
    bg: "bg-chart-5/10 border-chart-5/30",
  },
]

export function BrowserAtTheCounter() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">
          Scene 1 — The Browser at the Counter
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          The Browser Is One Person
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Imagine a single barista running the entire coffee shop — taking your order, brewing the coffee,
          and updating the menu board. All at once. That&apos;s your browser.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4">
        {duties.map((duty, i) => {
          const Icon = duty.icon
          return (
            <motion.div
              key={duty.role}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.15 }}
              className={`p-5 rounded-xl border ${duty.bg} space-y-3`}
            >
              <div className={`flex items-center gap-2 ${duty.color}`}>
                <Icon className="h-5 w-5" />
                <span className="font-bold text-foreground">{duty.role}</span>
              </div>
              <p className="text-sm text-foreground font-medium">{duty.detail}</p>
              <div className="space-y-1.5 pt-1 border-t border-border/50">
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">UX:</span> {duty.ux}
                </p>
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">Dev:</span> {duty.dev}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="p-5 rounded-xl bg-card border border-border text-center"
      >
        <p className="text-foreground font-medium">
          Buttons, scrolls, animations — all served by{" "}
          <span className="text-primary font-bold">one person</span>.
          The moment she gets overwhelmed, your interface freezes.
        </p>
      </motion.div>
    </div>
  )
}
