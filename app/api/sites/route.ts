import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth/next'
import { PrismaClient } from '@prisma/client'

interface RequestParams {
  userId:        string,
  environmentId: number,
  iconId:        number,
  name:          string,
  url:           string
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
  let response: any = { data: null }

  const session = await getServerSession(authOptions)
  const userId  = session?.user?.id

  if (userId) {
    const prisma: PrismaClient = new PrismaClient()
    const body: RequestParams  = await request.json();
  
    const site = await prisma.site.create({
      data: {
        userId:        userId,
        environmentId: body.environmentId,
        iconId:        body.iconId,
        name:          body.name,
        url:           body.url
      }
    })
    response.data = site

    await prisma.$disconnect()
  }

  return NextResponse.json(
    response,
    {
      status: 200
    }
  )
}
