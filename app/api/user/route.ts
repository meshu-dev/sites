import { NextResponse } from 'next/server'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from "next-auth/next"
import { PrismaClient } from '@prisma/client'

export async function GET() {
  let user      = null
  const session = await getServerSession(authOptions)
  
  if (session?.user?.id) {
    const prisma = new PrismaClient()
    user = await prisma.user.findUnique({ where: { id: session.user.id } })
    
    await prisma.$disconnect()
  }

  return NextResponse.json(
    user,
    { status: 200 }
  )
}
