import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./pages/Home";
// import Exams from "./pages/Exams";
// import ManageUsers from "./pages/ManageUsers";
// import O1level from "./components/exams/mcq/O1level";
// import O2level from "./components/exams/mcq/O2level";
// import Aslevel from "./components/exams/mcq/Aslevel";
// import A2level from "./components/exams/mcq/A2level";
// import O1levelT from "./components/exams/theory/O1levelT";
// import O2levelT from "./components/exams/theory/O2levelT";
// import AslevelT from "./components/exams/theory/AslevelT";
// import A2levelT from "./components/exams/theory/A2levelT";
import LoginInput from "./pages/Login";
// import AddExam from "./components/exams/mcq/AddExam";
// import AddExamT from "./components/exams/theory/AddExamT";

// import AddQuestions from "./components/exams/mcq/AddQuestions";
import ProtectedRoute from "./redux/ProtectedRoute";
import ListOfExams from "./components/gradeExams/ListOfExams";
import GradeExam from "./components/gradeExams/GradeExam";
// import EditExam from "./components/exams/mcq/EditExam";
// import EditExamT from "./components/exams/theory/EditExamT";
// import McqExams from "./components/exams/mcq/McqExams";
// import TheoryExams from "./components/exams/theory/TheoryExams";
// import AdminReports from "./pages/AdminReports";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <LoginInput />
        </Route>
        <Route path="/home" exact>
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        </Route>
        <Route path="/listexams" exact>
          <ListOfExams />
        </Route>
        <Route path="/gradeexam/:id" exact>
          <GradeExam />
        </Route>
        {/* <Route path="/o2level" exact>
          <O2level />
        </Route> */}

        {/* <Route path="/aslevel" exact>
          <Aslevel />
        </Route> */}

        {/* <Route path="/o1levelT" exact>
          <O1levelT />
        </Route>
        <Route path="/o2levelT" exact>
          <O2levelT />
        </Route>
        <Route path="/aslevelT" exact>
          <AslevelT />
        </Route> */}
        {/* <Route path="/mcqexams" exact>
          <McqExams />
        </Route>
        <Route path="/addexam" exact>
          <AddExam />
        </Route>
        <Route path="/editexam/:id">
          <EditExam />
        </Route>

        <Route path="/theoryexams" exact>
          <TheoryExams />
        </Route>
        <Route path="/addtheoryexam" exact>
          <AddExamT />
        </Route>
        <Route path="/edittheoryexam/:id">
          <EditExamT />
        </Route>

        <Route path="/reports" exact>
          <AdminReports />
        </Route> */}
      </Switch>
    </Router>
  );
};

export default App;
