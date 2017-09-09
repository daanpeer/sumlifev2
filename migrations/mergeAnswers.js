require('dotenv').config()

const firebase = require('../src/firebase').default
const { storeAnswerByQuestion } = require('../src/queries')

const database = firebase.database()

const main = async () => {
  const answerRef = await database.ref(`answersByUser`).once('value')
  const answers = answerRef.val()

  for (const userId of Object.keys(answers)) {
    const answersByUser = answers[userId]

    for (const date of Object.keys(answersByUser)) {
      const answersByDate = answersByUser[date]

      for (const questionId of Object.keys(answersByDate)) {
        const answer = answersByDate[questionId]
        storeAnswerByQuestion({
          userId,
          questionId,
          date,
          answer
        })
      }
    }
  }
  console.log('Done')
}

main()
