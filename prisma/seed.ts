import { PrismaClient } from '@prisma/client'
import icons from '../data/icons.json'

const prisma = new PrismaClient()

async function main() {
  await prisma.icon.createMany({
    data: icons,
    skipDuplicates: true
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)

    await prisma.$disconnect()
    process.exit(1)
  })
