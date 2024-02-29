const express = require('express');
const monk = require('monk');
const axios = require('../services/axios');

const db = monk(process.env.MONGO_URI);
const commandsDB = db.get('globals');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const items = await commandsDB.find({});
    res.json(items);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
