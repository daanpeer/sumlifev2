import { addUser } from '../queries'

import { askQuestion } from '../responses'

const start = async (ctx, next) => {
  addUser(ctx.from.id)
  await ctx.reply('Hi there!')
  await ctx.timedReply('My name is Henry!')
  await ctx.timedReply('I can ask you questions on a specified time of day')
  await ctx.timedReply('They look like this: ')
  await askQuestion({
    ctx,
    questionId: null,
    userId: ctx.from.id,
    question: 'How do you feel today?',
    action: 'example'
  })
  await ctx.timedReply("I'll store your answers and give you a weekly digest")
  await ctx.timedReply('Have fun! :)')
  return next()
}

export default start
