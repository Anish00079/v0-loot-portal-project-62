"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Gamepad2, Tv } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

export function HeroSection() {
  const [hoveredSide, setHoveredSide] = useState<"games" | "subscriptions" | null>(null)

  return (
    <section className="relative h-screen flex overflow-hidden">
      {/* Central Logo */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        >
          <div className="bg-black/20 backdrop-blur-md rounded-full p-6 border border-white/20 shadow-2xl">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lootportal%20logo-vVyvZae35C7EU1qBlNPsCgk8tI9Bkm.png"
              alt="Loot Portal - Gaming Logo"
              width={300}
              height={100}
              className="w-auto h-16 md:h-20"
              priority
            />
          </div>
        </motion.div>
      </div>

      {/* Games Section - Left Side */}
      <motion.div
        className="relative w-1/2 h-full cursor-pointer group"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        onMouseEnter={() => setHoveredSide("games")}
        onMouseLeave={() => setHoveredSide(null)}
        whileHover={{ scale: 1.02 }}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
            {/* Gaming Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-20 left-20 w-32 h-32 border-2 border-purple-400 rounded-lg rotate-12" />
              <div className="absolute bottom-32 right-20 w-24 h-24 border-2 border-blue-400 rounded-full" />
              <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-500/30 rounded-lg rotate-45" />
              <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-blue-500/30 rounded-full" />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/40 to-transparent" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-8">
          <motion.div
            className="mb-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <span className="text-orange-400 font-medium text-lg md:text-xl tracking-wider uppercase">Top-Up Your</span>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-8 tracking-wider"
            style={{
              textShadow: "3px 3px 0px rgba(0,0,0,0.3), -1px -1px 0px rgba(255,255,255,0.1)",
              WebkitTextStroke: "2px rgba(255,255,255,0.1)",
            }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            GAMES
          </motion.h1>

          <motion.div
            className="flex items-center space-x-4 mb-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <Gamepad2 className="h-8 w-8 text-purple-400" />
            <span className="text-white text-lg">CODM • PUBG • Free Fire • Steam</span>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <Button
              asChild
              size="lg"
              className={`bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 text-lg px-8 py-6 rounded-full transition-all duration-300 ${
                hoveredSide === "games" ? "scale-110 shadow-2xl" : ""
              }`}
            >
              <Link href="/topup" className="flex items-center">
                Start Gaming
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Hover Effect */}
        <div
          className={`absolute inset-0 bg-purple-500/10 transition-opacity duration-300 ${
            hoveredSide === "games" ? "opacity-100" : "opacity-0"
          }`}
        />
      </motion.div>

      {/* Subscriptions Section - Right Side */}
      <motion.div
        className="relative w-1/2 h-full cursor-pointer group"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        onMouseEnter={() => setHoveredSide("subscriptions")}
        onMouseLeave={() => setHoveredSide(null)}
        whileHover={{ scale: 1.02 }}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-bl from-emerald-900 via-teal-900 to-cyan-900 relative overflow-hidden">
            {/* Subscription Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-32 right-24 w-28 h-28 border-2 border-emerald-400 rounded-full" />
              <div className="absolute bottom-40 left-16 w-20 h-20 border-2 border-teal-400 rounded-lg rotate-45" />
              <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-emerald-500/30 rounded-full" />
              <div className="absolute bottom-24 right-1/3 w-16 h-16 bg-teal-500/30 rounded-lg rotate-12" />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-l from-emerald-600/40 to-transparent" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-8">
          <motion.div
            className="mb-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <span className="text-orange-400 font-medium text-lg md:text-xl tracking-wider uppercase">
              Subscribe To
            </span>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-8 tracking-wider"
            style={{
              textShadow: "3px 3px 0px rgba(0,0,0,0.3), -1px -1px 0px rgba(255,255,255,0.1)",
              WebkitTextStroke: "2px rgba(255,255,255,0.1)",
            }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            APPS
          </motion.h1>

          <motion.div
            className="flex items-center space-x-4 mb-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <Tv className="h-8 w-8 text-emerald-400" />
            <span className="text-white text-lg">Netflix • Spotify • YouTube • Canva</span>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <Button
              asChild
              size="lg"
              className={`bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 text-lg px-8 py-6 rounded-full transition-all duration-300 ${
                hoveredSide === "subscriptions" ? "scale-110 shadow-2xl" : ""
              }`}
            >
              <Link href="/subscriptions" className="flex items-center">
                Get Premium
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Hover Effect */}
        <div
          className={`absolute inset-0 bg-emerald-500/10 transition-opacity duration-300 ${
            hoveredSide === "subscriptions" ? "opacity-100" : "opacity-0"
          }`}
        />
      </motion.div>

      {/* Central Divider Line */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent z-40" />

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2 }}
      >
        <motion.div
          className="w-px h-16 bg-gradient-to-b from-transparent via-white/50 to-transparent"
          animate={{ scaleY: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <p className="text-white/60 text-xs mt-2 text-center">Scroll to explore</p>
      </motion.div>
    </section>
  )
}
