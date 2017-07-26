import {
  storeAnswerByToday,
  isAnsweredToday
} from '../queries'

const answer = async (ctx) => {
  const [answer, questionId, userId] = ctx.match[2].split(':')
  if (!(await isAnsweredToday(questionId, userId))) {
    await storeAnswerByToday(questionId, answer, userId)
    ctx.reply('I\'ve registered your answer')
  }
  ctx.reply('You\'ve already answered this question')
}

export default answer
