import React, { useEffect, useState, useCallback } from "react";
import API from "../utils/api";
import Charts from "../components/Charts";
import AddIncome from "../components/AddIncome";
import AddExpense from "../components/AddExpense";
import SetBudget from "../components/SetBudget";
import TransactionList from "../components/TransactionList";
import DownloadReport from "../components/DownloadReport";
import DownloadCSV from "../components/DownloadCSV";
import StatCard from "../components/StatCard";
import AIAdvice from "../components/AIAdvice";
import "../styles.css";

export default function Dashboard({ user: propUser, setUser: propSetUser }) {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [balance, setBalance] = useState(0);
  const [currentUser, setCurrentUser] = useState(() =>
    propUser || JSON.parse(localStorage.getItem("user")) || {}
  );

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
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleBudgetUpdate = (newBudget) => {
    const updatedUser = { ...currentUser, monthlyBudget: newBudget };
    setCurrentUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    if (propSetUser) propSetUser(updatedUser);
  };

  const totalIncome = incomes.reduce((a, b) => a + b.amount, 0);
  const totalExpenses = expenses.reduce((a, b) => a + b.amount, 0);
  const userId = currentUser?.id || currentUser?._id;
  const monthlyBudget = currentUser?.monthlyBudget || 20000;

  return (
    <div className="dashboard-container">
      <h2>Dashboard 📊</h2>

      <div className="stats-cards">
        <StatCard title="Total Income" value={`Rs. ${totalIncome.toLocaleString()}`} />
        <StatCard title="Total Expenses" value={`Rs. ${totalExpenses.toLocaleString()}`} />
        <StatCard title="Current Balance" value={`Rs. ${balance.toLocaleString()}`} />
        <StatCard title="Monthly Budget" value={`Rs. ${monthlyBudget.toLocaleString()}`} />
      </div>

      <div className="add-section">
        <AddIncome refresh={fetchData} />
        <AddExpense refresh={fetchData} balance={balance} />
        <SetBudget currentBudget={monthlyBudget} onBudgetUpdate={handleBudgetUpdate} />
      </div>

      <div className="ai-section">
        <AIAdvice totalExpenses={totalExpenses} budgetLimit={monthlyBudget} />
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
        {userId && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <DownloadReport userId={userId} />
            <DownloadCSV userId={userId} />
          </div>
        )}
      </div>
    </div>
  );
}
