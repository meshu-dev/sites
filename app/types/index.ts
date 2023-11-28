import { AlertColor } from '@mui/material'

export type InputEvent = React.ChangeEvent<HTMLInputElement>
export type ButtonEvent = React.MouseEvent<HTMLButtonElement>

export interface ApiResponse {
  data?: {
    error?: string
  },
  status?: number
}

export interface MessageList {
  type: AlertColor,
  messages: string[]
}

export interface Category {
  id?:  number
  name: string
}

export interface Site {
  id?:         number,
  categoryId?: number,
  iconId?:     number,
  icon?:       Icon
  name:        string
  url:         string
}

export interface Icon {
  id:     number,
  name:   string
  url:    string
}
