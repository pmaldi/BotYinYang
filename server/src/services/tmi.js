const tmi = require("tmi.js");
const axios = require("./axios");
const logger = require("./logger");
const AllCommands = require("../../data/AllCommands.json");
require("dotenv").config();

async function init() {
    var channelsList = await axios.getChannels();
    const client = new tmi.Client({
        options: { debug: true },
        identity: {
            username: process.env.USERNAME_BOT,
            password: process.env.PASSWORD_BOT
        },
        channels: channelsList
    });

    await client.connect();
    axios.getAllCommands();

    async function findInCommandsList(message, channel) {
        const objectArray = Object.entries(AllCommands);
        objectArray.forEach(([key, value]) => {
            if (value.command.toLowerCase() == message.toLowerCase()) {
                client.say(channel, value.action);
            }
        });
    }

    client.on("message", async(channel, tags, message, self) => {
        //logger.log(channel, tags['display-name'], message)
        if (self) return;
        if (process.env.NODE_ENV != "development") {
            if (
                message.toLowerCase().startsWith("!") &&
                !message.toLowerCase().startsWith("!add") &&
                !message.toLowerCase().startsWith("!rand")
            ) {
                await findInCommandsList(message, channel);
            }
            if (message.toLowerCase().startsWith("!add")) {
                const result = await axios.addCommand(message);
                client.say(channel, result.toString());
            }
            if (message.toLowerCase().startsWith("!rand")) {
                const number = Math.floor(Math.random() * 100);
                client.say(channel, number.toString());
            }
        }
    });
}

init();