const express = require('express');
const monk = require('monk');
const Joi = require('@hapi/joi');
const axios = require('../services/axios');

const db = monk(process.env.MONGO_URI);
const commandsDB = db.get('commands');

const schema = Joi.object({
  command: Joi.string().trim().required(),
  action: Joi.string().trim().required(),
});

const router = express.Router();

// READ ALL
router.get('/', async (req, res, next) => {
  try {
    const items = await commandsDB.find({});
    res.json(items);
  } catch (error) {
    next(error);
  }
});

// READ ONE
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await commandsDB.findOne({
      _id: id,
    });
    if (!item) return next();
    return res.json(item);
  } catch (error) {
    next(error);
  }
});

// CREATE ONE
router.post('/', async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    const inserted = await commandsDB.insert(value);
    axios.getAllCommands();
    res.json(inserted);
  } catch (error) {
    next(error);
  }
});

// UPDATE ONE
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const value = await schema.validateAsync(req.body);
    const item = await commandsDB.findOne({
      _id: id,
    });
    await commandsDB.update({
      _id: id,
    }, {
      $set: value,
    });
    res.json(value);
  } catch (error) {
    next(error);
  }
});

// DELETE ONE
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await commandsDB.remove({ _id: id });
    res.json({
      message: 'success'
    });
  } catch (error) {

  }
});

module.exports = router;
