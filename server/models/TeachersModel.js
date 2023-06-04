const mongoose = require("mongoose");
const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    class: {
      type: String,
      required: true,
    },
    years: {
      type: Number,
      required: true,
    },
    school: {
      type: String,
      required: false,
    },
    gradedExams: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const teacherModel = mongoose.model("teachers", teacherSchema);

module.exports = teacherModel;
