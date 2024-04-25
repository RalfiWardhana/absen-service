const absentService = require('../services/absentService');
const { body, validationResult } = require('express-validator');

exports.getAbsents = async (req, res) => {
  try {
  
    const startDate = req.query.start_date;
    const endDate = req.query.end_date;
    
    let absents;
    if (startDate && endDate) {
      absents = await absentService.getAbsentsWithDate(startDate, endDate);
    } else {
      absents = await absentService.getAbsents();
    }

    res.json({ message: 'Get absents successfully', status: 200, absents: absents });
  } catch (error) {
    res.status(500).json({ message: error.message, status: 500 });
  }
};

exports.createAbsent = [
  body('name').notEmpty().withMessage('Name is required'),
  body('check_in').optional().isISO8601().toDate().withMessage('Invalid check-in date'),
  body('check_out').optional().isISO8601().toDate().withMessage('Invalid check-out date'),
  body('userId').notEmpty().withMessage('User Id is required'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ message: 'Invalid request body', status: 401, errors: errors.array() });
    }

    try {
      const absent = req.body;
      await absentService.createAbsent(absent);
      res.status(201).json({ message: 'absent created successfully', status: 201 });
    } catch (error) {
      res.status(500).json({ message: error.message, status: 500 });
    }
  }
];

exports.getAbsentById = async (req, res) => {
  try {
    const id = req.params.id;
    const absent = await absentService.getAbsentById(id);
    res.json({message: 'Get absent successfully', status:200, absent :absent});
  } catch (error) {
    res.status(500).json({ message: error.message, status:500 });
  }
};

exports.getAbsentByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const startDate = req.query.start_date;
    const endDate = req.query.end_date;
    
    let absent;
    if (startDate && endDate) {
      absent = await absentService.getAbsentByUserIdWithDate(userId, startDate, endDate);
    } else {
      absent = await absentService.getAbsentByUserId(userId);
    }

    res.json({ message: 'Get absent by user id successfully', status: 200, absent: absent });
  } catch (error) {
    res.status(500).json({ message: error.message, status: 500 });
  }
};


exports.updateAbsent = [
  body('name').notEmpty().withMessage('Name is required'),
  body('check_in').optional().isISO8601().toDate().withMessage('Invalid check-in date'),
  body('check_out').optional().isISO8601().toDate().withMessage('Invalid check-out date'),
  body('userId').notEmpty().withMessage('User Id is required'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ message: 'Invalid request body', status:401, errors: errors.array() });
    }

    try {
      const id = req.params.id;
      const absent = req.body;
      await absentService.updateAbsent(id, absent);
      res.status(200).json({ message: 'absent updated successfully', status: 200 });
    } catch (error) {
      res.status(500).json({ message: error.message, status: 500 });
    }
  }
];

exports.deleteAbsent = async (req, res) => {
  try {
    const id = req.params.id;
    await absentService.deleteAbsent(id);
    res.status(200).json({ message: 'absent deleted successfully', status: 200 });
  } catch (error) {
    res.status(500).json({ message: error.message, status: 500});
  }
};