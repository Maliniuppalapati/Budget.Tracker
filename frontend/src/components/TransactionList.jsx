import React from "react";
import API from "../utils/api";

export default function TransactionList({
  expenses = [],
  incomes = [],
  refresh,
}) {
  const del = async (id) => {
    if (!window.confirm("Delete this expense?")) return;
    await API.delete(`/finance/expense/${id}`).catch(() => {});
    refresh();
  };

  return (
    <div className="card">
      <h4>Transactions</h4>
      <div style={{ marginBottom: 8 }}>
        <h5>Incomes</h5>
        {incomes.length === 0 ? (
          <div className="small">No incomes recorded</div>
        ) : (
          incomes.map((i) => (
            <div key={i._id} style={{ padding: "4px 0" }}>
              <strong>{i.source}</strong>: Rs. {i.amount.toLocaleString()} • {new Date(i.date).toLocaleDateString()}
              {i.note ? ` • ${i.note}` : ""}
            </div>
          ))
        )}
      </div>

      <div style={{ marginTop: 12 }}>
        <h5>Expenses</h5>
        {expenses.length === 0 ? (
          <div className="small">No expenses recorded</div>
        ) : (
          expenses.map((e) => (
            <div
              key={e._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "6px 0",
                borderBottom: "1px solid rgba(255, 255, 255, 0.05)"
              }}
            >
              <div>
                <strong>{e.category}</strong>: Rs. {e.amount.toLocaleString()} • {new Date(e.date).toLocaleDateString()}
                {e.note ? ` • ${e.note}` : ""}
              </div>
              <button className="btn" style={{ width: 'auto', padding: '4px 12px', background: 'var(--accent-danger)' }} onClick={() => del(e._id)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
