"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Target, Lightbulb, Handshake } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Passion for Gaming",
    description: "We live and breathe gaming. Every decision we make is driven by our love for the gaming community.",
    color: "from-red-500 to-pink-500",
  },
  {
    icon: Target,
    title: "Customer First",
    description: "Your gaming experience is our priority. We're here to make your digital entertainment seamless.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We constantly evolve our platform to bring you the latest features and best user experience.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Handshake,
    title: "Trust & Reliability",
    description: "We've built our reputation on trust, security, and delivering on our promises every time.",
    color: "from-green-500 to-emerald-500",
  },
]

export function AboutValues() {
  return (
    <section className="py-20 px-4 bg-black/20">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Values</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The principles that guide everything we do at Loot Portal
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 h-full">
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${value.color} flex items-center justify-center`}
                  >
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{value.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
