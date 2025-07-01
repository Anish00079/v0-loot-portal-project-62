import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface CartItem {
  id: string
  type: "game" | "subscription"
  gameId?: string
  subscriptionId?: string
  packageId: string
  name: string
  packageName: string
  price: number
  quantity: number
  image?: string
  description?: string
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  setIsOpen: (open: boolean) => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (newItem) => {
        const items = get().items
        const existingItem = items.find((item) => item.id === newItem.id)

        if (existingItem) {
          set({
            items: items.map((item) => (item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item)),
          })
        } else {
          set({
            items: [...items, { ...newItem, quantity: 1 }],
          })
        }
      },

      removeItem: (id) => {
        set({
          items: get().items.filter((item) => item.id !== id),
        })
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }

        set({
          items: get().items.map((item) => (item.id === id ? { ...item, quantity } : item)),
        })
      },

      clearCart: () => {
        set({ items: [] })
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
      },

      setIsOpen: (open) => {
        set({ isOpen: open })
      },
    }),
    {
      name: "loot-portal-cart",
    },
  ),
)
