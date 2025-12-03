import React, { useState } from "react";

function WorkerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginWorker = () => {
    fetch("http://localhost:5000/api/worker/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert("Login successful");
          window.location.href = "/worker-dashboard";
        } else {
          alert("Invalid credentials");
        }
      });
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="text-center mb-4">Worker Login</h3>

      <input
        type="email"
        className="form-control mb-3"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="form-control mb-3"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn btn-primary w-100" onClick={loginWorker}>
        Login
      </button>
    </div>
  );
}

export default WorkerLogin;
