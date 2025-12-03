import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Adjusted color set for better visibility with multiple categories
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AA00FF",
  "#83a6ed",
  "#8dd1e1",
  "#82ca9d",
  "#a4de6c",
  "#d0ed57",
];

export default function Charts({ incomes = [], expenses = [] }) {
  // Show nothing if both incomes and expenses are empty
  if (!incomes.length && !expenses.length) return null;

  const totalIncome = incomes.reduce((a, b) => a + b.amount, 0);
  const totalExpenses = expenses.reduce((a, b) => a + b.amount, 0);

  // 1. Income vs Expense Pie Data
  const incomeVsExpensePieData = [
    { name: "Total Income", value: totalIncome },
    { name: "Total Expenses", value: totalExpenses },
  ].filter((d) => d.value > 0);

  // 2. Expenses by Category Pie Data (Spending Proportion)
  const expenseCategoryData = expenses.reduce((acc, expense) => {
    const category = expense.category || "Uncategorized";
    acc[category] = (acc[category] || 0) + expense.amount;
    return acc;
  }, {});

  const categoryPieData = Object.keys(expenseCategoryData)
    .map((key) => ({
      name: key,
      value: expenseCategoryData[key],
    }))
    .filter((d) => d.value > 0);

  return (
    // Update container class for two charts
    <div className="charts-container-two">
      {/* 1. Income vs Expense Pie Chart */}
      <div className="chart-box-pie">
        <h4>Income vs Expense</h4>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={incomeVsExpensePieData}
              dataKey="value"
              nameKey="name"
              outerRadius={90} // Slightly larger radius for clarity
              labelLine={false}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              } // Clearer label format
              paddingAngle={2} // Separation between slices
            >
              {incomeVsExpensePieData.map((entry, index) => (
                <Cell
                  key={`cell-income-vs-expense-${index}`}
                  fill={COLORS[index % 2]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
            <Legend layout="horizontal" align="center" verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 2. Expenses by Category Pie Chart */}
      <div className="chart-box-pie">
        <h4>Expenses by Category</h4>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryPieData}
              dataKey="value"
              nameKey="name"
              outerRadius={90} // Same larger radius for clarity
              labelLine={false}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              paddingAngle={2}
            >
              {categoryPieData.map((entry, index) => (
                <Cell
                  key={`cell-category-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
            <Legend layout="horizontal" align="center" verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
