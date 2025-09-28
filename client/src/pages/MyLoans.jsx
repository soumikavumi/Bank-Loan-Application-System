import React, { useEffect, useState } from "react";

function MyLoans() {
  const [loans, setLoans] = useState([]);
  const [message, setMessage] = useState("");

  // ✅ Fetch loan applications from backend
  useEffect(() => {
    const fetchLoans = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("❌ Please log in to view your loans.");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/loans/myloans", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setLoans(data);
        } else {
          setMessage("❌ " + data.message);
        }
      } catch (error) {
        setMessage("❌ Failed to load loans. Try again.");
      }
    };

    fetchLoans();
  }, []);

  return (
    <div style={styles.container}>
      <h2>📜 My Loan Applications</h2>

      {message && <p style={styles.message}>{message}</p>}

      {loans.length === 0 && !message && <p>No loan applications found.</p>}

      {loans.length > 0 && (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Loan Type</th>
              <th>Amount</th>
              <th>Tenure (months)</th>
              <th>Monthly Income</th>
              <th>Status</th>
              <th>Applied On</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan._id}>
                <td>{loan.loanType}</td>
                <td>{loan.amount}</td>
                <td>{loan.tenure}</td>
                <td>{loan.income}</td>
                <td>{loan.status}</td>
                <td>{new Date(loan.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "50px auto",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  message: {
    color: "red",
    marginTop: "10px",
  },
};

export default MyLoans;
