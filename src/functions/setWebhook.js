const setWebhook = (bot) => async function (event, context) {
  context.callbackWaitsForEmptyEventLoop = false
  bot.telegram.setWebhook(`${process.env.BOT_WEBHOOK_URL}/${process.env.BOT_TOKEN}`, null, 5, 5)
}

export default setWebhook
