import React from "react";
import { message, Modal, Table, Tabs } from "antd";
import { Button } from "react-bootstrap";
import {
  getAllReports,
  getAllReportsByUser,
  getReportById,
} from "../../apiCalls/reports";
import { useEffect, useState } from "react";
import moment from "moment";
import Navbar from "../home/Navbar";
import styled from "styled-components";
import Footer from "../home/Footer";
import { useHistory, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { mobile, desktop } from "../../responsive";

const Container = styled.div`
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
  ${desktop({ width: "95%" })}
`;

const ButtonDiv = styled.div`
  margin: 10px;
  display: flex;
  justify-content: end;
`;

const McqReport = () => {
  const history = useHistory();
  const params = useParams();
  const [reportsData, setReportsData] = React.useState([]);
  const [reports = [], setReports] = React.useState([]);
  const [correctAnswers = [], setCorrectAnswers] = React.useState([]);
  const [wrongAnswers = [], setWrongAnswers] = React.useState([]);
  const [correctLength, setCorrectLength] = React.useState(0);
  const [wrongLength, setWrongLength] = React.useState(0);

  const getData = async () => {
    try {
      const response = await getReportById({ reportId: params.id });
      if (response.success) {
        setReportsData(response.data);
        setReports(response.data.result);
        setCorrectAnswers(response.data.result.correctAnswers);
        setWrongAnswers(response.data.result.wrongAnswers);
        setCorrectLength(response.data.result.correctAnswers.length);
        setWrongLength(response.data.result.wrongAnswers.length);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
    let correctLength = correctAnswers.length;
  }, []);
  //   console.log(reports);

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <h1>Reports</h1>
        <div className="divider"></div>
        <h2>
          {reportsData.exam?.class} {reportsData.exam?.subject}{" "}
          {reportsData.exam?.name}
          {", "} {reportsData.exam?.year}
        </h2>
        <div></div>

        <Card>
          <Card.Body style={{ backgroundColor: "#28a745" }}>
            <ListGroup>
              <h2>Correct Answers: {correctLength}</h2>
              {correctAnswers.map((correct, index) => (
                <ListGroup.Item style={{ marginBottom: "10px" }} key={index}>
                  <img src={correctAnswers[index]?.name} />
                  <h3>
                    Correct Option: {correctAnswers[index]?.correctOption}
                  </h3>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
          <Card.Body style={{ backgroundColor: "#dc3545", marginTop: "10px" }}>
            <ListGroup>
              <h2>Wrong Answers: {wrongLength}</h2>
              {wrongAnswers.map((correct, index) => (
                <ListGroup.Item style={{ marginBottom: "10px" }} key={index}>
                  <img src={wrongAnswers[index]?.name} />
                  <h3>Correct Option: {wrongAnswers[index]?.correctOption}</h3>
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

export default McqReport;
