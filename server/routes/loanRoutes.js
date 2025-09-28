// routes/loanRoutes.js
const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  applyLoan,
  getUserLoans,
  getAllLoans,
  updateLoanStatus
} = require("../controllers/loanController");

// User routes
router.post("/apply", protect, applyLoan);
router.get("/myloans", protect, getUserLoans);

// Admin routes (you can protect with admin check later)
router.get("/all", getAllLoans);
router.put("/:id/status", updateLoanStatus);

module.exports = router;
