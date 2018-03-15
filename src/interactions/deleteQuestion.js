import { Markup, Extra } from 'telegraf'

import { getQuestion } from '../queries'

const deleteQuestion = async ctx => {
  const questionId = ctx.match[2]
  const question = await getQuestion(questionId)
  const markup = new Markup()

  return ctx.reply(
    `Are you sure you want to delete the question \n "<b>${question}</b>"`,
    Extra.HTML().markup(m =>
      markup.inlineKeyboard([
        markup.callbackButton('✅ Yes i am sure', `deleteConfirm/${questionId}`)
      ])
    )
  )
}

export default deleteQuestion
