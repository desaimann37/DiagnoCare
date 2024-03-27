import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLinkedin,
  faGithub,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import "./footer.css";


const Footer = () => {

  const [userRole, setUserRole] = useState("");

  useEffect(() => {
  
    const storedObject = localStorage.getItem('loggedin_obj');
    const parsedObject = JSON.parse(storedObject);

    if (parsedObject && parsedObject.user && parsedObject.user.role) {
      setUserRole(parsedObject.user.role);
    }
  }, []);

  return (
    <html>

<body className="b1">
  <footer className="footer">
    <div className="waves">
      <div className="wave" id="wave1"></div>
      <div className="wave" id="wave2"></div>
      <div className="wave" id="wave3"></div>
      <div className="wave" id="wave4"></div>
    </div>
    <ul className="social-icon">
      <li className="social-icon__item"><a className="social-icon__link" href="#">
      <FontAwesomeIcon icon={faInstagram} />
        </a></li>
      <li className="social-icon__item"><a className="social-icon__link" href="#">
      <FontAwesomeIcon icon={faLinkedin} />
        </a></li>
      <li className="social-icon__item"><a className="social-icon__link" href="https://github.com/ishapaghdal301/DiagnoCare">
      <FontAwesomeIcon icon={faGithub} />
        </a></li>
    </ul>
    {userRole=="patient"?<ul className="menu">
      <li className="menu__item"><a className="menu__link" href="/p-layout">Home</a></li>
      <li className="menu__item"><a className="menu__link" href="/p-layout/doctors">Find a doctor</a></li>
      <li className="menu__item"><a className="menu__link" href="/p-layout/services">Services</a></li>

    </ul>: <ul className="menu">
      <li className="menu__item"><a className="menu__link" href="/">Home</a></li>
      <li className="menu__item"><a className="menu__link" href="//diabetes">Diabetes</a></li>
      <li className="menu__item"><a className="menu__link" href="/lungcancer">LungCancer</a></li>
      <li className="menu__item"><a className="menu__link" href="/alzheimer">Alzheimer's</a></li>
      <li className="menu__item"><a className="menu__link" href="/braintumor">BrainTumor</a></li>

    </ul>}
    <p>&copy;2024 DiagnoCare | All Rights Reserved</p>
  </footer>
  <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
  <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
</body>

</html>
  )
};

export default Footer;
