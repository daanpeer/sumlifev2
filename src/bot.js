import Telegraf from 'telegraf'

import * as processCommand from './commands/processCommand'

import {
  listQuestions,
  addQuestion,
  questionActions,
  answer,
  editQuestion,
  deleteConfirm,
  deleteQuestion,
  editTime,
  start,
  cancel
} from './interactions'

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.action(/(answer)\/(.+)/, answer)
bot.action(/(editQuestion)\/(.+)/, editQuestion)
bot.action(/(deleteConfirm)\/(.+)/, deleteConfirm, listQuestions)
bot.action(/(deleteQuestion)\/(.+)/, deleteQuestion)
bot.action(/(editTime)\/(.+)/, editTime)
bot.action(/(questionActions)\/(.+)/, questionActions)
bot.action(/addQuestion/, addQuestion)
bot.command('list_questions', listQuestions)
bot.command('add_question', addQuestion)
bot.command('cancel', cancel)
bot.command('start', start)
bot.on('message', processCommand.checkCommand, processCommand.processCommand)

export default bot
