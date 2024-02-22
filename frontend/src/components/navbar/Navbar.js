import { useState ,useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import { ReactComponent as Hamburger } from '../../assets/hamburger.svg'
import './navbar.css'
import Dropdown from './Dropdown'

const Navbar = () => {
  // const user = OnClick?.user
  const [showNavbar, setShowNavbar] = useState(false);
  const [LoggedinObj,setLoggedinObj] = useState(null);
  const [isAuthenticated , setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUserObj = localStorage.getItem('loggedin_obj');
    // console.log('Stored User Object:', storedUserObj);
    setLoggedinObj(storedUserObj ? storedUserObj : null);
  }, []);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
        <b>Diagno<span>Care</span></b>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <Hamburger />
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          <ul>
            <li>
              <NavLink to="/home">Home</NavLink>
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
              <NavLink to="/braintumor">BrainTumor</NavLink>
            </li>
           {/* Add One NavLink to end of nav bar at right corner */}

          
              <li>
                <NavLink to="/login">SignIn</NavLink>
              </li>
           
            <li onClick={()=>setIsAuthenticated((prev)=> !prev)}>
              <NavLink to="/Profile">Profile</NavLink>
            </li>
          </ul>
        </div>
      </div>
      <Dropdown obj1={LoggedinObj} />
    </nav>
  )
}

export default Navbar