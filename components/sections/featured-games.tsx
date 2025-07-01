"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const games = [
  {
    id: "codm",
    name: "Call of Duty Mobile",
    image: "/placeholder.svg?height=200&width=300",
    description: "CP Top-Up for CODM",
    price: "Starting from Rs. 100",
    popular: true,
  },
  {
    id: "pubg",
    name: "PUBG Mobile",
    image: "/placeholder.svg?height=200&width=300",
    description: "UC Top-Up for PUBG",
    price: "Starting from Rs. 150",
    popular: true,
  },
  {
    id: "freefire",
    name: "Free Fire",
    image: "/placeholder.svg?height=200&width=300",
    description: "Diamonds for Free Fire",
    price: "Starting from Rs. 80",
    popular: false,
  },
  {
    id: "steam",
    name: "Steam Wallet",
    image: "/placeholder.svg?height=200&width=300",
    description: "Steam Wallet Codes",
    price: "Starting from Rs. 500",
    popular: true,
  },
  {
    id: "valorant",
    name: "Valorant",
    image: "/placeholder.svg?height=200&width=300",
    description: "VP for Valorant",
    price: "Starting from Rs. 200",
    popular: false,
  },
  {
    id: "mlbb",
    name: "Mobile Legends",
    image: "/placeholder.svg?height=200&width=300",
    description: "Diamonds for MLBB",
    price: "Starting from Rs. 120",
    popular: false,
  },
]

export function FeaturedGames() {
  return (
    <section className="py-20 px-4 relative">
      {/* Section background pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 opacity-[0.015]">
          <div className="w-64 h-64 rounded-full bg-gradient-to-br from-purple-400/10 to-blue-400/10 flex items-center justify-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lootportal%20logo-vVyvZae35C7EU1qBlNPsCgk8tI9Bkm.png"
              alt=""
              width={200}
              height={67}
              className="w-auto h-12 opacity-20"
            />
          </div>
        </div>
        <div className="absolute bottom-20 right-20 opacity-[0.015]">
          <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-400/10 to-purple-400/10 flex items-center justify-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lootportal%20logo-vVyvZae35C7EU1qBlNPsCgk8tI9Bkm.png"
              alt=""
              width={150}
              height={50}
              className="w-auto h-8 opacity-20"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Featured Games</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Top-up your favorite games instantly with secure local payments
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 overflow-hidden group rounded-2xl">
                <div className="relative">
                  {game.popular && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full">
                        Popular
                      </span>
                    </div>
                  )}
                  <Image
                    src={game.image || "/placeholder.svg"}
                    alt={game.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{game.name}</h3>
                  <p className="text-gray-400 mb-2">{game.description}</p>
                  <p className="text-purple-400 font-medium mb-4">{game.price}</p>
                  <Button asChild className="w-full bg-purple-600 hover:bg-purple-700 rounded-full">
                    <Link href={`/topup/${game.id}`}>Top-Up Now</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
