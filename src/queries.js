import moment from 'moment'
import firebase from './firebase'

const database = firebase.database()
const DATE_FORMAT = 'YYYY-MM-DD';

export const addUser = async function (id) {
  database.ref(`users/${id}`).set(true)
}

export const getUsers = async function () {
  const userRef = await database.ref('users').once('value')
  const users = userRef.val()
  if (users === null) {
    return null
  }

  return Object.keys(users)
}

export const getQuestion = async function (questionId) {
  const questionRef = await database.ref(`questions/${questionId}`).once('value')
  const question = questionRef.val()
  return question
}

export const getQuestionsByUser = async function (userId) {
  const questionRef = await database.ref(`questionsByUser/${userId}`).once('value')
  const questions = questionRef.val()

  if (questions === null) {
    return null
  }

  return Object.keys(questions)
}

export const storeAskedToday = async function (questionId, userId) {
  const date = moment().format(DATE_FORMAT)
  return database.ref(`questionAskedToUser/${userId}/${date}`).set({
    [questionId]: questionId
  })
}

export const isAskedToday = async function (questionId, userId) {
  const date = moment().format(DATE_FORMAT)
  const answerRef = await database.ref(`questionAskedToUser/${userId}/${date}/${questionId}/`).once('value')
  const answer = answerRef.val()
  return !!answer
}

export const isAnsweredToday = async function (questionId, userId) {
  const date = moment().format(DATE_FORMAT)
  const answerRef = await database.ref(`answersByUser/${userId}/${date}/${questionId}/`).once('value')
  const answer = answerRef.val()
  return !!answer
}

export const storeAnswerByDate = async function (date, questionId, answer, userId) {
  return database.ref(`answersByUser/${userId}/${date}`).set({
    [questionId]: answer
  })
}

export const storeAnswerByToday = async function (questionId, answer, userId) {
  const date = moment().format(DATE_FORMAT)
  storeAnswerByDate(date, questionId, answer, userId)
}

export const addQuestionByUser = async function (userId, question, hours, minutes) {
  const key = database.ref(`questions`)
    .push({
      question,
      hours,
      minutes
    }).key

  database.ref(`questionsByUser/${userId}`)
    .set({ [key]: true })
}
