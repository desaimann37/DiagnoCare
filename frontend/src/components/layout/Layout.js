import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import "./layout.css";
import Dropdown from "./Dropdown";
import Footer from "../footer/Footer";

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
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/diabetes">Diabetes</Link>
              </li>
              <li>
                <Link to="/lungcancer">LungCancer</Link>
              </li>
              <li>
                <Link to="/alzheimer">Alzheimer's</Link>
              </li>
              <li>
                <Link to="/braintumor">BrainTumor</Link>
              </li>
            </ul>
            <div className="active-link" style={{ left: `${calculateLeftPosition(location.pathname)}%` }}></div>
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
    case '/':
      return 0.2;
    case '/diabetes':
      return 17.9;
    case '/lungcancer':
      return 39.2;
    case '/alzheimer':
      return 62.5;
    case '/braintumor':
      return 85;
    default:
      return 0;
  }
};

export default Layout;
