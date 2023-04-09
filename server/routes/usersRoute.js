const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const stripe = require("../middlewares/stripe");

// user registration

router.post("/register", async (req, res) => {
  try {
    // check if user already exists
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res
        .status(200)
        .send({ message: "User already exists", success: false });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    //Stripe create customer
    const customer = await stripe.customers.create(
      {
        email: req.body.email,
      },
      {
        apiKey: process.env.STRIPE_SECRET_KEY,
      }
    );

    // create new user
    const newUser = new User({ ...req.body, stripeCustomerId: customer.id });
    await newUser.save();
    res.send({
      message: "User created successfully",
      success: true,
      stripeCustomerId: customer.id,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

// user login

router.post("/login", async (req, res) => {
  try {
    // check if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    }

    // check password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res
        .status(200)
        .send({ message: "Invalid password", success: false });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.send({
      message: "User logged in successfully",
      success: true,
      data: token,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

// get user info

router.post("/get-user-info", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    res.send({
      message: "User info fetched successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

router.post("/logout", (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ success: false, message: "Server error" });
      } else {
        res.status(200).json({ success: true, message: "Logout successful" });
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post("/update-user-info", authMiddleware, async (req, res) => {
  try {
    const userId = req.body.userId;
    const { name, email, password, preference } = req.body;
    const user = await User.findByIdAndUpdate(userId, {
      name,
      email,
      password,
      preference,
    });

    user.preference.push(preference);
    await user.save();

    res.send({
      message: "User updated successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

// router.post("/add-preference-user-info", authMiddleware, async (req, res) => {
//   try {
//     const preference = req.body.preference;
//     const subject = req.body.subject;
//     const user = await User.findById(req.body.userId);
//     if (!user.preference) {
//       user.preference = []; // create preference array if it doesn't exist
//     }
//     if (user.preference.includes(preference)) {
//       res.send({
//         message: "This Teacher is already in your preference list",
//         success: false,
//         data: user,
//       });
//       return;
//     }
//     if (user.preference.includes(subject)) {
//       res.send({
//         message: "You already have a Preference set for this subject",
//         success: false,
//         data: user,
//       });
//       return;
//     }
//     user.preference.push(preference);
//     await user.save();
//     res.send({
//       message: "Preference added successfully",
//       success: true,
//       data: user,
//     });
//   } catch (error) {
//     res.status(500).send({
//       message: error.message,
//       data: error,
//       success: false,
//     });
//   }
// });

router.post("/add-preference-user-info", authMiddleware, async (req, res) => {
  try {
    const preference = req.body.preference;
    const subject = req.body.subject;
    const user = await User.findById(req.body.userId);
    if (!user.preference) {
      user.preference = []; // create preference array if it doesn't exist
    }
    // check if the preference already exists in the user.preference array
    const existingPreference = user.preference.find(
      (p) => p.preference === preference
    );
    if (existingPreference) {
      res.send({
        message: "This Teacher is already in your preference list",
        success: false,
        data: user,
      });
      return;
    }
    // check if the subject already exists in the user.preference array
    const existingSubject = user.preference.find((p) => p.subject === subject);
    if (existingSubject) {
      res.send({
        message: "You already have a Preference set for this subject",
        success: false,
        data: user,
      });
      return;
    }
    // add the new preference and subject combination to the user.preference array
    user.preference.push({ preference, subject });
    await user.save();
    res.send({
      message: "Preference added successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

// router.post(
//   "/remove-preference-user-info",
//   authMiddleware,
//   async (req, res) => {
//     try {
//       const preferenceId = req.body.preference;

//       const user = await User.findById(req.body.userId);
//       if (!user) {
//         return res.status(404).send({
//           message: "User not found",
//           success: false,
//         });
//       }

//       const preferenceIndex = user.preference.findIndex(
//         (preference) => preference === preferenceId
//       );
//       if (preferenceIndex === -1) {
//         return res.status(404).send({
//           message: "This Teacher is not in your Preferences list",
//           success: false,
//         });
//       }

//       user.preference.splice(preferenceIndex, 1);
//       await user.save();

//       res.send({
//         message: "Preference removed successfully",
//         success: true,
//         data: user,
//       });
//     } catch (error) {
//       res.status(500).send({
//         message: error.message,
//         data: error,
//         success: false,
//       });
//     }
//   }
// );

router.post(
  "/remove-preference-user-info",
  authMiddleware,
  async (req, res) => {
    try {
      const preferenceId = req.body.preferenceId;
      const userId = req.body.userId;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send({
          message: "User not found",
          success: false,
        });
      }

      const preferenceIndex = user.preference.findIndex(
        (preference) => preference._id === preferenceId
      );
      if (preferenceIndex === -1) {
        return res.status(404).send({
          message: "This preference doesn't exist in your preferences list",
          success: false,
        });
      }

      user.preference.splice(preferenceIndex, 1);
      await user.save();

      res.send({
        message: "Preference removed successfully",
        success: true,
        data: user,
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

module.exports = router;
