import { Markup } from 'telegraf'

import {
  getQuestionsByUser,
  getQuestion
} from '../queries'

const selectQuestion = async (ctx) => {
  const userId = ctx.from.id
  const questions = await getQuestionsByUser(userId)

  const markup = new Markup()
  const questionIds = Object.keys(questions)
  const buttons = []
  for (const questionId of questionIds) {
    const question = await getQuestion(questionId)
    buttons.push([markup.callbackButton(
      `${question}`,
      `showGraphForQuestion/${questionId}`)
    ])
  }

  return ctx.reply(
    'Select the question you want to see the graph for 😎',
    markup.inlineKeyboard(buttons).resize().extra()
  )
}

export default selectQuestion
