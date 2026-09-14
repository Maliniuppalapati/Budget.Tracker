import React, { useState } from "react";
import API from "../utils/api";

export default function SetBudget({ currentBudget, onBudgetUpdate }) {
  const [budget, setBudget] = useState(currentBudget || 20000);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    const numericBudget = Number(budget);
    if (!numericBudget || numericBudget <= 0) {
      alert("Please enter a valid monthly budget amount.");
      return;
    }

    setLoading(true);
    try {
      const res = await API.put("/auth/budget", { monthlyBudget: numericBudget });
      alert("Monthly budget updated successfully!");
      if (onBudgetUpdate) {
        onBudgetUpdate(res.data.monthlyBudget);
      }
    } catch (err) {
      alert("Error updating budget: " + (err.response?.data?.msg || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ minWidth: 320 }}>
      <h4>Target Monthly Budget</h4>
      <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: -5 }}>
        Set your monthly spending limit
      </p>
      <input
        className="input"
        type="number"
        placeholder="Enter Monthly Budget (e.g. 20000)"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
      />
      <button className="btn" onClick={handleUpdate} disabled={loading}>
        {loading ? "Updating..." : "Update Monthly Budget"}
      </button>
    </div>
  );
}
