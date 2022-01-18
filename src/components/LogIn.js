import React, { useState } from "react";
import { Navigate } from "react-router-dom";

function LogIn(props) {
  const [user, setUser] = useState({ userName: "", password: "" });
  const [redirect, setRedirect] = useState(false);

  const handleChange = (e) => {
    const updatedUser = { ...user };
    const inputField = e.target.name;
    const inputValue = e.target.value;
    updatedUser[inputField] = inputValue;

    setUser(updatedUser);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // props.mockLogIn(user);
    setRedirect(true);
  };

  if (redirect) {
    return (
    <>
    <Navigate to="/userProfile"/>
    </>)
  }
  return (
    <div>
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#loginform"
      >
        Login
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal"
        id="loginform"
        tabIndex="-1"
        aria-labelledby="loginformLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="loginformLabel">
                Login into Account
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form className="form-content" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="userName">User Name:</label>
                <input
                  className="form-control"
                  type="text"
                  name="userName"
                  onChange={handleChange}
                  value={user.userName}
                />
              </div>
              <div>
                <label htmlFor="password">Password:</label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                />
              </div>

              <div className="modal-footer">
              <button onClick={handleSubmit} className="btn btn-primary">
                  Log In
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="userName">User Name</label>
            <input type="text" name="userName" onChange={handleChange} value={user.userName} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" />
          </div>
          <button>Log In</button>
        </form> */}
    </div>
  );
}

export default LogIn;
