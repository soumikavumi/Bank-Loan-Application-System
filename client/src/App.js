import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import LoanApplication from "./pages/LoanApplication";
import MyLoans from "./pages/MyLoans";

function App() {
  return (
    <Router>
      <div style={styles.navbar}>
        <Link to="/" style={styles.logo}>🏦 Bank Loan App</Link>
        <div>
          <Link to="/register" style={styles.link}>Register</Link>
          <Link to="/login" style={styles.link}>Login</Link>
          <Link to="/apply" style={styles.link}>Apply Loan</Link>
          <Link to="/myloans" style={styles.link}>My Loans</Link>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/apply" element={<LoanApplication />} />
        <Route path="/myloans" element={<MyLoans />} />
      </Routes>
    </Router>
  );
}

function Home() {
  return (
    <div style={styles.home}>
      <h1>🏦 Welcome to the Bank Loan Portal</h1>
      <p>Register or login to apply for your loan easily.</p>
    </div>
  );
}

const styles = {
  navbar: {
    background: "#007bff",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    color: "#fff",
    fontSize: "20px",
    textDecoration: "none",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    marginLeft: "15px",
    fontSize: "16px",
  },
  home: {
    textAlign: "center",
    marginTop: "60px",
    fontFamily: "Arial, sans-serif",
  },
};

export default App;
