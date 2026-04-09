import { useState } from "react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!name || name.trim().length < 5)
      e.name = "Name must be at least 5 characters.";
    if (name && name.length > 60)
      e.name = "Name must be at most 60 characters.";
    if (!email) e.email = "Enter a valid email.";
    else if (email.includes(" ")) e.email = "Email must not contain spaces.";
    else if (
      !email.includes("@") ||
      email.indexOf("@") !== email.lastIndexOf("@")
    )
      e.email = "Email must contain a single @.";
    else if (email.indexOf("@") > email.lastIndexOf("."))
      e.email = "Email must contain a domain (e.g. .com) after @.";
    if (address && address.length > 400)
      e.address = "Address must be at most 400 characters.";
    if (!password || password.length < 8 || password.length > 16) {
      e.password = "Password must be 8-16 characters.";
    } else {
      const hasUpper = password.split("").some((ch) => ch >= "A" && ch <= "Z");
      const specialChars = "!@#$%^&*()_-+={}[]|\\:;\"'<>.,.?/~`";
      const hasSpecial = password
        .split("")
        .some((ch) => specialChars.indexOf(ch) !== -1);
      if (!hasUpper || !hasSpecial)
        e.password =
          "Password must include at least one uppercase and one special character.";
    }
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const eObj = validate();
    setErrors(eObj);
    if (Object.keys(eObj).length === 0) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="page" style={{ paddingTop: 60 }}>
        <div className="container">
          <div className="form-card" style={{ textAlign: "center" }}>
            <h2>Registration Successful</h2>
            <p>
              You can now log in (registration is not connected to a backend).
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page" style={{ paddingTop: 28 }}>
      <div className="page-header container">
        <h1>Signup</h1>
        <p style={{ color: "var(--muted)" }}>
          Create an account to submit ratings for stores.
        </p>
      </div>
      <div className="container">
        <form onSubmit={handleSubmit} className="form-card" noValidate>
          <div className="form-row">
            <label>Name</label>
            <input
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              aria-label="name"
            />
            {errors.name && <small className="error">{errors.name}</small>}
          </div>

          <div className="form-row">
            <label>Email</label>
            <input
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              aria-label="email"
            />
            {errors.email && <small className="error">{errors.email}</small>}
          </div>

          <div className="form-row">
            <label>Address (optional)</label>
            <textarea
              className="form-textarea"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
              aria-label="address"
              maxLength={400}
            />
            {errors.address && (
              <small className="error">{errors.address}</small>
            )}
          </div>

          <div className="form-row">
            <label>Password</label>
            <input
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              aria-label="password"
            />
            {errors.password && (
              <small className="error">{errors.password}</small>
            )}
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button type="submit" className="btn btn-primary">
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
