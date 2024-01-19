import { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { User } from "../types/User";
import "./style.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const initialValues: User = {
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    password: "",
  };

  const navigate = useNavigate();
  const [user, setUser] = useState<User>(initialValues);
  const [showSucess, setshowSucess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${process.env.SERVER_URL}/v1/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        setUser(initialValues);
        setshowSucess(true);
      } else {
        setShowError(true);
      }
    } catch (error) {
      console.error(`An error occurred while fetching data: ${error}`);
    }
  };

  return (
    <>
      <div className="register-form">
        <Container>
          <div className="register-form-content">
            <div className="register-form-wrap-content">
              <h1>SignUp</h1>
              <Row>
                <Col xs={12} sm={12} md={6} lg={4} xl={4}></Col>
                <Col xs={12} sm={12} md={6} lg={4} xl={4}>
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
                  <div className="submit-button">
                    <Button
                      as="input"
                      type="submit"
                      value="Submit"
                      onClick={handleSubmit}
                    />
                    <Button
                      as="input"
                      type="submit"
                      value="Login"
                      style={{ marginLeft: "10px" }}
                      onClick={() => navigate("/")}
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default SignUp;
