import { Markup } from 'telegraf'
import { emoji } from '../answers'
import { QUESTION_TYPE_OPEN } from '../config'

const askOpenQuestion = ({ ctx, userId, questionId, question }) => {
  const markup = new Markup()
  return ctx.telegram.sendMessage(
    userId,
    `${question}`,
    markup
      .inlineKeyboard([
        markup.callbackButton('📝 Answer 📝', `openQuestion/${questionId}:${userId}`)
      ])
      .resize()
      .extra()
  )
}
const askEmojiQuestion = ({ ctx, userId, questionId, question, action }) => {
  const markup = new Markup()
  const buttons = Object.keys(emoji).map(key => {
    return markup.callbackButton(emoji[key], `${action}/${key}:${questionId}:${userId}`)
  })
  return ctx.telegram.sendMessage(userId, question, markup.inlineKeyboard(buttons).extra())
}
const askQuestion = async ({ ctx, questionId, userId, question, action = 'answer', type }) => {
  if (type && type === QUESTION_TYPE_OPEN) {
    return askOpenQuestion({ ctx, userId, questionId, question })
  }
  return askEmojiQuestion({ ctx, userId, questionId, question, action })
}
export default askQuestion
