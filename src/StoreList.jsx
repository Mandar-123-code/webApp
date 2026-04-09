import { useState, useEffect } from "react";
import { MOCK_STORES } from "./mockData";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export default function StoreList() {
  const [stores, setStores] = useState(MOCK_STORES);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(MOCK_STORES);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFiltered(
      stores.filter((s) => {
        const q = query.trim().toLowerCase();
        if (!q) return true;
        return (
          s.name.toLowerCase().includes(q) ||
          (s.address || "").toLowerCase().includes(q)
        );
      }),
    );
  }, [query, stores]);

  async function fetchStores() {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/stores`);
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setStores(data.map((s) => ({ ...s, id: s._id })));
    } catch (err) {
      console.warn("Failed to fetch stores, using local mock:", err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStores();
  }, []);

  async function submitRating(id) {
    const user =
      localStorage.getItem("current_user") ||
      prompt("Enter your name (will be saved)");
    if (!user) return;
    localStorage.setItem("current_user", user);

    const val = prompt("Enter rating 1-5");
    const n = Number(val);
    if (!n || n < 1 || n > 5) return alert("Invalid rating");

    try {
      const res = await fetch(`${API_BASE}/api/stores/${id}/rate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, rating: n }),
      });
      if (!res.ok) throw new Error("Failed to submit rating");
      await fetchStores();
    } catch (err) {
      alert("Could not submit rating: " + err.message);
    }
  }

  return (
    <div className="container" style={{ paddingTop: 10 }}>
      <h2>Stores</h2>
      <div className="search">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or address"
        />
      </div>

      <div style={{ marginTop: 12 }}>
        {loading && (
          <div style={{ color: "var(--muted)" }}>Loading stores...</div>
        )}
        <table className="table">
          <thead>
            <tr>
              <th>Store Name</th>
              <th>Address</th>
              <th>Overall Rating</th>
              <th>Your Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id}>
                <td>
                  <a
                    href={`/stores/${s.id}`}
                    style={{ color: "var(--accent)", textDecoration: "none" }}
                  >
                    {s.name}
                  </a>
                </td>
                <td>{s.address}</td>
                <td>{(s.rating ?? 0).toFixed(1)}</td>
                <td>
                  {(localStorage.getItem("current_user") &&
                    s.ratings &&
                    s.ratings.find(
                      (r) => r.user === localStorage.getItem("current_user"),
                    )?.rating) ??
                    "—"}
                </td>
                <td>
                  <button
                    onClick={() => submitRating(s.id)}
                    className="btn btn-primary"
                    style={{ marginRight: 8 }}
                  >
                    Rate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
