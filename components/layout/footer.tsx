import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-black/40 border-t border-white/10 py-12 relative">
      {/* Footer background pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-1/4 opacity-[0.01]">
          <div className="w-64 h-64 rounded-full bg-gradient-to-br from-purple-400/10 to-blue-400/10 flex items-center justify-center">
            <Image
              src="/images/loot-portal-logo.png"
              alt=""
              width={200}
              height={67}
              className="w-auto h-12 opacity-20"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="bg-white/5 rounded-full p-3 border border-white/10">
                <Image
                  src="/images/loot-portal-logo.png"
                  alt="Loot Portal"
                  width={200}
                  height={60}
                  className="w-auto h-8"
                />
              </div>
            </div>
            <p className="text-gray-400">Your trusted partner for game top-ups and app subscriptions in Nepal.</p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                <Facebook className="h-4 w-4 text-gray-400 hover:text-white" />
              </div>
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                <Instagram className="h-4 w-4 text-gray-400 hover:text-white" />
              </div>
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                <Twitter className="h-4 w-4 text-gray-400 hover:text-white" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/topup" className="block text-gray-400 hover:text-white transition-colors">
                Game Top-Up
              </Link>
              <Link href="/subscriptions" className="block text-gray-400 hover:text-white transition-colors">
                Subscriptions
              </Link>
              <Link href="/about" className="block text-gray-400 hover:text-white transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="block text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <div className="space-y-2">
              <Link href="/help" className="block text-gray-400 hover:text-white transition-colors">
                Help Center
              </Link>
              <Link href="/faq" className="block text-gray-400 hover:text-white transition-colors">
                FAQ
              </Link>
              <Link href="/terms" className="block text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="block text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2 text-gray-400">
              <p>Email: support@lootportal.com</p>
              <p>Phone: +977-1-234-5678</p>
              <p>Address: Kathmandu, Nepal</p>
              <p className="text-sm">Available 24/7</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Loot Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
