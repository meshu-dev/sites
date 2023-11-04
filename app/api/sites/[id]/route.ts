import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth/next'
import { PrismaClient } from '@prisma/client'

interface RequestParams {
  userId:        number,
  environmentId: number,
  iconId:        number,
  name:          string,
  url:           string
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
  let response: any = { data: null }

  const session = await getServerSession(authOptions)
  const userId  = session?.user?.id

  if (userId) {
    const prisma              = new PrismaClient()
    const body: RequestParams = await request.json()
    
    const site = await prisma.site.update({
      where: {
        id: Number(params.id),
        userId
      },
      data: {
        iconId: 0,
        name:   body.name,
        url:    body.url
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
