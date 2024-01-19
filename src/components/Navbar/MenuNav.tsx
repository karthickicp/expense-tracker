import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useLocation } from "react-router-dom";

const MenuNav = () => {
  const location = useLocation();
  const SidebarItems = [
    {
      name: "Dashboard",
      route: "/dashboard",
    },
    {
      name: "Income",
      route: "/income",
    },
    {
      name: "Expense",
      route: "/expense",
    },
    {
      name: "User Details",
      route: "/user",
    },
    {
      name: "Signout",
      route: "/signout",
    },
  ];

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Nav className="me-auto">
            {SidebarItems.map((item) => (
              <Nav.Link
                key={item.route}
                href={item.route}
                active={location.pathname === item.route}
              >
                {item.name}
              </Nav.Link>
            ))}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default MenuNav;
