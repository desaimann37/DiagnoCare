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
        // Clear logged-in user data and token from localStorage
        localStorage.removeItem('loggedin_obj');
        localStorage.removeItem('user');
        // Redirect or perform any other action after successful logout
        // For example, redirecting to the login page
        window.location.href = '/login';
      } else {
        // Handle error response from the backend
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
          <img src="https://gravatar.com/avatar/00000000000000000000000000000000?d=mp" alt="Avatar" />
        </summary>
        <ul>
          <li>
            {LoggedinObj && LoggedinObj.user ? (
              <p>
                <span className="block bold">{LoggedinObj.user.name}</span>
                <br />
                <span className="block italic">{LoggedinObj.user.email}</span>
              </p>
            ) : (
              <p>
                <span className="block bold">Not logged in</span>
              </p>
            )}
          </li>
          {/* Menu links */}
          <li>
            <Link to="/account">
              <span className="material-symbols-outlined">Account</span>
            </Link>
          </li>
          <li>
            <Link to="#">
              <span className="material-symbols-outlined">Settings</span>
            </Link>
          </li>
          <li>
            <Link to="#">
              <span className="material-symbols-outlined">Help</span>
            </Link>
          </li>
          {/* Optional divider */}
          <li className="divider"></li>
          <li>
            {LoggedinObj && LoggedinObj.user && (
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
