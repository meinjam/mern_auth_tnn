const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// get all workout
const getAllWorkout = async (req, res) => {
  const user_id = req.user.id;
  const workouts = await Workout.aggregate([
    // get only user workout
    {
      $match: {
        user_id: new mongoose.Types.ObjectId(user_id),
      },
    },
    // join with users table
    {
      $lookup: {
        from: 'users',
        localField: 'user_id',
        foreignField: '_id',
        as: 'userDetails',
      },
    },
    // Unwind the 'userDetails' array (optional, if you want a single object instead of an array)
    {
      $unwind: {
        path: '$userDetails',
        preserveNullAndEmptyArrays: true,
      },
    },
    // get only specific fields
    {
      $project: {
        _id: 0,
        id: '$_id',
        title: 1,
        reps: 1,
        load: 1,
        createdAt: 1,
        'userDetails.name': 1,
        'userDetails.email': 1,
      },
    },
    // sort by desc
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);
  res.status(200).json(workouts);
};

// carete new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push('title');
  }
  if (!load) {
    emptyFields.push('load');
  }
  if (!reps) {
    emptyFields.push('reps');
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields });
  }

  try {
    const user_id = req.user.id;
    const workout = await Workout.create({ title, reps, load, user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get a single workout
const getSingleWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' });
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ error: 'No such workout' });
  }

  res.status(200).json(workout);
};

// update workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' });
  }

  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!workout) {
    return res.status(400).json({ error: 'No such workout' });
  }

  res.status(200).json(workout);
};

// delete single workout
const deleteSingleWorkout = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(400).json({ error: 'No such workout.' });
  }

  res.status(200).json(workout);
};

module.exports = {
  getAllWorkout,
  createWorkout,
  getSingleWorkout,
  updateWorkout,
  deleteSingleWorkout,
};
