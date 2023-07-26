import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Details = () => {
  const { id } = useParams();
  const [workout, setWorkout] = useState(null);

  useEffect(() => {
    fetchWorkout(id);
  }, []);

  const fetchWorkout = async (id) => {
    await axios
      .get(`/api/workouts/${id}`)
      .then((resp) => {
        // console.log(resp.data);
        setWorkout(resp.data);
      })
      .catch((error) => {
        // console.log(error.response);
      });
  };

  return (
    <div className='home'>
      <div className='workouts'>
        {workout && (
          <div className='workout-details'>
            <h4>{workout?.title}</h4>
            <p>
              <strong>Load (kg): </strong>
              {workout?.load}
            </p>
            <p>
              <strong>Number of reps: </strong>
              {workout?.reps}
            </p>
            <p>{moment(workout?.createdAt).fromNow()}</p>
            {/* <span onClick={handleClick} className='material-symbols-outlined'>
        delete
      </span> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
