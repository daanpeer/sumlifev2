import { Markup } from 'telegraf'
import { emoji } from '../answers'

const askQuestion = async (ctx, questionId, userId, question, action = 'answer') => {
  const markup = new Markup()
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
