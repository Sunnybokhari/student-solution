import React from "react";
import {
  getAllReportsByUserT,
  getReportById,
} from "../../apiCalls/theoryReports";
import { Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { message, Modal } from "antd";
import { useEffect } from "react";
import Navbar from "../home/Navbar";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import styled from "styled-components";
import Footer from "../home/Footer";

const Container = styled.div`
  height: 100vh;
  background-color: whitesmoke;
`;

const Wrapper = styled.div`
  width: 70%;
  margin: auto;
  margin-top: 100px;
  background-color: white;
  margin-bottom: 150px;
  border-radius: 15px;
  padding: 5px;
`;

const ButtonDiv = styled.div`
  margin: 10px;
  display: flex;
  justify-content: end;
`;
const TheoryReport = () => {
  const history = useHistory();
  const params = useParams();
  const [reportsDataT, setReportsDataT] = React.useState([]);
  const [reports = [], setReports] = React.useState([]);

  const getData = async () => {
    try {
      const response = await getReportById({ reportId: params.id });
      if (response.success) {
        setReportsDataT(response.data);
        setReports(response.data.result);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Container>
      <Navbar />
      <Wrapper>
        <h1>Reports</h1>
        <div className="divider"></div>
        <h2>
          {reportsDataT.exam?.class} {reportsDataT.exam?.subject}{" "}
          {reportsDataT.exam?.name}
          {", "} {reportsDataT.exam?.year}
        </h2>
        <Card>
          <Card.Body>
            <ListGroup>
              {reports.map((question, index) => (
                <ListGroup.Item key={index}>
                  <h6>Question {index + 1}</h6>

                  <p>
                    <strong>Report:</strong> {reports[index]}
                  </p>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
        <ButtonDiv>
          <Button
            style={{ paddingleft: 15, paddingRight: 15 }}
            onClick={() => history.push(`/reports`)}
          >
            Back
          </Button>
        </ButtonDiv>
      </Wrapper>

      <Footer />
    </Container>
  );
};

export default TheoryReport;
