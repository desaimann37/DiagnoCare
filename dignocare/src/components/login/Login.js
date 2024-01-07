import React, { useState } from 'react';
import farmImage from '../../assets/doctor-bg1.png';
import './login.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isRegister, setIsRegister] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  return (
    <div className="login-container">
      <div className="login-image-section">
        <img src={farmImage} alt="hello" />
      </div>
      <div className="login-text-section">
        <div className="col-xxl-8 col-xl-9 col-lg-9 col-md-7 col-sm-9">
          <div className="card-body p-5">
            <h1 className="fs-4 card-title fw-bold mb-4">{isRegister ? 'Register' : 'Login'}</h1>
            <form
              method="POST"
              className="needs-validation"
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              {isRegister && (
                <div className="mb-3">
                  <label className="mb-2 text-muted" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">Name is required</div>
                </div>
              )}

              <div className="mb-3">
                <label className="mb-2 text-muted" htmlFor="email">
                  E-Mail Address
                </label>
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoFocus
                />
                <div className="invalid-feedback">Email is invalid</div>
              </div>

              <div className="mb-3">
                <div className="mb-2 w-100">
                  <label className="text-muted" htmlFor="password">
                    Password
                  </label>
                </div>
                <input
                  id="password"
                  type="password"
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
                  {isRegister ? 'Register' : 'Login'}
                </button>
              </div>
            </form>
            <div className="card-footer py-3 border-0">
              <div className="text-center">
                {isRegister ? (
                  <>
                    Already have an account?{' '}
                    <span className="text-dark underline" onClick={toggleForm}>
                      Login
                    </span>
                  </>
                ) : (
                  <>
                    Don't have an account?{' '}
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
}

export default Login;