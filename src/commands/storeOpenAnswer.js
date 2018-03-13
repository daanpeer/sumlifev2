import {
  clearCommandState,
  storeAnswerByToday
} from '../queries'

const storeOpenAnswer = async (cmd, ctx, next) => {
  const message = ctx.message.text
  switch (cmd.state.step) {
    case 1: {
      await clearCommandState()

      try {
        await storeAnswerByToday(ctx.from.id, cmd.state.questionId, message)
        await ctx.reply('The answer has been saved! 🎉')
      } catch (e) {
        console.log('error', e)
      }

      return next()
    }
    default:
      return next()
  }
}

export default storeOpenAnswer
