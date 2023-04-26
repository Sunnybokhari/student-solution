import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import { Link, useLocation, useParams } from "react-router-dom";
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
  ${mobile({ width: "100%", paddingLeft: "0px", paddingRight: "5px" })}
`;

const Left = styled.div`
  display: block;
  align-items: center;
  ${mobile({ display: "none" })}
`;

const Center = styled.div`
  display: flex;
  text-align: center;
  ${mobile({ fontSize: "11px", margin: "0px" })}
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
    if (response === "Premium") {
      history.push("/theorypapers");
    } else if (user.availableAttempts > 0) {
      history.push("/theorypapers");
      // } else if (response === "Premium") {
      //   history.push("/theorypapers");
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

  const subscriptionPlan = () => {
    history.push("/paymentplans");
  };
  const teacherPreferences = () => {
    history.push("/teacherpreferences");
  };
  const [activeItem, setActiveItem] = useState("/");

  const homeRef = useRef(null);
  const mcqRef = useRef(null);
  const theoryRef = useRef(null);
  const reportsRef = useRef(null);
  const lecturesRef = useRef(null);
  const { id } = useParams();
  useEffect(() => {
    const { pathname } = location;
    setActiveItem(pathname);

    if (homeRef.current && pathname === "/") {
      homeRef.current.setAttribute("aria-current", "page");
    } else if (mcqRef.current && pathname === "/mcqpapers") {
      mcqRef.current.setAttribute("aria-current", "page");
    } else if (theoryRef.current && pathname === "/theorypapers") {
      theoryRef.current.setAttribute("aria-current", "page");
    } else if (reportsRef.current && pathname === "/reports") {
      reportsRef.current.setAttribute("aria-current", "page");
    } else if (
      location.pathname.includes("/theoryreport/") &&
      location.pathname.includes(id)
    ) {
      reportsRef.current.setAttribute("aria-current", "page");
    } else if (
      location.pathname.includes("/mcqattempt/") &&
      location.pathname.includes(id)
    ) {
      mcqRef.current.setAttribute("aria-current", "page");
    } else if (
      location.pathname.includes("/theoryattempt/") &&
      location.pathname.includes(id)
    ) {
      theoryRef.current.setAttribute("aria-current", "page");
    } else if (lecturesRef.current && pathname === "/listoflectures") {
      lecturesRef.current.setAttribute("aria-current", "page");
    }
  }, [location]);

  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo
            onClick={() => {
              history.push("/");
            }}
          >
            Student Solution
          </Logo>
        </Left>
        <Center>
          <Nav variant="pills">
            <Nav.Item
              style={{ cursor: "pointer" }}
              ref={homeRef}
              onClick={() => {
                history.push("/");
              }}
              className="navlink"
            >
              HOME
            </Nav.Item>
            <Nav.Item
              style={{ cursor: "pointer" }}
              ref={mcqRef}
              onClick={() => {
                history.push("/mcqpapers");
              }}
              className="navlink"
            >
              MCQ EXAMS
            </Nav.Item>
            <Nav.Item
              style={{ cursor: "pointer" }}
              className="navlink"
              ref={theoryRef}
              onClick={() => {
                subscriptionAccessTheory();
              }}
            >
              THEORY EXAMS
            </Nav.Item>
            <Nav.Item
              style={{ cursor: "pointer" }}
              ref={reportsRef}
              onClick={() => {
                history.push("/reports");
              }}
              className="navButton navlink"
            >
              REPORTS
            </Nav.Item>
            <Nav.Item
              style={{ cursor: "pointer" }}
              ref={lecturesRef}
              onClick={() => {
                history.push("/listoflectures");
              }}
              className="navButton navlink"
            >
              LECTURES
            </Nav.Item>
          </Nav>
        </Center>

        {user ? (
          <Right>
            <Dropdown
              style={{ padding: "10px 10px" }}
              className="d-inline mx-2"
            >
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
                    subscriptionPlan();
                  }}
                  href="#"
                >
                  Subscription Plans
                </Dropdown.Item>
                <Dropdown.Item disabled>
                  <span>Attempts left: </span>
                  <span
                    style={{
                      border: "1px solid gray",
                      borderRadius: "3px",
                      padding: "1px 2px",
                    }}
                  >
                    {user.availableAttempts}
                  </span>
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    teacherPreferences();
                  }}
                  href="#"
                >
                  Teacher Preferences
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
              <Button
                className="navbarMobileButton"
                style={{ marginLeft: "10px" }}
                variant="outline-primary"
              >
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
