const { array } = require('@hapi/joi');
const axios = require('axios');
const { channel } = require('diagnostics_channel');
const fs = require('fs')

var instance = axios.create({
    baseURL: process.env.HOST + ":" + process.env.PORT,
    timeout: 1000
});

module.exports.getAllCommands = async () => {
    instance.get('/api/v1/commands/')
        .then(function (response) {
            fs.writeFile('./data/AllCommands.json', JSON.stringify(response.data), function (err) { console.log(err); });
        })
        .catch(function (error) {
            console.log(error);
        });
}

module.exports.addCommand = async (message) => {
    var status = 0;
    const commandToAdd = message.split(" ")[1]
    const actionToAdd = message.split("!add " + commandToAdd + " ")[1]
    await instance.post('/api/v1/commands/', {
        "command": commandToAdd,
        "action": actionToAdd
    })
        .then(function (response) {
            status = response.status
        })
        .catch(function (error) {
            console.log(error);
            status = response.status
        });
    return status
}

module.exports.getChannels = async () => {
    let channelsList = []
    await instance.get('/api/v1/globals/')
        .then(function (response) {
            response.data.forEach(element => {
                channelsList.push(element["channel"])
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    return channelsList
}