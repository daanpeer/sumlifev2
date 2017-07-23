
import {
  storeCommandState
} from '../queries'

const addQuestion = async ({ from, reply }) => {
  await storeCommandState(from.id, 'addQuestion', { step: 1 })
  return reply('Alright you can reply with your question :)')
}

export default addQuestion
