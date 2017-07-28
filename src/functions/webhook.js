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

  try {
    await bot.handleUpdate(JSON.parse(event.body))
  } catch (err) {
    console.log('noes error processing update', err)
  }

  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({ message: 'Webhook response' })
  })
}

export default webhook
