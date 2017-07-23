import {
  addUser
} from '../queries'

const start = ({ from, reply }) => {
  addUser(from.id)
  return reply('Welcome!')
}

export default start
