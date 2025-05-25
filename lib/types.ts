export interface Game {
  id: string
  name: string
  description: string
  category: string
  image?: string
  packages: Package[]
  rating?: number
}

export interface Package {
  id: string
  amount: string
  price: number
  popular: boolean
}

export interface Order {
  id: string
  gameId: string
  packageId: string
  playerId: string
  paymentMethod: "esewa" | "khalti" | "ime"
  transactionId?: string
  status: "pending" | "confirmed" | "delivered" | "failed"
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  email: string
  name: string
  role: "user" | "admin"
}

export interface Subscription {
  id: string
  name: string
  description: string
  plans: SubscriptionPlan[]
  image?: string
  category: string
}

export interface SubscriptionPlan {
  id: string
  duration: string
  price: number
  popular: boolean
}
