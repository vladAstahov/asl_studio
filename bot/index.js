import TelegramBot from 'node-telegram-bot-api'

const API_KEY_BOT = '6383071301:AAF8m3lpZ8FkFcX_YbttlPO1HBtMlIi85CU'

const bot = new TelegramBot(API_KEY_BOT, {
    polling: {
        interval: 300,
        autoStart: true
    }
})
const chatsIds = [630300751]

bot.on('text', async msg => {
    console.log(msg)
    if (!chatsIds.includes(msg.chat.id)) {
        chatsIds.push(msg.chat.id)
    }
})

async function sendOrder(data) {
    chatsIds.map(async chatId => {
        await bot.sendMessage(
            chatId,
            `*Новая заявка*\n\n*Имя*: ${data.name}\n*Телефон*: ${data.phone}\n*E-mail*: ${data.email}\n*telegram*: ${data.telegram}\n\n*Дата*: ${new Date().toDateString()}`,
            { parse_mode: 'Markdown' }
        )
    })
}

export {
    sendOrder
}