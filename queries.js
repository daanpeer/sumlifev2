const firebase = require('./firebase');
const database = firebase.database();
const moment = require('moment');

const getUsers = async function() {
  const userRef = await database.ref('users').once('value')
  const users = userRef.val();
  if (users === null) {
    return null;
  }
  
  return Object.keys(users);
}

const getQuestion = async function(questionId) {
  const questionRef = await database.ref(`questions/${questionId}`).once('value')
  const question = questionRef.val();
  return question;
}

const getQuestionsByUser = async function(userId) {
  const questionRef = await database.ref(`questionsByUser/${userId}`).once('value')
  const questions = questionRef.val();

  if (questions === null) {
    return null;
  }

  return Object.keys(questions);
}

const isAnsweredToday = async function(questionId, userId) {
  const date = moment().format('YYYY-MM-DD')
  const answerRef = await database.ref(`answersByUser/${userId}/${date}/${questionId}/`).once('value')
  const answer = answerRef.val();
  return answer ? true : false;
}

const storeAnswerByDate = async function(date, questionId, answer, userId) {
  return database.ref(`answersByUser/${userId}/${date}`).set({
    [questionId]: answer,
  })
}

const storeAnswerByToday = async function(questionId, answer, userId) {
  const date = moment().format('YYYY-MM-DD') 
  storeAnswerByDate(date, questionId, answer, userId)
}

const addQuestionByUser = async function(userId, question, hours, minutes) {
  const key = database.ref(`questions`)
    .push({
      question,
      hours,
      minutes
    }).key

  database.ref(`questionsByUser/${userId}`)
    .set({ [key]: true }) 
}

module.exports = {
  storeAnswerByDate,
  storeAnswerByToday,
  isAnsweredToday,
  getQuestionsByUser,
  getQuestion,
  getUsers,
  addQuestionByUser,
}
