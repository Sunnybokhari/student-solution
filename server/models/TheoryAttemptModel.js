const mongoose = require("mongoose");

const theoryAttemptSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "theoryExams",
    },
    answers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "theoryanswers",
      required: true,
    },
    preference: {
      type: [Object],
      ref: "users",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const TheoryAttempt = mongoose.model("theoryAttempt", theoryAttemptSchema);
module.exports = TheoryAttempt;
