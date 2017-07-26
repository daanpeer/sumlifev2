import {
  storeCommandState,
  addQuestionByUser,
  clearCommandState
} from '../queries'

const addQuestion = async (cmd, ctx, next) => {
  const message = ctx.message.text
  switch (cmd.state.step) {
    case 1: {
      await storeCommandState(ctx.from.id, 'addQuestion', {
        step: 2,
        question: message
      })

      await ctx.telegram.sendMessage(ctx.from.id, 'Okay I registered your question')
      await ctx.telegram.sendMessage(ctx.from.id, 'Now please give a time in 24 hour format (12:00)')

      return next()
    }
    case 2: {
      const [ hours, minutes ] = message.split(':')
      if (!hours || !minutes || hours > 24 || hours < 0 || minutes > 59 || minutes < 0) {
        return ctx.reply('Please give a valid 24 hour format time')
      }

      await addQuestionByUser(ctx.from.id, cmd.state.question, hours, minutes)
      ctx.telegram.sendMessage(ctx.from.id, 'Your question has been stored successfully :)')

      await clearCommandState()
      return next()
    }
    default:
      return next()
  }
}

export default addQuestion
