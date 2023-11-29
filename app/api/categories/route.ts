import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth/next'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { ZodResult } from '@/app/types'
import { validateCategory, getValidationMessages } from '@/app/utils/api'

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
    const categories = await prisma.category.findMany({ where: { userId: String(userId) } })
    
    response.data = categories

    await prisma.$disconnect()
  }

  return NextResponse.json(
    response,
    { status: 200 }
  )
}

export async function POST(request: NextRequest) {
  let response: any  = null
  let status: number = 200

  const session        = await getServerSession(authOptions)
  const userId: string = String(session?.user?.id)

  if (userId) {
    const prisma: PrismaClient = new PrismaClient()
    const body: RequestParams  = await request.json()
    const userIdStr: string    = String(userId)
  
    const categoryCount: number = await prisma.category.count({
      where: { userId: userIdStr }
    })

    const data = {
      userId: userIdStr,
      name:   body.name,
      order:  categoryCount
    }

    const zodResult: ZodResult = await validateCategory(data)

    if (zodResult.success) {
      response = await prisma.category.create({ data })
      await prisma.$disconnect()
    } else {
      response = getValidationMessages(zodResult.error)
      status   = 422
    }
  } else {
    response = { message: 'There was a server error. Please try again' }
    status   = 500
  }

  return NextResponse.json(
    response,
    { status }
  )
}
