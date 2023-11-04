import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth/next'
import { PrismaClient } from '@prisma/client'

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
    
    const site = await prisma.site.findMany({
      where: {
        categoryId: Number(params.id),
        userId
      },
      include: {
        icon: true
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
