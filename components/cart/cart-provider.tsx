"use client"

import type React from "react"

import { CartSidebar } from "./cart-sidebar"

export function CartProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <CartSidebar />
    </>
  )
}
