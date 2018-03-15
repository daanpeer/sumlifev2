import { storeCommandState } from '../queries'

const addQuestion = async ({ from, reply, match }) => {
  await storeCommandState(from.id, 'addQuestion', { type: match[2], step: 1 })
  return reply('Okay you can reply with your question now!')
}

export default addQuestion
