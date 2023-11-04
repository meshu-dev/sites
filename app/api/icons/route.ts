import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

export async function GET() {
  const prisma = new PrismaClient()
  const icons  = await prisma.icon.findMany({})
  
  await prisma.$disconnect()

  return NextResponse.json(
    icons,
    { status: 200 }
  )
}
