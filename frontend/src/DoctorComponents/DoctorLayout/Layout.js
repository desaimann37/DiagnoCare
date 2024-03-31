import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import "./layout.css";
import Dropdown from "./Dropdown";
import Footer from "../Footer/Footer";

const Layout = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [LoggedinObj, setLoggedinObj] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const storedUserObj = localStorage.getItem("loggedin_obj");
    setLoggedinObj(storedUserObj ? storedUserObj : null);
  }, []);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const leftPosition = calculateLeftPosition(location.pathname);
  const showSlider = leftPosition !== null;

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div className="logo">
            <b>
              Diagno<span>Care</span>
            </b>
          </div>
          <div className="menu-icon" onClick={handleShowNavbar}>
            <MenuOpenIcon sx = {{fontSize: 45}}/>
          </div>
          <div className={`nav-elements  ${showNavbar && "active"}`}>
            <ul>
              <li>
                <Link to="/doctor">Home</Link>
              </li>
              <li>
                <Link to="/doctor/diabetes">Diabetes</Link>
              </li>
              <li>
                <Link to="/doctor/lungcancer">LungCancer</Link>
              </li>
              <li>
                <Link to="/doctor/alzheimer">Alzheimer's</Link>
              </li>
              <li>
                <Link to="/doctor/braintumor">BrainTumor</Link>
              </li>
            </ul>
            {showSlider && <div className="active-link" style={{ left: `${leftPosition}%` }}></div>}
          </div>
        </div>
        <Dropdown obj1={LoggedinObj} />
      </nav>
      <Outlet />
      <Footer />
    </>
  );
};

const calculateLeftPosition = (pathname) => {
  switch (pathname) {
    case '/doctor':
      return 0.2;
    case '/doctor/diabetes':
      return 17.9;
    case '/doctor/lungcancer':
      return 39.2;
    case '/doctor/alzheimer':
      return 62.5;
    case '/doctor/braintumor':
      return 85;
    default:
      return null;
  }
};

export default Layout;
