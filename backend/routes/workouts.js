const express = require('express');
const {
  createWorkout,
  getAllWorkout,
  getSingleWorkout,
  deleteSingleWorkout,
  updateWorkout,
} = require('../controllers/workoutController');
const requireAuth = require('../middleware/requireAuth');
const router = express.Router();

router.use(requireAuth);

router.get('/', getAllWorkout);
router.post('/', createWorkout);
router.get('/:id', getSingleWorkout);
router.patch('/:id', updateWorkout);
router.delete('/:id', deleteSingleWorkout);

module.exports = router;
