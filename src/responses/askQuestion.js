import { Markup } from 'telegraf'
import { emoji } from '../answers'
import {
  storeCommandState
} from '../queries'

const askQuestion = async (ctx, questionId, userId, question, action = 'answer', type) => {
  const markup = new Markup()

  if (type && type === 'open') {
    await ctx.telegram.sendMessage(userId, 'This is an open question, please reply with your answer')
    await ctx.telegram.sendMessage(userId, question)
    await storeCommandState('answerQuestion', {
      step: 1
    })

    return
  }

  const buttons = Object.keys(emoji).map((key) => {
    return markup.callbackButton(
      emoji[key],
      `${action}/${key}:${questionId}:${userId}`
    )
  })

  await ctx.telegram.sendMessage(userId, question,
    markup.inlineKeyboard(buttons).extra()
  )
}

export default askQuestion
