import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faDribbble,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <h6>About</h6>
            <p className="text-justify">
              Discover the future of medical diagnostics with <i>DiagnoCare</i>.
              Sign up today and elevate your diagnostic capabilities to new
              heights. <i>DiagnoCare</i> is committed to advancing healthcare practices through innovation and expertise. Join us in revolutionizing disease diagnosis and providing the best possible care to your patients.
            </p>
          </div>

          <div className="col-xs-6 col-md-3">
            <h6>Categories</h6>
            <ul className="footer-links">
              <li>
                <a href="http://scanfcode.com/category/c-language/">C</a>
              </li>
              <li>
                <a href="http://scanfcode.com/category/front-end-development/">
                  UI Design
                </a>
              </li>
              <li>
                <a href="http://scanfcode.com/category/back-end-development/">
                  PHP
                </a>
              </li>
              <li>
                <a href="http://scanfcode.com/category/java-programming-language/">
                  Java
                </a>
              </li>
              <li>
                <a href="http://scanfcode.com/category/android/">Android</a>
              </li>
              <li>
                <a href="http://scanfcode.com/category/templates/">Templates</a>
              </li>
            </ul>
          </div>

          <div className="col-xs-6 col-md-3">
            <h6>Quick Links</h6>
            <ul className="footer-links">
              <li>
                <a href="http://scanfcode.com/about/">About Us</a>
              </li>
              <li>
                <a href="http://scanfcode.com/contact/">Contact Us</a>
              </li>
              <li>
                <a href="http://scanfcode.com/contribute-at-scanfcode/">
                  Contribute
                </a>
              </li>
              <li>
                <a href="http://scanfcode.com/privacy-policy/">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="http://scanfcode.com/sitemap/">Sitemap</a>
              </li>
            </ul>
          </div>
          <hr />
        </div>
      </div>
      <div className="container">
        <div className="row w-100">
          <div className="col-md-8 col-sm-6 col-xs-12">
            <p className="copyright-text">
              Copyright &copy; 2017 All Rights Reserved by
              <a href="#">Scanfcode</a>.
            </p>
          </div>

          <div className="col-md-4 col-sm-6 col-xs-12">
            <ul className="social-icons">
              <li>
                <a className="facebook" href="#">
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
              </li>
              <li>
                <a className="twitter" href="#">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </li>
              <li>
                <a className="dribbble" href="#">
                  <FontAwesomeIcon icon={faDribbble} />
                </a>
              </li>
              <li>
                <a className="linkedin" href="#">
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
