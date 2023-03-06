import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";
import BackgroundImg from "../assets/bear.jpg";

import "./SignupStyles.css";

function Signup(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="orange-out">
    <div className="signup background">
      <img className="img" src={BackgroundImg} alt="teddy bear" />
      <div className="signup-heading">
        <Link to="/login" className="hvr-bounce-in">
          ← Go to Login{" "}
        </Link>
        <h2>Signup</h2>

        <form onSubmit={handleFormSubmit}>
          <div className="first-name-form">
            <label htmlFor="firstName">First Name:</label>
            <input
              placeholder="enter your first name"
              name="firstName"
              type="firstName"
              id="firstName"
              onChange={handleChange}
            />
          </div>

          <div className="last-name-form">
            <label htmlFor="lastName">Last Name:</label>
            <input
              placeholder="enter your last name"
              name="lastName"
              type="lastName"
              id="lastName"
              onChange={handleChange}
            />
          </div>

          <div className="email-form">
            <label htmlFor="email">Email:</label>
            <input
              placeholder="enter your email"
              name="email"
              type="email"
              id="email"
              onChange={handleChange}
            />
          </div>

          <div className="password-form">
            <label htmlFor="pwd">Password:</label>
            <input
              placeholder="enter your password"
              name="password"
              type="password"
              id="pwd"
              onChange={handleChange}
            />
          </div>

          <div className="submit-btn">
            <button type="submit" className="signup-submit-btn hvr-buzz">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div></div>
  );
}

export default Signup;
