import {
  removeQuestionByUser
} from '../queries'

const deleteConfirm = async (ctx, next) => {
  const questionId = ctx.match[2]
  await removeQuestionByUser(ctx.from.id, questionId)
  ctx.reply('Okay the question has been deleted!')
  next()
}

export default deleteConfirm
