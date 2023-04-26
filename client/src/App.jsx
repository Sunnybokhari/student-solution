import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import Alevels from "./pages/Alevels";
// import A2levels from "./pages/A2levels";
// import O1levels from "./pages/O1levels";
// import O2levels from "./pages/O2levels";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./stylesheets/theme.css";
import "./stylesheets/alignments.css";
import "./stylesheets/textelements.css";
import "./stylesheets/custom-components.css";
import "./stylesheets/form-elements.css";
import "./stylesheets/layout.css";
import "./App.css";
// import A2Mcq from "./pages/A2Mcq";
// import ASMcq from "./pages/ASMcq";
// import O2Mcq from "./pages/O2Mcq";
// import O1Mcq from "./pages/O1Mcq";
import McqAttempt from "./components/attempt/McqAttempt";
import TheoryAttempt from "./components/attempt/TheoryAttempt";
import ProtectedRoute from "./redux/ProtectedRoute";
import OlevelMcqPapers from "./components/olevels/OlevelMcqPapers";
import TheoryPapers from "./components/olevels/TheoryPapers";
import UserReports from "./components/reports/UserReports";
import TheoryReport from "./components/reports/TheoryReport";
import PaymentPlans from "./components/home/PaymentPlans";
import PaymentPlan from "./pages/PaymentPlan";
import Profile from "./pages/Profile";
import TeacherPreferences from "./pages/TeacherPreferences";
import McqReport from "./components/reports/McqReport";
import ListOfLectures from "./components/lectures/ListOfLectures";
import JoinLecture from "./components/lectures/JoinLecture";
const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          {/* <ProtectedRoute> */} <Home /> {/* </ProtectedRoute> */}
        </Route>

        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Route path="/mcqattempt/:id">
          <McqAttempt />
        </Route>
        <Route path="/theoryreport/:id">
          <TheoryReport />
        </Route>
        <Route path="/mcqpapers" exact>
          <OlevelMcqPapers />
        </Route>
        <Route path="/theoryattempt/:id">
          <TheoryAttempt />
        </Route>
        <Route path="/theorypapers" exact>
          <TheoryPapers />
        </Route>
        <Route path="/reports" exact>
          <UserReports />
        </Route>
        <Route path="/paymentplans" exact>
          <PaymentPlan />
        </Route>
        <Route path="/userprofile" exact>
          <Profile />
        </Route>
        <Route path="/teacherpreferences" exact>
          <TeacherPreferences />
        </Route>
        <Route path="/mcqreport/:id">
          <McqReport />
        </Route>
        <Route path="/listoflectures">
          <ListOfLectures />
        </Route>
        <Route path="/join/:id">
          <JoinLecture />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
