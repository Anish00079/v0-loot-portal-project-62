"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function AboutHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <div className="bg-white/5 rounded-full p-6 border border-white/10">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lootportal%20logo-vVyvZae35C7EU1qBlNPsCgk8tI9Bkm.png"
                  alt="Loot Portal - Gaming Logo"
                  width={300}
                  height={100}
                  className="w-auto h-16"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            About <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Us</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We're passionate gamers building the future of digital entertainment in Nepal. Your trusted partner for
            seamless game top-ups and premium subscriptions.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
