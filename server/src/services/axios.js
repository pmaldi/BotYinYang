const { array } = require('@hapi/joi');
const axios = require('axios');
const { channel } = require('diagnostics_channel');
const fs = require('fs');

const instance = axios.create({
  baseURL: `${process.env.HOST}:${process.env.PORT}`,
  timeout: 1000
});

module.exports.getAllCommands = async () => {
  instance
    .get('/api/v1/commands/')
    .then((response) => {
      fs.writeFile(
        './data/AllCommands.json',
        JSON.stringify(response.data),
        (err) => {
          console.log(err);
        }
      );
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports.addCommand = async (message) => {
  let status = 0;
  const commandToAdd = message.split(' ')[1];
  const actionToAdd = message.split(`!add ${commandToAdd} `)[1];
  await instance
    .post('/api/v1/commands/', {
      command: commandToAdd,
      action: actionToAdd
    })
    .then((response) => {
      status = response.status;
    })
    .catch((error) => {
      console.log(error);
      status = response.status;
    });
  return status;
};

module.exports.getChannels = async () => {
  const channelsList = [];
  await instance
    .get('/api/v1/globals/')
    .then((response) => {
      response.data.forEach((element) => {
        channelsList.push(element.channel);
      });
    })
    .catch((error) => {
      // console.log(error);
    });
  return channelsList;
};
