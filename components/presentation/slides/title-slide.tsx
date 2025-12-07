"use client"

import { motion } from "framer-motion"
import { Cpu, Zap, ArrowRight } from "lucide-react"
import { usePresentation } from "../presentation-context"
import { Button } from "@/components/ui/button"

export function TitleSlide() {
  const { nextSlide } = usePresentation()

  return (
    <div className="text-center space-y-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center gap-4 mb-8"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <Cpu className="h-16 w-16 text-primary" />
        </motion.div>
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
          <Zap className="h-16 w-16 text-accent" />
        </motion.div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-4xl md:text-6xl font-bold text-foreground text-balance"
      >
        Web Workers
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-pretty"
      >
        Running Heavy Tasks Without Blocking Your UI
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="pt-4"
      >
        <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm">
          Interactive Learning Module
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="pt-8"
      >
        <Button size="lg" onClick={nextSlide} className="gap-2 group">
          Start Learning
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="text-sm text-muted-foreground pt-8"
      >
        Use arrow keys or buttons to navigate • Press Space to advance
      </motion.p>
    </div>
  )
}
