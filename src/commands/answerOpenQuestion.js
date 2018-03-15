import { clearCommandState, storeAnswerByToday } from '../queries'

const editQuestion = async (cmd, ctx, next) => {
  const message = ctx.message.text
  switch (cmd.state.step) {
    case 1: {
      await clearCommandState()
      const { questionId, userId } = cmd.state
      storeAnswerByToday(userId, questionId, message)
      ctx.reply("I've succesfully stored your answer 😃")
      return next()
    }
    default:
      return next()
  }
}
export default editQuestion
