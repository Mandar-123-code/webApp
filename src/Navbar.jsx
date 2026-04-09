import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="brand">
            <Link to="/" className="brand-link">
              StoreRatings
            </Link>
          </div>

          <div className="links" role="navigation">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/stores" className="nav-link">
              Stores
            </Link>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/signup" className="nav-link">
              Signup
            </Link>
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
            <Link to="/admin" className="nav-link">
              Admin
            </Link>
            <Link to="/admin/users" className="nav-link">
              Admin Users
            </Link>
            <Link to="/admin/stores" className="nav-link">
              Admin Stores
            </Link>
            <Link to="/owner" className="nav-link">
              Owner
            </Link>
          </div>

          <button
            className="hamburger"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="hamburger-box" />
          </button>
        </div>
      </nav>

      <div
        className={"mobile-menu" + (open ? " open" : "")}
        role="dialog"
        aria-hidden={!open}
      >
        <div className="mobile-menu-inner">
          <button
            className="mobile-close"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
          <nav className="mobile-links">
            <Link to="/" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link to="/stores" onClick={() => setOpen(false)}>
              Stores
            </Link>
            <Link to="/login" onClick={() => setOpen(false)}>
              Login
            </Link>
            <Link to="/signup" onClick={() => setOpen(false)}>
              Signup
            </Link>
            <Link to="/profile" onClick={() => setOpen(false)}>
              Profile
            </Link>
            <Link to="/admin" onClick={() => setOpen(false)}>
              Admin
            </Link>
            <Link to="/admin/users" onClick={() => setOpen(false)}>
              Admin Users
            </Link>
            <Link to="/admin/stores" onClick={() => setOpen(false)}>
              Admin Stores
            </Link>
            <Link to="/owner" onClick={() => setOpen(false)}>
              Owner
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
