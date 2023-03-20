import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import { Link, useLocation } from "react-router-dom";
import { message } from "antd";
import { getUserInfo, logoutUser } from "./../../apiCalls/users";
import { useDispatch, useSelector } from "react-redux";
import { SetUser, ClearUser } from "./../../redux/usersSlice.js";
import { mobile } from "../../responsive";
import { subscriptions } from "../../apiCalls/subs";
import { useHistory } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const Container = styled.div`
  height: 70px;
  background-color: white;
  padding-bottom: 30px;
  border-bottom: 1px solid black;
  box-shadow: 0 3px 3px rgb(0 0 0 / 0.2);
`;

const Wrapper = styled.div`
  margin: auto;
  width: 80%;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Left = styled.div`
  display: block;
  align-items: center;
`;

const Center = styled.div`
  display: flex;
  text-align: center;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  color: #007bff;
  cursor: pointer;
  ${mobile({ fontSize: "24px" })};
`;

const Navbar = () => {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const history = useHistory();

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

  useEffect(() => {
    getUserData();
  }, []);

  const subscriptionAccessTheory = async () => {
    const response = await subscriptions({ userId: user.id });
    if (response === "Standard") {
      history.push("/theorypapers");
    } else if (response === "Basic") {
      history.push("/theorypapers");
    } else if (response === "Premium") {
      history.push("/theorypapers");
    } else {
      history.push("/paymentplans");
    }
  };

  const userLogout = async () => {
    localStorage.removeItem("token");
    dispatch(ClearUser());
    history.push("/login");
    window.location.reload();
  };

  const location = useLocation();

  const userProfile = () => {
    history.push("/userprofile");
  };
  return (
    <Container>
      <Wrapper>
        <Left>
          {/* <Link to="/" style={{ textDecoration: "none", color: "black" }}> */}
          <Logo
            onClick={() => {
              history.push("/");
            }}
          >
            Student Solution
          </Logo>
          {/* </Link> */}
        </Left>
        <Center>
          <Nav
            variant="pills"
            defaultActiveKey="/"
            activeKey={location.pathname}
          >
            <Nav.Item
              style={{ cursor: "pointer" }}
              onClick={() => {
                history.push("/");
              }}
              className="navlink"
            >
              {/* <Link to="/" className="nav-link"> */}
              HOME
              {/* </Link> */}
            </Nav.Item>
            <Nav.Item
              style={{ cursor: "pointer" }}
              onClick={() => {
                history.push("/mcqpapers");
              }}
              className="navlink"
            >
              {/* <Link to="/mcqpapers" className="nav-link"> */}
              MCQ EXAMS
              {/* </Link> */}
            </Nav.Item>{" "}
            <Nav.Item
              style={{ cursor: "pointer" }}
              className="navlink"
              onClick={() => {
                subscriptionAccessTheory();
              }}
            >
              {/* <Link to=""  > */}
              THEORY EXAMS
              {/* </Link> */}
            </Nav.Item>
            {/* <ButtonGroup> */}
            {/* <Button
            variant="outline-primary"
            onClick={() => {
              history.push("/");
            }}
          >
            HOME
          </Button>
          <Button
            style={{ marginLeft: 5 }}
            variant="outline-primary"
            onClick={() => {
              history.push("/mcqpapers");
            }}
          >
            MCQ EXAMS
          </Button>
          <Button
            style={{ marginLeft: 5 }}
            variant="outline-primary"
            onClick={() => {
              subscriptionAccessTheory();
            }}
          >
            THEORY EXAMS
          </Button>
          <Button
            style={{ marginLeft: 5 }}
            variant="outline-primary"
            onClick={() => {
              history.push("/reports");
            }}
          >
            REPORTS
          </Button> */}
            {/* </ButtonGroup> */}
            <Nav.Item
              style={{ cursor: "pointer" }}
              onClick={() => {
                history.push("/reports");
              }}
              className="navButton navlink"
            >
              {/* <Link to="/reports" className="nav-link"> */}
              REPORTS
              {/* </Link> */}
            </Nav.Item>
          </Nav>
        </Center>

        {user ? (
          <Right>
            {/* <Button
              onClick={() => {
                userProfile();
              }}
              variant="outline-primary me-2"
            >
              {user.name}
            </Button>
            <Button
              variant="outline-primary"
              onClick={() => {
                userLogout();
              }}
            >
              Logout
            </Button> */}

            <Dropdown className="d-inline mx-2">
              <Dropdown.Toggle
                variant="outline-primary"
                id="dropdown-autoclose-true"
              >
                {user.name}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    userProfile();
                  }}
                  href="#"
                >
                  Profile
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    userLogout();
                  }}
                  href="#"
                >
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Right>
        ) : (
          <Right>
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "black" }}
            >
              <Button variant="outline-primary">Login</Button>{" "}
            </Link>
            <Link
              to="/signup"
              style={{ textDecoration: "none", color: "black" }}
            >
              <Button style={{ marginLeft: "10px" }} variant="outline-primary">
                Sign Up
              </Button>{" "}
            </Link>
          </Right>
        )}
      </Wrapper>
    </Container>
  );
};

export default Navbar;
