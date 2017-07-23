import { Markup, Extra } from 'telegraf'

import {
  getQuestion
} from '../queries'

const questionActions = async (ctx) => {
  const questionId = ctx.match[2]
  const question = await getQuestion(questionId)
  const markup = new Markup()
  const buttons = [
    markup.callbackButton('❌ Delete question', `deleteQuestion/${questionId}`),
    markup.callbackButton('✏️ Edit question', `editQuestion/${questionId}`),
    markup.callbackButton('⏰ Edit time', `editTime/${questionId}`)
  ]

  return ctx.reply(
    `What do you want to do with the question? \n "<b>${question}</b>"`,
    Extra.HTML().markup((m) =>
      markup.inlineKeyboard(buttons)
    )
  )
}

export default questionActions
