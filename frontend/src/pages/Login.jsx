import React, { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    if (!email || !password) return alert("All fields required");
    try {
      const res = await API.post("/auth/login", { email, password });
      onLogin(res.data);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div style={{ maxWidth: 360, margin: "2rem auto" }} className="card">
      <h3>Login</h3>
      <input
        className="input"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn" onClick={submit}>
        Login
      </button>
    </div>
  );
}
