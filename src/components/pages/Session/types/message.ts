import { Message } from 'src/services/database/types'

export type SendMessage = Pick<Message, 'content' | 'role'> & {
  ignore?: boolean
  status?: Message['status']
}
