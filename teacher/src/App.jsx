import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./pages/Home";
import LoginInput from "./pages/Login";
import ProtectedRoute from "./redux/ProtectedRoute";
import ListOfExams from "./components/gradeExams/ListOfExams";
import GradeExam from "./components/gradeExams/GradeExam";
import ListOfLectures from "./components/lectures/ListOfLectures";
import ScheduleLecture from "./components/lectures/ScheduleLecture";
import JoinLecture from "./components/lectures/JoinLecture";

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
        <Route path="/listlectures" exact>
          <ListOfLectures />
        </Route>
        <Route path="/schedulelecture" exact>
          <ScheduleLecture />
        </Route>
        <Route path="/join/:id">
          <JoinLecture />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
