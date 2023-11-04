import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

export async function GET() {
  let response: any = { data: null }

  const prisma = new PrismaClient()
  const icons  = await prisma.icon.findMany({})

  response.data = icons
  
  await prisma.$disconnect()

  return NextResponse.json(
    response,
    { status: 200 }
  )
}
