import { Markup } from 'telegraf'

export const QUESTION_TYPE_OPEN = 'open'
export const QUESTION_TYPE_EMOJI = 'emoji'

const addQuestion = async ({ from, reply }) => {
  const markup = new Markup()
  const buttons = [
    markup.callbackButton('📋 Open', `setQuestionType/${QUESTION_TYPE_OPEN}`),
    markup.callbackButton('😃 Emoji', `setQuestionType/${QUESTION_TYPE_EMOJI}`)
  ]
  await reply("Okay, i'll just ask you some questions to create this question")
  return reply(
    'What type of question do you want to add?',
    markup
      .inlineKeyboard(buttons)
      .resize()
      .extra()
  )
}
export default addQuestion
