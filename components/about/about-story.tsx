"use client"

import { motion } from "framer-motion"
import { Gamepad2, Users, Zap, Shield } from "lucide-react"

export function AboutStory() {
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
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Story</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Born from the passion of Nepali gamers who understood the struggle of accessing premium gaming content
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-6">The Beginning</h3>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                In 2024, a group of passionate gamers in Nepal faced a common problem: accessing premium gaming content
                and subscriptions was complicated, expensive, and often unreliable. We knew there had to be a better
                way.
              </p>
              <p>
                That's when Loot Portal was born. We set out to create a platform that would make digital entertainment
                accessible to every Nepali gamer, with local payment methods, instant delivery, and 24/7 support.
              </p>
              <p>
                Today, we're proud to serve thousands of gamers across Nepal, providing them with seamless access to
                their favorite games and premium subscriptions.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-2xl p-8 border border-white/10">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Gamepad2 className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">Gaming Focus</h4>
                  <p className="text-gray-400 text-sm">Built by gamers, for gamers</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">Community</h4>
                  <p className="text-gray-400 text-sm">Serving Nepal's gaming community</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">Speed</h4>
                  <p className="text-gray-400 text-sm">Instant delivery guaranteed</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">Security</h4>
                  <p className="text-gray-400 text-sm">100% secure transactions</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
