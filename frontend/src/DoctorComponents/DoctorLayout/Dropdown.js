import React, { useEffect , useState} from 'react'
import './dropdown.css'
import { Link } from 'react-router-dom'

const Dropdown = () => {
  const [LoggedinObj, setLoggedinObj] = useState(null);

  useEffect(() => {
    const storedUserObj = localStorage.getItem('loggedin_obj');
    const parsedUserObj = storedUserObj ? JSON.parse(storedUserObj) : null;
    setLoggedinObj(parsedUserObj);
  }, []);

  const handleLogout = () => {
    // Send logout request to the backend
    fetch('/logout', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    .then(response => {
      if (response.ok) {
        localStorage.removeItem('loggedin_obj');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else {
        console.error('Logout failed:', response.statusText);
      }
    })
    .catch(error => {
      console.error('Error during logout:', error);
    });
  };

  return (
    <div className="dropdown-container">
      <details className="dropdown right">
        <summary className="avatar">
          <img src={`data:image/jpeg;base64,${LoggedinObj.photo.$binary.base64}`} alt="Avatar" />
        </summary>
        <ul>
          <li>
            {LoggedinObj  ? (
              <p>
                <span className="block bold">{LoggedinObj.name}</span>
                <br />
                <span className="block italic">{LoggedinObj.email}</span>
              </p>
            ) : (
              <p>
                <span className="block bold">Not logged in</span>
              </p>
            )}
          </li>
          <li>
            <Link to="/account">
              <span className="material-symbols-outlined">Account</span>
            </Link>
          </li>
          {/* <li className="divider"></li> */}
          <li>
            {LoggedinObj && (
              <Link to="#">
                <span onClick={handleLogout} className="material-symbols-outlined">
                  Logout
                </span>
              </Link>
            )}
          </li>
        </ul>
      </details>
    </div>
  );
};

export default Dropdown;
