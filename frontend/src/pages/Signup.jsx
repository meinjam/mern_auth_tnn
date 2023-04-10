import axios from 'axios';
import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';

const Signup = () => {
  const { setUser } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = { name, email, password };

    setLoading(true);

    axios
      .post('/api/user/signup', postData)
      .then((resp) => {
        console.log(resp.data);
        localStorage.setItem('user', JSON.stringify(resp.data));
        setUser(resp.data);
        setError(null);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setError(error?.response?.data?.error);
        setLoading(false);
      });

    // console.log(email, password);
  };

  return (
    <form className='signup' onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <label>Full Name:</label>
      <input type='text' onChange={(e) => setName(e.target.value)} value={name} />
      <label>Email address:</label>
      <input type='email' onChange={(e) => setEmail(e.target.value)} value={email} />
      <label>Password:</label>
      <input type='password' onChange={(e) => setPassword(e.target.value)} value={password} />

      <button disabled={loading}>Sign up</button>
      {error && <div className='error'>{error}</div>}
    </form>
  );
};

export default Signup;
