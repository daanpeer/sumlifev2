const setWebhook = (bot) => function (event, context) {
  const url = `${process.env.BOT_WEBHOOK_URL}/${process.env.BOT_TOKEN}`

  bot.telegram.setWebhook(url, null, 5, 5)
}

export default setWebhook
