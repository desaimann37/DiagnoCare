import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ReactComponent as Hamburger } from '../../assets/hamburger.svg'
import './navbar.css'

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
        <b>DignoCare</b>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <Hamburger />
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/diabetes">Diabetes</NavLink>
            </li>
            <li>
              <NavLink to="/lungcancer">LungCancer</NavLink>
            </li>
            <li>
              <NavLink to="/alzheimer">Alzheimer's</NavLink>
            </li>
            <li>
              <NavLink to="/BrainTumor">BrainTumor</NavLink>
            </li>
            <li>
              <NavLink to="/login">SignIn</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar