import React from "react";
import styled from "styled-components";
import FormInput from "../components/signup/FormInput";
import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";

const Container = styled.div`
  background-color: whitesmoke;
`;
const Signup = () => {
  return (
    <Container>
      <Navbar />
      <FormInput />
      <Footer />
    </Container>
  );
};

export default Signup;
