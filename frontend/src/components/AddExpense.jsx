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

  const [smartText, setSmartText] = useState("");
  const [smartLoading, setSmartLoading] = useState(false);

  const handleSmartCategorize = async () => {
    if (!smartText) return;
    setSmartLoading(true);
    try {
      const res = await API.post("/ai/categorize", { text: smartText });
      setForm({
        amount: res.data.amount || "",
        category: res.data.category || "General",
        note: res.data.note || smartText
      });
      setSmartText("");
    } catch (err) {
      alert("Error with smart categorization: " + (err.response?.data?.msg || err.message));
    }
    setSmartLoading(false);
  };

  return (
    <div className="card" style={{ minWidth: 320 }}>
      <h4>Add Expense</h4>
      
      <div style={{display: 'flex', gap: '10px', marginBottom: '1rem', background: 'rgba(139, 92, 246, 0.1)', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(139, 92, 246, 0.3)'}}>
        <input 
          className="input" 
          placeholder="e.g. Bought a pizza for 500" 
          style={{margin: 0}}
          value={smartText}
          onChange={e => setSmartText(e.target.value)}
        />
        <button className="btn ai-btn" style={{marginTop: 0, width: 'auto', whiteSpace: 'nowrap'}} onClick={handleSmartCategorize} disabled={smartLoading}>
          {smartLoading ? "..." : "✨ Smart Add"}
        </button>
      </div>

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
