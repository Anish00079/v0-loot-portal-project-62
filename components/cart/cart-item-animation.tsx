"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface CartItemAnimationProps {
  children: React.ReactNode
  isRemoving?: boolean
  index?: number
}

export function CartItemAnimation({ children, isRemoving = false, index = 0 }: CartItemAnimationProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (isRemoving) {
      setTimeout(() => setIsVisible(false), 300)
    }
  }, [isRemoving])

  if (!isVisible) return null

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{
        opacity: isRemoving ? 0 : 1,
        x: isRemoving ? -100 : 0,
        scale: isRemoving ? 0.8 : 1,
      }}
      exit={{
        opacity: 0,
        x: -100,
        scale: 0.8,
        transition: { duration: 0.3 },
      }}
      transition={{
        delay: index * 0.05,
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      className="transform-gpu"
    >
      {children}
    </motion.div>
  )
}
