import { message } from "antd";
import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import { getExamById } from "../../apiCalls/exams";
import { addReport } from "../../apiCalls/reports";
import Navbar from "../home/Navbar";
import Instructions from "./Instructions";
import Footer from "../../components/home/Footer";
import { mobile, desktop } from "../../responsive";

const Container = styled.div`
  background-color: whitesmoke;
  justify-content: center;
  display: block;
`;

const Wrapper = styled.div`
  width: 80%;
  margin: auto;
  margin-bottom: 100px;
  margin-top: 100px;
  ${desktop({ width: "98%" })}
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
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid;
  border-color: #007bff;
  padding: 5px 10px;
  margin: 5px 5px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
  width: 50px;
  height: 50px;
  :hover {
    background-color: #007bff;
    color: white;
  }
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
  display: flex;
  padding-left: 20;
  justify-content: space-between;
`;

const McqAttempt = () => {
  const [examData, setExamData] = useState(null);
  const [questions = [], setQuestions] = useState([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [result = {}, setResult] = useState({});

  const params = useParams();
  const [view, setView] = useState("instructions");
  const [secondsLeft = 0, setSecondsLeft] = useState(0);
  const [timeUp, setTimeUp] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const { user } = useSelector((state) => state.users);
  const navigate = useHistory();
  ////////////
  const [timeRemaining = 0, setTimeRemaining] = useState(0);
  const [intervalIdAnswer, setIntervalIdAnswer] = useState(null);
  const [overTimeAnswers, setOverTimeAnswers] = useState([]);
  ///////////

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
    try {
      let correctAnswers = [];
      let wrongAnswers = [];

      let obtainedMarks = 0;
      let percentage = 0;
      questions.forEach((question, index) => {
        if (question.correctOption === selectedOptions[index]) {
          correctAnswers.push(question);
        } else {
          wrongAnswers.push(question);
        }
      });

      obtainedMarks = correctAnswers.length;
      percentage = (obtainedMarks / examData.totalMarks) * 100;
      let verdict = "Pass";
      if (correctAnswers.length < examData.totalMarks / 2) {
        verdict = "Fail";
      }

      const tempResult = {
        correctAnswers,
        wrongAnswers,
        verdict,
      };
      setResult(tempResult);
      const response = await addReport({
        exam: params.id,
        result: tempResult,
        user: user._id,
        obtainedMarks: obtainedMarks,
        percentage: percentage,
      });
      if (response.success) {
        setView("result");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
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

  const startAnswerTimer = () => {
    ////////////////////////
    let totalSecondsAnswer = 2;
    setTimeRemaining(totalSecondsAnswer);
    const intervalIdAnswer = setInterval(() => {
      if (totalSecondsAnswer > 0) {
        totalSecondsAnswer = totalSecondsAnswer - 1;
        setTimeRemaining(totalSecondsAnswer);
      } else {
        setTimeRemaining(0);
      }
    }, 60000);
    setIntervalIdAnswer(intervalIdAnswer);
    ////////////////////////////
  };
  useEffect(() => {
    if (timeRemaining === 0) {
      overTimeAnswers.push(selectedQuestionIndex);
      console.log(overTimeAnswers);
    }
  }, [timeRemaining]);
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

  console.log(selectedOptions);
  return (
    <Container>
      <Navbar />
      <Heading>
        <HeadingText>Multiple Choice Question Paper</HeadingText>
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
            startAnswerTimer={startAnswerTimer}
            setOverTimeAnswers={setOverTimeAnswers}
          />
        )}

        {view === "questions" && (
          <Row>
            <Row className="flexAttemptOptions">
              <Col xs={10} className="flexAttemptQuestion">
                <QuestionContainer>
                  <QuestionHeadingContainer>
                    <h1 style={{ marginBottom: 10 }}>
                      Question {selectedQuestionIndex + 1}{" "}
                    </h1>
                    <h2 style={{ fontSize: 15, paddingTop: 5 }}>MARKS: 1</h2>
                  </QuestionHeadingContainer>
                  <img
                    className="questionImage"
                    src={questions[selectedQuestionIndex].name}
                  ></img>
                  <span style={{ margin: 10, color: "gray" }}>
                    Choose your answer
                  </span>
                  <QuestionOptionsContainer>
                    <div style={{ display: "flex" }}>
                      {Object.keys(
                        questions[selectedQuestionIndex].options
                      ).map((option, index) => {
                        return (
                          <OptionsContainer
                            className={` ${
                              selectedOptions[selectedQuestionIndex] === option
                                ? "selected-option"
                                : "option"
                            }`}
                            key={index}
                            onClick={() => {
                              setSelectedOptions({
                                ...selectedOptions,
                                [selectedQuestionIndex]: option,
                              });
                            }}
                          >
                            <h1 className="text-xl optionButton">
                              {option}
                              {/* {questions[selectedQuestionIndex].options[option]} */}
                            </h1>
                          </OptionsContainer>
                        );
                      })}
                    </div>
                    <div>
                      {selectedQuestionIndex > 0 && (
                        <Button
                          className="attemptButtonPrevious"
                          variant="outline-primary"
                          onClick={() => {
                            startAnswerTimer();
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
                            startAnswerTimer();
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
                          onClick={() => {
                            clearInterval(intervalId);
                            clearInterval(intervalIdAnswer);
                            setTimeUp(true);
                            console.log(overTimeAnswers);
                          }}
                        >
                          Submit
                        </Button>
                      )}
                    </div>
                  </QuestionOptionsContainer>
                </QuestionContainer>
              </Col>
              <Col className="mcqRightContainer" xs={2}>
                <Col xs={12} className="timerContainer">
                  <span className="timer">
                    <img
                      style={{
                        width: "20px",
                        height: "20px",
                        marginRight: "5px",
                      }}
                      src="https://img.icons8.com/ios/50/1A1A1A/time--v1.png"
                    />
                    {secondsLeft} minutes{" "}
                    <div style={{ paddingTop: 10 }}>
                      Question {selectedQuestionIndex + 1} of{" "}
                      {examData?.totalMarks}
                    </div>
                  </span>
                </Col>
                <Row>
                  <Col xs={12}>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                      }}
                    >
                      {questions.map((q, index) => (
                        <div
                          key={index}
                          className={`question-circle ${
                            selectedQuestionIndex === index ? "selected" : ""
                          } `}
                          style={{
                            backgroundColor:
                              selectedOptions[index] !== undefined
                                ? "#28a745"
                                : "",
                          }}
                          onClick={() => setSelectedQuestionIndex(index)}
                        >
                          {index + 1}
                        </div>
                      ))}
                    </div>
                  </Col>
                </Row>
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
                <h1 className="text-md">
                  Total Marks : {examData?.totalMarks}
                </h1>
                <h1 className="text-md">
                  Obtained Marks :{result.correctAnswers.length}
                </h1>
                <h1 className="text-md">
                  Wrong Answers : {result.wrongAnswers.length}
                </h1>

                <h1 className="text-md">VERDICT :{result.verdict}</h1>

                <div className="flex gap-2 mt-2">
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
                  <Button
                    variant="outline-primary"
                    className="reviewRetakeButton"
                    onClick={() => {
                      setView("review");
                    }}
                  >
                    Review Answers
                  </Button>
                </div>
              </div>
            </div>
            <div className="lottie-animation">
              {result.verdict === "Pass" && (
                <lottie-player
                  src="https://assets2.lottiefiles.com/packages/lf20_ya4ycrti.json"
                  background="transparent"
                  speed="1"
                  loop
                  autoplay
                ></lottie-player>
              )}

              {result.verdict === "Fail" && (
                <lottie-player
                  src="https://assets4.lottiefiles.com/packages/lf20_qp1spzqv.json"
                  background="transparent"
                  speed="1"
                  loop
                  autoplay
                ></lottie-player>
              )}
            </div>
          </div>
        )}

        {view === "review" && (
          <div className="reviewWrapper flex flex-col gap-2">
            {questions.map((question, index) => {
              const isCorrect =
                question.correctOption === selectedOptions[index];
              const isOvertimeAnswer = overTimeAnswers.includes(index);
              return (
                <div
                  style={{ display: "flex" }}
                  className={` review
            flex flex-col gap-1 p-2 ${isCorrect ? "bg-success" : "bg-danger"}
          `}
                >
                  <Row>
                    <Col sm={10}>
                      <h2>Question {index + 1}</h2>

                      <img
                        src={questions[index].name}
                        className="text-xl reviewAnswers"
                      />

                      <h3 style={{ fontSize: 22, paddingLeft: 5 }} className="">
                        Submitted Answer : {selectedOptions[index]}
                      </h3>
                      <h3 style={{ fontSize: 22, paddingLeft: 5 }} className="">
                        Correct Answer : {question.correctOption}
                      </h3>
                    </Col>

                    {isOvertimeAnswer && (
                      <Col className="margin-auto" sm={2}>
                        <img src="https://img.icons8.com/fluency/48/null/medium-risk.png" />

                        <h1>Over Average Time</h1>
                      </Col>
                    )}
                  </Row>
                </div>
              );
            })}

            <div className="flex justify-center gap-2">
              <Button
                variant="outline-danger"
                className="instructionsButtonC"
                onClick={() => {
                  navigate.push("/mcqpapers");
                }}
              >
                Close
              </Button>
              <Button
                variant="outline-primary"
                className="instructionsButton"
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
        )}
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default McqAttempt;
