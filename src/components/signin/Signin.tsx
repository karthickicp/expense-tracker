import {
  Alert,
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";

import "./style.css";
import { useState } from "react";
import { Login } from "../types/User";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();

  const initialValues: Login = {
    email: "",
    password: "",
  };

  const [user, setUser] = useState<Login>(initialValues);
  const [showError, setShowError] = useState(false);
  const [showSucess, setshowSucess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
    setShowError(false);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/v1/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        setshowSucess(true);
        setUser(initialValues);
        const responseData = await response.json();
        const authenticatedHeaders = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${responseData.data}`,
        };
        localStorage.setItem("token", responseData.data);
        navigate("/dashboard");
      } else {
        setShowError(true);
      }
    } catch (error) {
      console.error(`An error occurred while fetching data: ${error}`);
    }
  };

  return (
    <div className="login-form">
      <Container>
        <div className="wrapper">
          <div className="form-wrapper sign-in">
            <h1>Login</h1>
            <Row>
              <div className="login-left-container">
                <Col xs={12} sm={12} md={6} lg={4} xl={4}>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                  >
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="name@example.com"
                      value={user.email}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                  <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={user.password}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                  <Alert variant={"danger"} className="mt-3" show={showError}>
                    Invalid Email-id or Password
                  </Alert>
                  <Alert variant={"success"} className="mt-3" show={showSucess}>
                    You are successfully logged in
                  </Alert>
                  <Button
                    as="input"
                    type="submit"
                    value="Submit"
                    onClick={handleSubmit}
                  />
                  <Button
                    onClick={() => navigate("/signup")}
                    value="Register"
                    style={{ marginLeft: "10px" }}
                  >
                    Register
                  </Button>
                </Col>
              </div>
              <Col xs={12} sm={12} md={6} lg={4} xl={4}></Col>
            </Row>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Signin;
