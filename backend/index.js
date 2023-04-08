require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
//express app
const app = express();

const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');

// middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.get('/', (req, res) => {
  res.json({ msg: 'welcome to the net ninja' });
});

app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

//connected to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.error('error connecting to MongoDB:', error.message);
  });

//listen for request
app.listen(process.env.PORT, () => {
  console.log('listening on port ' + process.env.PORT);
});
