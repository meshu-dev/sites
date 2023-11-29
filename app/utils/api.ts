import { ZodError, z } from 'zod'
import { ZodResult } from '@/app/types'

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

export const validateCategory = (params: object): ZodResult => {
  const Category = z.object({
    name: z.string().min(5)
  })

  return Category.safeParse(params)
}

export const validateSite = (params: object, isEdit: boolean = false): ZodResult => {
  const rules = {
    categoryId: isEdit ? z.never() : z.number(),
    iconId: z.number(),
    name: z.string().min(5),
    url: z.string().url()
  }
  const Site = z.object(rules)

  return Site.safeParse(params)
}
