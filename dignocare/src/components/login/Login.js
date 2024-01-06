import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import './login.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function SignIn() {
  const [logdata, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [isauthenticated, setIsauthenticated] = useState(
    localStorage.getItem('isauthenticated') === 'true'
  );

  useEffect(() => {
    if (isauthenticated) {
      console.log("Authenticated");
      
      setData({ ...logdata, email: "", password: "" });
      localStorage.setItem("isauthenticated", isauthenticated);
    } else {
      console.log(isauthenticated + "400");
      
      localStorage.setItem("isauthenticated", isauthenticated);
    }
  }, [isauthenticated]);

  const adddata = (e) => {
    const { name, value } = e.target;
    setData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const submit = async (e) => {
    e.preventDefault();
  
    const { email, password } = logdata;
    //   toast.error("Login failed. Please check your credentials.");
    }
  
  const labelStyle = { color: "black" };
  const buttonStyle = { backgroundColor: "black", color: "white" };

  const welcomeBackStyle = {
    fontWeight: "bold", 
    fontFamily: "Arial, sans-serif", 
  };

  return (
    <div className="App">
      <div className="container-fluid ps-md-0">
        <div className="row g-0">
          <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
          <div className="col-md-8 col-lg-6">
            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-md-9 col-lg-8 mx-auto">
                    <h3 className="login-heading mb-4" style={{...welcomeBackStyle, ...labelStyle}}>
                      Welcome back!
                    </h3>

                    <form method="POST">
                      <div className="form-floating mb-3">
                        <input
                          type="email"
                          className="form-control"
                          id="floatingInput"
                          name="email"
                          placeholder="name@example.com"
                          value={logdata.email}
                          onChange={adddata}
                        />
                        <label htmlFor="floatingInput" style={labelStyle}>
                          Email address
                        </label>
                      </div>
                      <div className="form-floating mb-3">
                        <input
                          type="password"
                          className="form-control"
                          id="floatingPassword"
                          name="password"
                          placeholder="Password"
                          value={logdata.password}
                          onChange={adddata}
                        />
                        <label htmlFor="floatingPassword" style={labelStyle}>
                          Password
                        </label>
                      </div>
                        <div className="d-grid">
                          <button
                            className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2"
                            type="submit"
                            onClick={submit}
                            style={buttonStyle}
                          >
                            Sign in
                          </button>
                        </div>
                    </form>

                    <div className="d-grid">
                      <div className="text-center">
                        <p style={labelStyle}>New to StudyHub?</p>
                        <NavLink to="/register">
                          <button className="create-account-btn" style={buttonStyle}>
                            Create your Account
                          </button>
                        </NavLink>

                        {isauthenticated && <NavLink to="/">Go to Home</NavLink>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
