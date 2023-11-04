import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'

interface RequestParams {
  userId: number,
  name:   string
  order?: number
}

export async function GET(request: NextRequest) {
  // TODO - Get user id from auth
  //const userId: number = 1;
  const userId: string = '111';

  const prisma       = new PrismaClient()
  const environments = await prisma.environment.findMany({ where: { userId } })
  
  await prisma.$disconnect()

  return NextResponse.json(
    environments,
    { status: 200 }
  )
}

export async function POST(request: NextRequest) {
  const prisma: PrismaClient = new PrismaClient()
  const body: RequestParams  = await request.json();

  const environmentCount = await prisma.environment.count({
    where: { userId: body.userId }
  })

  const environment = await prisma.environment.create({
    data: {
      userId: body.userId,
      name:   body.name,
      order:  environmentCount
    }
  })

  return NextResponse.json(
    environment,
    {
      status: 200
    }
  )
}
