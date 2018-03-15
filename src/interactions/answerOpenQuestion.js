import {
  storeCommandState
} from '../queries'

const addQuestion = async ({ from, reply, match }) => {
  const [ questionId, userId ] = match[2].split(':')
  await storeCommandState(from.id, 'answerOpenQuestion', { questionId, userId, step: 1 })
  return reply('Okay you can reply with your answer now')
}

export default addQuestion
