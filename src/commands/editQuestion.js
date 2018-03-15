import { clearCommandState, updateQuestion } from '../queries'

const editQuestion = async (cmd, ctx, next) => {
  const message = ctx.message.text
  switch (cmd.state.step) {
    case 1: {
      await clearCommandState()

      try {
        await updateQuestion(ctx.from.id, cmd.state.questionId, message)
        await ctx.reply("Okay i've updated your question!")
      } catch (e) {
        console.log('error', e)
      }

      return next()
    }
    default:
      return next()
  }
}

export default editQuestion
