import { NextResponse } from "next/server"

const games = [
  {
    id: "codm",
    name: "Call of Duty Mobile",
    description: "CP Top-Up for CODM",
    category: "Battle Royale",
    packages: [
      { id: "codm-80", amount: "80 CP", price: 100, popular: false },
      { id: "codm-400", amount: "400 CP", price: 500, popular: true },
      { id: "codm-800", amount: "800 CP", price: 1000, popular: false },
      { id: "codm-2000", amount: "2000 CP", price: 2500, popular: false },
    ],
  },
  {
    id: "pubg",
    name: "PUBG Mobile",
    description: "UC Top-Up for PUBG",
    category: "Battle Royale",
    packages: [
      { id: "pubg-60", amount: "60 UC", price: 150, popular: false },
      { id: "pubg-325", amount: "325 UC", price: 750, popular: true },
      { id: "pubg-660", amount: "660 UC", price: 1500, popular: false },
      { id: "pubg-1800", amount: "1800 UC", price: 4000, popular: false },
    ],
  },
  // Add more games...
]

export async function GET() {
  try {
    return NextResponse.json({ games })
  } catch (error) {
    console.error("Error fetching games:", error)
    return NextResponse.json({ error: "Failed to fetch games" }, { status: 500 })
  }
}
