require('dotenv').config()
const { Markup } = require('telegraf')
const Telegraf = require('telegraf')
const moment = require('moment');
const {
  storeAnswerByDate,
  storeAnswerByToday,
  isAnsweredToday,
  getQuestionsByUser,
  getQuestion,
  getUsers,
  addQuestionByUser,
 } = require('./queries');

const answers = [
  '😭',
  '😞',
  '😕',
  '😐',
  '🙂',
  '😄',
];

const app = new Telegraf(process.env.BOT_TOKEN)

const main = async function () {
  const date = moment().format('YYYY-MM-DD')
  const users = await getUsers();

  if (users === null) {
    return;
  }

  await users.forEach(async (userId) => {
    // fetch questions for each user
    const questions = await getQuestionsByUser(userId) || []

    questions.forEach(async (questionId) => {
      if (!(await isAnsweredToday(questionId))) {
        const {
          hours,
          minutes,
          question
        } = await getQuestion(questionId);

        const schedule = moment({ hours, minutes })
        if (schedule.diff(moment(), 'seconds') <= 0) {
          const markup = new Markup();
          const buttons = answers.map((emoji, index) => {
            // todo json encode here
            return markup.callbackButton(emoji, `answer/${index}:${questionId}:${userId}`);
          });

          app.telegram.sendMessage(userId, question,
            markup.inlineKeyboard(buttons).extra()
          )
        }
      }
    })
  })
}

main();

// @todo
/*
- Change firebase to firebase admin mode
- Make feature to create questions
- Add graphs and stats
*/


setInterval(async () => {
}, 10000)

app.action(/(answer)\/(.+)/, async (ctx) => {
  const [ answer, questionId, userId ] = ctx.match[2].split(':');
  if (!(await isAnsweredToday(questionId, userId))) {
    storeAnswerByToday(questionId, answer, userId)
    ctx.reply('I\'ve registered your answer')
  }
})

app.command('start', ({ from, reply }) => {
  database.ref(`users/${from.id}`).set(true)
  addQuestionByUser(from.id, 'how do you feel today', 7, 00);

  return reply('Welcome!')
})

app.startPolling()
