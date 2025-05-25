import { type NextRequest, NextResponse } from "next/server"

// Mock database - In production, use MongoDB Atlas
const orders: any[] = []

export async function GET(request: NextRequest) {
  try {
    // In production, fetch from MongoDB Atlas
    // const orders = await db.collection('orders').find().toArray()

    return NextResponse.json({ orders })
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const { gameId, packageId, playerId, paymentMethod, transactionId } = body

    if (!gameId || !packageId || !playerId || !paymentMethod) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create new order
    const newOrder = {
      id: Date.now().toString(),
      gameId,
      packageId,
      playerId,
      paymentMethod,
      transactionId,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // In production, save to MongoDB Atlas
    // await db.collection('orders').insertOne(newOrder)
    orders.push(newOrder)

    return NextResponse.json(
      {
        success: true,
        order: newOrder,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
