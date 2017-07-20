import { Markup } from 'telegraf'
import scheduler from '../scheduler'

const answers = [
  '😭',
  '😞',
  '😕',
  '😐',
  '🙂',
  '😄'
]

const askQuestions = (bot) => async function (event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false

  try {
    const scheduledQuestions = await scheduler()
    for (const { userId, questionId, question } of scheduledQuestions) {
      const markup = new Markup()
      const buttons = answers.map((emoji, index) => {
        return markup.callbackButton(emoji, `answer/${index}:${questionId}:${userId}`)
      })

      await bot.telegram.sendMessage(userId, question,
        markup.inlineKeyboard(buttons).extra()
      )
    }
  } catch (e) {
    console.log('error', e)
  }

  callback(null, 'Done!')
}

export default askQuestions
