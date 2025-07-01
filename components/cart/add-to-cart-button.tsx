"use client"

import { motion, useAnimation } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Check, Zap } from "lucide-react"
import { useCartStore, type CartItem } from "@/lib/cart-store"
import { useToast } from "@/hooks/use-toast"
import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"

interface AddToCartButtonProps {
  item: Omit<CartItem, "quantity">
  className?: string
  size?: "sm" | "default" | "lg"
  variant?: "default" | "outline" | "ghost"
}

export function AddToCartButton({ item, className = "", size = "default", variant = "default" }: AddToCartButtonProps) {
  const { addItem, items } = useCartStore()
  const { toast } = useToast()
  const [isAdded, setIsAdded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const controls = useAnimation()

  const isInCart = items.some((cartItem) => cartItem.id === item.id)

  const handleAddToCart = async () => {
    setIsLoading(true)

    // Button loading animation
    await controls.start({
      scale: [1, 0.95, 1.05, 1],
      transition: { duration: 0.3 },
    })

    // Add item with delay for effect
    setTimeout(() => {
      addItem(item)
      setIsAdded(true)
      setIsLoading(false)

      // Success animation sequence
      controls.start({
        scale: [1, 1.2, 1],
        rotate: [0, 10, -10, 0],
        transition: { duration: 0.6, ease: "easeOut" },
      })

      // Enhanced toast with animation
      toast({
        title: (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.5 }} className="mr-2">
              ✨
            </motion.div>
            Added to Cart!
          </motion.div>
        ),
        description: (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            {item.name} - {item.packageName} has been added to your cart.
          </motion.div>
        ),
      })

      // Create floating animation effect
      createFloatingEffect()

      // Reset state after animation
      setTimeout(() => setIsAdded(false), 2000)
    }, 300)
  }

  const createFloatingEffect = () => {
    const button = document.querySelector(`[data-add-to-cart="${item.id}"]`)
    if (!button) return

    const rect = button.getBoundingClientRect()
    const floatingIcon = document.createElement("div")
    floatingIcon.innerHTML = "🛒"
    floatingIcon.style.cssText = `
      position: fixed;
      left: ${rect.left + rect.width / 2}px;
      top: ${rect.top + rect.height / 2}px;
      font-size: 20px;
      pointer-events: none;
      z-index: 1000;
      animation: floatToCart 1s ease-out forwards;
    `

    document.body.appendChild(floatingIcon)
    setTimeout(() => floatingIcon.remove(), 1000)
  }

  // Pulse animation for items already in cart
  useEffect(() => {
    if (isInCart) {
      controls.start({
        scale: [1, 1.05, 1],
        transition: { duration: 0.5, ease: "easeInOut" },
      })
    }
  }, [isInCart, controls])

  return (
    <>
      <motion.div
        animate={controls}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          data-add-to-cart={item.id}
          onClick={handleAddToCart}
          size={size}
          variant={variant}
          disabled={isLoading}
          className={`relative overflow-hidden group ${className} ${isInCart ? "bg-green-600 hover:bg-green-700" : ""}`}
        >
          {/* Background shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: isAdded ? "100%" : "-100%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />

          {/* Button content */}
          <motion.div
            className="flex items-center relative z-10"
            animate={isAdded ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, rotate: -180 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Zap className="h-4 w-4 mr-2" />
                  </motion.div>
                </motion.div>
              ) : isAdded ? (
                <motion.div
                  key="added"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex items-center"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Added!
                  <motion.div
                    className="ml-1"
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    ✨
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="default"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center"
                >
                  <motion.div
                    animate={
                      isInCart
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
                  {isInCart ? "Add More" : "Add to Cart"}
                  {isInCart && (
                    <motion.div
                      className="ml-1"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    >
                      ⭐
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Ripple effect on click */}
          <motion.div
            className="absolute inset-0 bg-white/30 rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={
              isAdded
                ? {
                    scale: [0, 2, 3],
                    opacity: [0.5, 0.2, 0],
                  }
                : {}
            }
            transition={{ duration: 0.6 }}
          />
        </Button>
      </motion.div>

      {/* Add floating keyframes to global CSS */}
      <style jsx global>{`
        @keyframes floatToCart {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          50% {
            transform: translate(-20px, -30px) scale(1.2);
            opacity: 0.8;
          }
          100% {
            transform: translate(-100px, -60px) scale(0.5);
            opacity: 0;
          }
        }

        @keyframes confetti-0 {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes confetti-1 {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-100vh) rotate(-360deg); opacity: 0; }
        }
        @keyframes confetti-2 {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-100vh) rotate(180deg); opacity: 0; }
        }
        @keyframes confetti-3 {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-100vh) rotate(-180deg); opacity: 0; }
        }

        .animate-confetti-0 { animation: confetti-0 3s ease-out forwards; }
        .animate-confetti-1 { animation: confetti-1 3s ease-out forwards; }
        .animate-confetti-2 { animation: confetti-2 3s ease-out forwards; }
        .animate-confetti-3 { animation: confetti-3 3s ease-out forwards; }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.5s ease-in-out; }
      `}</style>
    </>
  )
}
