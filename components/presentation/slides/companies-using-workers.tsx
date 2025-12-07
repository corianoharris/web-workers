"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Map, FileText, Brain, Code, Box, Cog, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Company {
  name: string
  icon: any
  category: string
  color: string
  why: string
  whatTheyDo: string
  example: string
}

const companies: Company[] = [
  {
    name: "Google Maps",
    icon: Map,
    category: "Maps & Location",
    color: "text-red-500",
    why: "Maps need to calculate routes, distances, and zoom levels constantly",
    whatTheyDo: "Workers do all the math in the background so panning and zooming never freezes",
    example: "When you drag the map around, workers calculate what tiles to show next",
  },
  {
    name: "PDF.js",
    icon: FileText,
    category: "Documents & Editors",
    color: "text-orange-500",
    why: "Reading PDFs is very CPU-heavy (loading fonts, images, and text)",
    whatTheyDo: "Workers load and render PDF pages so scrolling stays smooth",
    example: "Used by Firefox, Chrome, and VS Code to show PDFs without lag",
  },
  {
    name: "Figma",
    icon: Box,
    category: "Documents & Editors",
    color: "text-purple-500",
    why: "Design tools need complex math for shapes, colors, and real-time collaboration",
    whatTheyDo: "Workers handle the heavy calculations so the canvas never stutters",
    example: "When you move objects, workers calculate positions while you keep designing",
  },
  {
    name: "Monaco Editor",
    icon: Code,
    category: "Documents & Editors",
    color: "text-blue-500",
    why: "Code editors need syntax highlighting, error checking, and autocomplete",
    whatTheyDo: "Workers run the language tools so typing stays instant",
    example: "This is the editor inside VS Code - workers check your TypeScript code",
  },
  {
    name: "TensorFlow.js",
    icon: Brain,
    category: "Machine Learning",
    color: "text-green-500",
    why: "Running AI models (like face detection) is extremely CPU-heavy",
    whatTheyDo: "Workers run the ML calculations in the background",
    example: "Detects poses or classifies images without freezing your website",
  },
  {
    name: "Three.js",
    icon: Cog,
    category: "3D & Graphics",
    color: "text-cyan-500",
    why: "3D physics and geometry calculations are very expensive",
    whatTheyDo: "Workers compute physics and mesh data while the main thread renders graphics",
    example: "Games and 3D visualizations use workers for smooth animation",
  },
  {
    name: "Mapbox",
    icon: Map,
    category: "Maps & Location",
    color: "text-teal-500",
    why: "Map tiles and location data need to be decoded quickly",
    whatTheyDo: "A pool of workers processes all map data off the main thread",
    example: "Interactive maps that never lag, even with complex data layers",
  },
]

const categories = [
  { name: "All", icon: null },
  { name: "Maps & Location", icon: Map },
  { name: "Documents & Editors", icon: FileText },
  { name: "Machine Learning", icon: Brain },
  { name: "3D & Graphics", icon: Cog },
]

export function CompaniesUsingWorkers() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [expandedCompany, setExpandedCompany] = useState<string | null>(null)

  const filteredCompanies =
    selectedCategory === "All" ? companies : companies.filter((c) => c.category === selectedCategory)

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Who Actually Uses Web Workers?</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          These aren't toy examples — these are major products used by millions of people every day
        </p>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex gap-2 justify-center flex-wrap"
      >
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <Button
              key={category.name}
              variant={selectedCategory === category.name ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.name)}
              size="sm"
              className="gap-2"
            >
              {Icon && <Icon className="h-4 w-4" />}
              {category.name}
            </Button>
          )
        })}
      </motion.div>

      {/* Company Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2"
      >
        {filteredCompanies.map((company, index) => {
          const Icon = company.icon
          const isExpanded = expandedCompany === company.name

          return (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-4 rounded-xl border border-border bg-muted/30 hover:bg-muted/50 transition-all cursor-pointer ${
                isExpanded ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setExpandedCompany(isExpanded ? null : company.name)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-background border border-border ${company.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{company.name}</h3>
                    <p className="text-xs text-muted-foreground">{company.category}</p>
                  </div>
                </div>
                <ChevronRight
                  className={`h-5 w-5 text-muted-foreground transition-transform ${isExpanded ? "rotate-90" : ""}`}
                />
              </div>

              {/* Collapsed State - Just "Why" */}
              {!isExpanded && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Why they use it:</span> {company.why}
                  </p>
                </div>
              )}

              {/* Expanded State - Full Details */}
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3"
                >
                  <div className="p-3 rounded-lg bg-background border border-border">
                    <p className="text-xs font-semibold text-primary mb-1">WHY THEY USE IT</p>
                    <p className="text-sm text-foreground">{company.why}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-background border border-border">
                    <p className="text-xs font-semibold text-green-500 mb-1">WHAT WORKERS DO</p>
                    <p className="text-sm text-foreground">{company.whatTheyDo}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-background border border-border">
                    <p className="text-xs font-semibold text-blue-500 mb-1">REAL EXAMPLE</p>
                    <p className="text-sm text-foreground">{company.example}</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </motion.div>

      {/* Key Takeaway */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-4 rounded-xl bg-chart-1/10 border border-chart-1/30"
      >
        <p className="text-sm text-center text-muted-foreground">
          <span className="font-semibold text-foreground">💡 Key Point:</span> Big companies use workers when they need
          to do heavy calculations without making the UI feel slow or frozen
        </p>
      </motion.div>
    </div>
  )
}
