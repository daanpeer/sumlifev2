import { Markup } from 'telegraf'
import { emoji } from '../answers'

const askQuestion = async (ctx, questionId, userId, question, action = 'answer') => {
  const markup = new Markup()
  const buttons = emoji.map((emoji, index) => {
    return markup.callbackButton(
      emoji,
      `${action}/${index}:${questionId}:${userId}`
    )
  })

  await ctx.telegram.sendMessage(userId, question,
    markup.inlineKeyboard(buttons).extra()
  )
}

export default askQuestion
