import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const orderId = params.id

    // In production, fetch from MongoDB Atlas
    // const order = await db.collection('orders').findOne({ id: orderId })

    // Mock order data
    const mockOrder = {
      id: orderId,
      gameId: "codm",
      packageId: "codm-400",
      playerId: "Player123",
      paymentMethod: "esewa",
      transactionId: "ESW123456789",
      status: "pending",
      createdAt: new Date().toISOString(),
      amount: 500,
    }

    return NextResponse.json({ order: mockOrder })
  } catch (error) {
    console.error("Error fetching order:", error)
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const orderId = params.id
    const body = await request.json()
    const { status } = body

    if (!status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 })
    }

    // In production, update in MongoDB Atlas
    // await db.collection('orders').updateOne(
    //   { id: orderId },
    //   { $set: { status, updatedAt: new Date().toISOString() } }
    // )

    return NextResponse.json({
      success: true,
      message: "Order status updated successfully",
    })
  } catch (error) {
    console.error("Error updating order:", error)
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
  }
}
