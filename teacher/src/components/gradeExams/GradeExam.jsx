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
  padding-bottom: 100px;
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

const QuestionContainer = styled.div`
  width: 80%;
  margin: auto;
  background-color: lightgray;
  border-radius: 10px;
  padding: 0px 10px;
  padding-bottom: 5px;
`;

const QuestionHeadingContainer = styled.div`
  display: flex;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
`;

const QuestionOptionsContainer = styled.div`
  /* display: flex; */
  padding-left: 20;
  /* justify-content: space-between; */
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
  const [obtainedMarks, setobtainedMarks] = useState(0);

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
    console.log(obtainedMarks);
    const response = await addReportTheory({
      exam: examID,
      result: studentAnswers,
      user: attemptData.user._id,
      obtainedMarks: obtainedMarks,
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
        <QuestionContainer style={{ marginBottom: 20, paddingBottom: 20 }}>
          <Row>
            <Col xs={12} className="">
              <QuestionHeadingContainer>
                <h1 style={{ marginBottom: 10 }}>
                  Question {selectedQuestionIndex + 1}
                </h1>
              </QuestionHeadingContainer>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  className="questionImage"
                  src={questions[selectedQuestionIndex]?.name}
                ></img>
              </div>
              <br />
            </Col>
          </Row>
        </QuestionContainer>
        <QuestionContainer>
          <Row>
            <Col xs={12}>
              <QuestionHeadingContainer>
                <h1 style={{ marginBottom: 10 }}>
                  Answer {selectedQuestionIndex + 1}
                </h1>
              </QuestionHeadingContainer>
              <img
                className="questionImage"
                style={{ marginBottom: 20 }}
                src={answers[selectedQuestionIndex]?.picture}
              ></img>
              <br />
              <span style={{ margin: 10, color: "gray", marginTop: 20 }}>
                Give your response
              </span>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              {/* <TextArea rows={4} /> */}
              <TextArea
                className="questionImage"
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
            <Col style={{ display: "flex", justifyContent: "end" }}>
              {selectedQuestionIndex === questions.length - 1 && (
                <Form layout="horizontal" style={{ width: 250 }}>
                  <Form.Item
                    style={{ marginRight: 15, marginTop: 25 }}
                    label={`Total Exam Marks out of ${attemptData?.exam.totalMarks}`}
                    name="totalMarks"
                  >
                    <Input
                      value={obtainedMarks}
                      onChange={(e) => setobtainedMarks(e.target.value)}
                      max={attemptData?.exam.totalMarks}
                      type="number"
                    />
                  </Form.Item>
                </Form>
              )}
              {selectedQuestionIndex > 0 && (
                <Button
                  className="attemptButtonPrevious"
                  variant="outline-primary"
                  onClick={() => {
                    setSelectedQuestionIndex(selectedQuestionIndex - 1);
                  }}
                >
                  Previous
                </Button>
              )}
              {selectedQuestionIndex < questions.length - 1 && (
                <Button
                  className="attemptButton"
                  variant="outline-primary"
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
                  className="attemptButtonSubmit"
                  variant="outline-success"
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
        </QuestionContainer>
      </Wrapper>
    </Container>
  );
};

export default GradeExam;
