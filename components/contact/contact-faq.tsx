"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "How long does it take to process my order?",
    answer:
      "Most orders are processed within 1-24 hours. Game top-ups are usually delivered within 1-2 hours, while subscription activations may take up to 24 hours for verification.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept eSewa, Khalti, IME Pay, and other popular Nepali payment methods. All transactions are secured with bank-level encryption.",
  },
  {
    question: "Can I get a refund if something goes wrong?",
    answer:
      "Yes, we offer refunds for failed deliveries or technical issues on our end. Please contact our support team within 48 hours of your order for assistance.",
  },
  {
    question: "Is my personal information safe?",
    answer:
      "Absolutely. We use industry-standard security measures to protect your personal and payment information. We never share your data with third parties.",
  },
  {
    question: "Do you offer customer support in Nepali?",
    answer:
      "Yes, our support team is fluent in both English and Nepali. You can contact us in whichever language you're more comfortable with.",
  },
  {
    question: "Can I track my order status?",
    answer:
      "Yes, you can track your order status through your dashboard. You'll also receive email notifications for important updates about your order.",
  },
]

export function ContactFAQ() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Quick answers to common questions about our services
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white/5 border-white/10 rounded-lg px-6 backdrop-blur-sm"
              >
                <AccordionTrigger className="text-white hover:text-purple-400 text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
