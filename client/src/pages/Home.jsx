import React from "react";
import styled from "styled-components";
import Carousel from "../components/home/Carousel";
import Navbar from "../components/home/Navbar";
import Advertisment from "../components/home/Advertisment";
import Advertisment2 from "../components/home/Advertisment2";
import PaymentPlans from "../components/home/PaymentPlans";
import Footer from "../components/home/Footer";

const Container = styled.div`
  background-color: whitesmoke;
`;

const Home = () => {
  return (
    <Container>
      <Navbar />
      <Carousel />
      <Advertisment />
      <Advertisment2 />
      <PaymentPlans />
      <Footer />
    </Container>
  );
};

export default Home;
