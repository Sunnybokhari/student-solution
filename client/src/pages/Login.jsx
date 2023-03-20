import React from "react";
import styled from "styled-components";
import LoginInput from "../components/login/LoginInput";
import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";

const Container = styled.div`
  background-color: whitesmoke;
`;

const Login = () => {
  return (
    <Container>
      <Navbar />
      <LoginInput />
      <Footer />
    </Container>
  );
};

export default Login;
