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
    const categories = await prisma.category.findMany({ where: { userId } })
    
    response.data = categories

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
  
    const categoryCount: number = await prisma.category.count({
      where: { userId }
    })

    console.log('Add Environment 2', {
      userId,
      name:   body.name,
      order:  categoryCount + 1
    }, categoryCount);

    const category = await prisma.category.create({
      data: {
        userId,
        name:   body.name,
        order:  categoryCount
      }
    })
    response.data = category
  }

  return NextResponse.json(
    response,
    {
      status: 200
    }
  )
}
