"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface PageLoaderProps {
  message?: string
}

export function PageLoader({ message = "Loading..." }: PageLoaderProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center">
      <div className="flex flex-col items-center">
        {/* Mini Logo */}
        <motion.div
          className="mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lootportal%20logo-vVyvZae35C7EU1qBlNPsCgk8tI9Bkm.png"
            alt="Loot Portal - Gaming Logo"
            width={200}
            height={67}
            className="w-auto h-12 opacity-80"
          />
        </motion.div>

        {/* Loading Dots */}
        <div className="flex space-x-1 mb-3">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 bg-white rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                delay: index * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Loading Text */}
        <p className="text-white/80 text-sm font-light">{message}</p>
      </div>
    </div>
  )
}
