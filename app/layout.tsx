import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/components/providers/auth-provider"
import { LoadingProvider } from "@/components/providers/loading-provider"
import { CartProvider } from "@/components/cart/cart-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Loot Portal - Game Top-Up & Subscriptions",
  description:
    "Top-Up Smart. Game Hard. Loot It All. - Your trusted partner for game top-ups and app subscriptions in Nepal.",
  keywords: "game topup, CODM, PUBG, Free Fire, Steam, Netflix, Spotify, eSewa, Khalti, IME Pay, Nepal",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LoadingProvider>
          <AuthProvider>
            <CartProvider>
              {children}
              <Toaster />
            </CartProvider>
          </AuthProvider>
        </LoadingProvider>
      </body>
    </html>
  )
}
