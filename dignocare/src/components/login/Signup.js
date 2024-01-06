import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import './login.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function SignUp() {
  const navigate = useNavigate();
  const [udata, setudata] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: "",
    role: "",
  });

  const adddata = (e) => {
    const { name, value } = e.target;

    setudata(() => {
      return {
        ...udata,
        [name]: value,
      };
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    const { first_name, last_name, email, password, password2, role } = udata;

    
  }

  const labelStyle = { color: "black" };
  const buttonStyle = { backgroundColor: "black", color: "white" };

  const welcomeBackStyle = {
    fontWeight: "bold", // Make it bold
    fontFamily: "Arial, sans-serif", // Change the font-family
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
                    <h3 className="login-heading mb-4" style={{ ...welcomeBackStyle, ...labelStyle }}>
                      Welcome back!
                    </h3>

                    <form method="POST">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          name="first_name"
                          placeholder="First Name"
                          value={udata.first_name}
                          onChange={adddata}
                        />
                        <label htmlFor="floatingInput" style={labelStyle}>
                          First Name
                        </label>
                      </div>
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          name="last_name"
                          placeholder="Last Name"
                          value={udata.last_name}
                          onChange={adddata}
                        />
                        <label htmlFor="floatingInput" style={labelStyle}>
                          Last Name
                        </label>
                      </div>

                      <div className="form-floating mb-3">
                        <input
                          type="email"
                          className="form-control"
                          id="floatingInput"
                          name="email"
                          placeholder="name@example.com"
                          value={udata.email}
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
                          value={udata.password}
                          onChange={adddata}
                        />
                        <label htmlFor="floatingPassword" style={labelStyle}>
                          Password
                        </label>
                      </div>
                      <div className="form-floating mb-3">
                        <input
                          type="password"
                          className="form-control"
                          id="floatingPassword"
                          name="password2"
                          placeholder="Confirm Password"
                          value={udata.password2}
                          onChange={adddata}
                        />
                        <label htmlFor="floatingPassword" style={labelStyle}>
                          Confirm Password
                        </label>
                      </div>
                      <div className="form-floating mb-3">
                        <select
                          className="form-select"
                          id="role"
                          name="role"
                          value={udata.role}
                          onChange={adddata}
                        >
                          <option value="">Select Role</option>
                          <option value="teacher">Teacher</option>
                          <option value="student">Student</option>
                        </select>
                        <label htmlFor="role" style={labelStyle}>
                          Role
                        </label>
                      </div>
                      {/* <NavLink> */}
                        <div className="d-grid">
                          <button
                            className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2"
                            type="submit"
                            onClick={submit}
                            style={buttonStyle}
                          >
                            Sign up
                          </button>
                        </div>
                      {/* </NavLink> */}
                    </form>

                    <div className="d-grid">
                      <div className="text-center">
                        <p style={labelStyle}>Already have an account?</p>
                        <NavLink to="/login">
                          <button className="create-account-btn" style={buttonStyle}>
                            Login to your Account
                          </button>
                        </NavLink>
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

export default SignUp;