"use client"

import { motion } from "framer-motion"
import { Users, Share2, Wifi, AlertCircle, Info } from "lucide-react"

export function WorkerTypesAndLimitations() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Worker Types & Important Limitations</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          There are different types of workers, each with specific use cases. Plus some important things to know!
        </p>
      </motion.div>

      {/* Worker Types */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid md:grid-cols-3 gap-4"
      >
        <div className="p-5 rounded-xl bg-primary/10 border border-primary/30">
          <div className="flex items-center gap-2 mb-3">
            <Users className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Dedicated Workers</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Used by a <span className="font-semibold">single script</span>. Most common type. Context:{" "}
            <code className="text-xs bg-background px-1 py-0.5 rounded">DedicatedWorkerGlobalScope</code>
          </p>
        </div>

        <div className="p-5 rounded-xl bg-chart-2/10 border border-chart-2/30">
          <div className="flex items-center gap-2 mb-3">
            <Share2 className="h-5 w-5 text-chart-2" />
            <h3 className="font-semibold text-foreground">Shared Workers</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Can be used by <span className="font-semibold">multiple scripts</span> across different windows/iframes
            (same domain). Communicate via ports.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-accent/10 border border-accent/30">
          <div className="flex items-center gap-2 mb-3">
            <Wifi className="h-5 w-5 text-accent" />
            <h3 className="font-semibold text-foreground">Service Workers</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Act as <span className="font-semibold">proxy servers</span> between your app and network. Enable offline
            experiences, push notifications, background sync.
          </p>
        </div>
      </motion.div>

      {/* Limitations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-6 rounded-xl bg-destructive/10 border border-destructive/30"
      >
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="h-6 w-6 text-destructive" />
          <h3 className="text-xl font-semibold text-foreground">Key Limitations & Gotchas</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-start gap-2 text-sm">
              <span className="text-destructive mt-1">✗</span>
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">No DOM Access:</span> Can&apos;t manipulate{" "}
                <code className="text-xs bg-background px-1 py-0.5 rounded">document</code> or{" "}
                <code className="text-xs bg-background px-1 py-0.5 rounded">window</code>
              </p>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <span className="text-destructive mt-1">✗</span>
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">Different Global Context:</span> Workers use{" "}
                <code className="text-xs bg-background px-1 py-0.5 rounded">self</code>, not{" "}
                <code className="text-xs bg-background px-1 py-0.5 rounded">window</code>
              </p>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <span className="text-destructive mt-1">✗</span>
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">Communication Overhead:</span> Sending data back and
                forth takes time (structured clone)
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-start gap-2 text-sm">
              <span className="text-destructive mt-1">✗</span>
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">Debugging is Harder:</span> Can&apos;t easily inspect
                worker state like main thread
              </p>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <span className="text-destructive mt-1">✗</span>
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">Same-Origin Policy:</span> Worker scripts must be from
                the same origin
              </p>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <span className="text-destructive mt-1">✗</span>
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">Browser Support:</span> Not available in older browsers
                (IE)
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Advanced Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="p-6 rounded-xl bg-chart-5/10 border border-chart-5/30"
      >
        <div className="flex items-center gap-2 mb-4">
          <Info className="h-6 w-6 text-chart-5" />
          <h3 className="text-xl font-semibold text-foreground">Advanced Features</h3>
        </div>
        <div className="space-y-3 text-sm">
          <div className="p-3 rounded-lg bg-background/50">
            <p className="font-semibold text-foreground mb-1">Workers Can Spawn Workers</p>
            <p className="text-muted-foreground text-xs">
              Workers can create their own sub-workers (must be same origin). Useful for complex parallel processing.
            </p>
          </div>
          <div className="p-3 rounded-lg bg-background/50">
            <p className="font-semibold text-foreground mb-1">SharedArrayBuffer</p>
            <p className="text-muted-foreground text-xs">
              Share memory between workers using{" "}
              <code className="bg-background px-1 py-0.5 rounded">SharedArrayBuffer</code> + Atomics API. Requires
              secure context and specific headers.
            </p>
          </div>
          <div className="p-3 rounded-lg bg-background/50">
            <p className="font-semibold text-foreground mb-1">Transferable Objects</p>
            <p className="text-muted-foreground text-xs">
              Transfer ownership of objects (like ArrayBuffer) instead of copying for better performance:{" "}
              <code className="bg-background px-1 py-0.5 rounded">postMessage(data, [transfer])</code>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
