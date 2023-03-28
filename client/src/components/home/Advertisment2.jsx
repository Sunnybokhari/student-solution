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
  border-radius: 5px;
  /* box-shadow: 0px 1px 8px 1px rgba(0, 0, 0, 0.15); */
`;

const Advertisment2 = () => {
  return (
    <Container>
      <Center>
        <Para>
          <h4 className="adH">Marking</h4>
          <p>
            Say goodbye to tedious grading with our efficient marking system.
          </p>
        </Para>
        <Para>
          <h4 className="adH">Analytics</h4>
          <p>Track student performance and identify areas for improvement.</p>
        </Para>
        <Para>
          <h4 className="adH">Experts</h4>
          <p>Get personalized guidance and support from our team.</p>
        </Para>
        <Para>
          <h4 className="adH">Papers</h4>
          <p>
            Increase your chances of success with our comprehensive past paper
            resources.
          </p>
        </Para>
      </Center>
    </Container>
  );
};

export default Advertisment2;
