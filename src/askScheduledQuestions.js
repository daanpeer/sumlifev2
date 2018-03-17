import scheduler from './scheduler'
import { askQuestion } from './responses'

const askScheduledQuestions = async bot => {
  const scheduled = await scheduler()
  const promises = []
  scheduled.forEach(({ userId, questionId, question, type }) => {
    promises.push(
      askQuestion({
        ctx: bot,
        questionId: questionId,
        userId,
        question,
        type
      })
    )
  })
  return Promise.all(promises)
}

export default askScheduledQuestions
