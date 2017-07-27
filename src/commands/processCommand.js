import {
  getCommandState
} from '../queries'

import addQuestion from './addQuestion'
import editQuestion from './editQuestion'
import editTime from './editTime'

export const processCommand = async (ctx, next) => {
  if (!ctx.command) {
    return next()
  }

  switch (Object.keys(ctx.command)[0]) {
    case 'editQuestion':
      return editQuestion(ctx.command['editQuestion'], ctx, next)
    case 'addQuestion':
      return addQuestion(ctx.command['addQuestion'], ctx, next)
    case 'editTime':
      return editTime(ctx.command['editTime'], ctx, next)
    default:
      return next()
  }
}

export const checkCommand = async (ctx, next) => {
  const command = await getCommandState(ctx.from.id)
  if (command === null) {
    return next()
  }
  ctx.command = command
  return next()
}
