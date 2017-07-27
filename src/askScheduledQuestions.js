import scheduler from './scheduler'
import { askQuestion } from './responses'

const askScheduledQuestions = async (bot) => {
  try {
    const scheduledQuestions = await scheduler()
    for (const { userId, questionId, question } of scheduledQuestions) {
      askQuestion(bot, questionId, userId, question)
    }
  } catch (e) {
    console.log(e.message)
  }
}

export default askScheduledQuestions
