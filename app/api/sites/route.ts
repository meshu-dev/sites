import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth/next'
import { PrismaClient } from '@prisma/client'
import { validateSite, getValidationMessages } from '@/app/utils/api'
import { ZodResult } from '@/app/types'

interface RequestParams {
  userId:     string,
  categoryId: number,
  iconId:     number,
  name:       string,
  url:        string
}

export async function GET() {
  let response: any = { data: null }

  const session = await getServerSession(authOptions)
  const userId  = session?.user?.id

  if (userId) {
    const prisma  = new PrismaClient()
    const sites   = await prisma.site.findMany({ where: { userId } })
    response.data = sites
    
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

  const session = await getServerSession(authOptions)
  const userId: string = String(session?.user?.id)

  if (userId) {
    const prisma: PrismaClient = new PrismaClient()
    const body: RequestParams  = await request.json()

    const data = {
      userId:     userId,
      categoryId: body.categoryId,
      iconId:     body.iconId,
      name:       body.name,
      url:        body.url
    }

    const zodResult: ZodResult = validateSite(data)

    if (zodResult.success) {
      response = await prisma.site.create({ data })
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
