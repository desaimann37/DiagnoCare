import React from 'react'
import './dropdown.css'
const Dropdown = () => {
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
              <span className="block bold">Jane Doe</span>
              <span className="block italic">jane@example.com</span>
            </p>
          </li>
          {/* Menu links */}
          <li>
            <a href="#">
              <span className="material-symbols-outlined">account_circle</span> Account
            </a>
          </li>
          <li>
            <a href="#">
              <span className="material-symbols-outlined">settings</span> Settings
            </a>
          </li>
          <li>
            <a href="#">
              <span className="material-symbols-outlined">help</span> Help
            </a>
          </li>
          {/* Optional divider */}
          <li className="divider"></li>
          <li>
            <a href="#">
              <span className="material-symbols-outlined">logout</span> Logout
            </a>
          </li>
        </ul>
      </details>
    </div>
  )
}

export default Dropdown