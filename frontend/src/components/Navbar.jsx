import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <header>
      <div className='container'>
        <Link to='/'>
          <h1>Workout Buddy</h1>
        </Link>
        <nav>
          {user ? (
            <div>
              <span>{user?.email}</span>
              <button onClick={handleLogout}>Log out</button>
            </div>
          ) : (
            <div>
              <Link to='/login'>Login</Link>
              <Link to='/signup'>Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
