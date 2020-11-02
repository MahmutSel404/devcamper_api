const express = require('express');
const router = express.Router();
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Bootcamp = require('../models/Bootcamp');

//@desc Get all bootcamps
//@route GET /api/v1/bootcamps
//access Public
router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.find();
    res.status(201).json({
      success: true,
      count: bootcamp.length,
      data: bootcamp,
    });
  })
);

//@desc Get single bootcamp
//@route GET /api/v1/bootcamps/:id
//access Public
router.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ success: true, data: bootcamp });
  })
);

//@desc Get single bootcamp
//@route GET /api/v1/bootcamps/:id
//access Public
router.post(
  '/',
  asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      success: true,
      data: bootcamp,
    });
  })
);

//@desc Update bootcamp
//@route PUT /api/v1/bootcamps/:id
//access Private
router.put(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ success: true, data: bootcamp });
  })
);

//@desc Delete bootcamp
//@route DELETE /api/v1/bootcamps/:id
//access Private
router.delete(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }
    res.send(200).json({ success: true, data: {} });
  })
);

module.exports = router;
