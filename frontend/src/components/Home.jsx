import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to Budget Planner 💰</h1>
      <p>
        Track your income and expenses, visualize trends, and stay on budget.
      </p>
      <Link className="btn-home" to="/login">
        Get Started
      </Link>
    </div>
  );
}
