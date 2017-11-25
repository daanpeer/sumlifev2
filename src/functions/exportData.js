import {
  getUserIdByToken,
  exportUserData
} from '../queries'

const exportData = () => async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false

  const { token } = event.pathParameters
  if (!token) {
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Done'
      })
    })
  }

  const userId = await getUserIdByToken(token)
  if (userId === null) {
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Done'
      })
    })
  }

  const userData = await exportUserData(userId)
  return callback(null, {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    statusCode: 200,
    body: JSON.stringify(userData)
  })
}

export default exportData
