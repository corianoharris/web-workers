"use client"

import { motion } from "framer-motion"
import { Palette, MousePointer, BarChart3, Layers } from "lucide-react"

const patterns = [
  {
    icon: MousePointer,
    title: "Optimistic UI",
    without: "Click → wait → freeze → maybe result",
    with: "Click → instant feedback → worker computes → result appears",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/30",
  },
  {
    icon: Layers,
    title: "Skeleton / Progressive Load",
    without: "Blank screen while data crunches",
    with: "Skeleton visible, content fills in as worker finishes",
    color: "text-chart-3",
    bg: "bg-chart-3/10",
    border: "border-chart-3/30",
  },
  {
    icon: BarChart3,
    title: "Background Processing",
    without: "Upload → page locked → users close the tab",
    with: "Upload → progress bar → user keeps browsing",
    color: "text-chart-5",
    bg: "bg-chart-5/10",
    border: "border-chart-5/30",
  },
]

const metrics = [
  { label: "FID", name: "First Input Delay", target: "< 100ms", icon: "⚡" },
  { label: "INP", name: "Interaction to Next Paint", target: "< 200ms", icon: "🖱️" },
  { label: "CLS", name: "Cumulative Layout Shift", target: "< 0.1", icon: "📐" },
  { label: "LCP", name: "Largest Contentful Paint", target: "< 2.5s", icon: "🎨" },
]

export function DesignerPerspective() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full bg-chart-5/10 border border-chart-5/30">
            <Palette className="h-8 w-8 text-chart-5" />
          </div>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Designing for Web Workers</h2>
        <p className="text-sm text-muted-foreground uppercase tracking-widest">For Designers — UX Patterns That Need Workers</p>
      </motion.div>

      {/* Design Patterns */}
      <div className="space-y-3">
        {patterns.map((p, i) => {
          const Icon = p.icon
          return (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.15 }}
              className={`p-4 rounded-xl ${p.bg} border ${p.border}`}
            >
              <div className="flex items-start gap-4">
                <Icon className={`h-5 w-5 ${p.color} mt-0.5 shrink-0`} />
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold ${p.color} mb-2`}>{p.title}</p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    <div className="p-2 rounded-lg bg-chart-4/10 border border-chart-4/20">
                      <p className="text-[10px] font-semibold text-chart-4 uppercase tracking-wide mb-1">Without Worker</p>
                      <p className="text-xs text-foreground">{p.without}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                      <p className="text-[10px] font-semibold text-primary uppercase tracking-wide mb-1">With Worker</p>
                      <p className="text-xs text-foreground">{p.with}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Web Vitals Designers Should Know */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="p-4 rounded-xl bg-card border border-border"
      >
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest text-center mb-3">
          Core Web Vitals Workers Directly Improve
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {metrics.map((m) => (
            <div key={m.label} className="p-3 rounded-lg bg-secondary text-center">
              <p className="text-lg mb-1">{m.icon}</p>
              <p className="text-sm font-black text-primary">{m.label}</p>
              <p className="text-[10px] text-muted-foreground leading-tight">{m.name}</p>
              <p className="text-xs font-semibold text-foreground mt-1">{m.target}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="p-4 rounded-xl bg-chart-5/10 border border-chart-5/30 text-center"
      >
        <p className="text-foreground font-medium">
          Every design decision that requires heavy computation is a{" "}
          <span className="font-bold text-chart-5">design debt</span> — unless it runs in a worker.
        </p>
      </motion.div>
    </div>
  )
}
