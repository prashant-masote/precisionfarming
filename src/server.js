require("dotenv").config(); // Load environment variables

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");

// 🔹 Initialize Express App
const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON requests

// 🔹 Connect to PostgreSQL Database
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Render PostgreSQL URL
    ssl: { rejectUnauthorized: false } // Required for Render
});

// 🔹 User Registration
app.post("/register", async (req, res) => {
    const { email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
            [email, hashedPassword]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "User registration failed" });
    }
});

// 🔹 User Login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (result.rows.length === 0) return res.status(400).json({ error: "User not found" });

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, user: { id: user.id, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
});

// 🔹 Middleware: Verify JWT Token
const authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ error: "Access denied" });

    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
};

// 🔹 Fetch All Crops (Public)
app.get("/crops", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM crops");
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch crops" });
    }
});

// 🔹 Add a Crop (Protected)
app.post("/crops", authenticate, async (req, res) => {
    const { name, price, quantity } = req.body;
    
    try {
        const result = await pool.query(
            "INSERT INTO crops (name, price, quantity, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
            [name, price, quantity, req.user.userId]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Failed to add crop" });
    }
});

// 🔹 Server Listening on Render Cloud
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
