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
    throw Error('No users to query')
  }

  const scheduled = []
  for (const userId of users) {
    const questions = await getQuestionsByUser(userId)
    if (questions === null) {
      continue
    }

    for (const questionId of Object.keys(questions)) {
      if (await isAskedToday(questionId, userId)) {
        continue
      }

      const question = await getQuestion(questionId)
      const {
        hours,
        minutes
      } = questions[questionId]

      const schedule = moment({ hours, minutes }).utc()

      const timeDiff = moment()
        .utc()
        .add(2, 'hour')
        .diff(schedule, 'seconds')

      if (timeDiff >= 0) {
        await storeAskedToday(questionId, userId)
        scheduled.push({ userId, questionId, question })
      }
    }
  }

  if (scheduled.length === 0) {
    throw Error('Nothing to schedule')
  }

  return scheduled
}

export default scheduler
