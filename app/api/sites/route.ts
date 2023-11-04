import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'

interface RequestParams {
  userId:        number,
  environmentId: number,
  iconId:        number,
  name:          string,
  url:           string
}

export async function GET(request: NextRequest) {
  // TODO - Get user id from auth
  //const userId: number = 1;
  const userId: string = '111';

  const prisma = new PrismaClient()
  const sites  = await prisma.site.findMany({ where: { userId } })
  
  await prisma.$disconnect()

  return NextResponse.json(
    sites,
    { status: 200 }
  )
}

export async function POST(request: NextRequest) {
  const prisma: PrismaClient = new PrismaClient()
  const body: RequestParams  = await request.json();

  const site = await prisma.site.create({
    data: {
      userId:        body.userId,
      environmentId: body.environmentId,
      iconId:        0,
      name:          body.name,
      url:           body.url
    }
  })

  return NextResponse.json(
    site,
    {
      status: 200
    }
  )
}
