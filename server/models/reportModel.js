const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model("reports", reportSchema);

module.exports = Report;
