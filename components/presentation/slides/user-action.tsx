"use client"

import { motion } from "framer-motion"
import { ArrowDown, User, Cpu, List } from "lucide-react"

export function UserAction() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">
          Scene 8 — User Action
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          The User Gives a Task
        </h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          The user clicks a button. The task lands on the Main Thread.
          The Call Stack has no choice — it must handle it.
        </p>
      </motion.div>

      {/* Animated flow */}
      <div className="flex flex-col items-center gap-2">
        {/* User */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="px-6 py-4 rounded-xl bg-yellow-500/10 border border-yellow-500/40 text-center w-72"
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            <User className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
            <p className="font-bold text-foreground">User</p>
          </div>
          <p className="text-sm text-muted-foreground">clicks "Calculate 10 million numbers"</p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <ArrowDown className="h-5 w-5 text-muted-foreground" />
        </motion.div>

        {/* Main Thread */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.65 }}
          className="px-6 py-4 rounded-xl bg-primary/10 border border-primary/40 text-center w-72"
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            <Cpu className="h-4 w-4 text-primary" />
            <p className="font-bold text-foreground">Main Thread</p>
          </div>
          <p className="text-sm text-muted-foreground">receives task, pushes to Call Stack</p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.95 }}>
          <ArrowDown className="h-5 w-5 text-muted-foreground" />
        </motion.div>

        {/* Call Stack */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1 }}
          className="px-6 py-4 rounded-xl bg-orange-500/10 border border-orange-500/40 w-72"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <List className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            <p className="font-bold text-foreground">Call Stack</p>
          </div>
          <div className="space-y-1.5 font-mono text-sm">
            {["renderUI()", "handleClick()", "calculateBigData()", "formatNumbers()"].map((fn, i) => (
              <motion.div
                key={fn}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + i * 0.12 }}
                className={`px-3 py-1.5 rounded text-center ${
                  i === 2
                    ? "bg-amber-500/20 border border-amber-500/40 text-amber-700 dark:text-amber-400 font-bold"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {fn} {i === 2 && "— blocked"}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8 }}
        className="grid md:grid-cols-2 gap-4"
      >
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-1">UX Problem</p>
          <p className="text-sm text-foreground">UI freezes — clicks, scrolls, animations all stall.</p>
        </div>
        <div className="p-4 rounded-xl bg-muted border border-border">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">Dev Reality</p>
          <p className="text-sm text-foreground">Blocking task stalls the main thread until it completes.</p>
        </div>
      </motion.div>
    </div>
  )
}
