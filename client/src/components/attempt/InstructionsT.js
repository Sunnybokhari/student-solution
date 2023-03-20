import React from "react";
import { useHistory, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { addAttempt } from "../../apiCalls/theoryAnswers";
import { message } from "antd";
import { useSelector } from "react-redux";
import { getExamById } from "../../apiCalls/theoryExams";

function Instructions({ examData, setView, startTimer }) {
  const navigate = useHistory();
  const { user } = useSelector((state) => state.users);
  const params = useParams();

  const getExamData = async () => {
    try {
      const response = await getExamById({
        examId: params.id,
      });
      if (response.success) {
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const onFinish = async () => {
    try {
      let response;
      response = await addAttempt({
        exam: params.id,
        user: user._id,
        preference: user.preference,
      });
      if (response.success) {
        message.success(response.message);
        if (user.availableAttempts > 0) {
          user.availableAttempts -= 1;
        }
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div className="instructionsWrapper">
      <div className="flex flex-col items-center gap-5 instructionsContainer">
        <div className="instructionsList">
          <ul className="flex flex-col gap-1">
            <h1 className="instructionsHeader">Instructions</h1>
            <div className="mb-30"></div>

            <li>Exam must be completed in {examData?.timeLimit} minutes.</li>
            <li>
              Exam will be submitted automatically after {examData?.timeLimit}{" "}
              minutes.
            </li>
            <li>Once submitted, you cannot change your answers.</li>
            <li>Do not refresh the page.</li>
            <li>
              You can use the <span className="font-bold">"Previous"</span> and{" "}
              <span className="font-bold">"Next"</span> buttons to navigate
              between questions.
            </li>
            <li>
              Total marks of the exam is{" "}
              <span className="font-bold">{examData?.totalMarks}</span>.
            </li>
          </ul>
        </div>
        <div className="flex gap-2 instructionsButtonsContainer">
          <Button
            variant="outline-danger"
            className="instructionsButtonC"
            onClick={() => navigate.push("/theorypapers")}
          >
            CLOSE
          </Button>
          <Button
            variant="outline-primary"
            className="instructionsButton"
            onClick={() => {
              onFinish();
              startTimer();
              setView("questions");
            }}
          >
            Start Exam
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Instructions;
