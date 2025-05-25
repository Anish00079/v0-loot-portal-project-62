"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Check, Clock, CreditCard } from "lucide-react"
import { QRPaymentSection } from "./qr-payment-section"
import { useSearchParams } from "next/navigation"
import { PageLoader } from "@/components/ui/page-loader"

interface OrderData {
  gameId: string
  packageId: string
  playerId: string
  playerEmail?: string
  paymentMethod: "esewa" | "khalti" | "ime" | ""
  transactionId: string
  screenshot?: File
  notes?: string
}

export function CheckoutForm() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [orderData, setOrderData] = useState<OrderData>({
    gameId: searchParams.get("game") || "",
    packageId: searchParams.get("package") || "",
    playerId: "",
    playerEmail: "",
    paymentMethod: "",
    transactionId: "",
    notes: "",
  })

  const handleInputChange = (field: keyof OrderData, value: string) => {
    setOrderData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (file: File) => {
    setOrderData((prev) => ({ ...prev, screenshot: file }))
  }

  const handleSubmitOrder = async () => {
    setLoading(true)
    try {
      // Validate required fields
      if (!orderData.playerId || !orderData.paymentMethod || !orderData.transactionId) {
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
        body: JSON.stringify(orderData),
      })

      if (response.ok) {
        const result = await response.json()
        toast({
          title: "Order Submitted!",
          description: `Order #${result.order.id} has been created. You'll receive confirmation within 24 hours.`,
        })
        setStep(4) // Success step
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

  if (loading) {
    return <PageLoader message="Processing your order..." />
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  step >= stepNumber ? "bg-purple-600 text-white" : "bg-gray-600 text-gray-300"
                }`}
              >
                {step > stepNumber ? <Check className="h-5 w-5" /> : stepNumber}
              </div>
              {stepNumber < 3 && <div className="w-12 h-0.5 bg-gray-600 mx-2" />}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Order Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="playerId" className="text-white">
                      Player ID / Game Username *
                    </Label>
                    <Input
                      id="playerId"
                      placeholder="Enter your in-game ID"
                      value={orderData.playerId}
                      onChange={(e) => handleInputChange("playerId", e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="playerEmail" className="text-white">
                      Email Address (Optional)
                    </Label>
                    <Input
                      id="playerEmail"
                      type="email"
                      placeholder="your@email.com"
                      value={orderData.playerEmail}
                      onChange={(e) => handleInputChange("playerEmail", e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes" className="text-white">
                    Additional Notes (Optional)
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Any special instructions..."
                    value={orderData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>

                <Button
                  onClick={() => setStep(2)}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  disabled={!orderData.playerId}
                >
                  Continue to Payment
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <QRPaymentSection
              orderData={orderData}
              onPaymentMethodChange={(method) => handleInputChange("paymentMethod", method)}
              onTransactionIdChange={(id) => handleInputChange("transactionId", id)}
              onFileUpload={handleFileUpload}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Check className="mr-2 h-5 w-5" />
                  Review Order
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-white/5 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Player ID:</span>
                    <span className="text-white">{orderData.playerId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Payment Method:</span>
                    <Badge className="bg-purple-600">{orderData.paymentMethod?.toUpperCase()}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Transaction ID:</span>
                    <span className="text-white">{orderData.transactionId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Screenshot:</span>
                    <span className="text-white">{orderData.screenshot ? "✓ Uploaded" : "Not uploaded"}</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep(2)} className="flex-1 border-white/20 text-white">
                    Back
                  </Button>
                  <Button
                    onClick={handleSubmitOrder}
                    disabled={loading}
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                  >
                    {loading ? "Submitting..." : "Submit Order"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-center">
              <CardContent className="py-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Check className="h-10 w-10 text-white" />
                </motion.div>
                <h2 className="text-3xl font-bold text-white mb-4">Order Submitted Successfully!</h2>
                <p className="text-gray-300 mb-6">
                  Your order has been received and is being processed. You'll receive confirmation within 24 hours.
                </p>
                <div className="flex items-center justify-center space-x-2 text-yellow-400 mb-6">
                  <Clock className="h-5 w-5" />
                  <span>Processing Time: 1-24 hours</span>
                </div>
                <Button asChild className="bg-purple-600 hover:bg-purple-700">
                  <a href="/dashboard">View Order Status</a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
