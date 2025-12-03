import React, { useState } from "react";
import API from "../utils/api";

// Receive 'balance' prop from Dashboard
export default function AddExpense({ refresh, balance }) {
  const [form, setForm] = useState({
    amount: "",
    category: "general",
    note: "",
  });
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    const expenseAmount = Number(form.amount);

    if (!expenseAmount || expenseAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    // Client-side balance check (your requirement)
    if (expenseAmount > balance) {
      alert("Expense exceeds available balance! Cannot add.");
      return;
    }

    setLoading(true);
    try {
      await API.post("/finance/add-expense", {
        ...form,
        amount: expenseAmount,
      });
      setForm({ amount: "", category: "general", note: "" });
      alert("Expense added successfully!");
      refresh();
    } catch (err) {
      alert(err.response?.data?.msg || "Error adding expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ minWidth: 320 }}>
      <h4>Add Expense</h4>
      <input
        className="input"
        type="number" // Use type="number" for amount
        placeholder="Amount"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />
      <input
        className="input"
        placeholder="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />
      <input
        className="input"
        placeholder="Note (Optional)"
        value={form.note}
        onChange={(e) => setForm({ ...form, note: e.target.value })}
      />
      <button className="btn" onClick={submit} disabled={loading}>
        {loading ? "Adding..." : "Add Expense"}
      </button>
    </div>
  );
}
