import React, { useState } from "react";
import API from "../utils/api";

export default function AddIncome({ refresh }) {
  const [form, setForm] = useState({ amount: "", source: "salary", note: "" });
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    const incomeAmount = Number(form.amount);

    if (!incomeAmount || incomeAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    setLoading(true);
    try {
      await API.post("/finance/add-income", {
        ...form,
        amount: incomeAmount,
      });
      setForm({ amount: "", source: "salary", note: "" });
      alert("Income added successfully!");
      refresh();
    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ minWidth: 320 }}>
      <h4>Add Income</h4>
      <input
        className="input"
        type="number" // Use type="number" for amount
        placeholder="Amount"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />
      <input
        className="input"
        placeholder="Source"
        value={form.source}
        onChange={(e) => setForm({ ...form, source: e.target.value })}
      />
      <input
        className="input"
        placeholder="Note (Optional)"
        value={form.note}
        onChange={(e) => setForm({ ...form, note: e.target.value })}
      />
      <button className="btn" onClick={submit} disabled={loading}>
        {loading ? "Adding..." : "Add Income"}
      </button>
    </div>
  );
}
