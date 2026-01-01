import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

export default function LineChartComp({ trend = {} }) {
  const labels = Object.keys(trend).sort();
  const ds = labels.map((l) => trend[l]);

  const data = {
    labels,
    datasets: [{ label: "Expenses", data: ds }],
  };

  return (
    <div className="card">
      <h4>Monthly Trend</h4>
      {labels.length === 0 ? (
        <div className="small">No data</div>
      ) : (
        <Line data={data} />
      )}
    </div>
  );
}
