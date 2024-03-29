import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';

const WorkoutDetails = ({ workout, setWorkouts }) => {
  const handleClick = async () => {
    await axios
      .delete(`/api/workouts/${workout.id}`)
      .then((resp) => {
        // console.log(resp.data);
        // setWorkouts(resp.data);
        setWorkouts((prevState) => prevState.filter((f) => f.id !== resp.data.id));
      })
      .catch((error) => {
        // console.log(error.response);
      });
  };

  return (
    <div className='workout-details'>
      <h4>
        <Link to={`/${workout.id}`}>{workout.title}</Link>
      </h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Number of reps: </strong>
        {workout.reps}
      </p>
      <p>{moment(workout.createdAt).fromNow()}</p>
      <span onClick={handleClick} className='material-symbols-outlined'>
        delete
      </span>
      {/* <span className='material-symbols-outlined' style={{ right: 65 }}>
        edit
      </span> */}
    </div>
  );
};

export default WorkoutDetails;
