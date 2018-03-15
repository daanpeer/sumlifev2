const timedReply = (ctx, next) => {
  ctx.timedReply = (userId, response, ms = 1000) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(ctx.reply(userId, response))
      }, ms)
    })
  return next()
}

export default timedReply
