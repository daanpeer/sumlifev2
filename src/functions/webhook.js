const webhook = (bot) => async function (event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false

  if (!event || !event.pathParameters) {
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Done'
      })
    })
  }

  const { token } = event.pathParameters
  if (token !== process.env.BOT_TOKEN) {
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Done'
      })
    })
  }

  await bot.handleUpdate(JSON.parse(event.body))

  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({ message: 'Webhook response' })
  })
}

export default webhook
