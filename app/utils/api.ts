import { ZodError, z } from 'zod'
import { ZodResult } from '@/app/types'
import { PrismaClient } from '@prisma/client'

export const getValidationMessages = (zodError: ZodError<any>) => {
  let messageMap = new Map()

  for (const error of zodError.issues) {
    const type: string    = String(error.path[0])
    const message: string = error.message

    if (messageMap.has(type)) {
      const messageList: string[] = messageMap.get(type)
      messageList.push(message)

      messageMap.set(type, messageList)
    } else {
      messageMap.set(type, [message])
    }
  }

  const messages: object[] = []
  const mapIterator = messageMap.entries()
  let entry = null

  while (entry = mapIterator.next().value) {
    const [key, value] = entry
    messages.push({ field: key, messages: value })
  }

  return messages
}

export const validateCategory = async (params: object): Promise<ZodResult> => {
  const Category = z.object({
    name: z.string()
           .min(5, { message: 'Name must be 5 or more characters long' })
           /*
           .refine(async (value) => {
              // verify that ID exists in database

              const prisma: PrismaClient = new PrismaClient()

              const categories = await prisma.category.findMany({ where: { userId: String(userId) } })
              await prisma.$disconnect()

              console.log('DB Check!!', value)

              return true
            }) */
  })

  return await Category.safeParseAsync(params)
}

export const validateSite = (params: object, isEdit: boolean = false): ZodResult => {
  const rules = {
    categoryId: isEdit ? z.never() : z.number(),
    iconId: z.number(),
    name: z.string().min(5, { message: 'Name must be 5 or more characters long' }),
    url: z.string().url({ message: 'Url is invalid' })
  }
  const Site = z.object(rules)

  return Site.safeParse(params)
}
