import React, { useState } from 'react';
import './login.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = 'http://localhost/React_project/back-end/login/login.php';

      const response = await axios.post(url, formData);

      if (response.data.success) {
        // Store user data in local storage
        localStorage.setItem('login', 'true');
        localStorage.setItem('id', response.data.UserId);

        // Redirect to the homepage or your desired destination
        navigate('/UserProfile');
      } else {
        setError('Email or Password Invalid');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred during login.');
    }
  };

  return (
<div>

    <section className="login pt-100">
      <div className="container">
        <div className="billing-details">
          <h2 className="checkout-title text-uppercase text-center mb-30">
            CUSTOMER LOGIN
          </h2>
          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Email Address"
                required
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your Password"
                required
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="login-btn-g">
              <div className="row">
                <div className="col-6">
                  <button
                    name="submit"
                    type="submit"
                    className="btn btn-color right-side"
                  >
                    Log In
                  </button>
                </div>
              </div>
            </div>
            <div className="new-account text-center mt-20">
              <span>Don't have an account?</span>
              <Link to="/register" className="link" title="Create New Account">
                Create New Account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>



    </div>
  );
};

export default Login;