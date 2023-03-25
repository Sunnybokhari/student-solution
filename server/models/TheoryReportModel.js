const mongoose = require("mongoose");

const theoryreportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "theoryExams",
    },
    result: {
      type: Object,
      required: true,
    },
    obtainedMarks: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TheoryReport = mongoose.model("theoryreports", theoryreportSchema);

module.exports = TheoryReport;
