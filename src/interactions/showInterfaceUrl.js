import {
  getActiveTokenByUser,
  storeTokenForUser
} from '../queries'

import crypto from 'crypto'

const showApiUrl = async ({
  reply,
  from: {
    id
  }
}) => {
  let token = await getActiveTokenByUser(id)
  if (!token) {
    token = crypto.createHash('sha256')
      .update(Math.random().toString())
      .digest('hex')

    await storeTokenForUser(id, token)
  }
  return reply(`${process.env.INTERFACE_URL}?token=${token}`)
}

export default showApiUrl
