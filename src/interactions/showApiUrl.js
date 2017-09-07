import {
  storeToken
} from '../queries'

import crypto from 'crypto'

const showApiUrl = async (ctx) => {
  const hash = crypto.createHash('sha256')
    .update(Math.random().toString())
    .digest('hex')

  storeToken(ctx.from.id, hash)

  ctx.reply(`${process.env.API_URL}${hash}`)
}

export default showApiUrl
