"use client"

import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Minus, Trash2, ShoppingBag, CreditCard, Sparkles } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import { useAuth } from "@/components/providers/auth-provider"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { useState, useEffect } from "react"

export function CartSidebar() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, getTotalPrice, getTotalItems, clearCart } =
    useCartStore()
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isClearing, setIsClearing] = useState(false)
  const [removingItems, setRemovingItems] = useState<Set<string>>(new Set())

  const totalPrice = getTotalPrice()
  const totalItems = getTotalItems()

  // Spring animation for total price
  const springPrice = useSpring(totalPrice, { stiffness: 100, damping: 30 })
  const animatedPrice = useTransform(springPrice, (value) => Math.round(value))

  const handleCheckout = () => {
    if (!user) {
      // Shake animation for login requirement
      const sidebar = document.querySelector("[data-cart-sidebar]")
      sidebar?.classList.add("animate-shake")
      setTimeout(() => sidebar?.classList.remove("animate-shake"), 500)

      toast({
        title: "Login Required",
        description: "Please login to proceed with checkout.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    if (items.length === 0) {
      toast({
        title: "Cart Empty",
        description: "Add some items to your cart first.",
        variant: "destructive",
      })
      return
    }

    // Success animation before navigation
    const checkoutBtn = document.querySelector("[data-checkout-btn]")
    checkoutBtn?.classList.add("animate-pulse")

    // Create checkout URL with cart items
    const checkoutParams = new URLSearchParams()
    checkoutParams.set("items", JSON.stringify(items))
    router.push(`/checkout?${checkoutParams.toString()}`)
    setIsOpen(false)
  }

  const handleRemoveItem = async (itemId: string) => {
    setRemovingItems((prev) => new Set(prev).add(itemId))

    // Delay removal for animation
    setTimeout(() => {
      removeItem(itemId)
      setRemovingItems((prev) => {
        const newSet = new Set(prev)
        newSet.delete(itemId)
        return newSet
      })
    }, 300)
  }

  const handleClearCart = async () => {
    setIsClearing(true)

    // Stagger removal animation
    for (let i = 0; i < items.length; i++) {
      setTimeout(() => {
        setRemovingItems((prev) => new Set(prev).add(items[i].id))
      }, i * 100)
    }

    // Clear cart after animations
    setTimeout(
      () => {
        clearCart()
        setIsClearing(false)
        setRemovingItems(new Set())
      },
      items.length * 100 + 500,
    )
  }

  // Confetti effect for successful additions
  useEffect(() => {
    if (totalItems > 0) {
      const confetti = document.createElement("div")
      confetti.className = "fixed inset-0 pointer-events-none z-[60]"
      confetti.innerHTML = Array.from(
        { length: 20 },
        (_, i) =>
          `<div class="absolute animate-confetti-${i % 4}" style="left: ${Math.random() * 100}%; animation-delay: ${Math.random() * 2}s;">✨</div>`,
      ).join("")
      document.body.appendChild(confetti)

      setTimeout(() => confetti.remove(), 3000)
    }
  }, [totalItems])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Enhanced Backdrop with Blur */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 bg-black/60 z-50"
            onClick={() => setIsOpen(false)}
          />

          {/* Enhanced Sidebar with Advanced Animations */}
          <motion.div
            data-cart-sidebar
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
              opacity: { duration: 0.3 },
            }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-l border-white/10 z-50 flex flex-col shadow-2xl"
          >
            {/* Animated Header */}
            <motion.div
              className="flex items-center justify-between p-6 border-b border-white/10 relative overflow-hidden"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              {/* Floating background elements */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-purple-400/20 rounded-full"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${30 + (i % 2) * 40}%`,
                    }}
                    animate={{
                      y: [-10, 10, -10],
                      opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>

              <div className="flex items-center space-x-3 relative z-10">
                <motion.div animate={{ rotate: totalItems > 0 ? [0, 10, -10, 0] : 0 }} transition={{ duration: 0.5 }}>
                  <ShoppingBag className="h-6 w-6 text-purple-400" />
                </motion.div>
                <h2 className="text-xl font-bold text-white">Shopping Cart</h2>
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 shadow-lg">
                        <motion.span
                          key={totalItems}
                          initial={{ y: -10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {totalItems} {totalItems === 1 ? "item" : "items"}
                        </motion.span>
                      </Badge>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.div
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white hover:bg-white/10 relative z-10"
                >
                  <X className="h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Enhanced Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              <AnimatePresence mode="wait">
                {items.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="text-center py-12"
                  >
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      <ShoppingBag className="h-20 w-20 text-gray-600 mx-auto mb-4" />
                    </motion.div>
                    <motion.h3
                      className="text-lg font-semibold text-white mb-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      Your cart is empty
                    </motion.h3>
                    <motion.p
                      className="text-gray-400 mb-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      Add some games or subscriptions to get started!
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={() => setIsOpen(false)}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg"
                      >
                        <Sparkles className="h-4 w-4 mr-2" />
                        Continue Shopping
                      </Button>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="items"
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <AnimatePresence>
                      {items.map((item, index) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, x: 50, scale: 0.9 }}
                          animate={{
                            opacity: removingItems.has(item.id) ? 0 : 1,
                            x: removingItems.has(item.id) ? -100 : 0,
                            scale: removingItems.has(item.id) ? 0.8 : 1,
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
                        >
                          <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 overflow-hidden group">
                            <CardContent className="p-4">
                              <div className="flex items-start space-x-4">
                                {/* Enhanced Item Image */}
                                <motion.div
                                  className="relative w-16 h-16 rounded-lg overflow-hidden bg-white/10 flex-shrink-0"
                                  whileHover={{ scale: 1.1 }}
                                  transition={{ type: "spring", stiffness: 300 }}
                                >
                                  {item.image ? (
                                    <Image
                                      src={item.image || "/placeholder.svg"}
                                      alt={item.name}
                                      width={64}
                                      height={64}
                                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                      <ShoppingBag className="h-6 w-6 text-gray-400" />
                                    </div>
                                  )}
                                  <motion.div
                                    className="absolute -top-1 -right-1"
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                                  >
                                    <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs px-1 shadow-lg">
                                      {item.type === "game" ? "🎮" : "📱"}
                                    </Badge>
                                  </motion.div>
                                </motion.div>

                                {/* Enhanced Item Details */}
                                <div className="flex-1 min-w-0">
                                  <motion.h4
                                    className="text-white font-semibold text-sm truncate"
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 + 0.1 }}
                                  >
                                    {item.name}
                                  </motion.h4>
                                  <motion.p
                                    className="text-gray-400 text-xs mb-2 truncate"
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 + 0.15 }}
                                  >
                                    {item.packageName}
                                  </motion.p>

                                  {/* Enhanced Quantity Controls */}
                                  <div className="flex items-center justify-between">
                                    <motion.div
                                      className="flex items-center space-x-2"
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ delay: index * 0.05 + 0.2 }}
                                    >
                                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                          className="h-6 w-6 p-0 border-white/20 text-white hover:bg-red-500/20 hover:border-red-500/50 transition-all duration-200"
                                        >
                                          <Minus className="h-3 w-3" />
                                        </Button>
                                      </motion.div>

                                      <motion.span
                                        className="text-white text-sm font-medium w-8 text-center"
                                        key={item.quantity}
                                        initial={{ scale: 1.3, color: "#a855f7" }}
                                        animate={{ scale: 1, color: "#ffffff" }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                      >
                                        {item.quantity}
                                      </motion.span>

                                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                          className="h-6 w-6 p-0 border-white/20 text-white hover:bg-green-500/20 hover:border-green-500/50 transition-all duration-200"
                                        >
                                          <Plus className="h-3 w-3" />
                                        </Button>
                                      </motion.div>
                                    </motion.div>

                                    {/* Enhanced Price Display */}
                                    <motion.div
                                      className="text-right"
                                      initial={{ opacity: 0, x: 10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: index * 0.05 + 0.25 }}
                                    >
                                      <motion.p
                                        className="text-purple-400 font-semibold text-sm"
                                        key={item.price * item.quantity}
                                        initial={{ scale: 1.1 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                      >
                                        Rs. {(item.price * item.quantity).toLocaleString()}
                                      </motion.p>
                                      {item.quantity > 1 && (
                                        <p className="text-gray-500 text-xs">Rs. {item.price} each</p>
                                      )}
                                    </motion.div>
                                  </div>

                                  {/* Enhanced Remove Button */}
                                  <motion.div
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 + 0.3 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => handleRemoveItem(item.id)}
                                      className="mt-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 h-6 px-2 transition-all duration-200"
                                    >
                                      <Trash2 className="h-3 w-3 mr-1" />
                                      Remove
                                    </Button>
                                  </motion.div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {/* Enhanced Clear Cart Button */}
                    {items.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleClearCart}
                          disabled={isClearing}
                          className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300"
                        >
                          <motion.div
                            animate={isClearing ? { rotate: 360 } : {}}
                            transition={{ duration: 1, repeat: isClearing ? Number.POSITIVE_INFINITY : 0 }}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                          </motion.div>
                          {isClearing ? "Clearing..." : "Clear Cart"}
                        </Button>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Enhanced Footer */}
            {items.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="border-t border-white/10 p-6 space-y-4 bg-black/20 backdrop-blur-sm"
              >
                {/* Enhanced Total Display */}
                <motion.div
                  className="flex items-center justify-between"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-lg font-semibold text-white">Total:</span>
                  <motion.span
                    className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                    key={totalPrice}
                    initial={{ scale: 1.2, opacity: 0.7 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Rs. {totalPrice.toLocaleString()}
                  </motion.span>
                </motion.div>

                {/* Enhanced Payment Methods Preview */}
                <motion.div
                  className="flex items-center justify-center space-x-4 py-2"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="text-xs text-gray-400">Pay with:</div>
                  <div className="flex space-x-2">
                    {[
                      { name: "eSewa", color: "bg-green-600", text: "eS" },
                      { name: "Khalti", color: "bg-purple-600", text: "K" },
                      { name: "IME Pay", color: "bg-blue-600", text: "I" },
                    ].map((method, index) => (
                      <motion.div
                        key={method.name}
                        className={`w-8 h-8 ${method.color} rounded flex items-center justify-center cursor-pointer`}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          delay: 0.6 + index * 0.1,
                          type: "spring",
                          stiffness: 300,
                        }}
                        whileHover={{
                          scale: 1.2,
                          rotate: 5,
                          transition: { duration: 0.2 },
                        }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <span className="text-white text-xs font-bold">{method.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Enhanced Checkout Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    data-checkout-btn
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 3,
                        ease: "linear",
                      }}
                    />
                    <CreditCard className="h-4 w-4 mr-2" />
                    Proceed to Checkout
                    <motion.div
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      →
                    </motion.div>
                  </Button>
                </motion.div>

                {/* Enhanced Login Notice */}
                {!user && (
                  <motion.p
                    className="text-xs text-gray-400 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <motion.span
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      ✨
                    </motion.span>{" "}
                    You'll need to login to complete your purchase{" "}
                    <motion.span
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                    >
                      ✨
                    </motion.span>
                  </motion.p>
                )}
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
