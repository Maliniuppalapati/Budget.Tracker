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
          <div className="small">No incomes</div>
        ) : (
          incomes.map((i) => (
            <div key={i._id}>
              {i.source}: ₹{i.amount} • {new Date(i.date).toLocaleDateString()}
              {i.note ? " • " + i.note : ""}
            </div>
          ))
        )}
      </div>

      <div style={{ marginTop: 12 }}>
        <h5>Expenses</h5>
        {expenses.length === 0 ? (
          <div className="small">No expenses</div>
        ) : (
          expenses.map((e) => (
            <div
              key={e._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "6px 0",
              }}
            >
              <div>
                {e.category}: ₹{e.amount} •{" "}
                {new Date(e.date).toLocaleDateString()}
                {e.note ? " • " + e.note : ""}
              </div>
              <button className="btn" onClick={() => del(e._id)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
