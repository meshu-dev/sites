import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth/next'
import { PrismaClient } from '@prisma/client'

interface RequestParams {
  userId: number,
  name:   string
  order?: number
}

export async function GET(request: NextRequest) {
  let response: any = { data: null }

  const session = await getServerSession(authOptions)
  const userId  = session?.user?.id

  if (userId) {
    const prisma = new PrismaClient()
    const environments = await prisma.environment.findMany({ where: { userId } })
    
    response.data = environments

    await prisma.$disconnect()
  }

  return NextResponse.json(
    response,
    { status: 200 }
  )
}

export async function POST(request: NextRequest) {
  let response: any = { data: null }

  const session = await getServerSession(authOptions)
  const userId  = session?.user?.id

  console.log('Add Environment 1', session, userId);

  if (userId) {
    const prisma: PrismaClient = new PrismaClient()
    const body: RequestParams  = await request.json();
  
    const categoryCount: number = await prisma.environment.count({
      where: { userId }
    })

    console.log('Add Environment 2', {
      userId,
      name:   body.name,
      order:  categoryCount
    }, categoryCount);

    const environment = await prisma.environment.create({
      data: {
        userId,
        name:   body.name,
        order:  categoryCount
      }
    })
    response.data = environment
  }

  return NextResponse.json(
    response,
    {
      status: 200
    }
  )
}
