import React, { useState } from "react";

function LoanApplication() {
  const [loanType, setLoanType] = useState("");
  const [amount, setAmount] = useState("");
  const [tenure, setTenure] = useState("");
  const [income, setIncome] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("❌ Please log in first!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/loans/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ loanType, amount, tenure, income }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Loan application submitted successfully!");
        setLoanType("");
        setAmount("");
        setTenure("");
        setIncome("");
      } else {
        setMessage("❌ " + data.message);
      }
    } catch (error) {
      setMessage("❌ Failed to apply. Try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>📄 Apply for a Loan</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <select
          value={loanType}
          onChange={(e) => setLoanType(e.target.value)}
          required
          style={styles.input}
        >
          <option value="">Select Loan Type</option>
          <option value="Home Loan">Home Loan</option>
          <option value="Car Loan">Car Loan</option>
          <option value="Personal Loan">Personal Loan</option>
          <option value="Education Loan">Education Loan</option>
        </select>

        <input
          type="number"
          placeholder="Loan Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="number"
          placeholder="Tenure (months)"
          value={tenure}
          onChange={(e) => setTenure(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="number"
          placeholder="Monthly Income"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Submit Application
        </button>
      </form>

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "450px",
    margin: "50px auto",
    padding: "25px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  message: {
    marginTop: "15px",
    fontSize: "16px",
  },
};

export default LoanApplication;
