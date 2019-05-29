/* eslint-disable prettier/prettier */
import { enumConstants } from '../utils/common'

export default enumConstants(
  'JUMP',
  'MESSAGE',
  'NOTIFICATION'
)

export const JumpType = enumConstants(
  'BLANK',
  'SELF',
  'HISTORY'
)

export const MessageType = enumConstants(
  'SUCCESS',
  'ERROR',
  'INFO',
  'WARN',
  'LOADING'
)

export const Notification = enumConstants(
  'SUCCESS',
  'ERROR',
  'INFO',
  'WARN'
)
