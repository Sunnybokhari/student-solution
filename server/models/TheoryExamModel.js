const mongoose = require("mongoose");

const examSchema = new mongoose.Schema(
  {
    class: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },

    totalMarks: {
      type: Number,
      required: true,
    },
    timeLimit: {
      type: Number,
      required: true,
    },
    questions: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "theoryquestions",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const theoryExams = mongoose.model("theoryExams", examSchema);
module.exports = theoryExams;
