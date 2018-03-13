import moment from 'moment'
import {
  getQuestionsByUser,
  getUsers,
  getTodaysAskedQuestions,
  storeAskedToday,
  getQuestion
} from './queries'

const getUserQuestions = async (users) => {
  const promises = []
  for (let index = 0; index < users.length; index++) {
    const userId = users[index]
    promises.push(getQuestionsByUser(userId))
  }

  const results = await Promise.all(promises)
  return results.reduce((acc, curr, index) =>
    ({ ...acc, [users[index]]: { ...curr } }), {})
}

const getTodayAskedQuestions = async (users) => {
  const promises = []
  for (let index = 0; index < users.length; index++) {
    const userId = users[index]
    promises.push(getTodaysAskedQuestions(userId))
  }

  const results = await Promise.all(promises)
  return results.reduce((acc, curr, index) =>
    ({ ...acc, [users[index]]: { ...curr } }), {})
}

const isWithinTime = (hours, minutes) => {
  const schedule = moment().utc()
    .hours(hours)
    .minutes(minutes)

  const timeDiff = moment()
    .utc()
    .add(2, 'hour')
    .diff(schedule, 'seconds')

  if (timeDiff >= 0) {
    return true
  }
  return false
}

const schedule = (questionsByUser, askedQuestionsByUser) => {
  const scheduled = []
  const askedToday = []

  // first filter the questions which are already asked
  const userIds = Object.keys(questionsByUser)
  for (let userIndex = 0; userIndex < userIds.length; userIndex++) {
    const userId = userIds[userIndex]

    const askedQuestions = askedQuestionsByUser[userId]

    const questionIds = Object.keys(questionsByUser[userId])
    for (let questionIndex = 0; questionIndex < questionIds.length; questionIndex++) {
      const questionId = questionIds[questionIndex]
      const { hours, minutes } = questionsByUser[userId][questionId]

      const askedQuestion = askedQuestions[questionId]
      if (askedQuestion) {
        continue
      }

      if (isWithinTime(hours, minutes)) {
        askedToday.push(storeAskedToday(questionId, userId))
        scheduled.push({ userId, questionId })
      }
    }
  }
  return Promise.all(askedToday)
}

const scheduler = async () => {
  const userIds = await getUsers()
  const [userQuestions, askedQuestions] = Promise.all([
    getUserQuestions(userIds),
    getTodayAskedQuestions(userIds)
  ])

  const scheduled = await schedule(userQuestions, askedQuestions)

  // fetch the questions themselves
  const promises = []
  scheduled.forEach(({ questionId }) => {
    promises.push(getQuestion(questionId))
  })

  const questions = await Promise.all(promises)
  return questions.reduce((acc, curr, index) =>
      [ ...acc, { ...scheduled[index], question: curr } ], [])
}

export default scheduler
