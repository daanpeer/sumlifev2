import { storeAnswerByToday, isAnsweredToday } from '../queries'

import { emoji } from '../answers'

const answer = async ctx => {
  const [answer, questionId, userId] = ctx.match[2].split(':')
  if (!await isAnsweredToday(questionId, userId)) {
    await storeAnswerByToday(userId, questionId, answer)
    await ctx.reply("I've registered your answer")
    return ctx.reply(`You answered ${emoji[answer]}`)
  }
  return ctx.reply("You've already answered this question")
}

export default answer
