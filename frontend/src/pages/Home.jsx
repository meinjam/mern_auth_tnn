import axios from 'axios';
import React, { useEffect, useState } from 'react';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

const Home = () => {
  const [workouts, setWorkouts] = useState(null);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    await axios
      .get('/api/workouts')
      .then((resp) => {
        // console.log(resp.data);
        setWorkouts(resp.data);
      })
      .catch((error) => {
        // console.log(error.response);
      });
  };

  return (
    <div className='home'>
      <div className='workouts'>
        {workouts &&
          workouts.map((workout) => <WorkoutDetails workout={workout} setWorkouts={setWorkouts} key={workout.id} />)}
      </div>
      <WorkoutForm setWorkouts={setWorkouts} />
    </div>
  );
};

export default Home;
