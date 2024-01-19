import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const User = () => {
  const [user, setUser] = useState<any>();
  useEffect(() => {
    async function getUser() {
      try {
        const getUserDetails = await fetch(
          `${process.env.REACT_APP_SERVERURL}/api/v1/user`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (getUserDetails.ok) {
          const responseData = await getUserDetails.json();
          setUser(responseData.data);
        }
      } catch (error) {
        console.error(`An error occurred while fetching data: ${error}`);
      }
    }
    getUser();
  }, []);
  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={12} sm={12} md={6} lg={12}>
            <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
              <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                  <MDBCol lg="6" className="mb-4 mb-lg-0">
                    <MDBCard className="mb-3" style={{ borderRadius: ".5rem" }}>
                      <MDBRow className="g-0">
                        <MDBCol
                          md="4"
                          className="gradient-custom text-center text-white"
                          style={{
                            borderTopLeftRadius: ".5rem",
                            borderBottomLeftRadius: ".5rem",
                          }}
                        >
                          <MDBCardImage
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                            alt="Avatar"
                            className="my-5"
                            style={{ width: "80px" }}
                            fluid
                          />
                          <MDBTypography tag="h5">Marie Horwitz</MDBTypography>
                          <MDBCardText>Web Designer</MDBCardText>
                          <MDBIcon far icon="edit mb-5" />
                        </MDBCol>
                        <MDBCol md="8">
                          <MDBCardBody className="p-4">
                            <MDBTypography tag="h6">
                              Profile Information
                            </MDBTypography>
                            <hr className="mt-0 mb-4" />
                            <MDBRow className="pt-1">
                              <MDBCol size="6" className="mb-3">
                                <MDBTypography tag="h6">
                                  First Name
                                </MDBTypography>
                                <MDBCardText className="text-muted">
                                  {user && user.firstName}
                                </MDBCardText>
                              </MDBCol>
                              <MDBCol size="6" className="mb-3">
                                <MDBTypography tag="h6">LastName</MDBTypography>
                                <MDBCardText className="text-muted">
                                  {user && user.lastName}
                                </MDBCardText>
                              </MDBCol>
                            </MDBRow>

                            <MDBRow className="pt-1">
                              <MDBCol size="6" className="mb-3">
                                <MDBTypography tag="h6">Email</MDBTypography>
                                <MDBCardText className="text-muted">
                                  {user && user.email}
                                </MDBCardText>
                              </MDBCol>
                              <MDBCol size="6" className="mb-3">
                                <MDBTypography tag="h6">Phone</MDBTypography>
                                <MDBCardText className="text-muted">
                                  {user && user.mobileNumber}
                                </MDBCardText>
                              </MDBCol>
                            </MDBRow>

                            <div className="d-flex justify-content-start">
                              <a href="#!">
                                <MDBIcon fab icon="facebook me-3" size="lg" />
                              </a>
                              <a href="#!">
                                <MDBIcon fab icon="twitter me-3" size="lg" />
                              </a>
                              <a href="#!">
                                <MDBIcon fab icon="instagram me-3" size="lg" />
                              </a>
                            </div>
                          </MDBCardBody>
                        </MDBCol>
                      </MDBRow>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </section>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default User;
