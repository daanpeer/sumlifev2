require('dotenv').config()
const askScheduledQuestions = require('./src/askScheduledQuestions').default
const bot = require('./src/bot').default

const main = async () => {
  try {
    // await askScheduledQuestions(bot)
  } catch (err) {
  }
}

main()

// setInterval(async() => {
//   console.log('Checking scheduler')
//   await main()
// }, 5000)

bot.startPolling()
