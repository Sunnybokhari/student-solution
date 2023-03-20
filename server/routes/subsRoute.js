const router = require("express").Router();
const User = require("../models/userModel");
const authMiddleware = require("../middlewares/authMiddleware");
const stripe = require("../middlewares/stripe");

router.post("/prices", async (req, res) => {
  const prices = await stripe.prices.list({
    apiKey: process.env.STRIPE_SECRET_KEY,
  });

  return res.json(prices);
});

router.post("/session", authMiddleware, async (req, res) => {
  const user = await User.findById(req.body.userId);
  const session = await stripe.checkout.sessions.create(
    {
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: req.body.priceId,
          quantity: 1,
        },
      ],
      success_url: "https://studentsolutions.herokuapp.com",
      cancel_url: "https://studentsolutions.herokuapp.com",
      customer: user.stripeCustomerId,
    },
    {
      apiKey: process.env.STRIPE_SECRET_KEY,
    }
  );

  return res.json(session);
});

router.post("/webhook", async (req, res) => {
  const event = req.body;

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const customer = await stripe.customers.retrieve(session.customer, {
      apiKey: process.env.STRIPE_SECRET_KEY,
    });
    const user = await User.findOne({ stripeCustomerId: customer.id });

    console.log(session.amount_total);
    // Set AvailableAttempts based on price plan
    if (session.amount_total === 5000) {
      user.AvailableAttempts = 5;
    } else if (session.amount_total === 15000) {
      user.AvailableAttempts = 15;
    }

    await user.save();
  }

  res.json({ received: true });
});

router.post("/subscriptions", authMiddleware, async (req, res) => {
  const user = await User.findById(req.body.userId);

  const subscriptions = await stripe.subscriptions.list(
    {
      customer: user.stripeCustomerId,
      status: "all",
      expand: ["data.default_payment_method"],
    },
    {
      apiKey: process.env.STRIPE_SECRET_KEY,
    }
  );

  const empty = [];
  if (!subscriptions.data.length) return res.json([]);

  const plan = subscriptions.data[0].plan.nickname;
  return res.json(plan);
});

module.exports = router;
