import askScheduledQuestions from './askScheduledQuestions'

const askQuestions = (bot) => async function (event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false

  await askScheduledQuestions(bot)

  callback(null, 'Done!')
}

export default askQuestions
