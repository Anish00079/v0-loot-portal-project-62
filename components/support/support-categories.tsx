"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Gamepad2, CreditCard, Shield, Settings, Users, HelpCircle } from "lucide-react"

const categories = [
  {
    icon: Gamepad2,
    title: "Game Top-ups",
    description: "Issues with game purchases, delivery, or activation",
    articles: 12,
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: CreditCard,
    title: "Payment & Billing",
    description: "Payment methods, refunds, and billing questions",
    articles: 8,
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Shield,
    title: "Account Security",
    description: "Password reset, account protection, and privacy",
    articles: 6,
    color: "from-green-500 to-green-600",
  },
  {
    icon: Settings,
    title: "Technical Issues",
    description: "Website problems, app bugs, and troubleshooting",
    articles: 10,
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: Users,
    title: "Account Management",
    description: "Profile settings, order history, and preferences",
    articles: 7,
    color: "from-pink-500 to-pink-600",
  },
  {
    icon: HelpCircle,
    title: "General Help",
    description: "Getting started, how-to guides, and general questions",
    articles: 15,
    color: "from-cyan-500 to-cyan-600",
  },
]

export function SupportCategories() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Browse by Category</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Find answers quickly by browsing our organized help categories
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer h-full">
                <CardContent className="p-6">
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center mb-6`}
                  >
                    <category.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{category.title}</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{category.articles} articles</span>
                    <span className="text-purple-400 text-sm font-medium">Browse →</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
