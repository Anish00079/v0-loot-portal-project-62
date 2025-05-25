"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Star, Check } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const subscriptions = [
  {
    id: "netflix",
    name: "Netflix",
    description: "Stream unlimited movies and TV shows",
    image: "/placeholder.svg?height=100&width=100",
    category: "Entertainment",
    rating: 4.9,
    plans: [
      { id: "netflix-1m", duration: "1 Month", price: 800, popular: false, features: ["HD Quality", "2 Screens"] },
      {
        id: "netflix-3m",
        duration: "3 Months",
        price: 2200,
        popular: true,
        features: ["HD Quality", "2 Screens", "Save 8%"],
      },
      {
        id: "netflix-6m",
        duration: "6 Months",
        price: 4000,
        popular: false,
        features: ["HD Quality", "2 Screens", "Save 17%"],
      },
    ],
    color: "from-red-500 to-red-600",
  },
  {
    id: "spotify",
    name: "Spotify Premium",
    description: "Ad-free music streaming with offline downloads",
    image: "/placeholder.svg?height=100&width=100",
    category: "Music",
    rating: 4.8,
    plans: [
      { id: "spotify-1m", duration: "1 Month", price: 500, popular: false, features: ["Ad-free", "Offline Downloads"] },
      {
        id: "spotify-3m",
        duration: "3 Months",
        price: 1400,
        popular: true,
        features: ["Ad-free", "Offline Downloads", "Save 7%"],
      },
      {
        id: "spotify-6m",
        duration: "6 Months",
        price: 2600,
        popular: false,
        features: ["Ad-free", "Offline Downloads", "Save 13%"],
      },
    ],
    color: "from-green-500 to-green-600",
  },
  {
    id: "youtube",
    name: "YouTube Premium",
    description: "Ad-free YouTube with background play",
    image: "/placeholder.svg?height=100&width=100",
    category: "Entertainment",
    rating: 4.7,
    plans: [
      { id: "youtube-1m", duration: "1 Month", price: 600, popular: false, features: ["Ad-free", "Background Play"] },
      {
        id: "youtube-3m",
        duration: "3 Months",
        price: 1700,
        popular: true,
        features: ["Ad-free", "Background Play", "Save 6%"],
      },
      {
        id: "youtube-6m",
        duration: "6 Months",
        price: 3200,
        popular: false,
        features: ["Ad-free", "Background Play", "Save 11%"],
      },
    ],
    color: "from-red-600 to-red-700",
  },
  {
    id: "canva",
    name: "Canva Pro",
    description: "Professional design tools and templates",
    image: "/placeholder.svg?height=100&width=100",
    category: "Design",
    rating: 4.6,
    plans: [
      { id: "canva-1m", duration: "1 Month", price: 700, popular: false, features: ["Premium Templates", "Brand Kit"] },
      {
        id: "canva-3m",
        duration: "3 Months",
        price: 2000,
        popular: true,
        features: ["Premium Templates", "Brand Kit", "Save 5%"],
      },
      {
        id: "canva-1y",
        duration: "1 Year",
        price: 7000,
        popular: false,
        features: ["Premium Templates", "Brand Kit", "Save 17%"],
      },
    ],
    color: "from-purple-500 to-purple-600",
  },
]

const categories = ["All", "Entertainment", "Music", "Design", "Productivity"]

export function SubscriptionCatalog() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredSubscriptions = subscriptions.filter((sub) => {
    const matchesSearch = sub.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || sub.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-8">
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search subscriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={
                selectedCategory === category
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "border-white/20 text-white hover:bg-white/10"
              }
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Subscriptions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredSubscriptions.map((subscription, index) => (
          <motion.div
            key={subscription.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 overflow-hidden">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${subscription.color} flex items-center justify-center`}
                  >
                    <Image
                      src={subscription.image || "/placeholder.svg"}
                      alt={subscription.name}
                      width={40}
                      height={40}
                      className="rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <CardTitle className="text-white">{subscription.name}</CardTitle>
                      <Badge className="bg-purple-600 text-white border-0">{subscription.category}</Badge>
                    </div>
                    <p className="text-gray-400 text-sm">{subscription.description}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-yellow-400 text-sm">{subscription.rating}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {subscription.plans.map((plan) => (
                    <div
                      key={plan.id}
                      className={`relative p-4 rounded-lg border transition-all ${
                        plan.popular
                          ? "border-purple-500 bg-purple-500/10"
                          : "border-white/20 bg-white/5 hover:border-white/40"
                      }`}
                    >
                      {plan.popular && (
                        <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white border-0">
                          Most Popular
                        </Badge>
                      )}
                      <div className="text-center">
                        <h4 className="text-white font-semibold mb-2">{plan.duration}</h4>
                        <div className="mb-3">
                          <span className="text-2xl font-bold text-white">Rs. {plan.price}</span>
                          <span className="text-gray-400 text-sm ml-1">
                            /{plan.duration.includes("Month") ? "mo" : "yr"}
                          </span>
                        </div>
                        <div className="space-y-1 mb-4">
                          {plan.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center text-xs text-gray-300">
                              <Check className="h-3 w-3 text-green-400 mr-1" />
                              {feature}
                            </div>
                          ))}
                        </div>
                        <Button
                          asChild
                          size="sm"
                          className={`w-full ${
                            plan.popular
                              ? `bg-gradient-to-r ${subscription.color} hover:opacity-90`
                              : "bg-white/10 hover:bg-white/20 text-white"
                          }`}
                        >
                          <Link href={`/checkout?service=${subscription.id}&plan=${plan.id}`}>Subscribe Now</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredSubscriptions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No subscriptions found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
