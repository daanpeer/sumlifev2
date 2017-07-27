import {
  addUser
} from '../queries'

const start = async ({ from, reply }) => {
  addUser(from.id)
  // await reply('Hi there!')
  // await reply('My name is Henry!')
  // show example qestion
  // show example schedule
  return reply('Welcome!')
}

export default start
