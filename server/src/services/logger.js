fs = require('fs');
const dayjs = require('dayjs');
const { Client } = require('@elastic/elasticsearch');

const indexName = 'twitch-message';

const client = new Client({
  node: process.env.ELASTIC_URI,
  auth: {
    username: process.env.ELASTIC_USER,
    password: process.env.ELASTIC_PASSWORD
  }
});

client.ping({}, { requestTimeout: 20000 }, (err, response) => {
  if (err) {
    console.log('elasticsearch cluster is down!');
  } else {
    console.log('elasticsearch is ok');
  }
});

client.indices
  .exists({
    index: indexName
  })
  .then((exists) => {
    if (!exists) {
      console.debug('Creating index %s ...', indexName);
      return client.indices
        .create({
          index: 'twitch-message'
        })
        .then((r) => {
          console.info('Index %s created:', indexName, r);
          return Promise.resolve(r);
        });
    }
    console.log('Index %s exists', indexName);
    return Promise.resolve();
  });

exports.log = function (channel, name, message) {
  const now = new Date();
  client.index({
    index: indexName,
    body: {
      channel,
      user: name,
      message,
      date: dayjs(now)
    }
  });
};
