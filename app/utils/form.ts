import { ApiResponse, MessageList } from "../types"

export const getValidationStatusMsg = (response: ApiResponse): MessageList | null => {
  if (response?.error?.data) {
    const statusMessages = []
    const data           = response.error.data

    for (const error of data) {
      const field    = error.type
      const messages =  error.messages

      for (const message of messages) {
        statusMessages.push(message)
      }
    }

    return {
      type: 'error',
      messages: statusMessages
    }
  }
  return null
}