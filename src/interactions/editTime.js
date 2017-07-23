import {
  storeCommandState
} from '../queries'

const editTime = async (ctx) => {
  const questionId = ctx.match[2]
  await storeCommandState(ctx.from.id, 'editTime', { questionId, step: 1 })
  ctx.reply('You can reply with your new time now')
}

export default editTime
