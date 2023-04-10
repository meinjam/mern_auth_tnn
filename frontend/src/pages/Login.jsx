import { useContext, useState } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
const Login = () => {
  const { setUser, setAuthorization } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = { email, password };

    setLoading(true);

    axios
      .post('/api/user/login', postData)
      .then((resp) => {
        console.log(resp.data);
        localStorage.setItem('user', JSON.stringify(resp.data));
        setAuthorization(resp?.data?.token);
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
    <form className='login' onSubmit={handleSubmit}>
      <h3>Log In</h3>

      <label>Email address:</label>
      <input type='email' onChange={(e) => setEmail(e.target.value)} value={email} />
      <label>Password:</label>
      <input type='password' onChange={(e) => setPassword(e.target.value)} value={password} />

      <button disabled={loading}>Log in</button>
      {error && <div className='error'>{error}</div>}
    </form>
  );
};

export default Login;
