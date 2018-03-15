import { Markup, Extra } from 'telegraf'
import { getQuestionsByUser, getQuestion } from '../queries'

const listQuestions = async (ctx, next) => {
  const userId = ctx.from.id
  const questions = await getQuestionsByUser(userId)

  if (questions === null) {
    return ctx.reply(
      'There are no questions do you want to add new one?',
      Extra.HTML().markup(m =>
        m.inlineKeyboard([m.callbackButton('🆕 Add a new question', 'addQuestion')])
      )
    )
  }
  const markup = new Markup()
  const questionIds = Object.keys(questions)
  const buttons = []
  for (const questionId of questionIds) {
    const question = await getQuestion(questionId)
    const { hours, minutes } = questions[questionId]
    buttons.push([
      markup.callbackButton(`${question} ⏰${hours}:${minutes}`, `questionActions/${questionId}`)
    ])
  }
  return ctx.reply(
    'Please select the question you want to perform actions on!',
    markup
      .inlineKeyboard(buttons)
      .resize()
      .extra()
  )
}
export default listQuestions
