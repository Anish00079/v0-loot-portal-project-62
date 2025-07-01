"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Ticket } from "lucide-react"

export function SupportTicket() {
  const [loading, setLoading] = useState(false)
  const [ticketData, setTicketData] = useState({
    name: "",
    email: "",
    priority: "",
    category: "",
    subject: "",
    description: "",
  })
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Ticket Submitted!",
        description: "We'll respond to your ticket within 24 hours.",
      })

      setTicketData({
        name: "",
        email: "",
        priority: "",
        category: "",
        subject: "",
        description: "",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit ticket. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setTicketData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center">
                <Ticket className="h-6 w-6 mr-2" />
                Submit Support Ticket
              </CardTitle>
              <p className="text-gray-400">Can't find what you're looking for? Submit a detailed support ticket.</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-white">
                      Name *
                    </Label>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      value={ticketData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-white">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={ticketData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="priority" className="text-white">
                      Priority
                    </Label>
                    <Select value={ticketData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="category" className="text-white">
                      Category
                    </Label>
                    <Select value={ticketData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="game-topup">Game Top-up</SelectItem>
                        <SelectItem value="payment">Payment & Billing</SelectItem>
                        <SelectItem value="technical">Technical Issue</SelectItem>
                        <SelectItem value="account">Account Management</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject" className="text-white">
                    Subject *
                  </Label>
                  <Input
                    id="subject"
                    placeholder="Brief description of your issue"
                    value={ticketData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="text-white">
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Please provide detailed information about your issue..."
                    value={ticketData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-32"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Submit Ticket"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
