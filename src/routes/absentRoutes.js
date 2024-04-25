const express = require('express');
const router = express.Router();
const absentController = require('../controllers/absentController');
const authMiddleware = require('../configs/verify').authMiddleware;
const { authorize } = require('../configs/verify');

router.get('/', authMiddleware, absentController.getAbsents);
router.get('/:id', authMiddleware, absentController.getAbsentById);
router.get('/:userId', authMiddleware, absentController.getAbsentByUserId);
router.post('/', authMiddleware, absentController.createAbsent);
router.put('/:id', authMiddleware, absentController.updateAbsent);
router.delete('/:id', authMiddleware, absentController.deleteAbsent);
router.get('/user-id/:userId', authMiddleware, absentController.getAbsentByUserId);

module.exports = router;