import { useState } from "react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!identifier || !password) {
      setError("Please enter both email/username and password");
      return;
    }
    if (identifier.includes("@") && !emailRegex.test(identifier)) {
      setError("Enter a valid email address");
      return;
    }
    setOk(true);
  }

  if (ok)
    return (
      <div className="page" style={{ paddingTop: 60 }}>
        <div className="container">
          <div className="form-card" style={{ textAlign: "center" }}>
            <h2>Login successful</h2>
          </div>
        </div>
      </div>
    );

  return (
    <div className="page" style={{ paddingTop: 28 }}>
      <div className="page-header container">
        <h1>Login</h1>
        <p style={{ color: "var(--muted)" }}>
          Sign in to access your dashboard and submit ratings.
        </p>
      </div>
      <div className="container">
        <form onSubmit={handleSubmit} className="form-card">
          <div className="form-row">
            <input
              className="form-input"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Email or username"
            />
          </div>
          <div className="form-row">
            <input
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
          </div>
          {error && <small className="error">{error}</small>}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
