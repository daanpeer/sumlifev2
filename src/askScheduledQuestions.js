import scheduler from './scheduler'
import { askQuestion } from './responses'

const askScheduledQuestions = (bot) => scheduler()
  .then((scheduledQuestions) => {
    scheduledQuestions.forEach(({ userId, questionId, question }) => {
      askQuestion(bot, questionId, userId, question)
    })
  })
  .catch((error) => {
    console.log('error ', error)
  })

export default askScheduledQuestions
