import {
  askQuestions as aq,
  webhook as wh,
  setwebhook as swh,
  exportData
} from './src/functions'

import bot from './src/bot'

export const webhook = wh(bot)
export const setWebhook = swh(bot)
export const askQuestions = aq(bot)
export const api = exportData()
