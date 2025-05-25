"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Upload, ImageIcon, X } from "lucide-react"
import Image from "next/image"

interface QRPaymentSectionProps {
  orderData: any
  onPaymentMethodChange: (method: string) => void
  onTransactionIdChange: (id: string) => void
  onFileUpload: (file: File) => void
  onNext: () => void
  onBack: () => void
}

const paymentMethods = [
  {
    id: "esewa",
    name: "eSewa",
    qrCode: "/placeholder.svg?height=200&width=200",
    color: "from-green-500 to-green-600",
    instructions: "Scan QR code with eSewa app and complete payment",
  },
  {
    id: "khalti",
    name: "Khalti",
    qrCode: "/placeholder.svg?height=200&width=200",
    color: "from-purple-500 to-purple-600",
    instructions: "Scan QR code with Khalti app and complete payment",
  },
  {
    id: "ime",
    name: "IME Pay",
    qrCode: "/placeholder.svg?height=200&width=200",
    color: "from-blue-500 to-blue-600",
    instructions: "Scan QR code with IME Pay app and complete payment",
  },
]

export function QRPaymentSection({
  orderData,
  onPaymentMethodChange,
  onTransactionIdChange,
  onFileUpload,
  onNext,
  onBack,
}: QRPaymentSectionProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>(orderData.paymentMethod || "")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")

  const handleMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId)
    onPaymentMethodChange(methodId)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      onFileUpload(file)

      // Create preview URL
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const removeFile = () => {
    setUploadedFile(null)
    setPreviewUrl("")
    // Reset file input
    const fileInput = document.getElementById("screenshot") as HTMLInputElement
    if (fileInput) fileInput.value = ""
  }

  const canProceed = selectedMethod && orderData.transactionId && uploadedFile

  return (
    <div className="space-y-6">
      {/* Payment Method Selection */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Select Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {paymentMethods.map((method) => (
              <motion.div
                key={method.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`cursor-pointer rounded-lg border-2 transition-all ${
                  selectedMethod === method.id
                    ? "border-purple-500 bg-purple-500/20"
                    : "border-white/20 bg-white/5 hover:border-white/40"
                }`}
                onClick={() => handleMethodSelect(method.id)}
              >
                <div className="p-4 text-center">
                  <div
                    className={`w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r ${method.color} flex items-center justify-center`}
                  >
                    <span className="text-white font-bold text-lg">{method.name.charAt(0)}</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">{method.name}</h3>
                  {selectedMethod === method.id && <Badge className="bg-purple-600">Selected</Badge>}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* QR Code Display */}
      {selectedMethod && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">
                Pay with {paymentMethods.find((m) => m.id === selectedMethod)?.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-4 rounded-lg inline-block mb-4"
              >
                <Image
                  src={paymentMethods.find((m) => m.id === selectedMethod)?.qrCode || "/placeholder.svg"}
                  alt={`${selectedMethod} QR Code`}
                  width={200}
                  height={200}
                  className="mx-auto"
                />
              </motion.div>
              <p className="text-gray-300 mb-4">{paymentMethods.find((m) => m.id === selectedMethod)?.instructions}</p>
              <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-3">
                <p className="text-yellow-300 text-sm">
                  <strong>Amount:</strong> Rs. 500 (Example amount - will be calculated based on selected package)
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Transaction Details */}
      {selectedMethod && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Payment Verification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="transactionId" className="text-white">
                  Transaction ID *
                </Label>
                <Input
                  id="transactionId"
                  placeholder="Enter transaction ID from payment app"
                  value={orderData.transactionId}
                  onChange={(e) => onTransactionIdChange(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>

              <div>
                <Label htmlFor="screenshot" className="text-white">
                  Payment Screenshot *
                </Label>
                <div className="mt-2">
                  {!uploadedFile ? (
                    <label
                      htmlFor="screenshot"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-lg cursor-pointer bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <Upload className="h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-gray-400 text-sm">Click to upload payment screenshot</p>
                      <p className="text-gray-500 text-xs">PNG, JPG up to 5MB</p>
                    </label>
                  ) : (
                    <div className="relative">
                      <div className="flex items-center space-x-3 bg-white/10 rounded-lg p-3">
                        <ImageIcon className="h-8 w-8 text-green-400" />
                        <div className="flex-1">
                          <p className="text-white text-sm">{uploadedFile.name}</p>
                          <p className="text-gray-400 text-xs">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={removeFile}
                          className="text-red-400 hover:text-red-300"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      {previewUrl && (
                        <div className="mt-3">
                          <Image
                            src={previewUrl || "/placeholder.svg"}
                            alt="Payment screenshot preview"
                            width={200}
                            height={200}
                            className="rounded-lg border border-white/20"
                          />
                        </div>
                      )}
                    </div>
                  )}
                  <input id="screenshot" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </div>
              </div>

              <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4">
                <h4 className="text-blue-300 font-semibold mb-2">Important Instructions:</h4>
                <ul className="text-blue-200 text-sm space-y-1">
                  <li>• Complete the payment using the QR code above</li>
                  <li>• Take a screenshot of the successful payment</li>
                  <li>• Enter the exact transaction ID from your payment app</li>
                  <li>• Upload the payment screenshot for verification</li>
                  <li>• Your order will be processed within 24 hours</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        <Button variant="outline" onClick={onBack} className="flex-1 border-white/20 text-white hover:bg-white/10">
          Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!canProceed}
          className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
        >
          Review Order
        </Button>
      </div>
    </div>
  )
}
