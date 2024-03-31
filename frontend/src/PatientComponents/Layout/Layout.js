import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import "./layout.css";
import Dropdown from "./Dropdown";
import Footer from "../../DoctorComponents/Footer/Footer";

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

  return (
    <>
      <nav className="layout-navbar">
        <div className="layout-container">
          <div className="layout-logo">
            <b>
              Diagno<span>Care</span>
            </b>
          </div>
          <div className="layout-menu-icon" onClick={handleShowNavbar}>
            <MenuOpenIcon sx={{ fontSize: 45 }} />
          </div>
          <div className={`layout-nav-elements  ${showNavbar && "active"}`}>
            <ul>
              <li>
                <Link to="/patient">Home</Link>
              </li>
              <li>
                <Link to="/patient/services">Services</Link>
              </li>
              <li>
                <Link to="/patient/doctors">Find a Doctor</Link>
              </li>
              <li>
                <Link to="/patient/chatbot">ChatBot</Link>
              </li>
            </ul>
            {leftPosition && (
              <div
                className="layout-active-link"
                style={{ left: `${leftPosition}%` }}
              ></div>
            )}
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
    case "/patient":
      return 1;
    case "/patient/services":
      return 23.9;
    case "/patient/doctors":
      return 53.2;
    case "/patient/doctors/:id":
      return 53.2;
    case "/patient/chatbot":
      return 82.9;
    default:
      return null;
  }
};

export default Layout;
