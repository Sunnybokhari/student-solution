import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: auto;
  width: 60%;
  display: flex;
`;

const Center = styled.div`
  display: flex;
  width: 100%;
  margin-top: 70px;
`;

const Para = styled.div`
  width: 25%;
  margin-right: 20px;
`;

const Advertisment2 = () => {
  return (
    <Container>
      <Center>
        <Para>
          <h4 className="adH">Marking</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </Para>
        <Para>
          <h4 className="adH">Analytics</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </Para>
        <Para>
          <h4 className="adH">Experts</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </Para>
        <Para>
          <h4 className="adH">Papers</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </Para>
      </Center>
    </Container>
  );
};

export default Advertisment2;
