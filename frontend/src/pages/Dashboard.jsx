import React, { useEffect, useState, useCallback } from "react";
import API from "../utils/api";
import Charts from "../components/Charts";
import AddIncome from "../components/AddIncome"; // Import component
import AddExpense from "../components/AddExpense"; // Import component
import TransactionList from "../components/TransactionList"; // Import component
import DownloadReport from "../components/DownloadReport"; // Import component
import StatCard from "../components/StatCard"; // Import component
import "../styles.css";

export default function Dashboard() {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [balance, setBalance] = useState(0);
  const user = JSON.parse(localStorage.getItem("user")); // Get user info

  // useCallback memoizes the function to prevent unnecessary re-fetches
  const fetchData = useCallback(async () => {
    try {
      const res = await API.get("/finance/dashboard");
      setIncomes(res.data.incomes);
      setExpenses(res.data.expenses);
      const totalIncome = res.data.incomes.reduce((a, b) => a + b.amount, 0);
      const totalExpenses = res.data.expenses.reduce((a, b) => a + b.amount, 0);
      setBalance(totalIncome - totalExpenses);
    } catch (err) {
      console.error(err.response?.data?.msg || err.message);
    }
  }, []); // Empty dependency array means it's created once

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Existing addIncome and addExpense logic is handled within the imported components.
  // The simple inline forms are removed.

  const totalIncome = incomes.reduce((a, b) => a + b.amount, 0);
  const totalExpenses = expenses.reduce((a, b) => a + b.amount, 0);
  const userId = user?.id; // Safely get userId

  return (
    <div className="dashboard-container">
      <h2>Dashboard 📊</h2>

      <div className="stats-cards">
        <StatCard title="Total Income" value={`₹${totalIncome}`} />
        <StatCard title="Total Expenses" value={`₹${totalExpenses}`} />
        <StatCard title="Current Balance" value={`₹${balance}`} />
      </div>

      <div className="add-section">
        <AddIncome refresh={fetchData} />
        <AddExpense refresh={fetchData} balance={balance} />
        {/* Pass balance to enforce the check on the frontend, although backend also checks */}
      </div>

      <div className="charts-section">
        <Charts incomes={incomes} expenses={expenses} />
      </div>

      <div className="transaction-report-section">
        <TransactionList
          incomes={incomes}
          expenses={expenses}
          refresh={fetchData}
        />
        {userId && <DownloadReport userId={userId} />}
      </div>
    </div>
  );
}
