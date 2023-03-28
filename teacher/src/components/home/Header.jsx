import React from "react";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { ClearUser } from "./../../redux/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";

// import NavDropdown from "react-bootstrap/NavDropdown";

const Container1 = styled.div`
  background-color: whitesmoke;
`;
const Header = () => {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const userLogout = async () => {
    localStorage.removeItem("token");
    dispatch(ClearUser());
    window.location.reload();
  };

  return (
    <Container1>
      {[false].map((expand) => (
        <Navbar key={expand} bg="dark" expand={expand} className="mb-3">
          <Container fluid>
            <Navbar.Toggle
              style={{ backgroundColor: "#5b5b5b" }}
              aria-controls={`offcanvasNavbar-expand-${expand}`}
            />
            <Navbar.Brand style={{ color: "white" }} href="/home">
              Teacher Dashboard
            </Navbar.Brand>
            <Button variant="dark" disabled>
              {user?.name}
            </Button>

            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Teacher Dashboard
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/home">Home</Nav.Link>
                  <Nav.Link href="/listexams">Grade Exams</Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      userLogout();
                    }}
                    href="/"
                  >
                    Logout
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </Container1>
  );
};

export default Header;
