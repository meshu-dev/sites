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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const prisma = new PrismaClient()
  const site   = await prisma.site.findUnique({ where: { id: Number(params.id) } })
  
  await prisma.$disconnect()

  return NextResponse.json(
    site,
    { status: 200 }
  )
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const prisma              = new PrismaClient()
  const body: RequestParams = await request.json()
  
  const site = await prisma.site.update({
    where: { id: Number(params.id) },
    data: {
      iconId: 0,
      name:   body.name,
      url:    body.url
    }
  })
  await prisma.$disconnect()

  return NextResponse.json(
    site,
    { status: 200 }
  )
}
  
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const prisma = new PrismaClient()
  const site   = await prisma.site.delete({ where: { id: Number(params.id) } })
  
  await prisma.$disconnect()

  return NextResponse.json(
    { sucesss: site ? true : false },
    { status: 200 }
  )
}
