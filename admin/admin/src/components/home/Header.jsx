import React from "react";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import NavDropdown from "react-bootstrap/NavDropdown";
import { ClearUser } from "./../../redux/usersSlice";
import { useDispatch } from "react-redux";

const Container1 = styled.div`
  background-color: whitesmoke;
`;
const Header = () => {
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
            <Navbar.Brand className="color-w" href="/home">
              Admin Dashboard
            </Navbar.Brand>

            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Admin Dashboard
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/home">Home</Nav.Link>
                  <NavDropdown
                    title="Manage Exams"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="/mcqexams">
                      MCQ Papers
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/theoryexams">
                      Theory Papers
                    </NavDropdown.Item>
                  </NavDropdown>
                  {/* <Nav.Link href="/reports">Student Reports</Nav.Link>
                  <Nav.Link href="/users">Manage Students</Nav.Link> */}
                  <Nav.Link href="/manageteachers">Manage Teachers</Nav.Link>
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
