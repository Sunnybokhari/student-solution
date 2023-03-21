const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/userModel");
const Report = require("../models/reportModel");
const Answer = require("../models/TheoryAnswersModel");
const Attempt = require("../models/TheoryAttemptModel");
const router = require("express").Router();
const multer = require("multer");
const TheoryAttempt = require("../models/TheoryAttemptModel");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../../uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpg");
  },
});
const upload = multer({ storage: storage });

// add answer to theory exam

router.post(
  "/upload-image",
  upload.single("myFile"),
  authMiddleware,

  async (req, res) => {
    let picture = req.file ? req.file.filename : null;
    let attemptId;
    try {
      let exam = await Attempt.find().sort({ _id: -1 });
      attemptId = exam[0]._id;
      const newImage = new Answer({
        ...req.body,
        picture: req.file.filename,
        attempt: attemptId,
      });
      await newImage.save();

      exam = await Attempt.findById(attemptId);
      exam.answers.push(newImage._id);
      await exam.save();
      res.send({
        message: "Image added successfully",
        success: true,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
        data: error,
        success: false,
      });
    }
  }
);

// get all attempts

router.post("/get-all-answers", authMiddleware, async (req, res) => {
  try {
    const reports = await Answer.find().sort({ createdAt: -1 });
    res.send({
      message: "Attempts fetched successfully",
      data: reports,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

router.post("/get-answer-by-id", authMiddleware, async (req, res) => {
  try {
    const reports = await Answer.findById(req.body.answerId);
    res.send({
      message: "Attempts fetched successfully",
      data: reports,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

////////// attempt model
router.post("/attempt", authMiddleware, async (req, res) => {
  try {
    const userId = req.body.userId;
    req.body.answers = [];
    const newExam = new Attempt(req.body);
    await newExam.save();
    const user = await User.findById(userId);
    let updatedUser = null;
    if (user.availableAttempts > 0) {
      updatedUser = new User({
        ...user.toObject(),
        availableAttempts: user.availableAttempts - 1,
      });
      await User.updateOne({ _id: userId }, updatedUser);
    }
    res.send({
      message: "attempt added successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

router.post("/get-all-attempts", authMiddleware, async (req, res) => {
  try {
    const reports = await Attempt.find().populate("exam").populate("user");

    res.send({
      message: "Attempts fetched successfully",
      data: reports,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

router.post("/get-attempt-by-id", authMiddleware, async (req, res) => {
  try {
    const reports = await Attempt.findById(req.body.answerId)
      .populate("exam")
      .populate("user")
      .populate("answers");
    res.send({
      message: "Attempt fetched successfully",
      data: reports,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

router.post("/delete-attempt-by-id", authMiddleware, async (req, res) => {
  try {
    await Attempt.findByIdAndDelete(req.body.answerId);
    res.send({
      message: "Attempt deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

module.exports = router;
