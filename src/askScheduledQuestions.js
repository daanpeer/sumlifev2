import scheduler from './scheduler'
import { askQuestion } from './responses'

const askScheduledQuestions = async bot => {
  const scheduled = await scheduler()
  const promises = []
  scheduled.forEach(({ userId, questionId, question, type }) => {
    promises.push(askQuestion(bot, questionId, userId, question, null, type))
  })
  return Promise.all(promises)
}

export default askScheduledQuestions
