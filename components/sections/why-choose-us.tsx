"use client"

import { motion } from "framer-motion"
import { Shield, Zap, Clock, Users, CreditCard, Headphones } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Instant Delivery",
    description: "Get your top-ups and subscriptions delivered instantly after payment confirmation.",
    color: "text-yellow-400",
  },
  {
    icon: Shield,
    title: "100% Secure",
    description: "All transactions are secured with bank-level encryption and fraud protection.",
    color: "text-green-400",
  },
  {
    icon: CreditCard,
    title: "Local Payments",
    description: "Pay easily with eSewa, Khalti, IME Pay, and other popular Nepali payment methods.",
    color: "text-blue-400",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Our customer support team is available round the clock to assist you.",
    color: "text-purple-400",
  },
  {
    icon: Users,
    title: "Trusted by Thousands",
    description: "Join thousands of satisfied customers who trust us for their gaming needs.",
    color: "text-pink-400",
  },
  {
    icon: Headphones,
    title: "Expert Support",
    description: "Get help from our gaming experts who understand your needs perfectly.",
    color: "text-orange-400",
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Why Choose Loot Portal?</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We're committed to providing the best gaming and subscription experience in Nepal
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <feature.icon className={`h-12 w-12 ${feature.color} mx-auto mb-4`} />
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
