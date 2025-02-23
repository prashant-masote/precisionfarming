require("dotenv").config(); // Load environment variables

const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Secure API key

// 🔹 Initialize Express App
const app = express();

// 🔹 Middleware
app.use(cors({ origin: true }));
app.use(express.json()); // Parse JSON requests

// 🔹 API Routes
app.get("/", (req, res) => res.status(200).send("Hello, Khet Market API is running 🚀"));

app.post("/payments/create", async (req, res) => {
    try {
        const { total } = req.body; // Get total from request body

        if (!total || isNaN(total) || total <= 0) {
            return res.status(400).json({ error: "Valid total amount is required" });
        }

        console.log(`💳 Payment request received for: ₹${total / 100}`);

        // 🔹 Create a Payment Intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: parseInt(total, 10), // Convert to integer
            currency: "INR",
        });

        res.status(201).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error("Payment error:", error);
        res.status(500).json({ error: "Payment processing failed" });
    }
});

// 🔹 Start Express Server on Render
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
