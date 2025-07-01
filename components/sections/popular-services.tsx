"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

const services = [
  {
    id: "netflix",
    name: "Netflix",
    image: "/placeholder.svg?height=100&width=100",
    plans: ["1 Month - Rs. 800", "3 Months - Rs. 2200", "6 Months - Rs. 4000"],
    badge: "Most Popular",
    color: "from-red-500 to-red-600",
  },
  {
    id: "spotify",
    name: "Spotify Premium",
    image: "/placeholder.svg?height=100&width=100",
    plans: ["1 Month - Rs. 500", "3 Months - Rs. 1400", "6 Months - Rs. 2600"],
    badge: "Best Value",
    color: "from-green-500 to-green-600",
  },
  {
    id: "youtube",
    name: "YouTube Premium",
    image: "/placeholder.svg?height=100&width=100",
    plans: ["1 Month - Rs. 600", "3 Months - Rs. 1700", "6 Months - Rs. 3200"],
    badge: null,
    color: "from-red-600 to-red-700",
  },
  {
    id: "canva",
    name: "Canva Pro",
    image: "/placeholder.svg?height=100&width=100",
    plans: ["1 Month - Rs. 700", "3 Months - Rs. 2000", "1 Year - Rs. 7000"],
    badge: "Creative",
    color: "from-purple-500 to-purple-600",
  },
]

export function PopularServices() {
  return (
    <section className="py-20 px-4 bg-black/20 relative">
      {/* Section background pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 opacity-[0.01]">
          <div className="w-96 h-96 rounded-full bg-gradient-to-br from-purple-400/10 to-blue-400/10 flex items-center justify-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lootportal%20logo-vVyvZae35C7EU1qBlNPsCgk8tI9Bkm.png"
              alt=""
              width={300}
              height={100}
              className="w-auto h-16 opacity-30"
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
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Popular Subscriptions</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get premium subscriptions for your favorite apps and services
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 h-full rounded-2xl">
                <CardContent className="p-6 text-center">
                  <div className="relative mb-4">
                    {service.badge && (
                      <Badge
                        className={`absolute -top-2 -right-2 bg-gradient-to-r ${service.color} text-white border-0 rounded-full`}
                      >
                        {service.badge}
                      </Badge>
                    )}
                    <div
                      className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center mb-4`}
                    >
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.name}
                        width={40}
                        height={40}
                        className="rounded"
                      />
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-4">{service.name}</h3>

                  <div className="space-y-2 mb-6">
                    {service.plans.map((plan, planIndex) => (
                      <div key={planIndex} className="text-sm text-gray-300 bg-white/5 rounded-full py-2 px-3">
                        {plan}
                      </div>
                    ))}
                  </div>

                  <Button
                    asChild
                    className={`w-full bg-gradient-to-r ${service.color} hover:opacity-90 border-0 rounded-full`}
                  >
                    <Link href={`/subscriptions/${service.id}`}>Subscribe Now</Link>
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
