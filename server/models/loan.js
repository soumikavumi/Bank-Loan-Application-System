// models/Loan.js
const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  loanType: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  tenure: {
    type: Number, // in months
    required: true
  },
  income: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Loan", loanSchema);
