import React from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";

function Instructions({ examData, setView, startTimer }) {
  const navigate = useHistory();
  return (
    <div className="instructionsWrapper">
      <div className="flex flex-col items-center gap-5 instructionsContainer">
        <div className="instructionsList">
          <ul className="flex flex-col gap-1 ">
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
            onClick={() => navigate.push("/mcqpapers")}
          >
            CLOSE
          </Button>
          <Button
            variant="outline-primary"
            className="instructionsButton"
            onClick={() => {
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
