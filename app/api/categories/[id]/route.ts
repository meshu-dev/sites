import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth/next'
import { PrismaClient } from '@prisma/client'
import { validateCategory, getValidationMessages } from '@/app/utils/api'
import { ZodResult } from '@/app/types'

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
  let response: any  = { data: null }
  let status: number = 200

  const session = await getServerSession(authOptions)
  const userId  = session?.user?.id

  if (userId) {
    const prisma              = new PrismaClient()
    const body: RequestParams = await request.json()
    
    const data = {
      name: body.name
    }

    const zodResult: ZodResult = await validateCategory(data)

    if (zodResult.success) {
      response.data = await prisma.category.update({
        where: {
          id: Number(params.id),
          userId
        },
        data
      })
      await prisma.$disconnect()
    } else {
      response.data = getValidationMessages(zodResult.error)
      status        = 422
    }
  } else {
    response.data = { message: 'There was a server error. Please try again' }
    status        = 500
  }

  return NextResponse.json(
    response,
    { status }
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
