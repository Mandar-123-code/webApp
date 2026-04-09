import { useState } from "react";

export default function UserProfile() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function validatePassword(p) {
    if (!p || p.length < 8 || p.length > 16)
      return "Password must be 8-16 chars";
    if (!/[A-Z]/.test(p)) return "Include at least one uppercase letter";
    if (!/[!@#$%^&*()_\-+={}[\]|\\:;"'<>.,.?/~`]/.test(p))
      return "Include at least one special character";
    return "";
  }

  function handleSubmit(e) {
    e.preventDefault();
    const err = validatePassword(password);
    if (err) {
      setMessage(err);
      return;
    }
    setMessage("Password updated");
    setPassword("");
  }

  return (
    <div className="container" style={{ paddingTop: 18 }}>
      <h2>Profile</h2>
      <form onSubmit={handleSubmit} className="form-card">
        <div className="form-row">
          <label>New Password</label>
          <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {message && (
          <div
            style={{ color: message.includes("updated") ? "green" : "#ef4444" }}
          >
            {message}
          </div>
        )}
        <div
          style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}
        >
          <button className="btn btn-primary" type="submit">
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
}
