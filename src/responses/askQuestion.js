import { Markup } from 'telegraf'

const answers = [
  '😭',
  '😞',
  '😕',
  '😐',
  '🙂',
  '😄'
]

const askQuestion = async (ctx, questionId, userId, question, action = 'answer') => {
  const markup = new Markup()
  const buttons = answers.map((emoji, index) => {
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
