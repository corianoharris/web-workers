"use client"

import { motion } from "framer-motion"
import { Cpu, ImageIcon, Lock, FileCode } from "lucide-react"

export function WhyWorkersExist() {
  return (
    <div className="space-y-8 max-h-[calc(100vh-200px)] overflow-y-auto pr-4">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Web Workers Exist</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Ever clicked something and felt your page <span className="font-semibold text-primary">freeze</span>? That
          frustrating moment when nothing responds? Workers prevent that feeling by{" "}
          <span className="font-semibold text-primary">doing heavy work out of sight</span> so your page stays smooth.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-2xl mx-auto"
      >
        <div className="p-6 rounded-xl bg-card border border-border">
          <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
            <Cpu className="h-5 w-5 text-primary" />
            What&apos;s a Thread?
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Think of a <span className="font-semibold text-foreground">thread</span> like one person working at a desk.
            Your browser normally has just one person trying to do everything at once. Web Workers are like hiring more
            people so they can all work at the same time without getting in each other&apos;s way.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed mt-3">
            <span className="font-semibold text-foreground">This single person handles:</span>
          </p>
          <ul className="mt-2 space-y-1 text-muted-foreground text-sm">
            <li>• Clicking buttons</li>
            <li>• Typing text</li>
            <li>• Animations</li>
            <li>• Running JavaScript code</li>
          </ul>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-6 rounded-xl bg-primary/10 border border-primary/20"
      >
        <h3 className="text-xl font-semibold text-foreground mb-4 text-center">Real-World Use Cases</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
            <ImageIcon className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
            <div>
              <p className="font-medium text-foreground text-sm">Image Processing</p>
              <p className="text-xs text-muted-foreground">
                Applying filters, resizing, or compressing images without freezing the UI
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
            <Lock className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
            <div>
              <p className="font-medium text-foreground text-sm">Encryption</p>
              <p className="text-xs text-muted-foreground">
                Encrypting/decrypting large files or messages for secure messaging apps
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
            <Cpu className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
            <div>
              <p className="font-medium text-foreground text-sm">Data Processing</p>
              <p className="text-xs text-muted-foreground">
                Parsing huge CSV/JSON files, running algorithms on large datasets
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
            <FileCode className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
            <div>
              <p className="font-medium text-foreground text-sm">Complex Calculations</p>
              <p className="text-xs text-muted-foreground">
                Physics simulations, 3D rendering calculations, scientific computing
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center p-4 rounded-xl bg-secondary/50 border border-border"
      >
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Remember:</span> Most sites don&apos;t need Web Workers. Try
          optimizing your code, reducing payload sizes, and lazy loading first!
        </p>
      </motion.div>
    </div>
  )
}
