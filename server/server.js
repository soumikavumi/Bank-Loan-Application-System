// server.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load env
dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// DB connection
connectDB(process.env.MONGO_URI);

// Test route
app.get("/", (req, res) => {
  res.send("✅ Bank Loan API is running...");
});

// ✅ Import routes
const authRoutes = require("./routes/authRoutes");
const loanRoutes = require("./routes/loanRoutes");

// ✅ Use routes
app.use("/api/auth", authRoutes);
app.use("/api/loans", loanRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
