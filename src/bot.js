import Telegraf from 'telegraf'
import {
  storeAnswerByToday,
  isAnsweredToday,
  addUser
} from './queries'

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.action(/(answer)\/(.+)/, async (ctx) => {
  const [answer, questionId, userId] = ctx.match[2].split(':')
  if (!(await isAnsweredToday(questionId, userId))) {
    await storeAnswerByToday(questionId, answer, userId)
    ctx.reply('I\'ve registered your answer')
  }
})

bot.command('start', ({ from, reply }) => {
  addUser(from.id)
  return reply('Welcome!')
})

export default bot
