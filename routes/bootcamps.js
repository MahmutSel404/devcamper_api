const express = require('express');
const router = express.Router();
const Bootcamp = require('../models/Bootcamp');

//@desc Get all bootcamps
//@route GET /api/v1/bootcamps
//access Public
router.get('/', async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.find();
    res.status(201).json({
      success: true,
      count:bootcamp.length,
      data: bootcamp,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
});

//@desc Get single bootcamp
//@route GET /api/v1/bootcamps/:id
//access Public
router.get('/:id', async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: bootcamp });
  } catch (err) {
    res.status(400).json({ success: false, msg: 'No bootcamp has been found' });
  }
});

//@desc Get single bootcamp
//@route GET /api/v1/bootcamps/:id
//access Public
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

//@desc Update bootcamp
//@route PUT /api/v1/bootcamps/:id
//access Private
router.put('/:id', async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bootcamp) {
    res.status(400).json({ success: false });
  }
  res.status(200).json({ success: true, data: bootcamp });
});

//@desc Delete bootcamp
//@route DELETE /api/v1/bootcamps/:id
//access Private
router.delete('/:id', async(req, res, next) => {
try {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)
  if(!bootcamp){
    return res.status(400).json({success:false})
  }
  res.send(200).json({success:true, data:{}})

} catch (err) {
      res.status(400).json({success:false})
}
});

module.exports = router;
