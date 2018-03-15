import { clearCommandState } from '../queries'

const cancel = async ({ from, reply }) => {
  await clearCommandState(from.id)
  return reply('Okay, okay command has been cancelled')
}

export default cancel
