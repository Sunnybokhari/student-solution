const mongoose = require("mongoose");

const theoryQuestionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "theoryExams",
    },
  },
  {
    timestamps: true,
  }
);

const theoryQuestion = mongoose.model("theoryquestions", theoryQuestionSchema);
module.exports = theoryQuestion;
