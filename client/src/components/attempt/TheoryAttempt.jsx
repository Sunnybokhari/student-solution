import { Form, message } from "antd";
import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import { addAnswer } from "../../apiCalls/theoryAnswers";
import { getExamById } from "../../apiCalls/theoryExams";
import { addReport } from "../../apiCalls/theoryReports";
import Footer from "../home/Footer";
import Navbar from "../home/Navbar";
import Instructions from "./InstructionsT";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../../apiCalls/firebase";
import { v4 } from "uuid";

const Container = styled.div`
  background-color: whitesmoke;
  justify-content: center;
  display: block;
`;

const Wrapper = styled.div`
  width: 80%;
  margin: auto;
  margin-top: 100px;
  margin-bottom: 100px;
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

const ImageContainer = styled.div`
  width: 90%;
  height: 50%;
  margin: auto;
  border: 1px solid gray;
  border-radius: 15px;
  background-color: whitesmoke;
  display: flex;
`;
const QuestionImage = styled.img`
  width: 800px;
  display: flex;
  margin: auto;
  object-fit: scale-down;
  padding-top: 20px;
  padding-bottom: 20px;
`;
const OptionsContainer = styled.div`
  box-shadow: rgba(0, 0, 0, 0.638) 0px 0px 1px;
  padding: 5px;
  margin: 5px 0px;
  border-radius: 5px;
  cursor: pointer;
`;

const InfoContainer = styled.div`
  width: 100%;
  height: 500px;
  background-color: white;
  margin: auto;
  border-radius: 15px;
  padding-top: 50px;
  padding-bottom: 50px;
  padding-left: 15px; ;
`;
const TimeContainer = styled.div`
  font-size: 30px;
`;
const ListContainer = styled.div`
  font-size: 25px;
  font-weight: lighter;
`;

const QuestionContainer = styled.div`
  width: 80%;
  /* padding: 30px 20px; */
  margin: auto;
  background-color: lightgray;
  border-radius: 10px;
  padding: 0px 5px;
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

const McqAttempt = () => {
  const [examData, setExamData] = useState(null);
  const [questions = [], setQuestions] = useState([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [result = {}, setResult] = useState({});
  const [postImage, setPostImage] = useState({ myFile: "" });

  const params = useParams();
  const [view, setView] = useState("instructions");
  const [secondsLeft = 0, setSecondsLeft] = useState(0);
  const [timeUp, setTimeUp] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const { user } = useSelector((state) => state.users);
  const navigate = useHistory();
  const getExamData = async () => {
    try {
      const response = await getExamById({
        examId: params.id,
      });
      if (response.success) {
        setExamData(response.data);
        setQuestions(response.data.questions);
        setSecondsLeft(response.data.timeLimit);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const calculateResult = async () => {
    let correctAnswers = [];
    let wrongAnswers = [];

    questions.forEach((question, index) => {
      if (question.correctOption === selectedOptions[index]) {
        correctAnswers.push(question);
      } else {
        wrongAnswers.push(question);
      }
    });

    let verdict = "Pass";
    // if (correctAnswers.length < examData.passingMarks) {
    //   verdict = "Fail";
    // }

    const tempResult = {
      correctAnswers,
      wrongAnswers,
      verdict,
    };
    setResult(tempResult);

    setView("result");
  };

  const startTimer = () => {
    let totalSeconds = examData.timeLimit;
    const intervalId = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds = totalSeconds - 1;
        setSecondsLeft(totalSeconds);
      } else {
        setTimeUp(true);
      }
    }, 60000);
    setIntervalId(intervalId);
  };

  useEffect(() => {
    if (timeUp && view === "questions") {
      clearInterval(intervalId);
      calculateResult();
    }
  }, [timeUp]);

  useEffect(() => {
    if (params.id) {
      getExamData();
    }
  }, []);

  const [inputField, setInputField] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const onFinish = async () => {
    if (inputField == null) return;
    const imageRef = ref(storage, `images/${inputField.name + v4()}`);
    const snapshot = await uploadBytes(imageRef, inputField);
    const url = await getDownloadURL(snapshot.ref);
    setImageUrl(url);
    console.log(url);

    const response = await addAnswer({
      exam: params.id,
      user: user._id,
      index: selectedQuestionIndex,
      picture: url,
    });
    if (response.success) {
      message.success(response.message);
    } else {
      message.error(response.message);
    }
  };

  return (
    <Container>
      <Navbar />
      <Heading>
        <HeadingText>Theory Question Paper</HeadingText>
      </Heading>
      <PaperName>
        {examData?.class} {examData?.subject} {examData?.year} {examData?.name}
      </PaperName>

      <Wrapper>
        {view === "instructions" && (
          <Instructions
            examData={examData}
            setView={setView}
            startTimer={startTimer}
          />
        )}

        {view === "questions" && (
          <Row>
            <Row className="flexAttemptOptions">
              <Col xs={10} className="flexAttemptQuestion">
                <QuestionContainer>
                  <QuestionHeadingContainer>
                    <h1 style={{ marginBottom: 10 }}>
                      Question {selectedQuestionIndex + 1}
                    </h1>
                  </QuestionHeadingContainer>
                  <img
                    className="questionImage"
                    src={questions[selectedQuestionIndex].name}
                  ></img>
                  <span style={{ margin: 10, color: "gray" }}>
                    Upload your answer
                  </span>
                  <QuestionOptionsContainer>
                    <Form
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                      layout="vertical"
                    >
                      <div style={{ paddingTop: 15 }}>
                        <Form.Item name="myFile" label="">
                          <input
                            type="file"
                            onChange={(event) => {
                              setInputField(event.target.files[0]);
                            }}
                          />
                        </Form.Item>
                      </div>
                      <div>
                        {selectedQuestionIndex > 0 && (
                          <Button
                            className="attemptButtonPrevious"
                            variant="outline-primary"
                            onClick={() => {
                              setSelectedQuestionIndex(
                                selectedQuestionIndex - 1
                              );
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
                              onFinish();
                              setSelectedQuestionIndex(
                                selectedQuestionIndex + 1
                              );
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
                              clearInterval(intervalId);
                              setTimeUp(true);
                            }}
                          >
                            Submit
                          </Button>
                        )}
                      </div>
                    </Form>
                  </QuestionOptionsContainer>
                </QuestionContainer>
              </Col>
              <Col xs={2} className="timerContainer">
                <span className="timer">{secondsLeft} minutes</span>
              </Col>
            </Row>
          </Row>
        )}

        {view === "result" && (
          <div className="flex mb-100  items-center mt-2 justify-center result ">
            <div className="flex flex-col gap-2 mb-100">
              <h1 className="text-2xl c-blk">RESULT</h1>
              <div className="divider"></div>
              <div className="marks">
                <h1 className="text-md">Your submitted exam will</h1>
                <h1 className="text-md">be graded by the teacher</h1>
                <h1 className="text-md">you selected and the result</h1>
                {/* <h1 className="text-md">
                Passing Marks : {examData.passingMarks}
              </h1> */}
                <h1 className="text-md">
                  can be viewed in the reports section
                </h1>

                <div className="flex gap-2 mt-2">
                  <Button
                    variant="outline-primary"
                    className="reviewRetakeButton"
                    onClick={() => navigate.push("/theorypapers")}
                  >
                    BACK
                  </Button>
                  <Button
                    variant="outline-success"
                    className="resultRetakeButton"
                    onClick={() => {
                      setView("instructions");
                      setSelectedQuestionIndex(0);
                      setSelectedOptions({});
                      setSecondsLeft(examData.timeLimit);
                    }}
                  >
                    Retake Exam
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default McqAttempt;
