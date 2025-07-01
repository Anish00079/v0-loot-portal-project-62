"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Eye, ThumbsUp } from "lucide-react"

const articles = [
  {
    title: "How to top-up CODM CP using eSewa",
    category: "Game Top-ups",
    readTime: "3 min",
    views: 1250,
    likes: 89,
    excerpt: "Step-by-step guide to purchase Call of Duty Mobile CP using eSewa payment method.",
  },
  {
    title: "Payment failed - What to do next?",
    category: "Payment & Billing",
    readTime: "2 min",
    views: 890,
    likes: 67,
    excerpt: "Troubleshooting steps when your payment doesn't go through successfully.",
  },
  {
    title: "How to track your order status",
    category: "Account Management",
    readTime: "1 min",
    views: 2100,
    likes: 156,
    excerpt: "Learn how to check your order status and delivery progress in your dashboard.",
  },
  {
    title: "Setting up two-factor authentication",
    category: "Account Security",
    readTime: "4 min",
    views: 567,
    likes: 43,
    excerpt: "Secure your account with two-factor authentication for enhanced protection.",
  },
  {
    title: "Refund policy and process",
    category: "Payment & Billing",
    readTime: "5 min",
    views: 1890,
    likes: 134,
    excerpt: "Understanding our refund policy and how to request a refund if needed.",
  },
]

export function SupportKnowledge() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Popular Articles</CardTitle>
              <p className="text-gray-400">Most helpful articles from our knowledge base</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {articles.map((article, index) => (
                  <motion.div
                    key={article.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer border border-white/10"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-white font-semibold text-sm leading-tight flex-1 mr-2">{article.title}</h3>
                      <Badge className="bg-purple-600/20 text-purple-300 border-purple-600/30 text-xs">
                        {article.category}
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-sm mb-3 leading-relaxed">{article.excerpt}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{article.readTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-3 w-3" />
                        <span>{article.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ThumbsUp className="h-3 w-3" />
                        <span>{article.likes}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <button className="text-purple-400 hover:text-purple-300 font-medium">View All Articles →</button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
