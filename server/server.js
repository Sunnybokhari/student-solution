const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());
const dbConfig = require("./config/dbConfig");

const usersRoute = require("./routes/usersRoute");
const teacherRoute = require("./routes/teacherRoute");
const examRoute = require("./routes/examRoute");
const theoryExamRoute = require("./routes/theoryExamRoute");
const reportsRoute = require("./routes/reportsRoute");
const theoryReportsRoute = require("./routes/theoryReportsRoute");
const answerRoute = require("./routes/answerRoute");
const subs = require("./routes/subsRoute");

app.use("/api/users", usersRoute);
app.use("/api/teachers", teacherRoute);
app.use("/api/exams", examRoute);
app.use("/api/theoryexams", theoryExamRoute);
app.use("/api/reports", reportsRoute);
app.use("/api/theoryreports", theoryReportsRoute);
app.use("/api/answer", answerRoute);
app.use("/api/subs", subs);
app.use("/uploads", express.static("uploads"));
const port = process.env.PORT || 5000;

const path = require("path");
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`server listening on port ${port}`));
