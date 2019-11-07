const Telegraf = require('telegraf')
const { TELEGRAM_TOKEN } = require('./config/env')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')

const bot = new Telegraf(TELEGRAM_TOKEN)

function createDoneKeyboard (done = false) {
  return Markup.inlineKeyboard([
    Markup.callbackButton(`${done ? '' : '✔️ '}New`, '{"done":false}'),
    Markup.callbackButton(`${done ? '✔️ ' : ''}Done`, '{"done":true}')
  ])
}

bot.start(ctx => {
  ctx.reply('Welcome to the Web Alerts Bot')
})
bot.help(ctx => {
  ctx.reply('Print /test command')
})
bot.on('callback_query', async ctx => {
  try {
    const data = JSON.parse(ctx.update.callback_query.data)
    if (data && data.done !== undefined) {
      await ctx.editMessageReplyMarkup(createDoneKeyboard(data.done))
    }
    await ctx.answerCbQuery()
  } catch (err) {
    console.error(err)
  }
})
bot.command('test', async ctx => {
  ctx.reply(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ' +
    'eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    Extra.markup(createDoneKeyboard())
  )
})
bot.launch()
