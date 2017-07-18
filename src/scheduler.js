import moment from 'moment'
import {
  isAskedToday,
  storeAskedToday,
  getQuestionsByUser,
  getQuestion,
  getUsers
} from './queries'

const scheduler = async function (callback) {
  const users = await getUsers()

  if (users === null) {
    return
  }

  await users.forEach(async (userId) => {
    // fetch questions for each user
    const questions = await getQuestionsByUser(userId) || []
    questions.forEach(async (questionId) => {
      if (!(await isAskedToday(questionId, userId))) {
        const {
          hours,
          minutes,
          question
        } = await getQuestion(questionId)
        const schedule = moment({ hours, minutes })
        const timeDiff = schedule.diff(moment(), 'seconds')
        if (timeDiff >= 0) {
          callback(userId, questionId, question)
        }
        storeAskedToday(questionId, userId)
      }
    })
  })
}

export default scheduler
