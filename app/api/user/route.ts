import { NextResponse } from 'next/server'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth/next'
import { PrismaClient } from '@prisma/client'

export async function GET() {
  let response: any = { data: null }

  const session = await getServerSession(authOptions)
  const userId  = session?.user?.id
  
  if (userId) {
    const prisma = new PrismaClient()
    const user   = await prisma.user.findUnique({ where: { id: userId } })
    response['data'] = { user } 

    await prisma.$disconnect()
  }

  return NextResponse.json(
    response,
    { status: 200 }
  )
}
