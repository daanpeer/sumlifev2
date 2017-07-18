const { Markup } = require('telegraf')

const {
  scheduler
} = require('./scheduler')

const answers = [
  '😭',
  '😞',
  '😕',
  '😐',
  '🙂',
  '😄'
]

const askQuestions = (bot) => async function (event, context) {
  context.callbackWaitsForEmptyEventLoop = false
  try {
    await scheduler((userId, questionId, question) => {
      const markup = new Markup()
      const buttons = answers.map((emoji, index) => {
        // todo json encode here
        return markup.callbackButton(emoji, `answer/${index}:${questionId}:${userId}`)
      })

      bot.telegram.sendMessage(userId, question,
        markup.inlineKeyboard(buttons).extra()
      )
    })
  } catch (e) {
    console.log('error', e)
  }

  console.log('bot reacted')
}

export default askQuestions
