import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./profile.css";

function Logout() {
  const handleLogout = () => {
    localStorage.setItem("login", "false");
  };

  return (
    <Link
      to="/"
      onClick={handleLogout}
      className="link"
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = "rgb(191, 28, 28)";
        e.target.style.color = "white";
        e.target.style.height = "40px";
        e.target.style.padding = "1%";
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = "transparent";
        e.target.style.color = "black";
      }}
    >
      Log Out
    </Link>
  );
}

export default function Profile() {
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const [showProducts, setShowProducts] = useState({}); // State to track product visibility

  useEffect(() => {
    // Fetch user data
    axios
      .post("http://localhost/React_project/back-end/profile/viewProfile.php", {
        id: localStorage.getItem("id"),
      })
      .then((response) => {
        console.log("Response data:", response.data);
        if (Array.isArray(response.data) && response.data.length > 0) {
          setUser(response.data[0]);
          // Initialize updatedUser with the fetched user data
          setUpdatedUser(response.data[0]);
        } else {
          console.error("No user data found.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // Fetch order data
    axios
      .post("http://localhost/React_project/back-end/profile/orders.php", {
        id: localStorage.getItem("id"),
      })
      .then((response) => {
        console.log("Response orders data:", response.data);
        if (Array.isArray(response.data) && response.data.length > 0) {
          // Initialize showProducts state with the fetched order data
          const initialShowProductsState = {};
          response.data.forEach((order) => {
            initialShowProductsState[order.BillID] = false;
          });
          setShowProducts(initialShowProductsState);

          console.log(response.data);
          // Set the orders state with the fetched order data
          setOrders(response.data);
        } else {
          console.error("No order data found.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleShowProducts = (billID) => {
    // Toggle the showProducts state for the clicked order
    setShowProducts((prevShowProducts) => ({
      ...prevShowProducts,
      [billID]: !prevShowProducts[billID],
    }));
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveChanges = () => {
    // Send updated user data to the server
    axios
      .post(
        "http://localhost/React_project/back-end/profile/update.php",
        updatedUser
      )
      .then((response) => {
        console.log("Response from PHP:", response.data);
        setIsEditing(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  return (
    <div>

      <div>
        <section className="my-5">
          <div className="container">
            <div className="main-body">
              <div className="row">
                <div className="col-lg-4">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex flex-column align-items-center text-center">
                        <img
                          src="https://bootdey.com/img/Content/avatar/avatar6.png"
                          alt="Admin"
                          className="rounded-circle p-1 bg-danger"
                          width="110"
                        />
                        <div className="mt-3">
                          <h4>
                            {user.FirstName} {user.LastName}
                          </h4>
                          <p className="text-secondary mb-1">{user.Email}</p>
                        </div>
                      </div>
                      <div className="list-group list-group-flush text-center mt-4">
                        <a
                          href="#personal"
                          className="list-group-item list-group-item-action border-0"
                        >
                          Profile Information
                        </a>
                        <a
                          href="#order"
                          className="list-group-item list-group-item-action border-0"
                        >
                          Orders
                        </a>
                        <a
                          href="#settings"
                          className="list-group-item list-group-item-action border-0"
                        >
                          Settings
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8" id="personal">
                  <div className="card">
                    <div className="card-body">
                      <div className="top-status">
                        <h4>Personal Information</h4>
                        <br />
                        <p>
                          <span style={{ color: "black", fontSize: "18px" }}>
                            {" "}
                            First Name:{" "}
                          </span>
                          {user.FirstName}
                        </p>
                        <p>
                          <span style={{ color: "black", fontSize: "18px" }}>
                            {" "}
                            Last Name:{" "}
                          </span>{" "}
                          {user.LastName}
                        </p>
                        <p>
                          <span style={{ color: "black", fontSize: "18px" }}>
                            {" "}
                            Email:{" "}
                          </span>
                          {user.Email}
                        </p>
                        <p>
                          <span style={{ color: "black", fontSize: "18px" }}>
                            {" "}
                            Phone Number:{" "}
                          </span>
                          {user.phone}
                        </p>
                        <p>
                          <span style={{ color: "black", fontSize: "18px" }}>
                            {" "}
                            Shipping Address:{" "}
                          </span>
                          {user.ShippingAddress}
                        </p>
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className="col-lg-12" id="order">
                   
                  </div>

                  <br />
                  <div className="col-lg-12" id="settings">
                    <div className="card">
                      <div className="card-body">
                        <div className="top-status">
                          <h4>Settings</h4>
                          <br />
                          {isEditing ? (
                            <div>
                              <button
                                style={{
                                  background: "rgb(191, 28, 28)",
                                  color: "white",
                                }}
                                className="btn "
                                onClick={handleSaveChanges}
                              >
                                Save Changes
                              </button>
                              <button
                                className="btn btn-secondary ml-2"
                                onClick={handleCancelEdit}
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              style={{
                                background: "rgb(191, 28, 28)",
                                color: "white",
                              }}
                              className="btn "
                              onClick={handleEditClick}
                            >
                              Edit Profile
                            </button>
                          )}
                        </div>
                        {isEditing ? (
                          <div>
                            <form>
                              <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="firstName"
                                  name="FirstName"
                                  value={updatedUser.FirstName}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="lastName"
                                  name="LastName"
                                  value={updatedUser.LastName}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="email"
                                  name="Email"
                                  value={updatedUser.Email}
                                  onChange={handleChange}
                                />
                              </div>
                              <div
                                className="form-group"
                                style={{ display: "none" }}
                              >
                                <label htmlFor="email">UserId</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="email"
                                  name="UserId"
                                  value={updatedUser.UserId}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="phone"
                                  name="phone"
                                  value={updatedUser.phone}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="shippingAddress">
                                  Shipping Address
                                </label>
                                <textarea
                                  className="form-control"
                                  id="shippingAddress"
                                  name="ShippingAddress"
                                  value={updatedUser.ShippingAddress}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="form-group" type="password">
                                <label htmlFor="Password">Password</label>
                                <textarea
                                  className="form-control"
                                  id="password"
                                  name="Password"
                                  value={updatedUser.Password}
                                  onChange={handleChange}
                                />
                              </div>
                            </form>
                          </div>
                        ) : (
                          <div>{/* Display user information here */}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

    </div>
  );
}