import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ContactHero } from "@/components/contact/contact-hero"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"
import { ContactFAQ } from "@/components/contact/contact-faq"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="pt-16">
        <ContactHero />
        <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <ContactForm />
            <ContactInfo />
          </div>
          <ContactFAQ />
        </div>
      </main>
      <Footer />
    </div>
  )
}
