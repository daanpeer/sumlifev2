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
        ...cmd.state,
        step: 2,
        question: message
      })
      await ctx.reply('Okay I\'ve registered your question 🍻')
      await ctx.reply('Now please give me a time in 24 hour format (12:00)')
      return next()
    }
    case 2: {
      const regex = new RegExp(/^[0-9]{2}:[0-9]{2}$/)
      if (!regex.test(message)) {
        return ctx.reply('Please give a valid 24 hour format time')
      }

      const [ hours, minutes ] = message.split(':')
      if (!hours || !minutes || hours > 24 || hours < 0 || minutes > 59 || minutes < 0) {
        return ctx.reply('Please give a valid 24 hour format time')
      }

      const {
        question,
        type
      } = cmd.state

      await addQuestionByUser(ctx.from.id, question, hours, minutes, type)
      await ctx.reply('Your question has been stored successfully :)')

      await clearCommandState()
      return next()
    }
    default:
      return next()
  }
}

export default addQuestion
