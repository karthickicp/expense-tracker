import React, { useState } from "react";
import "./LoginForm.css"; // Create a CSS file for your styles and import it here
import { Alert, Button, FloatingLabel, Form } from "react-bootstrap";
import { Login, User } from "../components/types/User";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const initialValuesSignIn: Login = {
    email: "",
    password: "",
  };
  const initialValues: User = {
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    password: "",
  };

  const [userSignin, setUserSignin] = useState<Login>(initialValuesSignIn);
  const [showError, setShowError] = useState(false);
  const [showSucess, setshowSucess] = useState(false);
  const [user, setUser] = useState<User>(initialValues);
  const [isSignIn, setIsSignIn] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
    setShowError(false);
  };

  const handleSignUpClick = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/v1/user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      if (response.ok) {
        setUser(initialValues);
        setshowSucess(true);
        const responseData = await response.json();
        localStorage.setItem("token", responseData.data.token);
        navigate("/dashboard");
      } else {
        setShowError(true);
      }
    } catch (error) {
      console.error(`An error occurred while fetching data: ${error}`);
    }
  };

  const handleChangeSigin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserSignin((prev) => ({
      ...prev,
      [name]: value,
    }));
    setShowError(false);
  };

  const handleSignInClick = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/v1/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userSignin),
        }
      );
      if (response.ok) {
        setshowSucess(true);
        setUserSignin(initialValuesSignIn);
        const responseData = await response.json();
        localStorage.setItem("token", responseData.data);
        navigate("/dashboard");
      } else {
        setShowError(true);
      }
    } catch (error) {
      console.error(`An error occurred while fetching data: ${error}`);
    }
  };

  const handlePageChange = async () => {
    if (!isSignIn) {
      setIsSignIn(true);
    } else {
      setIsSignIn(false);
    }
  };

  return (
    <div className="login-container">
      <div
        className={`wrapper ${isSignIn ? "animate-signIn" : "animate-signUp"}`}
      >
        <div className="form-wrapper sign-up">
          <form action="">
            <h2>Sign Up</h2>
            <FloatingLabel
              controlId="floatingFirstName"
              label="First Name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                name="firstName"
                placeholder="First Name"
                value={user.firstName}
                onChange={handleChange}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingLastName"
              label="Last Name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={user.lastName}
                onChange={handleChange}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingMobileNumber"
              label="Mobile Number"
              className="mb-3"
            >
              <Form.Control
                type="number"
                name="mobileNumber"
                placeholder="Mobile Number"
                value={user.mobileNumber}
                onChange={handleChange}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingEmail"
              label="Email-Id"
              className="mb-3"
            >
              <Form.Control
                type="email"
                name="email"
                placeholder="email"
                value={user.email}
                onChange={handleChange}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Password"
              />
            </FloatingLabel>
            <Alert variant={"danger"} className="mt-3" show={showError}>
              All Fields are mandatory
            </Alert>
            <Alert variant={"success"} className="mt-3" show={showSucess}>
              Your Account Has Been Created Successfully
            </Alert>
            <div className="submit-button ">
              <Button
                as="input"
                type="submit"
                value="Submit"
                onClick={handleSignUpClick}
                className="login-btn"
              />
              {/* <Button
              as="input"
              type="submit"
              value="Login"
              onClick={() => navigate("/")}
            /> */}
            </div>
            <div className="sign-link" onClick={handlePageChange}>
              <p>
                Already have an account?{" "}
                <a href="#" className="signIn-link">
                  Sign In
                </a>
              </p>
            </div>
          </form>
        </div>

        <div className="form-wrapper sign-in">
          <form action="" onSubmit={handleSignInClick}>
            <h2>Login</h2>
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-3"
            >
              <Form.Control
                type="email"
                name="email"
                placeholder="name@example.com"
                value={userSignin.email}
                onChange={handleChangeSigin}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={userSignin.password}
                onChange={handleChangeSigin}
              />
            </FloatingLabel>
            <Alert variant={"danger"} className="mt-3" show={showError}>
              Invalid Email-id or Password
            </Alert>
            <Alert variant={"success"} className="mt-3" show={showSucess}>
              You are successfully logged in
            </Alert>
            <div className="submit-button">
              <Button
                as="input"
                type="submit"
                value="Submit"
                className="login-btn"
                //   onClick={handleSignInClick}
              />
            </div>
            <div className="sign-link" onClick={handlePageChange}>
              <p>
                Don't have an account?{" "}
                <a href="#" className="signUp-link">
                  Sign Up
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
