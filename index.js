import {
  askQuestions as aq,
  webhook as wh,
  setwebhook as swh
} from './src/functions'

import bot from './src/bot'

export const webhook = wh(bot)
export const setWebhook = swh(bot)
export const askQuestions = aq(bot)
