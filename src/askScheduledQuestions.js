import scheduler from './scheduler'
import { askQuestion } from './responses'

const askScheduledQuestions = (bot) => scheduler()
  .then((scheduledQuestions) => {
    const promises = []
    scheduledQuestions.forEach(({ userId, questionId, question }) => {
      promises.push(askQuestion(bot, questionId, userId, question))
    })
    return Promise.all(promises)
  })
  .catch((error) => {
    console.log('error ', error)
  })

export default askScheduledQuestions
