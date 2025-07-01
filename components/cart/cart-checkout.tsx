"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Check, Clock, CreditCard, ShoppingBag, ArrowLeft, Sparkles, Gift } from "lucide-react"
import { QRPaymentSection } from "../checkout/qr-payment-section"
import { useSearchParams, useRouter } from "next/navigation"
import { PageLoader } from "@/components/ui/page-loader"
import { useCartStore, type CartItem } from "@/lib/cart-store"
import Image from "next/image"

interface CheckoutData {
  playerEmail?: string
  paymentMethod: "esewa" | "khalti" | "ime" | ""
  transactionId: string
  screenshot?: File
  notes?: string
  items: CartItem[]
}

export function CartCheckout() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()
  const { items: cartItems, clearCart } = useCartStore()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    playerEmail: "",
    paymentMethod: "",
    transactionId: "",
    notes: "",
    items: [],
  })

  useEffect(() => {
    // Get items from URL params or cart
    const itemsParam = searchParams.get("items")
    let items: CartItem[] = []

    if (itemsParam) {
      try {
        items = JSON.parse(itemsParam)
      } catch (error) {
        console.error("Failed to parse items from URL:", error)
      }
    }

    // Fallback to cart items if no URL params
    if (items.length === 0) {
      items = cartItems
    }

    if (items.length === 0) {
      toast({
        title: "No Items Found",
        description: "Your cart is empty. Please add some items first.",
        variant: "destructive",
      })
      router.push("/topup")
      return
    }

    setCheckoutData((prev) => ({ ...prev, items }))
  }, [searchParams, cartItems, router, toast])

  const handleInputChange = (field: keyof CheckoutData, value: string) => {
    setCheckoutData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (file: File) => {
    setCheckoutData((prev) => ({ ...prev, screenshot: file }))
  }

  const handleSubmitOrder = async () => {
    setLoading(true)
    try {
      // Validate required fields
      if (!checkoutData.paymentMethod || !checkoutData.transactionId) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields",
          variant: "destructive",
        })
        return
      }

      // Submit order to API
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: checkoutData.items,
          paymentMethod: checkoutData.paymentMethod,
          transactionId: checkoutData.transactionId,
          playerEmail: checkoutData.playerEmail,
          notes: checkoutData.notes,
        }),
      })

      if (response.ok) {
        const result = await response.json()
        toast({
          title: "Order Submitted!",
          description: `Order #${result.order.id} has been created. You'll receive confirmation within 24 hours.`,
        })

        // Clear cart and go to success step
        clearCart()
        setStep(4)
      } else {
        throw new Error("Failed to submit order")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const totalPrice = checkoutData.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalItems = checkoutData.items.reduce((sum, item) => sum + item.quantity, 0)

  if (loading) {
    return <PageLoader message="Processing your order..." />
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Enhanced Progress Steps */}
      <motion.div
        className="flex justify-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-4">
          {[
            { number: 1, label: "Contact" },
            { number: 2, label: "Payment" },
            { number: 3, label: "Review" },
          ].map((stepInfo, index) => (
            <div key={stepInfo.number} className="flex items-center">
              <motion.div
                className={`w-12 h-12 rounded-full flex flex-col items-center justify-center transition-all duration-300 relative ${
                  step >= stepInfo.number
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                    : "bg-gray-600 text-gray-300"
                }`}
                whileHover={{ scale: 1.05 }}
                animate={
                  step === stepInfo.number
                    ? {
                        scale: [1, 1.1, 1],
                        transition: { duration: 0.5 },
                      }
                    : {}
                }
              >
                {step > stepInfo.number ? (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Check className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <span className="text-sm font-bold">{stepInfo.number}</span>
                )}

                {/* Pulsing ring for current step */}
                {step === stepInfo.number && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-purple-400"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.7, 0, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </motion.div>

              <motion.span
                className="text-xs text-gray-400 mt-1 absolute"
                style={{ marginTop: "3rem", marginLeft: "-1rem" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                {stepInfo.label}
              </motion.span>

              {index < 2 && (
                <motion.div
                  className={`w-16 h-0.5 mx-4 transition-all duration-500 ${
                    step > stepInfo.number ? "bg-gradient-to-r from-purple-600 to-pink-600" : "bg-gray-600"
                  }`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Enhanced Order Summary */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm sticky top-24 overflow-hidden">
            <CardHeader className="relative">
              {/* Floating background elements */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
                    style={{
                      left: `${20 + i * 30}%`,
                      top: `${30 + (i % 2) * 40}%`,
                    }}
                    animate={{
                      y: [-5, 5, -5],
                      opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                      duration: 2 + i,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>

              <CardTitle className="text-white flex items-center relative z-10">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                </motion.div>
                Order Summary
                <motion.div
                  className="ml-2"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Sparkles className="h-4 w-4 text-yellow-400" />
                </motion.div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Enhanced Items List */}
              <div className="space-y-3 max-h-64 overflow-y-auto">
                <AnimatePresence>
                  {checkoutData.items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <motion.div
                        className="w-12 h-12 rounded bg-white/10 flex items-center justify-center flex-shrink-0 overflow-hidden"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {item.image ? (
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover rounded"
                          />
                        ) : (
                          <ShoppingBag className="h-6 w-6 text-gray-400" />
                        )}
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white text-sm font-medium truncate">{item.name}</h4>
                        <p className="text-gray-400 text-xs truncate">{item.packageName}</p>
                        <div className="flex items-center justify-between mt-1">
                          <motion.span
                            className="text-gray-400 text-xs"
                            key={item.quantity}
                            initial={{ scale: 1.2, color: "#a855f7" }}
                            animate={{ scale: 1, color: "#9ca3af" }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            Qty: {item.quantity}
                          </motion.span>
                          <motion.span
                            className="text-purple-400 text-sm font-medium"
                            key={item.price * item.quantity}
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            Rs. {(item.price * item.quantity).toLocaleString()}
                          </motion.span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Enhanced Totals */}
              <motion.div
                className="border-t border-white/10 pt-4 space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex justify-between text-gray-300">
                  <span>Items ({totalItems}):</span>
                  <span>Rs. {totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Processing Fee:</span>
                  <motion.span
                    animate={{ color: ["#9ca3af", "#10b981", "#9ca3af"] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    FREE
                  </motion.span>
                </div>
                <motion.div
                  className="flex justify-between text-lg font-bold text-white border-t border-white/10 pt-2"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span>Total:</span>
                  <motion.span
                    className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                    key={totalPrice}
                    initial={{ scale: 1.2, opacity: 0.7 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Rs. {totalPrice.toLocaleString()}
                  </motion.span>
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Checkout Steps */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="relative">
                    <CardTitle className="text-white flex items-center">
                      <CreditCard className="mr-2 h-5 w-5" />
                      Contact Information
                      <motion.div
                        className="ml-2"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      >
                        ✨
                      </motion.div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Label htmlFor="playerEmail" className="text-white">
                        Email Address (Optional)
                      </Label>
                      <Input
                        id="playerEmail"
                        type="email"
                        placeholder="your@email.com"
                        value={checkoutData.playerEmail}
                        onChange={(e) => handleInputChange("playerEmail", e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 transition-all duration-300 focus:bg-white/15 focus:border-purple-500/50"
                      />
                      <p className="text-xs text-gray-400 mt-1">We'll send order updates to this email</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Label htmlFor="notes" className="text-white">
                        Additional Notes (Optional)
                      </Label>
                      <Textarea
                        id="notes"
                        placeholder="Any special instructions..."
                        value={checkoutData.notes}
                        onChange={(e) => handleInputChange("notes", e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 transition-all duration-300 focus:bg-white/15 focus:border-purple-500/50"
                      />
                    </motion.div>

                    <motion.div
                      className="flex gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          variant="outline"
                          onClick={() => router.back()}
                          className="w-full border-white/20 text-white hover:bg-white/10 transition-all duration-300"
                        >
                          <ArrowLeft className="h-4 w-4 mr-2" />
                          Back to Cart
                        </Button>
                      </motion.div>
                      <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          onClick={() => setStep(2)}
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                          Continue to Payment
                          <motion.div
                            className="ml-2"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                          >
                            →
                          </motion.div>
                        </Button>
                      </motion.div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <QRPaymentSection
                  orderData={checkoutData}
                  onPaymentMethodChange={(method) => handleInputChange("paymentMethod", method)}
                  onTransactionIdChange={(id) => handleInputChange("transactionId", id)}
                  onFileUpload={handleFileUpload}
                  onNext={() => setStep(3)}
                  onBack={() => setStep(1)}
                  totalAmount={totalPrice}
                />
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="relative">
                    <CardTitle className="text-white flex items-center">
                      <Check className="mr-2 h-5 w-5" />
                      Review Order
                      <motion.div
                        className="ml-2"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        🎉
                      </motion.div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <motion.div
                      className="bg-white/5 rounded-lg p-4 space-y-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="flex justify-between">
                        <span className="text-gray-300">Payment Method:</span>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Badge className="bg-gradient-to-r from-purple-600 to-pink-600">
                            {checkoutData.paymentMethod?.toUpperCase()}
                          </Badge>
                        </motion.div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Transaction ID:</span>
                        <span className="text-white font-mono text-sm">{checkoutData.transactionId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Screenshot:</span>
                        <motion.span
                          className="text-white"
                          animate={
                            checkoutData.screenshot
                              ? {
                                  color: ["#ffffff", "#10b981", "#ffffff"],
                                }
                              : {}
                          }
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        >
                          {checkoutData.screenshot ? "✓ Uploaded" : "Not uploaded"}
                        </motion.span>
                      </div>
                      <div className="flex justify-between border-t border-white/10 pt-3">
                        <span className="text-gray-300">Total Amount:</span>
                        <motion.span
                          className="text-purple-400 font-bold text-lg"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        >
                          Rs. {totalPrice.toLocaleString()}
                        </motion.span>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          variant="outline"
                          onClick={() => setStep(2)}
                          className="w-full border-white/20 text-white hover:bg-white/10"
                        >
                          <ArrowLeft className="h-4 w-4 mr-2" />
                          Back
                        </Button>
                      </motion.div>
                      <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          onClick={handleSubmitOrder}
                          disabled={loading}
                          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden"
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
                          <div className="relative z-10 flex items-center">
                            {loading ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                className="mr-2"
                              >
                                ⚡
                              </motion.div>
                            ) : (
                              <Gift className="h-4 w-4 mr-2" />
                            )}
                            {loading ? "Submitting..." : "Submit Order"}
                          </div>
                        </Button>
                      </motion.div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-center overflow-hidden relative">
                  {/* Celebration background */}
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute text-2xl"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                          y: [-20, -100, -200],
                        }}
                        transition={{
                          duration: 3,
                          delay: Math.random() * 2,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatDelay: Math.random() * 5,
                        }}
                      >
                        {["🎉", "✨", "🎊", "🌟", "💫"][Math.floor(Math.random() * 5)]}
                      </motion.div>
                    ))}
                  </div>

                  <CardContent className="py-12 relative z-10">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        delay: 0.2,
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                      }}
                      className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <Check className="h-12 w-12 text-white" />
                      </motion.div>
                    </motion.div>

                    <motion.h2
                      className="text-4xl font-bold text-white mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      Order Submitted Successfully!
                    </motion.h2>

                    <motion.p
                      className="text-gray-300 mb-6 text-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      Your order has been received and is being processed. You'll receive confirmation within 24 hours.
                    </motion.p>

                    <motion.div
                      className="flex items-center justify-center space-x-2 text-yellow-400 mb-8"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      >
                        <Clock className="h-5 w-5" />
                      </motion.div>
                      <span className="font-medium">Processing Time: 1-24 hours</span>
                    </motion.div>

                    <motion.div
                      className="flex gap-4 justify-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          asChild
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl"
                        >
                          <a href="/dashboard">
                            <Sparkles className="h-4 w-4 mr-2" />
                            View Order Status
                          </a>
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="outline" asChild className="border-white/20 text-white hover:bg-white/10">
                          <a href="/topup">
                            <ShoppingBag className="h-4 w-4 mr-2" />
                            Continue Shopping
                          </a>
                        </Button>
                      </motion.div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
