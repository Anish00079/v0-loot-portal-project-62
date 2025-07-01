"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const team = [
  {
    name: "Rajesh Sharma",
    role: "Founder & CEO",
    image: "/placeholder.svg?height=300&width=300",
    description: "Passionate gamer with 10+ years in tech. Believes in making gaming accessible to everyone.",
  },
  {
    name: "Priya Thapa",
    role: "Head of Operations",
    image: "/placeholder.svg?height=300&width=300",
    description: "Operations expert ensuring smooth delivery and customer satisfaction across Nepal.",
  },
  {
    name: "Amit Gurung",
    role: "Lead Developer",
    image: "/placeholder.svg?height=300&width=300",
    description: "Full-stack developer building the future of digital entertainment platforms.",
  },
  {
    name: "Sita Rai",
    role: "Customer Success",
    image: "/placeholder.svg?height=300&width=300",
    description: "Dedicated to providing exceptional support and building lasting customer relationships.",
  },
]

export function AboutTeam() {
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
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Meet Our Team</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The passionate individuals behind Loot Portal's success
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                  <p className="text-purple-400 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{member.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
