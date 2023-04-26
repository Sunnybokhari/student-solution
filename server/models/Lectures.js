const mongoose = require("mongoose");

const lecturesSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "mcqExams",
    },
    result: {
      type: Object,
      required: true,
    },
    obtainedMarks: {
      type: Number,
      required: true,
    },
    percentage: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Lectures = mongoose.model("lectures", lecturesSchema);

module.exports = Lectures;
