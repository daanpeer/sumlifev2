import moment from 'moment'
import firebase from './firebase'
import crypto from 'crypto'

const database = firebase.database()
const DATE_FORMAT = 'YYYY-MM-DD'

export const addUser = async (id) => {
  database.ref(`users/${id}`).set(true)
}

export const getUsers = async () => {
  const userRef = await database.ref('users').once('value')
  const users = userRef.val()
  if (users === null) {
    return null
  }

  return Object.keys(users)
}

export const getQuestion = async (questionId) => {
  const questionRef = await database.ref(`questions/${questionId}`).once('value')
  const question = questionRef.val()
  return question
}

export const getQuestionByUser = async (userId, questionId) => {
  const question = await database.ref(`questionsByUser/${userId}/${questionId}`).once('value')
  if (question === null) {
    return null
  }
  return question.val()
}

export const getQuestionsByUser = async (userId) => {
  const questionRef = await database.ref(`questionsByUser/${userId}`).once('value')
  const questions = questionRef.val()

  if (questions === null) {
    return null
  }

  return questions
}

export const storeAskedToday = async (questionId, userId) => {
  const date = moment().format(DATE_FORMAT)
  return database.ref(`questionAskedToUser/${userId}/${date}`).update({
    [questionId]: questionId
  })
}

export const isAskedToday = async (questionId, userId) => {
  const date = moment().format(DATE_FORMAT)
  const answerRef = await database.ref(`questionAskedToUser/${userId}/${date}/${questionId}/`).once('value')
  const answer = answerRef.val()
  return !!answer
}

export const isAnsweredToday = async (questionId, userId) => {
  const date = moment().format(DATE_FORMAT)
  const answerRef = await database.ref(`answersByUser/${userId}/${date}/${questionId}/`).once('value')
  const answer = answerRef.val()
  return !!answer
}

export const storeAnswerByDate = async (date, questionId, answer, userId) => {
  return database.ref(`answersByUser/${userId}/${date}`).update({
    [questionId]: answer
  })
}

export const storeAnswerByToday = async (questionId, answer, userId) => {
  const date = moment().format(DATE_FORMAT)
  storeAnswerByDate(date, questionId, answer, userId)
}

export const addQuestionByUser = async (userId, question, hours, minutes) => {
  const key = crypto.createHash('md5').update(question).digest('hex')

  database.ref(`questions`)
    .update({ [key]: question })

  database.ref(`questionsByUser/${userId}`)
    .update({ [key]: {
      hours,
      minutes
    } })

  // make sure that the question isn't asked when the time lies in the past
  if (moment({ hour: hours, minute: minutes }).isBefore(moment())) {
    storeAskedToday(key, userId)
  }

  return key
}

export const clearCommandState = async (userId) => {
  await database.ref(`commandState`).set({ [userId]: null })
}

export const getCommandState = async (userId) => {
  const commandRef = await database.ref(`commandState/${userId}`).once('value')
  return commandRef.val()
}

export const removeQuestionByUser = async (userId, questionId) => {
  database.ref(`questionsByUser/${userId}`).update({
    [questionId]: null
  })
}

export const storeCommandState = async (userId, command, state) => {
  database.ref(`commandState/${userId}`)
    .set({
      [command]: { state }
    })
}

export const getAnswer = async (date, userId, questionId) => {
  return database.ref(`answersByUser/${userId}/${date}/${questionId}`).once('value')
}

export const getAnswersByUser = async (userId) => {
  return database.ref(`answersByUser/${userId}`).once('value')
}

export const moveAnswers = async (userId, oldQuestionId, questionId) => {
  const answersByUser = getAnswersByUser(userId)
  const dates = Object.keys(answersByUser)

  // copy all answers to new question
  for (const date of dates) {
    const answer = getAnswer(date, userId, oldQuestionId)
    await storeAnswerByDate(date, questionId, answer, userId)
  }
}

export const updateQuestionTime = async (userId, questionId, hours, minutes) => {
  database.ref(`questionsByUser/${userId}/${questionId}`)
    .update({
      hours,
      minutes
    })
}

export const updateQuestion = async (userId, oldQuestionId, q) => {
  const question = await getQuestionByUser(userId, oldQuestionId)
  if (question === null) {
    return
  }

  const { hours, minutes } = question
  const questionId = await addQuestionByUser(userId, q, hours, minutes)
  await moveAnswers(userId, oldQuestionId, questionId)
  return removeQuestionByUser(userId, oldQuestionId)
}
