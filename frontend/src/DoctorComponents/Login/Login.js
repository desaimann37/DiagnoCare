import React, { useState } from "react";
import axios from "axios";
import doc3 from "../../assets/doc3.jpg";
import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

const Login = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isRegister, setIsRegister] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please Fill Up All The Fields.",
      });
      return;
    }

    const endpoint = isRegister ? "signup" : "login";

    if(endpoint === "signup"){
      if(!formData.name){
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Please Fill Up All The Fields.",
        });
        return;
      }
    }
    try {
      const response = await axios.post(
        `https://ishapaghdal-DiagnoCare.hf.space/auth/${endpoint}`,
        formData
      );
      console.log(response);
      const user = response.data;
      // const user = JSON.parse(userJsonString);
      console.log(user);

      localStorage.setItem("user", user.user);
      localStorage.setItem("token", response.data.tokens.access);

      setIsRegister(true);
      const user_obj = JSON.parse(user.user);
      console.log(user_obj);

      console.log(user_obj.role);

      props.onUserLogin(user.user);
      if (JSON.parse(user.user).role == "doctor") {
        window.location.href = "/doctor";
      } else {
        window.location.href = "/patient";
      }

      
        if(response.status == 200){

          if(endpoint === "login"){
          Swal.fire({
            icon: "success",
            title: "Signup successful! ",
            text: "User registered successfully.",
          });
          }
      
      if(endpoint === "login"){
        if(response.status == 200){
          Swal.fire({
            icon: "success",
            title: "Login successful! ",
            text: "User loggedin successfully.",
          });
        }
      }
    }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 401) {
          Swal.fire({
            icon: "error",
            title: "Password incorrect!",
            text: "Please provide the correct password.",
          });
        } else if (status === 404) {
          Swal.fire({
            icon: "error",
            title: "User not found!",
            text: "Please provide the correct email address.",
          });
        } else if (status === 400) {
          Swal.fire({
            icon: "error",
            title: "Email already exists!",
            text: "Please provide another email address.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred. Please try again later.",
          });
        }
      }
    }
  };

  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  return (
    <div className="login-container">
      <div className="login-image-section">
        <img src={doc3} alt="hello" />
      </div>
      <div className="login-text-section">
        <div className="col-xxl-8 col-xl-9 col-lg-9 col-md-7 col-sm-9">
          <div className="card-body p-5">
            <h1 className="fs-10 card-title fw-bold mb-4">
              {isRegister ? "Register" : "Login"}
            </h1>
            <form
              method="POST"
              className="needs-validation"
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              {isRegister && (
                <>
                  <div className="mb-3">
                    <label className="mb-2 label-large " htmlFor="name">
                      Name <span>*</span>
                    </label>
                    <input
                      id="name"
                      placeholder="Enter your name"
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <div className="invalid-feedback">Name is required</div>
                  </div>

                  <div className="mb-3 ">
                    <label className="mb-2 label-large" htmlFor="Role">
                      Role <span>*</span>
                    </label>
                    <select
                      id="Role"
                      className="form-control custom-dropdown"
                      name="Role"
                      value={formData.Role}
                      onChange={handleChange}
                      requir
                    >
                      {/* <option value="">Select an option</option> */}
                      <option value="1">Doctor</option>
                      <option value="0">Patient</option>
                    </select>
                    <div className="invalid-feedback">Role is required</div>
                  </div>
                </>
              )}

              <div className="mb-3">
                <label className="mb-2 label-large" htmlFor="email">
                  E-Mail Address <span>*</span>
                </label>
                <input
                  id="email"
                  placeholder="Enter your Email address "
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoFocus
                />
                <div className="invalid-feedback">Email is invalid </div>
              </div>

              <div className="mb-3">
                <div className="mb-2 w-100">
                  <label className=" label-large" htmlFor="password">
                    Password <span>*</span>
                  </label>
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter Password"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">Password is required</div>
              </div>

              <div className="align-items-center">
                <button type="submit" className="btn btn-primary">
                  {isRegister ? "Register" : "Login"}
                </button>
              </div>
            </form>
            <div className="card-footer py-3 border-0">
              <div className="text-center">
                {isRegister ? (
                  <>
                    Already have an account?{" "}
                    <span className="text-dark underline" onClick={toggleForm}>
                      Login
                    </span>
                  </>
                ) : (
                  <>
                    Don't have an account?{" "}
                    <span className="text-dark underline" onClick={toggleForm}>
                      Create One
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
