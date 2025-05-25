"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const games = [
  {
    id: "codm",
    name: "Call of Duty Mobile",
    image: "/placeholder.svg?height=200&width=300",
    description: "CP Top-Up for CODM",
    packages: [
      { amount: "80 CP", price: 100, popular: false },
      { amount: "400 CP", price: 500, popular: true },
      { amount: "800 CP", price: 1000, popular: false },
      { amount: "2000 CP", price: 2500, popular: false },
    ],
    rating: 4.8,
    category: "Battle Royale",
  },
  {
    id: "pubg",
    name: "PUBG Mobile",
    image: "/placeholder.svg?height=200&width=300",
    description: "UC Top-Up for PUBG",
    packages: [
      { amount: "60 UC", price: 150, popular: false },
      { amount: "325 UC", price: 750, popular: true },
      { amount: "660 UC", price: 1500, popular: false },
      { amount: "1800 UC", price: 4000, popular: false },
    ],
    rating: 4.9,
    category: "Battle Royale",
  },
  {
    id: "freefire",
    name: "Free Fire",
    image: "/placeholder.svg?height=200&width=300",
    description: "Diamonds for Free Fire",
    packages: [
      { amount: "50 Diamonds", price: 80, popular: false },
      { amount: "310 Diamonds", price: 500, popular: true },
      { amount: "520 Diamonds", price: 800, popular: false },
      { amount: "1080 Diamonds", price: 1600, popular: false },
    ],
    rating: 4.7,
    category: "Battle Royale",
  },
  {
    id: "steam",
    name: "Steam Wallet",
    image: "/placeholder.svg?height=200&width=300",
    description: "Steam Wallet Codes",
    packages: [
      { amount: "$5 USD", price: 500, popular: false },
      { amount: "$10 USD", price: 1000, popular: true },
      { amount: "$20 USD", price: 2000, popular: false },
      { amount: "$50 USD", price: 5000, popular: false },
    ],
    rating: 4.9,
    category: "PC Gaming",
  },
  {
    id: "valorant",
    name: "Valorant",
    image: "/placeholder.svg?height=200&width=300",
    description: "VP for Valorant",
    packages: [
      { amount: "475 VP", price: 200, popular: false },
      { amount: "1000 VP", price: 400, popular: true },
      { amount: "2050 VP", price: 800, popular: false },
      { amount: "3650 VP", price: 1400, popular: false },
    ],
    rating: 4.8,
    category: "FPS",
  },
  {
    id: "mlbb",
    name: "Mobile Legends",
    image: "/placeholder.svg?height=200&width=300",
    description: "Diamonds for MLBB",
    packages: [
      { amount: "86 Diamonds", price: 120, popular: false },
      { amount: "172 Diamonds", price: 240, popular: true },
      { amount: "429 Diamonds", price: 600, popular: false },
      { amount: "878 Diamonds", price: 1200, popular: false },
    ],
    rating: 4.6,
    category: "MOBA",
  },
]

const categories = ["All", "Battle Royale", "PC Gaming", "FPS", "MOBA"]

export function GameCatalog() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredGames = games.filter((game) => {
    const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || game.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-8">
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search games..."
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

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGames.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 overflow-hidden">
              <div className="relative">
                <Image
                  src={game.image || "/placeholder.svg"}
                  alt={game.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-black/50 text-white border-0">{game.category}</Badge>
                </div>
                <div className="absolute top-4 right-4 flex items-center space-x-1 bg-black/50 rounded-full px-2 py-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  <span className="text-white text-xs">{game.rating}</span>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{game.name}</h3>
                <p className="text-gray-400 mb-4">{game.description}</p>

                <div className="space-y-2 mb-4">
                  {game.packages.slice(0, 2).map((pkg, pkgIndex) => (
                    <div key={pkgIndex} className="flex justify-between items-center text-sm">
                      <span className="text-gray-300">{pkg.amount}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-purple-400 font-medium">Rs. {pkg.price}</span>
                        {pkg.popular && <Badge className="bg-purple-600 text-white text-xs border-0">Popular</Badge>}
                      </div>
                    </div>
                  ))}
                  {game.packages.length > 2 && (
                    <p className="text-xs text-gray-500">+{game.packages.length - 2} more packages</p>
                  )}
                </div>

                <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                  <Link href={`/topup/${game.id}`}>View Packages</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredGames.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No games found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
