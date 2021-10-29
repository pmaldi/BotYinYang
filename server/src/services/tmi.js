const tmi = require('tmi.js');
const logger = require('./logger')
require('dotenv').config();

const client = new tmi.Client({
	options: { debug: true },
	identity: {
		username: process.env.USERNAME_BOT,
		password: process.env.PASSWORD_BOT
	},
	channels: [ process.env.CHANNELS_BOT ]
});

client.connect();

client.on('message', (channel, tags, message, self) => {
    logger.log(tags['display-name'] , message)
	if(self) return;

	if(message.toLowerCase() === '!zzhello') {
		client.say(channel, `@${tags.username}, heya!`);
	}
});
			