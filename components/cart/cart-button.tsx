"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Sparkles } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import { useEffect, useState } from "react"

export function CartButton() {
  const { getTotalItems, setIsOpen, getTotalPrice } = useCartStore()
  const totalItems = getTotalItems()
  const totalPrice = getTotalPrice()
  const [isAnimating, setIsAnimating] = useState(false)

  // Animate when items are added
  useEffect(() => {
    if (totalItems > 0) {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 600)
    }
  }, [totalItems])

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={
        isAnimating
          ? {
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }
          : {}
      }
      transition={{ duration: 0.3 }}
    >
      <Button
        onClick={() => setIsOpen(true)}
        size="sm"
        className="relative bg-white text-black hover:bg-gray-100 font-medium tracking-wide rounded-full overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {/* Background shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-200/30 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 3,
            ease: "linear",
          }}
        />

        {/* Button content */}
        <div className="relative z-10 flex items-center">
          <motion.div
            animate={
              totalItems > 0
                ? {
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }
                : {}
            }
            transition={{ duration: 0.5 }}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
          </motion.div>

          <span>Cart</span>

          {totalPrice > 0 && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="ml-2 text-xs text-purple-600 font-semibold"
            >
              Rs. {totalPrice.toLocaleString()}
            </motion.span>
          )}
        </div>

        {/* Enhanced Badge */}
        <AnimatePresence>
          {totalItems > 0 && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center shadow-lg"
            >
              <motion.span
                key={totalItems}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {totalItems}
              </motion.span>

              {/* Pulsing ring effect */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-purple-400"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 0, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating sparkles for new items */}
        <AnimatePresence>
          {isAnimating && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-yellow-400"
                  style={{
                    left: `${30 + i * 20}%`,
                    top: `${20 + i * 15}%`,
                  }}
                  initial={{ scale: 0, opacity: 0, y: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    y: [-20, -40, -60],
                  }}
                  transition={{
                    duration: 1,
                    delay: i * 0.1,
                    ease: "easeOut",
                  }}
                >
                  <Sparkles className="h-3 w-3" />
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </Button>
    </motion.div>
  )
}
