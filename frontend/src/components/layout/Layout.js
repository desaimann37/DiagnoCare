import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { ReactComponent as Hamburger } from "../../assets/hamburger.svg";
import "./navbar.css";
import Dropdown from "./Dropdown";
import Footer from "../footer/Footer";

const Layout = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [LoggedinObj, setLoggedinObj] = useState(null);

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
            <Hamburger />
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
          </div>
        </div>
        <Dropdown obj1={LoggedinObj} />
      </nav>
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
