import { Form, message, Input } from "antd";
import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import {
  deleteAttemptById,
  getAttemptById,
} from "../../apiCalls/theoryAnswers";
import { getExamById } from "../../apiCalls/theoryExams";
import { addReportTheory } from "../../apiCalls/theoryReports";
import Navbar from "../home/Header";

const Container = styled.div`
  background-color: whitesmoke;
  justify-content: center;
  display: block;
`;

const Wrapper = styled.div`
  width: 80%;
  margin: auto;
  margin-top: 100px;
`;

const Heading = styled.h1`
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid gray;
  line-height: 0px;
  margin-bottom: 100px;
  text-decoration: none;
  padding-top: 100px;
  width: 80%;
  margin: auto;
`;
const HeadingText = styled.span`
  background-color: whitesmoke;
  padding: 20px 40px;
  font-weight: lighter;
`;

const PaperName = styled.h2`
  width: 80%;
  margin: auto;
  text-align: center;
  margin-top: 40px;
  font-weight: lighter;
`;

const GradeExam = () => {
  const [examData, setExamData] = useState(null);
  const [examID, setExamId] = useState(null);
  const [answers = [], setAnswers] = useState([]);
  const [attemptData, setAttemptData] = useState(null);
  const [questions = [], setQuestions] = useState([]);
  const [result = {}, setResult] = useState({});
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [studentAnswers, setStudentAnswers] = useState([]);

  const params = useParams();
  const { user } = useSelector((state) => state.users);
  const navigate = useHistory();
  const { TextArea } = Input;

  const getAttempt = async () => {
    try {
      const response = await getAttemptById({
        answerId: params.id,
      });
      if (response.success) {
        setAttemptData(response.data);
        setExamId(response.data.exam._id);
        setAnswers(response.data.answers);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (params.id) {
      getAttempt();
    }
  }, []);

  useEffect(() => {
    if (examID !== null) {
      const fetchExamData = async () => {
        try {
          const response = await getExamById({
            examId: examID,
          });
          if (response.success) {
            setExamData(response.data);
            setQuestions(response.data.questions);
          } else {
            message.error(response.message);
          }
        } catch (error) {
          message.error(error.message);
        }
      };
      fetchExamData();
    }
  }, [examID]);

  const onFinish = async () => {
    setResult(studentAnswers);

    const response = await addReportTheory({
      exam: examID,
      result: studentAnswers,
      user: attemptData.user._id,
    });
    if (response.success) {
      message.success(response.message);

      try {
        const response = await deleteAttemptById({
          answerId: params.id,
        });
        if (response.success) {
          message.success(response.message);
          navigate.push("/listexams");
        } else {
          message.error(response.message);
        }
      } catch (error) {
        message.error(error.message);
      }
    } else {
      message.error(response.message);
    }
  };

  return (
    <Container>
      <Navbar />
      <Heading>
        <HeadingText>Theory Question Paper </HeadingText>
      </Heading>
      <PaperName>
        {attemptData?.exam.class} {attemptData?.exam.subject}{" "}
        {attemptData?.exam.year} {attemptData?.exam.name}
      </PaperName>
      <Wrapper>
        <Row>
          <Col xs={8}>
            <h1>{selectedQuestionIndex + 1} : </h1>
            <img src={questions[selectedQuestionIndex]?.name}></img>
            <br />
          </Col>
        </Row>
        <Row>
          <Col xs={8}>
            <img
              src={`http://localhost:5000/uploads/${answers[selectedQuestionIndex]?.picture}`}
            ></img>
            <br />
          </Col>
        </Row>
        <Row>
          <Col xs={8}>
            {/* <TextArea rows={4} /> */}
            <TextArea
              rows={4}
              value={studentAnswers[selectedQuestionIndex] || ""}
              onChange={(event) => {
                const updatedAnswers = [...studentAnswers];
                updatedAnswers[selectedQuestionIndex] = event.target.value;
                setStudentAnswers(updatedAnswers);
              }}
            />

            <br />
          </Col>
        </Row>
        <Row>
          <Col>
            {selectedQuestionIndex > 0 && (
              <Button
                className="primary"
                onClick={() => {
                  setSelectedQuestionIndex(selectedQuestionIndex - 1);
                }}
              >
                Previous
              </Button>
            )}

            {selectedQuestionIndex < questions.length - 1 && (
              <Button
                className="primary"
                onClick={() => {
                  // onFinish();
                  setSelectedQuestionIndex(selectedQuestionIndex + 1);
                }}
              >
                Next
              </Button>
            )}

            {selectedQuestionIndex === questions.length - 1 && (
              <Button
                className="primary"
                type="submit"
                onClick={() => {
                  onFinish();
                }}
              >
                Submit
              </Button>
            )}
          </Col>
        </Row>
      </Wrapper>
    </Container>
  );
};

export default GradeExam;
