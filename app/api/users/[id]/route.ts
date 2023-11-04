import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'

export interface RequestParams {
  name:  string,
  email: string
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const prisma = new PrismaClient()
  const user   = await prisma.user.findUnique({ where: { id: params.id } })
  
  await prisma.$disconnect()

  return NextResponse.json(
    user,
    { status: 200 }
  )
}
