// const mongoose = require("mongoose");

// const examSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   totalMarks: {
//     type: Number,
//     required: true,
//   },
//   timeLimit: {
//     type: Number,
//     required: true,
//   },
// });

// const yearSchema = new mongoose.Schema({
//   year: {
//     type: String,
//     required: true,
//   },
//   exams: [examSchema],
// });

// const subjectSchema = new mongoose.Schema({
//   subject: {
//     type: String,
//     required: true,
//   },
//   years: [yearSchema],
// });

// const classSchema = new mongoose.Schema({
//   class: {
//     type: String,
//     required: true,
//   },
//   subjects: [subjectSchema],
//   questions: {
//     type: [mongoose.Schema.Types.ObjectId],
//     ref: "questions",
//     required: true,
//   },
// });

// const McqExams = mongoose.model("mcqExams", classSchema);
// module.exports = McqExams;

//

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
      ref: "mcqquestions",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const McqExams = mongoose.model("mcqExams", examSchema);
module.exports = McqExams;
