fs = require("fs");
var dayjs = require("dayjs");
const { Client } = require("@elastic/elasticsearch");
let indexName = "twitch-message";

const client = new Client({
    node: process.env.ELASTIC_URI,
    auth: {
        username: process.env.ELASTIC_USER,
        password: process.env.ELASTIC_PASSWORD
    }
});

client.ping({}, { requestTimeout: 20000 }, (err, response) => {
    if (err) {
        console.log("elasticsearch cluster is down!");
    } else {
        console.log("elasticsearch is ok");
    }
});

client.indices
    .exists({
        index: indexName
    })
    .then(function(exists) {
        if (!exists) {
            console.debug("Creating index %s ...", indexName);
            return client.indices
                .create({
                    index: "twitch-message"
                })
                .then(function(r) {
                    console.info("Index %s created:", indexName, r);
                    return Promise.resolve(r);
                });
        } else {
            console.log("Index %s exists", indexName);
            return Promise.resolve();
        }
    });

exports.log = function(channel, name, message) {
    const now = new Date();
    client.index({
        index: indexName,
        body: {
            channel: channel,
            user: name,
            message: message,
            date: dayjs(now)
        }
    });
};