"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export function SingleThreaded() {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Render Button", status: "waiting" },
    { id: 2, name: "Calculate Sum", status: "waiting" },
    { id: 3, name: "Update Text", status: "waiting" },
    { id: 4, name: "Handle Click", status: "waiting" },
  ])
  const [currentTask, setCurrentTask] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTasks((prev) =>
        prev.map((task, index) => {
          if (index < currentTask) return { ...task, status: "done" }
          if (index === currentTask) return { ...task, status: "running" }
          return { ...task, status: "waiting" }
        }),
      )
      setCurrentTask((prev) => (prev + 1) % 5)
    }, 1000)

    return () => clearInterval(interval)
  }, [currentTask])

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">JavaScript Is Single-Threaded</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          JavaScript can only do <span className="font-semibold text-primary">one thing at a time</span>. Tasks run one
          after another, like a single checkout line at a store.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="max-w-md mx-auto"
      >
        <div className="p-4 rounded-xl bg-card border border-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-4 text-center">Main Thread Task Queue</h3>
          <div className="space-y-3">
            {tasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-3 rounded-lg flex items-center justify-between transition-all duration-300 ${
                  task.status === "running"
                    ? "bg-accent/20 border border-accent"
                    : task.status === "done"
                      ? "bg-primary/20 border border-primary/40"
                      : "bg-secondary border border-border"
                }`}
              >
                <span className="font-mono text-sm">{task.name}</span>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    task.status === "running"
                      ? "bg-accent text-accent-foreground"
                      : task.status === "done"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {task.status}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center p-4 rounded-xl bg-secondary/50 border border-border max-w-2xl mx-auto"
      >
        <p className="text-foreground">
          <span className="font-bold text-accent">Problem:</span> If one task takes a long time, everything else has to
          wait. That&apos;s why your page freezes!
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-center p-4 rounded-xl bg-primary/10 border border-primary/20 max-w-2xl mx-auto"
      >
        <p className="text-sm text-foreground leading-relaxed">
          <span className="font-bold text-primary">Good News:</span> JavaScript has an{" "}
          <span className="font-semibold">Event Loop</span> and supports{" "}
          <span className="font-semibold">async tasks</span> (like fetching data), which don&apos;t block the thread.
          But CPU-heavy work is different—it truly blocks everything until it&apos;s done.
        </p>
      </motion.div>
    </div>
  )
}
