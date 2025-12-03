import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChartComp({ data = {} }) {
  const labels = Object.keys(data);
  const ds = labels.map((l) => data[l]);

  // Chart.js will auto-assign colors if none provided
  const chartData = {
    labels,
    datasets: [{ data: ds }],
  };

  return (
    <div className="card">
      <h4>Expenses by Category</h4>
      {labels.length === 0 ? (
        <div className="small">No data</div>
      ) : (
        <Pie data={chartData} />
      )}
    </div>
  );
}
