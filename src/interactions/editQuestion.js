import {
  storeCommandState
} from '../queries'

const editQuestions = async (ctx, next) => {
  const questionId = ctx.match[2]
  await storeCommandState(ctx.from.id, 'editQuestion', { questionId, step: 1 })
  ctx.reply('Okay reply with the new question')
}

export default editQuestions
