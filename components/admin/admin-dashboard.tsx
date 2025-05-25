"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Clock,
  CheckCircle,
  XCircle,
  Package,
  Users,
  DollarSign,
  TrendingUp,
  Search,
  Filter,
  Eye,
  Check,
  X,
} from "lucide-react"

interface AdminOrder {
  id: string
  gameId: string
  packageId: string
  playerId: string
  playerEmail?: string
  paymentMethod: string
  transactionId: string
  status: "pending" | "confirmed" | "delivered" | "failed"
  createdAt: string
  amount: number
  screenshot?: string
}

const mockOrders: AdminOrder[] = [
  {
    id: "ORD-001",
    gameId: "codm",
    packageId: "codm-400",
    playerId: "Player123",
    playerEmail: "player@example.com",
    paymentMethod: "esewa",
    transactionId: "ESW123456789",
    status: "pending",
    createdAt: "2024-01-15T10:30:00Z",
    amount: 500,
    screenshot: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "ORD-002",
    gameId: "pubg",
    packageId: "pubg-325",
    playerId: "Player456",
    playerEmail: "gamer@example.com",
    paymentMethod: "khalti",
    transactionId: "KHL987654321",
    status: "confirmed",
    createdAt: "2024-01-14T15:45:00Z",
    amount: 750,
    screenshot: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "ORD-003",
    gameId: "freefire",
    packageId: "ff-310",
    playerId: "Player789",
    paymentMethod: "ime",
    transactionId: "IME456789123",
    status: "delivered",
    createdAt: "2024-01-13T09:20:00Z",
    amount: 500,
    screenshot: "/placeholder.svg?height=200&width=300",
  },
]

export function AdminDashboard() {
  const [orders, setOrders] = useState<AdminOrder[]>(mockOrders)
  const [filteredOrders, setFilteredOrders] = useState<AdminOrder[]>(mockOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let filtered = orders

    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.playerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.transactionId.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter)
    }

    setFilteredOrders(filtered)
  }, [orders, searchTerm, statusFilter])

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status: newStatus as any } : order)))
    } catch (error) {
      console.error("Failed to update order status:", error)
    } finally {
      setLoading(false)
    }
  }

  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter((o) => o.status === "pending").length,
    completedOrders: orders.filter((o) => o.status === "delivered").length,
    totalRevenue: orders.filter((o) => o.status === "delivered").reduce((sum, order) => sum + order.amount, 0),
  }

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

  return (
    <div className="max-w-7xl mx-auto space-y-8">
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
                  <p className="text-gray-400 text-sm">Pending Orders</p>
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
                  <p className="text-gray-400 text-sm">Total Revenue</p>
                  <p className="text-2xl font-bold text-white">Rs. {stats.totalRevenue}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList className="bg-white/10 border-white/20">
          <TabsTrigger value="orders" className="data-[state=active]:bg-purple-600">
            <Package className="h-4 w-4 mr-2" />
            Order Management
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-600">
            <TrendingUp className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="users" className="data-[state=active]:bg-purple-600">
            <Users className="h-4 w-4 mr-2" />
            Users
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Order Management</CardTitle>
              <div className="flex flex-col md:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48 bg-white/10 border-white/20 text-white">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredOrders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/5 rounded-lg p-6 border border-white/10"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-white font-semibold">Order #{order.id}</h3>
                          <Badge className={`border ${getStatusColor(order.status)}`}>
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(order.status)}
                              <span className="capitalize">{order.status}</span>
                            </div>
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 text-sm">
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
                            <span className="text-gray-400">Transaction:</span>
                            <span className="text-white ml-1">{order.transactionId}</span>
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
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        {order.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => updateOrderStatus(order.id, "confirmed")}
                              disabled={loading}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Confirm
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateOrderStatus(order.id, "failed")}
                              disabled={loading}
                              className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                            >
                              <X className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                        {order.status === "confirmed" && (
                          <Button
                            size="sm"
                            onClick={() => updateOrderStatus(order.id, "delivered")}
                            disabled={loading}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Deliver
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

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Revenue Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-400">Revenue chart would go here</div>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Popular Games</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-400">
                  Popular games chart would go here
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-gray-400">User management interface would go here</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
