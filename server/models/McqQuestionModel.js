const mongoose = require("mongoose");

const McqQuestionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    correctOption: {
      type: String,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    },
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "mcqExams",
    },
  },
  {
    timestamps: true,
  }
);

const McqQuestion = mongoose.model("mcqquestions", McqQuestionSchema);
module.exports = McqQuestion;
