const setWebhook = (bot) => async (event, context, callback) => {
  const url = `${process.env.BOT_WEBHOOK_URL}/${process.env.BOT_TOKEN}`

  await bot.telegram.setWebhook(url, null, 5, 5)

  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({ message: `Webhook set ${url}` })
  })
}

export default setWebhook
