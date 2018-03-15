import { clearCommandState, updateQuestionTime } from '../queries'

const editTime = async (cmd, ctx, next) => {
  const message = ctx.message.text
  switch (cmd.state.step) {
    case 1: {
      await clearCommandState()

      const [hours, minutes] = message.split(':')
      if (!hours || !minutes || hours > 24 || hours < 0 || minutes > 59 || minutes < 0) {
        return ctx.reply('Please give a valid 24 hour format time')
      }

      try {
        await updateQuestionTime(ctx.from.id, cmd.state.questionId, hours, minutes)
        await ctx.reply('The time has been successfully updated :)')
      } catch (e) {
        console.log('oops error', e)
      }

      return next()
    }
    default:
      return next()
  }
}

export default editTime
