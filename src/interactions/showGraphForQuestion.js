import fetch from 'node-fetch'
import crypto from 'crypto'
import moment from 'moment'

import { getAnswersByQuestion, getQuestion } from '../queries'

const { GRAPH_URL, TELEGRAM_DEBUG_ID } = process.env

const groupQuestionsByWeek = answers => {
  return Object.entries(answers).reduce((acc, [questionId, question], index) => {
    const week = moment(question.date).week()
    const previous = acc[week] ? acc[week] : []
    return { ...acc, [week]: previous.concat(question) }
  }, {})
}

const groupAvgAnswersByWeek = async (answers, question) =>
  Object.entries(groupQuestionsByWeek(answers)).reduce((acc, [weekNumber, questions], index) => {
    const total = questions
      .map(({ answer }) => parseInt(answer, 10))
      .filter(answer => answer !== -1)
      .reduce((curr, next) => curr + next)

    const avg = total / questions.length

    return acc.concat([{ name: weekNumber, [question]: avg }])
  }, [])

const showGraphForQuestion = async ctx => {
  const questionId = ctx.match[2]
  const userId = ctx.from.id

  const answers = await getAnswersByQuestion(userId, questionId)
  const question = await getQuestion(questionId)
  const chartData = await groupAvgAnswersByWeek(answers, question)

  await ctx.reply('Creating a graph!')

  const data = {
    data: chartData,
    lines: [
      {
        type: 'monotone',
        dataKey: question,
        stroke: '#000'
      }
    ]
  }

  try {
    const response = await fetch(`${GRAPH_URL}`, {
      method: 'POST',
      body: JSON.stringify({
        filename: `${crypto
          .createHash('md5')
          .update(JSON.stringify(data))
          .digest('hex')}.png`,
        chartData: data
      })
    })
    const url = await response.text()
    await ctx.reply(url)
    await ctx.reply('Graph succesfully created!')
  } catch (err) {
    if (userId === TELEGRAM_DEBUG_ID) {
      await ctx.telegram.sendMessage(TELEGRAM_DEBUG_ID, err)
    }

    await ctx.reply("Noes, couldn't save graph")
  }
}

export default showGraphForQuestion
