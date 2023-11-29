import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth/next'
import { PrismaClient } from '@prisma/client'
import { validateSite, getValidationMessages } from '@/app/utils/api'
import { ZodResult } from '@/app/types'

interface RequestParams {
  userId:     number,
  categoryId: number,
  iconId:     number,
  name:       string,
  url:        string
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
    
    const site = await prisma.site.findUnique({
      where: {
        id: Number(params.id),
        userId
      }
    })
    response.data = site
    
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
      iconId: body.iconId,
      name:   body.name,
      url:    body.url
    }

    const zodResult: ZodResult = validateSite(data, true)

    if (zodResult.success) {
      response.data = await prisma.site.update({
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
    { status: 200 }
  )
}
  
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  let site = null

  const session = await getServerSession(authOptions)
  const userId  = session?.user?.id

  if (userId) {
    const prisma = new PrismaClient()
    
    site = await prisma.site.delete({
      where: {
        id: Number(params.id),
        userId
      }
    })
    
    await prisma.$disconnect()
  }

  return NextResponse.json(
    { sucesss: site ? true : false },
    { status: 200 }
  )
}
