import React from 'react'
import './dropdown.css'
import { Link } from 'react-router-dom'
const Dropdown = ({obj1}) => {

  return (
    <div className="dropdown-container">
      <details className="dropdown right">
        <summary className="avatar">
          <img src="https://gravatar.com/avatar/00000000000000000000000000000000?d=mp" alt="Avatar" />
        </summary>
        <ul>
          {/* Optional: user details area w/ gray bg */}
          <li>
            <p>
              <span className="block bold">{obj1.user.name}</span>
              <br />
              <span className="block italic">{obj1.user.email}</span>
            </p>
          </li>
          {/* Menu links */}
          <li>
            <Link to="#">
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
            <Link to="/logout">
              <span className="material-symbols-outlined">Logout</span>
            </Link>
          </li>
        </ul>
      </details>
    </div>
  )
}

export default Dropdown