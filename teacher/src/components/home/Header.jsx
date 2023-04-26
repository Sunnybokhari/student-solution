import React, { useEffect } from "react";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { ClearUser, SetUser } from "./../../redux/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { getUserInfo } from "../../apiCalls/teachers";
import { message } from "antd";

const Container1 = styled.div`
  background-color: whitesmoke;
`;
const Header = () => {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const getUserData = async () => {
    try {
      const response = await getUserInfo();
      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const userLogout = async () => {
    localStorage.removeItem("token");
    dispatch(ClearUser());
    window.location.reload();
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Container1>
      {[false].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} className="mb-3">
          <Container fluid>
            <Navbar.Toggle
              style={{ border: "2px solid gray" }}
              aria-controls={`offcanvasNavbar-expand-${expand}`}
            />
            <Navbar.Brand style={{}} href="/home">
              Teacher Dashboard
            </Navbar.Brand>
            {/* <Button variant="dark" disabled>
              {user?.name}
            </Button> */}

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
              {user ? (
                <Offcanvas.Title
                  style={{ marginLeft: "17px" }}
                  id={`offcanvasNavbarLabel-expand-${expand}`}
                >
                  {user.name}{" "}
                </Offcanvas.Title>
              ) : (
                <Offcanvas.Title
                  style={{ marginLeft: "17px" }}
                  id={`offcanvasNavbarLabel-expand-${expand}`}
                ></Offcanvas.Title>
              )}
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/home">Home</Nav.Link>
                  <Nav.Link href="/listexams">Grade Exams</Nav.Link>
                  <Nav.Link href="/listlectures">Lectures</Nav.Link>

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
