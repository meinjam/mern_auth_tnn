const express = require('express');
const {
  createWorkout,
  getAllWorkout,
  getSingleWorkout,
  deleteSingleWorkout,
  updateWorkout,
} = require('../controllers/workoutController');
const router = express.Router();

router.get('/', getAllWorkout);
router.post('/', createWorkout);
router.get('/:id', getSingleWorkout);
router.patch('/:id', updateWorkout);
router.delete('/:id', deleteSingleWorkout);

module.exports = router;
