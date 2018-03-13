import { Markup } from 'telegraf'
import { emoji } from '../answers'
import {
  QUESTION_TYPE_OPEN
} from '../commands/addQuestion'

import {
  storeCommandState
} from '../queries'

const askQuestion = async (ctx, questionId, userId, question, action = 'answer', type) => {
  if (type && type === QUESTION_TYPE_OPEN) {
    await ctx.telegram.sendMessage(userId, 'This is an open question, please reply with your answer 🙌')
    await ctx.telegram.sendMessage(userId, question)
    await storeCommandState(userId, 'answerQuestion', {
      step: 1,
      questionId
    })
    return
  }

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
