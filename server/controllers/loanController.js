// controllers/loanController.js
const Loan = require("../models/Loan");

// Submit a new loan application
async function applyLoan(req, res) {
  try {
    const { loanType, amount, tenure, income } = req.body;

    const newLoan = new Loan({
      user: req.user.id,
      loanType,
      amount,
      tenure,
      income
    });

    await newLoan.save();
    res.status(201).json({ message: "Loan application submitted", loan: newLoan });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

// Get all loans for a logged-in user
async function getUserLoans(req, res) {
  try {
    const loans = await Loan.find({ user: req.user.id });
    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

// Admin: Get all loan applications
async function getAllLoans(req, res) {
  try {
    const loans = await Loan.find().populate("user", "name email");
    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

// Admin: Update loan status
async function updateLoanStatus(req, res) {
  try {
    const { status } = req.body;
    const loan = await Loan.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!loan) return res.status(404).json({ message: "Loan not found" });
    res.json({ message: "Loan status updated", loan });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { applyLoan, getUserLoans, getAllLoans, updateLoanStatus };
