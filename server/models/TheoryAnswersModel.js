const mongoose = require("mongoose");

const theoryAnswersSchema = new mongoose.Schema(
  {
    picture: {
      type: String,
      required: false,
    },
    index: {
      type: Number,
      required: false,
    },
    attempt: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "theoryAttempt",
    },
  },
  {
    timestamps: true,
  }
);

const theoryAnswers = mongoose.model("theoryanswers", theoryAnswersSchema);
module.exports = theoryAnswers;
