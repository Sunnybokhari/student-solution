import React from "react";
import styled from "styled-components";
import Header from "../components/home/Header";

const Container = styled.div`
  background-color: whitesmoke;
`;

const Home = () => {
  return (
    <Container>
      <Header />
    </Container>
  );
};

export default Home;
