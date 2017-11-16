import askScheduledQuestions from '../askScheduledQuestions'

const askQuestions = (bot) => (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  askScheduledQuestions(bot)
    .then(() => callback(null, 'Done!'))
}

export default askQuestions
