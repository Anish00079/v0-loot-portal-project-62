"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const stats = [
  { label: "Happy Customers", value: 10000, suffix: "+" },
  { label: "Orders Completed", value: 50000, suffix: "+" },
  { label: "Games Supported", value: 25, suffix: "+" },
  { label: "Success Rate", value: 99.9, suffix: "%" },
]

export function AboutStats() {
  const [counters, setCounters] = useState(stats.map(() => 0))

  useEffect(() => {
    const timers = stats.map((stat, index) => {
      const increment = stat.value / 100
      let current = 0

      return setInterval(() => {
        current += increment
        if (current >= stat.value) {
          current = stat.value
          clearInterval(timers[index])
        }
        setCounters((prev) => {
          const newCounters = [...prev]
          newCounters[index] = current
          return newCounters
        })
      }, 20)
    })

    return () => timers.forEach((timer) => clearInterval(timer))
  }, [])

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
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Impact</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Numbers that reflect our commitment to the Nepali gaming community
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {Math.floor(counters[index]).toLocaleString()}
                  {stat.suffix}
                </div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
