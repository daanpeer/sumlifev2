import askScheduledQuestions from '../askScheduledQuestions'

const askQuestions = bot => async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  await askScheduledQuestions(bot)
  callback(null, 'Done!')
}

export default askQuestions
