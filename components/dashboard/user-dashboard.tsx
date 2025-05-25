"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, CheckCircle, XCircle, Package, User, CreditCard, History } from "lucide-react"
import { useAuth } from "@/components/providers/auth-provider"

interface Order {
  id: string
  gameId: string
  packageId: string
  playerId: string
  paymentMethod: string
  transactionId: string
  status: "pending" | "confirmed" | "delivered" | "failed"
  createdAt: string
  amount: number
}

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    gameId: "codm",
    packageId: "codm-400",
    playerId: "Player123",
    paymentMethod: "esewa",
    transactionId: "ESW123456789",
    status: "delivered",
    createdAt: "2024-01-15T10:30:00Z",
    amount: 500,
  },
  {
    id: "ORD-002",
    gameId: "pubg",
    packageId: "pubg-325",
    playerId: "Player123",
    paymentMethod: "khalti",
    transactionId: "KHL987654321",
    status: "confirmed",
    createdAt: "2024-01-14T15:45:00Z",
    amount: 750,
  },
  {
    id: "ORD-003",
    gameId: "freefire",
    packageId: "ff-310",
    playerId: "Player123",
    paymentMethod: "ime",
    transactionId: "IME456789123",
    status: "pending",
    createdAt: "2024-01-13T09:20:00Z",
    amount: 500,
  },
]

export function UserDashboard() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrders(mockOrders)
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-400" />
      case "confirmed":
        return <Package className="h-4 w-4 text-blue-400" />
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-400" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/50"
      case "confirmed":
        return "bg-blue-500/20 text-blue-300 border-blue-500/50"
      case "delivered":
        return "bg-green-500/20 text-green-300 border-green-500/50"
      case "failed":
        return "bg-red-500/20 text-red-300 border-red-500/50"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/50"
    }
  }

  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter((o) => o.status === "pending").length,
    completedOrders: orders.filter((o) => o.status === "delivered").length,
    totalSpent: orders.reduce((sum, order) => sum + order.amount, 0),
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Orders</p>
                  <p className="text-2xl font-bold text-white">{stats.totalOrders}</p>
                </div>
                <Package className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Pending</p>
                  <p className="text-2xl font-bold text-white">{stats.pendingOrders}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Completed</p>
                  <p className="text-2xl font-bold text-white">{stats.completedOrders}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Spent</p>
                  <p className="text-2xl font-bold text-white">Rs. {stats.totalSpent}</p>
                </div>
                <CreditCard className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList className="bg-white/10 border-white/20">
          <TabsTrigger value="orders" className="data-[state=active]:bg-purple-600">
            <History className="h-4 w-4 mr-2" />
            Order History
          </TabsTrigger>
          <TabsTrigger value="profile" className="data-[state=active]:bg-purple-600">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/5 rounded-lg p-4 border border-white/10"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-white font-semibold">Order #{order.id}</h3>
                          <Badge className={`border ${getStatusColor(order.status)}`}>
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(order.status)}
                              <span className="capitalize">{order.status}</span>
                            </div>
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                          <div>
                            <span className="text-gray-400">Game:</span>
                            <span className="text-white ml-1 capitalize">{order.gameId}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Player ID:</span>
                            <span className="text-white ml-1">{order.playerId}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Payment:</span>
                            <span className="text-white ml-1 uppercase">{order.paymentMethod}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Amount:</span>
                            <span className="text-white ml-1">Rs. {order.amount}</span>
                          </div>
                        </div>
                        <p className="text-gray-400 text-xs mt-2">
                          {new Date(order.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                          View Details
                        </Button>
                        {order.status === "pending" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-gray-400 text-sm">Name</label>
                    <p className="text-white text-lg">{user?.name || "Demo User"}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Email</label>
                    <p className="text-white text-lg">{user?.email || "user@example.com"}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Member Since</label>
                    <p className="text-white text-lg">January 2024</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Account Status</label>
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/50">Active</Badge>
                  </div>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700">Edit Profile</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
