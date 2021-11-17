const { Dayjs } = require('dayjs');
var dayjs = require('dayjs');
var elasticsearch = require('elasticsearch');
let indexName = 'twitch-message'

var client = new elasticsearch.Client({
    hosts: ['http://192.168.1.22:9200']
});

client.ping({
    requestTimeout: 30000,
}, function (error) {
    if (error) {
        console.error('elasticsearch cluster is down!');
    } else {
        console.log('elasticsearch is ok');
    }
});

client.indices.exists({
    index: indexName
}).then(function (exists) {
    if (!exists) {
        logger.debug('Creating index %s ...', indexName)
        return client.indices.create({
            index: 'twitch-message'
        }).then(function (r) {
            logger.info('Index %s created:', indexName, r)
            return Promise.resolve(r)
        })
    } else {
        console.log('Index %s exists', indexName)
        return Promise.resolve()
    }
})

fs = require('fs');

exports.log = function (channel, name, message) {
    const now = new Date()
    //fs.writeFile('./logs/' + channel + '.txt', `<${name}>: ${message}\n`, { flag: 'a+' }, err => { })
    client.index({
        index: indexName,
        body: {
            channel: channel,
            user: name,
            message: message,
            date: dayjs(now),
        }
    });
}
