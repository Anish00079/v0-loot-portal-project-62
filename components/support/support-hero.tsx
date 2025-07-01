"use client"

import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Headphones, MessageCircle, FileText } from "lucide-react"
import { useState } from "react"

export function SupportHero() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <section className="relative py-20 bg-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Support{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Center</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Get help when you need it. Search our knowledge base or contact our support team directly.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            className="max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search for help articles, guides, or FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-24 py-4 text-lg bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-full"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700 rounded-full">
                Search
              </Button>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button className="flex items-center space-x-4 p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/10">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-white font-semibold">Live Chat</h3>
                <p className="text-gray-400 text-sm">Get instant help</p>
              </div>
            </button>

            <button className="flex items-center space-x-4 p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/10">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <Headphones className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-white font-semibold">Phone Support</h3>
                <p className="text-gray-400 text-sm">Call us directly</p>
              </div>
            </button>

            <button className="flex items-center space-x-4 p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/10">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-white font-semibold">Submit Ticket</h3>
                <p className="text-gray-400 text-sm">Detailed support</p>
              </div>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
