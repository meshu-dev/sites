import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth/next'
import { PrismaClient } from '@prisma/client'

interface RequestParams {
  name: string
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  let response: any = { data: null }

  const session = await getServerSession(authOptions)
  const userId  = session?.user?.id

  if (userId) {
    const prisma = new PrismaClient()
    
    const category = await prisma.category.findUnique({
      where: {
        userId,
        id: Number(params.id)
      }
    })
    response.data = category
    
    await prisma.$disconnect()
  }

  return NextResponse.json(
    response,
    { status: 200 }
  )
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  let response: any = { data: null }

  const session = await getServerSession(authOptions)
  const userId  = session?.user?.id

  if (userId) {
    const prisma              = new PrismaClient()
    const body: RequestParams = await request.json()
    
    const category = await prisma.category.update({
      where: {
        id: Number(params.id),
        userId
      },
      data: {
        name:   body.name
      }
    })
    response.data = category

    await prisma.$disconnect()
  }

  return NextResponse.json(
    response,
    { status: 200 }
  )
}
  
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  let category = null

  const session = await getServerSession(authOptions)
  const userId  = session?.user?.id

  if (userId) {
    const prisma = new PrismaClient()
    
    category = await prisma.category.delete({
      where: {
        userId,
        id: Number(params.id)
      }
    })
    
    await prisma.$disconnect()
  }

  return NextResponse.json(
    { success: category ? true : false },
    { status: 200 }
  )
}
