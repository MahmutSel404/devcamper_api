const express = require('express');
const router = express.Router();
const Bootcamp = require('../models/Bootcamp');

router.get('/', (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: 'Show all bo2otcamps', hello: req.hello });
});

router.get('/:id', (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Show bootcamp ${req.params.id}` });
});

router.post('/', async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    
    res.status(201).json({
      success: true,
      data: bootcamp,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
});

router.put('/:id', (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Update bootcamp ${req.params.id}` });
});
router.delete('/:id', (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete bootcamp ${req.params.id}` });
});

module.exports = router;
