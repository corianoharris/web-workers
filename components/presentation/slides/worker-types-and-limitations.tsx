"use client"

import { motion } from "framer-motion"
import { Users, Share2, Wifi, AlertCircle, Info } from "lucide-react"

export function WorkerTypesAndLimitations() {
  return (
    <div className="space-y-8 max-h-[calc(100vh-200px)] overflow-y-auto pr-4">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Types of Workers & What to Know</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          There are different types of workers. Plus some important things they can't do!
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
            Used by <span className="font-semibold">one script only</span>. This is the most common type we've been learning about.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-chart-2/10 border border-chart-2/30">
          <div className="flex items-center gap-2 mb-3">
            <Share2 className="h-5 w-5 text-chart-2" />
            <h3 className="font-semibold text-foreground">Shared Workers</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Can be used by <span className="font-semibold">multiple tabs or windows</span> on the same website.
            They share the work between different parts of your site.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-accent/10 border border-accent/30">
          <div className="flex items-center gap-2 mb-3">
            <Wifi className="h-5 w-5 text-accent" />
            <h3 className="font-semibold text-foreground">Service Workers</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Special workers that let your site <span className="font-semibold">work offline</span>.
            They can save data and send notifications.
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
          <h3 className="text-xl font-semibold text-foreground">What Workers Can't Do</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-start gap-2 text-sm">
              <span className="text-destructive mt-1">✗</span>
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">Can't Touch Your Page:</span> Workers can't change anything on your page directly.
              </p>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <span className="text-destructive mt-1">✗</span>
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">Different World:</span> Workers use{" "}
                <code className="text-xs bg-background px-1 py-0.5 rounded">self</code>, not{" "}
                <code className="text-xs bg-background px-1 py-0.5 rounded">window</code>
              </p>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <span className="text-destructive mt-1">✗</span>
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">Talking Takes Time:</span> Sending big chunks of data back and forth can be slow.
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-start gap-2 text-sm">
              <span className="text-destructive mt-1">✗</span>
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">Harder to Debug:</span> Checking what's happening in workers is trickier.
              </p>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <span className="text-destructive mt-1">✗</span>
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">Must Be From Your Site:</span> Worker files must be on your own website.
              </p>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <span className="text-destructive mt-1">✗</span>
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">Modern Browsers Only:</span> Won't work on very old browsers.
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
          <h3 className="text-xl font-semibold text-foreground">Advanced Stuff (For Later)</h3>
        </div>
        <div className="space-y-3 text-sm">
          <div className="p-3 rounded-lg bg-background/50">
            <p className="font-semibold text-foreground mb-1">Workers Can Make Workers</p>
            <p className="text-muted-foreground text-xs">
              A worker can create more workers. Useful for really complex jobs.
            </p>
          </div>
          <div className="p-3 rounded-lg bg-background/50">
            <p className="font-semibold text-foreground mb-1">Shared Memory</p>
            <p className="text-muted-foreground text-xs">
              Workers can share memory for faster communication. This is advanced and needs special setup.
            </p>
          </div>
          <div className="p-3 rounded-lg bg-background/50">
            <p className="font-semibold text-foreground mb-1">Transfer Instead of Copy</p>
            <p className="text-muted-foreground text-xs">
              You can transfer data ownership instead of copying it. Makes things faster for big data.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
