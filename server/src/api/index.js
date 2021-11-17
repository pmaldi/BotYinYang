const express = require('express');

const commands = require('./commands');
const globals = require('./globals');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/commands', commands);
router.use('/globals', globals);

module.exports = router;
