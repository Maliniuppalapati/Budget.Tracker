import React from "react";

export default function StatCard({ title, value }) {
  return (
    <div className="card" style={{ minWidth: 160 }}>
      <h4>{title}</h4>
      <div style={{ fontSize: 20, fontWeight: 700 }}>{value}</div>
    </div>
  );
}
