const express = require('express');

const commands = require('./commands');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/commands', commands);

module.exports = router;
